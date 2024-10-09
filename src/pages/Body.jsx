import CustomLink from "./CustomLink";
import Preview from "./Preview";

const Body = () => {
  return (
    <div className="flex flex-col gap-4 my-4 lg:flex-row">
      <div className="hidden px-6 py-12 bg-white rounded shadow-sm md:w-2/5 lg:block">
        <Preview />
      </div>
      <div className="w-full px-6 py-12 bg-white rounded shadow-sm lg:w-3/5">
      <CustomLink/>
      </div>
    </div>
  );
};

export default Body;
