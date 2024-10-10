import { useDetails } from "../../context/detailsProvider";


const ProfileSection = () => {
  const { profileDetails } = useDetails();

  const isProfileLoaded = profileDetails.firstName && profileDetails.lastName;

  return (
    <div className="flex flex-col items-center justify-center">
      {profileDetails.profileImage ? (
        <img
          src={profileDetails.profileImage}
          alt="Profile"
          className="w-20 h-20 mb-4 bg-gray-200 border-4 rounded-full border-indigo-500 sm:w-24 sm:h-24"
        />
      ) : (
        <div className="w-20 h-20 mb-4 bg-gray-200 rounded-full sm:w-24 sm:h-24 animate-pulse"></div>
      )}

      {isProfileLoaded ? (
        <>
          <h2 className="mb-1 text-lg font-bold sm:text-xl">
            {profileDetails.firstName} {profileDetails.lastName}
          </h2>
          <p className="mb-6 text-sm text-gray-500 sm:text-base">
            {profileDetails.email}
          </p>
        </>
      ) : (
        <>
          <div className="w-24 h-4 mb-2 bg-gray-200 rounded-full sm:w-32 sm:h-6 animate-pulse"></div>
          <div className="h-3 mb-6 bg-gray-200 rounded-full w-36 sm:w-48 sm:h-4 animate-pulse"></div>
        </>
      )}
    </div>
  );
};

export default ProfileSection;
