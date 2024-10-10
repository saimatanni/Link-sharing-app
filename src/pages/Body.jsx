import Header from "../component/Header";
import { useDetails } from "../context/detailsProvider";
import { lazy, Suspense, useMemo } from "react";

// Lazy load components that aren’t needed initially
const CustomLink = lazy(() => import("./CustomLink"));
const Preview = lazy(() => import("./MobilePreview"));
const ProfileDetails = lazy(() => import("./ProfileDetails"));

const Body = () => {
  const { activeTab } = useDetails();

  // Memoize the conditional rendering based on `activeTab`
  const content = useMemo(() => {
    return activeTab === "links" ? <CustomLink /> : <ProfileDetails />;
  }, [activeTab]);

  return (
    <div className="min-h-screen p-4 pt-20 bg-gray-50">
      <Header />
      <div className="flex flex-col gap-4 mt-6 lg:flex-row">
        {/* Preview Section - Sidebar */}
        <div className="hidden p-6 bg-white rounded-lg shadow-md lg:block lg:w-2/5">
          <Suspense fallback={<div>Loading Preview...</div>}>
            <Preview />
          </Suspense>
        </div>

        {/* Main Content Area */}
        <div className="w-full p-6 bg-white rounded-lg shadow-md lg:w-3/5">
          <Suspense fallback={<div>Loading...</div>}>{content}</Suspense>
        </div>
      </div>
    </div>
  );
};

export default Body;
