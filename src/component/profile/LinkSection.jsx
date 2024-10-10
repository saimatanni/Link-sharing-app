import { useDetails } from "../../context/detailsProvider";
import { BsGithub, BsYoutube, BsLinkedin, BsTwitter } from "react-icons/bs";

const platformIcons = {
  GitHub: BsGithub,
  YouTube: BsYoutube,
  LinkedIn: BsLinkedin,
  Twitter: BsTwitter,
};

const LinksSection = () => {
  const { links } = useDetails();
  const displayLinks = [...links, ...Array(Math.max(3 - links.length, 0)).fill({})];

  return (
    <div className="w-full space-y-3 sm:space-y-4">
      {displayLinks.map((link, index) => {
        const hasContent = link.platform && link.url;
        const Icon = platformIcons[link.platform] || null;

        return hasContent ? (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-between w-full px-3 sm:px-4 py-2 sm:py-3 text-white rounded-lg ${
              link.platform === "GitHub"
                ? "bg-black"
                : link.platform === "YouTube"
                ? "bg-red-500"
                : link.platform === "LinkedIn"
                ? "bg-blue-500"
                : link.platform === "Twitter"
                ? "bg-blue-400"
                : "bg-gray-200 text-gray-300"
            }`}
          >
            <div className="flex items-center gap-2">
              {Icon && <Icon className="text-lg sm:text-xl" />}
              <span className="text-sm sm:text-base">{link.platform}</span>
            </div>
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        ) : (
          <div
            key={index}
            className="flex items-center justify-between w-full px-3 py-2 bg-gray-200 rounded-lg sm:px-4 sm:py-3 animate-pulse"
          >
            <div className="flex items-center gap-2 text-gray-300">
              <div className="w-5 h-5 bg-gray-300 rounded-full sm:w-6 sm:h-6"></div>
              <div className="w-16 h-3 bg-gray-300 rounded-md sm:w-20 sm:h-4"></div>
            </div>
            <div className="w-3 h-3 bg-gray-300 rounded-full sm:w-4 sm:h-4"></div>
          </div>
        );
      })}
    </div>
  );
};

export default LinksSection;
