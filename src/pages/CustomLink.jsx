import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDetails } from "../context/detailsProvider";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import DraggableLink from "../component/links/DraggableLink";
import { platforms } from "../utils/data";

// Check if the device is touch-enabled
const isTouchDevice = () => {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
};

const CustomLink = () => {
  const { setLinks, links } = useDetails();

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const addNewLink = () => {
    setLinks([...links, { id: uuidv4(), platform: "", url: "", error: "" }]);
  };

  const removeLink = (id) => {
    setLinks(links.filter((link) => link.id !== id));
  };

  const handleChange = (id, field, value) => {
    setLinks(
      links.map((link) =>
        link.id === id ? { ...link, [field]: value, error: "" } : link
      )
    );
  };

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

        setTimeout(() => setSuccessMessage(""), 3000);
      }, 1500);
    } else {
      setLinks(updatedLinks);
    }
  };

  const moveLink = (dragIndex, hoverIndex) => {
    const updatedLinks = [...links];
    const [movedLink] = updatedLinks.splice(dragIndex, 1);
    updatedLinks.splice(hoverIndex, 0, movedLink);
    setLinks(updatedLinks);
  };

  return (
    <DndProvider backend={isTouchDevice() ? TouchBackend : HTML5Backend}>
      <div className="relative w-full cursor-move min-h-[80vh] ">
        <h1 className="mt-4 mb-3 text-2xl font-bold text-gray-800">
          Customize your links
        </h1>
        <p className="mb-8 text-gray-600">
          Add/edit/remove links below and then share all your profiles with the
          world!
        </p>

        <button
          onClick={addNewLink}
          className="w-full px-4 py-2 mb-6 text-[#633bfe] border border-[#633bfe] rounded-md hover:bg-[#efecff]"
        >
          + Add new link
        </button>

        {/* Links Section with Scrollable Container */}
        <div className="max-h-[60vh]  pr-2 min-h-full custom-scrollbar overflow-y-auto mb-4">
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
          <div className="flex justify-end w-full mb-4">
            <button
              onClick={handleSave}
              className="flex items-center w-auto px-4 py-2 text-white bg-[#633bfe] rounded-md hover:opacity-90"
            >
              {isLoading ? (
                <div className="w-5 h-5 mr-2 border-t-2 border-white rounded-full animate-spin"></div>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </div>

        {successMessage && (
          <div className="fixed px-4 py-2 text-sm text-white transform -translate-x-1/2 bg-black rounded-lg shadow-lg bottom-4 left-1/2">
            {successMessage}
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default CustomLink;
