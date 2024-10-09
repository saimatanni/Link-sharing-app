import { useDetails } from "../context/detailsProvider";
import CustomLink from "./CustomLink";
import Preview from "./Preview";
import ProfileDetails from "./ProfileDetails";

const Body = () => {
  const {activeTab}=useDetails()
  return (
    <div className="flex flex-col gap-4 my-4 lg:flex-row">
      <div className="hidden p-10 bg-white rounded shadow-sm md:w-2/5 lg:block">
        <Preview />
      </div>
      <div className="w-full  p-10  bg-white rounded shadow-sm lg:w-3/5">
      {activeTab === "links" ? <CustomLink/> : <ProfileDetails/>}
     
      </div>
    </div>
  );
};

export default Body;
