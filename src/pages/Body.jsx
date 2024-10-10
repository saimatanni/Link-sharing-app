// Body.jsx

import Header from "../component/Header";
import { useDetails } from "../context/detailsProvider";
import CustomLink from "./CustomLink";
import Preview from "./MobilePreview";
import ProfileDetails from "./ProfileDetails";

const Body = () => {
  const { activeTab } = useDetails();
  
  return (
    <div className="min-h-screen p-4 pt-20 bg-gray-50"> {/* Adjusted padding for fixed header */}
      <Header />
      <div className="flex flex-col gap-4 mt-6 lg:flex-row">
        {/* Preview Section - Sidebar */}
        <div className="hidden p-6 bg-white rounded-lg shadow-md lg:block lg:w-2/5">
          <Preview />
        </div>

        {/* Main Content Area */}
        <div className="w-full p-6 bg-white rounded-lg shadow-md lg:w-3/5">
          {activeTab === "links" ? <CustomLink /> : <ProfileDetails />}
        </div>
      </div>
    </div>
  );
};

export default Body;
