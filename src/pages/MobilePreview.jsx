import { Suspense, lazy } from "react";
import mobileframe from "../assets/mobile_frame.png";

const ProfileSection = lazy(() => import("../component/profile/ProfileSection"));
const LinksSection = lazy(() => import("../component/profile/LinkSection"));

const MobilePreview = () => {
  return (
    <div className="flex items-center justify-center p-8">
      {/* Outer Container with Background Image */}
      <div
        className="flex items-center justify-center bg-center bg-no-repeat bg-contain"
        style={{ backgroundImage: `url(${mobileframe})` }}
      >
        <div className="w-[280px] h-[560px] sm:w-[308px] sm:h-[480px] lg:w-[360px] lg:h-[560px] flex items-center justify-center">
          {/* Inner Scrollable Content Container */}
          <div className="w-[240px] h-[480px] sm:w-[250px] sm:h-[440px] lg:w-[250px] lg:max-h-[480px] bg-white rounded-2xl overflow-hidden hover:overflow-y-auto p-4 sm:p-6 custom-scrollbar">
            <Suspense fallback={<div className="animate-pulse">Loading profile...</div>}>
              <ProfileSection />
            </Suspense>

            <Suspense fallback={<div className="animate-pulse">Loading links...</div>}>
              <LinksSection />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobilePreview;
