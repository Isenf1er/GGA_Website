import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
  {
    title: "Home",
    path: "/home",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Add New Device",
    path: "/add-new-device",
    icon: <IoIcons.IoIosAddCircle />,
    cName: "nav-text",
  },
  {
    title: "Delete Device",
    path: "/delete-device",
    icon: <IoIcons.IoMdRemoveCircle />,
    cName: "nav-text",
  },
  {
    title: "Settings",
    path: "/settings",
    icon: <FaIcons.FaCog />,
    cName: "nav-text",
  },
  {
    title: "About",
    path: "/about",
    icon: <FaIcons.FaInfoCircle />,
    cName: "nav-text",
  },
];
