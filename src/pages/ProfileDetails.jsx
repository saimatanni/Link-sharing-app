// ProfileDetails.js
import React, { useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { useDetails } from "../context/detailsProvider";

const ProfileDetails = () => {
  const { setProfileDetails } = useDetails();
  const [profile, setProfile] = useState({
    firstName: "Ben",
    lastName: "Wright",
    email: "ben@example.com",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [image, setImage] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Handle save with success message and updating context
  const handleSave = () => {
    // Update context with profile data
    setProfileDetails({
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      profileImage: image, // Set profile image as base64 data
    });
    
    // Show success message
    setSuccessMessage("Your changes have been successfully saved!");
    setTimeout(() => setSuccessMessage(""), 3000); // Clear message after 3 seconds
  };

  // Handle image change
  const fileInputRef = useRef(null);

  // Handle image change and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Set image preview as base64
      };
      reader.readAsDataURL(file); // Read the file for preview

      fileInputRef.current.value = null; // Reset file input
    }
  };

  return (
    <div className="min-h-screen ">
      <div className="w-full ">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Profile Details</h1>
        <p className="text-gray-500 mb-8">
          Add your details to create a personal touch to your profile.
        </p>

        {/* Profile Picture Section */}
        <div className="flex flex-col items-center bg-gray-100 p-6 rounded-lg mb-8 shadow-sm justify-evenly md:flex-row gap-2">
          <div className="text-gray-700 text-sm font-medium mr-8 w-32">
            Profile picture
          </div>

          {/* Profile Image with Change Overlay */}
          <label className="relative w-32 h-32 rounded-lg overflow-hidden bg-gray-200 mr-8 flex items-center justify-center cursor-pointer group">
            {image ? (
              <img
                src={image}
                alt="Profile Preview"
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-gray-500">Select Image</span>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition">
              <FaCamera />
              <span>Change Image</span>
            </div>
          </label>

          <div className="text-gray-400 text-xs leading-5">
            Image must be below 1024x1024px.
            <br />
            Use PNG, JPG, or BMP format.
          </div>
        </div>

        {/* Input Fields Section */}
        <div className="bg-gray-100 p-8 rounded-lg shadow-sm w-full">
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-start justify-center text-gray-700 text-sm font-medium space-y-6 col-span-1 pt-1">
              <label htmlFor="firstName">First name*</label>
              <label htmlFor="lastName">Last name*</label>
              <label htmlFor="email">Email</label>
            </div>

            <div className="col-span-2 space-y-4">
              <input
                id="firstName"
                type="text"
                name="firstName"
                value={profile.firstName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800"
                placeholder="First name"
              />
              <input
                id="lastName"
                type="text"
                name="lastName"
                value={profile.lastName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800"
                placeholder="Last name"
              />
              <input
                id="email"
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800"
                placeholder="Email"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleSave}
            className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
          >
            Save
          </button>
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded-lg shadow-lg text-sm">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default ProfileDetails;
