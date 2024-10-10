import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { BiLink } from "react-icons/bi";
import Select from "react-select";
import PropTypes from "prop-types";

const DraggableLink = ({
  index,
  link,
  platforms,
  moveLink,
  handleChange,
  removeLink,
}) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: "link",
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveLink(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "link",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref)); // Connect drag and drop refs to the DOM node

  // Custom styles for react-select
  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderColor: "#e2e8f0", // gray-300
      borderRadius: "0.375rem", // rounded-md
      paddingLeft: "0.75rem",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#633bfe", // Hover border color
      },
    }),
    option: (provided) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      //   zIndex:1000,
    }),
  };

  // Format options with icon
  const platformOptions = platforms.map((platform) => ({
    value: platform.name,
    label: (
      <div className="flex items-center gap-2">
        <platform.icon className={`${platform.color} text-lg`} />
        {platform.name}
      </div>
    ),
  }));

  return (
    <div
      ref={ref}
      className={`mb-5 p-4 bg-gray-100 rounded-lg border border-gray-200 ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="font-semibold text-gray-800">Link #{index + 1}</span>
        <button
          onClick={() => removeLink(link.id)}
          className="text-gray-500 hover:text-red-600"
        >
          Remove
        </button>
      </div>

      <label className="block mb-2 text-sm font-medium text-gray-700">
        Platform
      </label>
      <Select
        options={platformOptions}
        value={
          platformOptions.find(
            (option) => option && option.value === link.platform
          ) || null
        }
        onChange={(selectedOption) =>
          handleChange(
            link.id,
            "platform",
            selectedOption ? selectedOption.value : null
          )
        }
        styles={customStyles}
        placeholder="Select a platform"
        isClearable
      />

      <label className="block mt-4 mb-2 text-sm font-medium text-gray-700">
        Link
      </label>
      <div className="flex flex-col">
        <div className="flex items-center px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 hover:border-[#633bfe]">
          <BiLink className="mr-2 text-lg text-gray-500" />
          <input
            type="text"
            value={link.url}
            onChange={(e) => handleChange(link.id, "url", e.target.value)}
            className="w-full outline-none"
            placeholder="https://www.example.com"
          />
        </div>
        {link.error && (
          <p className="mt-1 text-sm text-red-500">{link.error}</p>
        )}
      </div>
    </div>
  );
};

DraggableLink.propTypes = {
  index: PropTypes.number.isRequired,
  link: PropTypes.shape({
    id: PropTypes.string.isRequired,
    platform: PropTypes.string,
    url: PropTypes.string.isRequired,
    error: PropTypes.string,
  }).isRequired,
  platforms: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      icon: PropTypes.elementType.isRequired,
      color: PropTypes.string.isRequired,
      pattern: PropTypes.instanceOf(RegExp).isRequired,
    })
  ).isRequired,
  moveLink: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  removeLink: PropTypes.func.isRequired,
};

export default DraggableLink;
