import {
  FaTwitter,
  
  FaGithub,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";

const pattern = new RegExp(
  "^(https?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
    "(\\#[-a-z\\d_]*)?$",
  "i"
);

export const platforms = [
  {
    name: "GitHub",
    icon: FaGithub,
    color: "text-black",
    pattern: pattern,
  },
  {
    name: "YouTube",
    icon: FaYoutube,
    color: "text-red-500",
    pattern: pattern,
  },
  {
    name: "LinkedIn",
    icon: FaLinkedin,
    color: "text-blue-500",
    pattern: pattern,
  },
  {
    name: "Twitter",
    icon: FaTwitter,
    color: "text-blue-400",
    pattern: pattern,
  },

 
];
