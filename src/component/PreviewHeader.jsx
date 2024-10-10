import { useState } from "react";
import { Link } from "react-router-dom";

const PreviewHeader = () => {
  const [copySuccess, setCopySuccess] = useState("");

  const handleCopyLink = () => {
    const linkToCopy = window.location.href;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(linkToCopy)
        .then(() => {
          setCopySuccess("Link copied to clipboard!");
          setTimeout(() => setCopySuccess(""), 2000); // Clear message after 2 seconds
        })
        .catch((err) => {
          setCopySuccess("Failed to copy link.");
          console.error("Could not copy text: ", err);
        });
    } else {
      setCopySuccess("Clipboard API not supported.");
      console.error("Clipboard API not supported in this browser.");
      setTimeout(() => setCopySuccess(""), 2000); // Clear message after 2 seconds
    }
  };

  return (
    <div className="relative w-full p-4 bg-[#633bfe] rounded-b-[30px] h-80">
      {/* White Header */}
      <header className="flex justify-between px-4 py-3 font-medium text-[#633bfe] transition bg-white border rounded-md">
        <Link to="/">
          <button className="px-4 py-2 font-medium text-[#633bfe] transition bg-white border border-[#633bfe] rounded-lg hover:bg-[#633bfe] hover:text-white">
            Back to Editor
          </button>
        </Link>

        <div className="relative inline-block">
          <button
            onClick={handleCopyLink}
            className="px-4 py-2 font-medium text-white transition bg-[#633bfe] border border-[#633bfe] rounded-lg hover:bg-white hover:text-[#633bfe]"
          >
          {copySuccess ? "Copied!" : "Share Link"}
          </button>

          
        </div>
      </header>
    </div>
  );
};

export default PreviewHeader;
