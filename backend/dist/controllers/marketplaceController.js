// backend/src/controllers/marketplaceController.ts
import { createListing, getListings, updateListing, deleteListing, getMyListings, reportListing } from '../services/marketplaceService.js';
/**
 * Handles the request to create a new marketplace listing.
 */
export const handleCreateListing = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized: User ID not found in token.' });
        }
        const itemDetails = req.body;
        if (!itemDetails.type || !itemDetails.title || !itemDetails.category) {
            return res.status(400).json({ error: 'Type, title, and category are required fields.' });
        }
        const newListing = await createListing(itemDetails, userId);
        return res.status(201).json({
            message: 'Listing created successfully!',
            item: newListing,
        });
    }
    catch (error) {
        console.error('Create Listing Controller Error:', error.message);
        return res.status(500).json({ error: 'An error occurred while creating the listing.' });
    }
};
/**
 * Handles the request to fetch all marketplace listings.
 */
export const handleGetListings = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized: User ID not found in token.' });
        }
        const allListings = await getListings(userId, req.query);
        return res.status(200).json(allListings);
    }
    catch (error) {
        console.error('Get Listings Controller Error:', error.message);
        return res.status(500).json({ error: 'An error occurred while fetching the listings.' });
    }
};
/**
 * Handles the request to update a marketplace listing.
 */
export const handleUpdateListing = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized: User ID not found.' });
        }
        const { itemId } = req.params;
        if (typeof itemId !== 'string') {
            return res.status(400).json({ error: 'A valid item ID must be provided in the URL.' });
        }
        const itemDetails = req.body;
        const updatedItem = await updateListing(itemId, itemDetails, userId);
        return res.status(200).json({
            message: 'Listing updated successfully!',
            item: updatedItem,
        });
    }
    catch (error) {
        console.error('Update Listing Controller Error:', error.message);
        return res.status(404).json({ error: error.message });
    }
};
/**
 * Handles the request to delete a marketplace listing.
 */
export const handleDeleteListing = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized: User ID not found.' });
        }
        const { itemId } = req.params;
        if (typeof itemId !== 'string') {
            return res.status(400).json({ error: 'A valid item ID must be provided in the URL.' });
        }
        await deleteListing(itemId, userId);
        return res.status(200).json({ message: 'Listing deleted successfully!' });
    }
    catch (error) {
        console.error('Delete Listing Controller Error:', error.message);
        return res.status(404).json({ error: error.message });
    }
};
/**
 * Handles the request to fetch only the logged-in user's listings.
 */
export const handleGetMyListings = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized: User ID not found in token.' });
        }
        const myListings = await getMyListings(userId);
        return res.status(200).json(myListings);
    }
    catch (error) {
        console.error('Get My Listings Controller Error:', error.message);
        return res.status(500).json({ error: 'An error occurred while fetching your listings.' });
    }
};
/**
 * Handles the request to report a marketplace listing.
 */
export const handleReportListing = async (req, res) => {
    try {
        const reporterId = req.user?.id;
        if (!reporterId) {
            return res.status(401).json({ error: 'Unauthorized: User ID not found in token.' });
        }
        const { itemId } = req.params;
        if (typeof itemId !== 'string') {
            return res.status(400).json({ error: 'A valid item ID must be provided in the URL.' });
        }
        const reportDetails = req.body;
        if (!reportDetails.reason) {
            return res.status(400).json({ error: 'A reason for the report is required.' });
        }
        const newReport = await reportListing(itemId, reporterId, reportDetails);
        return res.status(201).json({
            message: 'Report submitted successfully!',
            report: newReport,
        });
    }
    catch (error) {
        console.error('Report Listing Controller Error:', error.message);
        return res.status(500).json({ error: 'An error occurred while submitting the report.' });
    }
};
