import { useState, useEffect } from "react";
import { supabase } from "@/supabaseClient";

interface University {
  id: string;
  name: string;
}

interface Props {
  onClose: () => void;
}

const ProfileCompletionModal: React.FC<Props> = ({ onClose }) => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [universityId, setUniversityId] = useState("");
  const [course, setCourse] = useState("");

  useEffect(() => {
    const fetchUniversities = async () => {
      const { data, error } = await supabase
        .from("universities")
        .select("id, name")
        .eq("is_active", true);

      if (error) {
        console.error("Error fetching universities:", error.message);
      } else {
        setUniversities(data || []);
      }
    };

    fetchUniversities();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .update({ university_id: universityId, course })
      .eq("id", user.id);

    if (error) {
      console.error("Error updating profile:", error.message);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        <h2 className="text-2xl font-bold text-center mb-4">
          Complete Your Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Select University
            </label>
            <select
              value={universityId}
              onChange={(e) => setUniversityId(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="" disabled>
                -- Select your university --
              </option>
              {universities.map((uni) => (
                <option key={uni.id} value={uni.id}>
                  {uni.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Course
            </label>
            <input
              type="text"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              required
              placeholder="e.g., B.Tech CSE"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileCompletionModal;
