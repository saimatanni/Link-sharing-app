// DetailsContext.js
import { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
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
    { id: uuidv4(), platform: "", url: "", error: "" },
   
    
    
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
        setProfileDetails,
        updateProfileDetails,
        links,
        setLinks,
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
