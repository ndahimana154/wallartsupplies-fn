import { useEffect, useState } from 'react';
import userRequests from '../../utils/requests/userRequests';
import toast, { Toaster } from 'react-hot-toast';
import { FiUser, FiMail, FiSave, FiEdit2, FiX } from 'react-icons/fi';

const Profile = () => {
  const [profile, setProfile] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProfile = async () => {
    try {
      const response = await userRequests.getProfileRequest();
      if (response.success) {
        setProfile(response.data.user);
        setEditedProfile(response.data.user);
      } else {
        throw new Error(response);
      }
    } catch (error) {
      toast.error('Failed to fetch profile data');
      console.error('Error fetching profile:', error);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const response = await userRequests.updateprofileRequest(editedProfile);
      if (!response.success) {
        throw new Error(response);
      }

      toast.success('Profile updated successfully!');
      setProfile(editedProfile);
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update profile');
      console.error('Error updating profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedProfile((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Profile
          </h1>
          <p className="text-gray-600">Manage your personal information</p>
        </div>

        {profile ? (
          <div className="bg-white rounded-2xl overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-[#e67e22]/10 to-[#e67e22]/5 relative">
              <div className="absolute -bottom-12 left-8 flex items-end">
                <div className="w-24 h-24 rounded-full bg-white p-1">
                  <div className="w-full h-full rounded-full bg-gradient-to-r from-[#e67e22] to-orange-400 flex items-center justify-center">
                    <FiUser className="w-12 h-12 text-white" />
                  </div>
                </div>
                <div className="ml-6 mb-3">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {profile.names}
                  </h2>
                  <p className="text-gray-600">{profile.email}</p>
                </div>
              </div>
            </div>

            <div className="pt-16 p-8">
              {!isEditing ? (
                <div>
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-xl font-semibold text-gray-800">
                      Personal Information
                    </h3>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-[#e67e22] text-white rounded-lg hover:bg-[#d35400] transition-colors duration-200"
                    >
                      <FiEdit2 className="w-4 h-4" />
                      Edit Profile
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-6">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-full bg-[#e67e22]/10 flex items-center justify-center">
                            <FiUser className="w-5 h-5 text-[#e67e22]" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Full Name</p>
                            <p className="font-medium text-gray-800">
                              {profile.names}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-full bg-[#e67e22]/10 flex items-center justify-center">
                            <FiMail className="w-5 h-5 text-[#e67e22]" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">
                              Email Address
                            </p>
                            <p className="font-medium text-gray-800">
                              {profile.email}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <h4 className="text-lg font-semibold text-gray-700 mb-4">
                      Account Details
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-500">Member Since</p>
                        <p className="font-medium text-gray-800">2024</p>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-500">Status</p>
                        <span className="inline-block px-3 py-1 text-sm font-medium bg-green-100 text-green-800 rounded-full">
                          Active
                        </span>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-500">Role</p>
                        <p className="font-medium text-gray-800">User</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-xl font-semibold text-gray-800">
                      Edit Information
                    </h3>
                    <div className="flex gap-3">
                      <button
                        onClick={handleCancel}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                        disabled={isLoading}
                      >
                        <FiX className="w-4 h-4" />
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        className="flex items-center gap-2 px-4 py-2 bg-[#e67e22] text-white rounded-lg hover:bg-[#d35400] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <FiSave className="w-4 h-4" />
                            Save Changes
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        <div className="flex items-center gap-2">
                          <FiUser className="w-4 h-4 text-[#e67e22]" />
                          Full Name
                        </div>
                      </label>
                      <input
                        type="text"
                        name="names"
                        value={editedProfile?.names || ''}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e67e22] focus:border-transparent outline-none transition-all duration-200"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div className="bg-gray-50 p-6 rounded-xl">
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        <div className="flex items-center gap-2">
                          <FiMail className="w-4 h-4 text-[#e67e22]" />
                          Email Address
                        </div>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={editedProfile?.email || ''}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e67e22] focus:border-transparent outline-none transition-all duration-200"
                        placeholder="Enter your email address"
                      />
                      <p className="mt-2 text-sm text-gray-500">
                        You'll receive notifications and updates at this email
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#e67e22]/10 to-[#e67e22]/20 flex items-center justify-center">
              <FiUser className="w-8 h-8 text-[#e67e22]" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Loading Profile
            </h3>
            <p className="text-gray-600 mb-6">
              Please wait while we load your information...
            </p>
            <div className="w-32 h-1 mx-auto bg-gradient-to-r from-transparent via-[#e67e22] to-transparent rounded-full animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
