// ProfileDetails.js
import { useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { useDetails } from "../context/detailsProvider";

const ProfileDetails = () => {
  const { setProfileDetails, profileDetails } = useDetails();

  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileDetails((prev) => ({ ...prev, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Clear error when user types
  };

  // Handle save with success message and updating context
  const handleSave = (e) => {
    e.preventDefault();
    // Validation check
    const newErrors = {};
    if (!profileDetails.firstName) {
      newErrors.firstName = "First name is required.";
    }
    if (!profileDetails.lastName) {
      newErrors.lastName = "Last name is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Exit if there are validation errors
    }

    // Clear errors if no validation issues
    setErrors({});
    setIsLoading(true);

    // Simulate a save delay and show success message
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage("Your changes have been successfully saved!");

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000);
    }, 1500);
  };

  // Handle image change
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const MAX_FILE_SIZE = 1024 * 1024; // 1MB

    // Check if file exists
    if (!file) return;

    // Validate file type
    const validTypes = ["image/png", "image/jpeg", "image/bmp"];
    if (!validTypes.includes(file.type)) {
      alert("Invalid file format. Please select a PNG, JPG, or BMP image.");
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      alert("File size must be less than 1024 * 1024.");
      return;
    }

    // Load and set image if validations pass
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageData = reader.result;

      setProfileDetails((prevDetails) => ({
        ...prevDetails,
        profileImage: imageData, // Update profile image
      }));
    };
    reader.readAsDataURL(file);
    fileInputRef.current.value = null;
  };

  return (
    <div className="">
      <div className="w-full">
        <h1 className="mt-4 mb-3 text-2xl font-bold text-gray-900">
          Profile Details
        </h1>
        <p className="mb-8 text-gray-500">
          Add your details to create a personal touch to your profile.
        </p>

        {/* Profile Picture Section */}
        <div className="flex flex-col items-center gap-2 p-6 mb-8 bg-gray-100 rounded-lg shadow-sm md:flex-row md:justify-evenly">
          <div className="font-medium text-gray-400 md:mr-8 md:mb-0">
            Profile picture
          </div>

          {/* Profile Image with Change Overlay */}
          <label className="relative flex items-center justify-center w-24 h-24 overflow-hidden bg-gray-200 rounded-lg cursor-pointer md:w-40 md:h-40 group">
            {profileDetails.profileImage ? (
              <img
                src={profileDetails.profileImage}
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
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white transition bg-black bg-opacity-50 opacity-0 group-hover:opacity-100">
              <FaCamera />
              <span className="text-center">Change Image</span>
            </div>
          </label>

          <div className="text-xs leading-5 text-center text-gray-400 md:text-left">
            Image must be below 1024x1024px.
            <br />
            Use PNG, JPG, or BMP format.
          </div>
        </div>

        {/* Input Fields Section */}

        <form onSubmit={handleSave}>

          
       
        <div className="w-full p-6 bg-gray-100 rounded-lg shadow-sm md:p-8">
          <div className="space-y-4">
            <div className="md:flex md:items-center md:space-x-4">
              <label
                htmlFor="firstName"
                className="block mb-1 text-sm font-medium text-gray-700 md:w-1/4 md:mb-0"
              >
                First name*
              </label>
              <div className="md:w-3/4">
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  value={profileDetails.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#633bfe]"
                  placeholder="First name"
                />
                {errors.firstName && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.firstName}
                  </p>
                )}
              </div>
            </div>

            <div className="md:flex md:items-center md:space-x-4">
              <label
                htmlFor="lastName"
                className="block mb-1 text-sm font-medium text-gray-700 md:w-1/4 md:mb-0"
              >
                Last name*
              </label>
              <div className="md:w-3/4">
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={profileDetails.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#633bfe]"
                  placeholder="Last name"
                />
                {errors.lastName && (
                  <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div className="md:flex md:items-center md:space-x-4">
              <label
                htmlFor="email"
                className="block mb-1 text-sm font-medium text-gray-700 md:w-1/4 md:mb-0"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={profileDetails.email}
                onChange={handleChange}
                className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-md md:w-3/4 focus:outline-none focus:ring-1 focus:ring-[#633bfe]"
                placeholder="Email"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end mt-6">
          <button
            // onClick={handleSave}
            type="submit"
            className="px-4 py-2 font-semibold text-white transition bg-[#633bfe] rounded-lg hover:opacity-90"
          >
            {isLoading ? (
              <div className="w-5 h-5 mr-2 border-t-2 border-white rounded-full animate-spin"></div>
            ) : (
              "Save"
            )}
          </button>
        </div>
        </form>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="fixed px-4 py-2 text-sm text-white transform -translate-x-1/2 bg-black rounded-lg shadow-lg bottom-4 left-1/2">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default ProfileDetails;
