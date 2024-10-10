import { useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { useDetails } from "../context/detailsProvider";

const ProfileDetails = () => {
  const { setProfileDetails, profileDetails } = useDetails();
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileDetails((prev) => ({ ...prev, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Clear error when typing
  };

  // Handle save with validation
  const handleSave = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!profileDetails.firstName) newErrors.firstName = "First name is required.";
    if (!profileDetails.lastName) newErrors.lastName = "Last name is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage("Your changes have been successfully saved!");
      setTimeout(() => setSuccessMessage(""), 3000);
    }, 1500);
  };

  // Handle image change with validation
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const MAX_FILE_SIZE = 1024 * 1024; // 1MB
    const validTypes = ["image/png", "image/jpeg", "image/bmp"];

    if (!file) return;
    if (!validTypes.includes(file.type)) {
      alert("Invalid file format. Please select a PNG, JPG, or BMP image.");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      alert("File size must be less than 1MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileDetails((prevDetails) => ({ ...prevDetails, profileImage: reader.result }));
    };
    reader.readAsDataURL(file);
    fileInputRef.current.value = null;
  };

  return (
    <div className="w-full">
      <h1 className="mt-4 mb-3 text-2xl font-bold text-gray-900">Profile Details</h1>
      <p className="mb-8 text-gray-500">Add your details to create a personal touch to your profile.</p>

      {/* Profile Picture Section */}
      <div className="flex flex-col items-center gap-2 p-6 mb-8 bg-gray-100 rounded-lg shadow-sm md:flex-row md:justify-evenly">
        <div className="font-medium text-gray-400 md:mr-8">Profile picture</div>

        <label className="relative flex items-center justify-center w-24 h-24 overflow-hidden bg-gray-200 rounded-lg cursor-pointer md:w-40 md:h-40 group">
          {profileDetails.profileImage ? (
            <img src={profileDetails.profileImage} alt="Profile Preview" className="object-cover w-full h-full" />
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

        <div className="text-xs text-gray-400 md:text-left">
          Image must be below 1024x1024px. <br /> Use PNG, JPG, or BMP format.
        </div>
      </div>

      {/* Input Fields Section */}
      <form onSubmit={handleSave}>
        <div className="w-full p-6 bg-gray-100 rounded-lg shadow-sm md:p-8">
          <div className="space-y-4">
            {[
              { id: "firstName", label: "First name*", value: profileDetails.firstName, error: errors.firstName },
              { id: "lastName", label: "Last name*", value: profileDetails.lastName, error: errors.lastName },
              { id: "email", label: "Email", value: profileDetails.email },
            ].map((field) => (
              <div key={field.id} className="md:flex md:items-center md:space-x-4">
                <label htmlFor={field.id} className="block mb-1 text-sm font-medium text-gray-700 md:w-1/4 md:mb-0">
                  {field.label}
                </label>
                <div className="md:w-3/4">
                  <input
                    id={field.id}
                    type={field.id === "email" ? "email" : "text"}
                    name={field.id}
                    value={field.value || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#633bfe]"
                    placeholder={field.label}
                  />
                  {field.error && <p className="mt-1 text-xs text-red-500">{field.error}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end mt-6">
          <button
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
