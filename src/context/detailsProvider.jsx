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
  const [profileLinks, setProfileLinks] = useState([
    {
      id: 1,
      platform: "",
      url: "",
      color: "",
    },
   
    
    {
      id: 2,
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
  const addLink = (newLink) => setProfileLinks([...profileLinks, newLink]);
  const updateLink = (updatedLink) => {
    setProfileLinks(
      profileLinks.map((link) => (link.id === updatedLink.id ? updatedLink : link))
    );
  };
  const removeLink = (linkId) => {
    setProfileLinks(profileLinks.filter((link) => link.id !== linkId));
  };

  return (
    <DetailsContext.Provider
      value={{
        profileDetails,
        setProfileDetails,
        updateProfileDetails,
        profileLinks,
        setProfileLinks,
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
