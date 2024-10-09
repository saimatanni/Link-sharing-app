// DetailsContext.js
import { createContext, useContext, useState } from "react";

// Create the context
const DetailsContext = createContext();

// Create a provider component
export const DetailsProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState("links");
  // State for profile details
  const [profileDetails, setProfileDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profileImage: null, // Replace with the actual path or URL
  });

  // State for links
  const [links, setLinks] = useState([
    {
      id: 1,
      platform: "GitHub",
      url: "https://github.com/benwright",
      color: "black",
    },
    {
      id: 2,
      platform: "YouTube",
      url: "https://youtube.com/benwright",
      color: "red",
    },
    {
      id: 4,
      platform: "GitHub",
      url: "https://github.com/benwright",
      color: "blue",
    },
    // {
    //   id: 5,
    //   platform: "YouTube",
    //   url: "https://youtube.com/benwright",
    //   color: "green",
    // },
    // {
    //   id: 6,
    //   platform: "YouTube",
    //   url: "https://youtube.com/benwright",
    //   color: "red",
    // },
    // {
    //   id: 7,
    //   platform: "GitHub",
    //   url: "https://github.com/benwright",
    //   color: "blue",
    // },
    // {
    //   id: 8,
    //   platform: "YouTube",
    //   url: "https://youtube.com/benwright",
    //   color: "green",
    // },
    {
      id: 3,
      platform: "",
      url: "",
      color: "",
    },
  ]);

  // Function to update profile details
  const updateProfileDetails = (newDetails) => {
    setProfileDetails((prevDetails) => ({ ...prevDetails, ...newDetails }));
  };

  // Function to add, update, or remove a link
  const addLink = (newLink) => setLinks([...links, newLink]);
  const updateLink = (updatedLink) => {
    setLinks(
      links.map((link) => (link.id === updatedLink.id ? updatedLink : link))
    );
  };
  const removeLink = (linkId) => {
    setLinks(links.filter((link) => link.id !== linkId));
  };

  return (
    <DetailsContext.Provider
      value={{
        profileDetails,
        updateProfileDetails,
        links,
        addLink,
        updateLink,
        removeLink,
        activeTab,
        setActiveTab,
      }}
    >
      {children}
    </DetailsContext.Provider>
  );
};

// Custom hook to use the DetailsContext
export const useDetails = () => useContext(DetailsContext);
