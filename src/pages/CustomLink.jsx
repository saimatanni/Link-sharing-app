// CustomLink.js
import React, { useState } from "react";
import { BiLink } from "react-icons/bi";
import { FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import { useDetails } from "../context/detailsProvider";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const platforms = [
  {
    name: "GitHub",
    icon: FaGithub,
    color: "text-black",
    pattern: /^https:\/\/github\.com\/.+/,
  },
  {
    name: "YouTube",
    icon: FaYoutube,
    color: "text-red-500",
    pattern: /^https:\/\/(www\.)?youtube\.com\/.+/,
  },
  {
    name: "LinkedIn",
    icon: FaLinkedin,
    color: "text-blue-500",
    pattern: /^https:\/\/(www\.)?linkedin\.com\/.+/,
  },
];

const CustomLink = () => {
  const { setProfileLinks } = useDetails();
  const [links, setLinks] = useState([
    { id: uuidv4(), platform: "", url: "", error: "" },
  ]);
  const [isLoading, setIsLoading] = useState(false); // State for loading
  const [successMessage, setSuccessMessage] = useState(""); // State for success message

  // Add a new link card
  const addNewLink = () => {
    setLinks([...links, { id: uuidv4(), platform: "", url: "", error: "" }]);
  };

  // Remove a link card
  const removeLink = (id) => {
    setLinks(links.filter((link) => link.id !== id));
  };

  // Handle input changes
  const handleChange = (id, field, value) => {
    setLinks(
      links.map((link) =>
        link.id === id ? { ...link, [field]: value, error: "" } : link
      )
    );
  };

  // Validate and save links
  const handleSave = () => {
    const updatedLinks = links.map((link) => {
      if (!link.url.trim()) {
        return { ...link, error: "URL is required." };
      }

      const selectedPlatform = platforms.find((p) => p.name === link.platform);
      if (selectedPlatform && !selectedPlatform.pattern.test(link.url)) {
        return {
          ...link,
          error: `Invalid URL format for ${selectedPlatform.name}.`,
        };
      }

      return { ...link, error: "" };
    });

    const hasErrors = updatedLinks.some((link) => link.error);
    if (!hasErrors) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setSuccessMessage("Links saved successfully!");
        setProfileLinks(updatedLinks);

        // Clear success message after 3 seconds
        setTimeout(() => setSuccessMessage(""), 3000);
      }, 1500); // Simulate a save delay
    } else {
      setLinks(updatedLinks);
    }
  };

  // Reorder links
  const moveLink = (dragIndex, hoverIndex) => {
    const updatedLinks = [...links];
    const [movedLink] = updatedLinks.splice(dragIndex, 1);
    updatedLinks.splice(hoverIndex, 0, movedLink);
    setLinks(updatedLinks);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className=" min-h-screen  ">
        <div className="w-full   relative">
          <h1 className="text-2xl font-bold mb-2 text-gray-800">
            Customize your links
          </h1>
          <p className="text-gray-600 mb-4">
            Add/edit/remove links below and then share all your profiles with
            the world!
          </p>

          {/* Success Message */}
          {successMessage && (
            <div className="mb-4 p-2 text-green-700 bg-green-100 border border-green-500 rounded-md">
              {successMessage}
            </div>
          )}

          {/* Add New Link Button */}
          <button
            onClick={addNewLink}
            className="w-full px-4 py-2 mb-6 text-purple-600 border border-purple-600 rounded-md hover:bg-purple-50"
          >
            + Add new link
          </button>

          {/* Links Section */}
          {links.map((link, index) => (
            <DraggableLink
              key={link.id}
              index={index}
              link={link}
              platforms={platforms}
              moveLink={moveLink}
              handleChange={handleChange}
              removeLink={removeLink}
            />
          ))}

          {/* Save Button */}
          <div className="flex justify-end w-full">
            <button
              onClick={handleSave}
              className="w-auto px-4 py-2 mt-4 text-white bg-purple-600 rounded-md hover:bg-purple-700 flex items-center justify-cemter"
            >
              {isLoading ? (
                <div className="loader border-t-2 border-white rounded-full w-5 h-5 animate-spin mr-2"></div>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

// Draggable Link Component
const DraggableLink = ({
  index,
  link,
  platforms,
  moveLink,
  handleChange,
  removeLink,
}) => {
  const ref = React.useRef(null);

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

  const selectedPlatformData = platforms.find((p) => p.name === link.platform);
  drag(drop(ref)); // Connect drag and drop refs to the DOM node

  return (
    <div
      ref={ref}
      className={`mb-4 p-4 bg-gray-100 rounded-lg border border-gray-200 ${
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
      <div className="flex items-center bg-white border border-gray-300 rounded-md px-3 py-2">
        {selectedPlatformData ? (
          <selectedPlatformData.icon
            className={`${selectedPlatformData.color} text-lg mr-2`}
          />
        ) : (
          <span className="mr-2 text-gray-400">Select</span>
        )}
        <select
          value={link.platform}
          onChange={(e) => handleChange(link.id, "platform", e.target.value)}
          className="w-full outline-none bg-transparent"
        >
          <option value="" disabled>
            ...
          </option>
          {platforms.map((platform) => (
            <option key={platform.name} value={platform.name}>
              {platform.name}
            </option>
          ))}
        </select>
      </div>

      <label className="block mt-4 mb-2 text-sm font-medium text-gray-700">
        Link
      </label>
      <div className="flex flex-col">
        <div className="flex items-center px-3 py-2 bg-white border border-gray-300 rounded-md">
          <BiLink className="text-gray-500 text-lg mr-2" />
          <input
            type="text"
            value={link.url}
            onChange={(e) => handleChange(link.id, "url", e.target.value)}
            className="w-full outline-none"
            placeholder="https://www.example.com"
          />
        </div>
        {link.error && (
          <p className="text-red-500 text-sm mt-1">{link.error}</p>
        )}
      </div>
    </div>
  );
};

export default CustomLink;
