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



  return (
    <DetailsContext.Provider
      value={{
        profileDetails,
        setProfileDetails,
        links,
        setLinks,
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
