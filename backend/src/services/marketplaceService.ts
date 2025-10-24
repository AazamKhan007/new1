// backend/src/services/marketplaceService.ts

import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase admin client for server-side operations.
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

// --- TYPE DEFINITIONS ---
// This helps TypeScript understand the shape of our data from Supabase.
interface University {
  city: string;
  name: string;
  id: string;
}
interface Profile {
  universities: University | University[] | null;
  university_id: string;
}


/**
 * Creates a new item listing in the marketplace.
 */
export const createListing = async (itemDetails: any, userId: string) => {
  const { data: profile, error: profileError } = await supabaseAdmin
    .from('profiles')
    .select('university_id')
    .eq('id', userId)
    .single();

  if (profileError || !profile) {
    throw new Error('Could not find user profile to associate with the listing.');
  }

  const itemToInsert = { ...itemDetails, user_id: userId, university_id: profile.university_id };

  const { data, error } = await supabaseAdmin
    .from('marketplace_items')
    .insert(itemToInsert)
    .select()
    .single();

  if (error) {
    throw error;
  }
  return data;
};


/**
 * Fetches marketplace listings with support for filtering and sorting.
 * @param userId - The ID of the user requesting the listings.
 * @param filters - An object containing filter criteria (category, condition, price, etc.).
 * @returns A filtered and sorted list of marketplace items.
 */
export const getListings = async (userId: string, filters: any) => {
  // 1. First, find the city of the logged-in user.
  const { data: profileData, error: profileError } = await supabaseAdmin
    .from('profiles')
    .select('universities ( city )')
    .eq('id', userId)
    .single();

  if (profileError || !profileData) {
    throw new Error('Could not find user profile to determine city.');
  }
  
  const profile = profileData as Profile;
  const userCity = Array.isArray(profile.universities)
    ? profile.universities[0]?.city
    : profile.universities?.city;

  if (!userCity) {
    throw new Error("Could not determine the user's city from their profile.");
  }

  // 2. Get all university IDs that are in the user's city.
  const { data: universitiesInCity, error: uniError } = await supabaseAdmin
    .from('universities')
    .select('id')
    .eq('city', userCity);

  if (uniError) {
    throw uniError;
  }
  const universityIds = universitiesInCity.map(uni => uni.id);

  // 3. Start building the main query.
  let query = supabaseAdmin
    .from('marketplace_items')
    .select(`
      *,
      profiles ( full_name, phone_number ),
      universities ( name, city )
    `)
    .eq('status', 'Available')
    // Filter items where the university_id is in our list of city universities.
    .in('university_id', universityIds);

  // 4. Apply filters conditionally.
  if (filters.category) {
    query = query.eq('category', filters.category);
  }
  if (filters.condition) {
    query = query.eq('condition', filters.condition);
  }
  if (filters.minPrice) {
    query = query.gte('price', parseFloat(filters.minPrice)); // gte = Greater than or equal to
  }
  if (filters.maxPrice) {
    query = query.lte('price', parseFloat(filters.maxPrice)); // lte = Less than or equal to
  }
  if (filters.search) {
      // Use 'ilike' for case-insensitive search on the title
      query = query.ilike('title', `%${filters.search}%`);
  }

  // 5. Apply sorting. Default to newest first.
  const sortBy = filters.sortBy || 'created_at';
  const ascending = filters.sortOrder === 'asc'; // asc for ascending, desc for descending
  query = query.order(sortBy, { ascending: ascending });


  // 6. Execute the final query.
  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return data;
};

/**
 * Updates an existing marketplace listing.
 */
export const updateListing = async (itemId: string, itemDetails: any, userId: string) => {
  const { data, error } = await supabaseAdmin
    .from('marketplace_items')
    .update(itemDetails)
    .eq('id', itemId)
    .eq('user_id', userId)
    .select()
    .single();

  if (error) {
    throw new Error('Could not update listing. It may not exist or you may not be the owner.');
  }
  return data;
};

/**
 * Deletes a marketplace listing.
 */
export const deleteListing = async (itemId: string, userId: string) => {
  const { error } = await supabaseAdmin
    .from('marketplace_items')
    .delete()
    .eq('id', itemId)
    .eq('user_id', userId);

  if (error) {
    throw new Error('Could not delete listing. It may not exist or you may not be the owner.');
  }
  return { message: 'Listing deleted successfully.' };
};

/**
 * Fetches all marketplace listings created by a specific user.
 */
export const getMyListings = async (userId: string) => {
  const { data, error } = await supabaseAdmin
    .from('marketplace_items')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error('Could not fetch your listings.');
  }
  return data;
};

/**
 * Creates a new report for a marketplace item.
 */
export const reportListing = async (itemId: string, reporterId: string, reportDetails: any) => {
  const { reason, message } = reportDetails;

  const { data: itemData, error: itemError } = await supabaseAdmin
    .from('marketplace_items')
    .select('user_id')
    .eq('id', itemId)
    .single();

  if (itemError || !itemData) {
    throw new Error('The item you are trying to report does not exist.');
  }

  const reportToInsert = {
    item_id: itemId,
    reporter_id: reporterId,
    seller_id: itemData.user_id,
    reason: reason,
    message: message,
  };

  const { data, error } = await supabaseAdmin
    .from('reports')
    .insert(reportToInsert)
    .select()
    .single();

  if (error) {
    throw new Error('Could not submit report. Please try again.');
  }
  return data;
};
