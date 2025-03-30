import React, { useState } from "react";
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Login as LoginIcon,
  CloudUpload as UploadIcon,
  FilterList as FilterIcon,
  ExpandMore,
  ExpandLess,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "./sidebar.css";

const Sidebar = ({
  onFileChange,
  filterMRN,
  onMRNFilterChange,
  filterMCID,
  onMCIDFilterChange,
  filterLastName,
  onLastNameFilterChange,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");

  // Local state for Message Control ID and Last Name textfields
  const [localMCID, setLocalMCID] = useState(filterMCID || "");
  const [localLastName, setLocalLastName] = useState(filterLastName || "");

  const navigate = useNavigate();

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    if (tabName !== "Filter") {
      setIsFilterOpen(false);
    }
    // Navigate to different pages
    switch (tabName) {
      case "Home":
        navigate("/");
        break;
      case "Login2":
        navigate("/Login2");
        break;
      default:
        break;
    }
  };

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <button className="tab-btn" onClick={() => setIsCollapsed(!isCollapsed)}>
          <MenuIcon />
          {!isCollapsed && <span>Toggle</span>}
        </button>
      </div>

      <button
        className={`tab-btn ${activeTab === "Home" ? "active" : ""}`}
        onClick={() => handleTabClick("Home")}
      >
        <HomeIcon />
        {!isCollapsed && <span>Home</span>}
      </button>

      <div>
        <button
          className={`tab-btn ${activeTab === "Upload" ? "active" : ""}`}
          onClick={() => handleTabClick("Upload")}
        >
          <UploadIcon />
          {!isCollapsed && <span>Upload</span>}
        </button>

        {!isCollapsed && activeTab === "Upload" && (
          <div className="file-upload-inline">
            <label htmlFor="hl7-file-upload">Upload HL7 File:</label>
            <input
              type="file"
              id="hl7-file-upload"
              accept=".hl7,.txt"
              onChange={onFileChange}
            />
          </div>
        )}
      </div>

      <button
        className={`tab-btn ${activeTab === "Filter" ? "active" : ""}`}
        onClick={() => {
          handleTabClick("Filter");
          setIsFilterOpen((prev) => !prev);
        }}
      >
        <FilterIcon />
        {!isCollapsed && (
          <>
            <span>Filter</span>
            {isFilterOpen ? <ExpandLess /> : <ExpandMore />}
          </>
        )}
      </button>

      {!isCollapsed && isFilterOpen && (
        <div className="filter-submenu">
          {/* Message Control ID Textfield */}
          <input
            type="text"
            className="submenu-input"
            placeholder="Message Control ID"
            value={localMCID}
            onChange={(e) => setLocalMCID(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onMCIDFilterChange(localMCID);
              }
            }}
          />
          {/* MRN Textfield (unchanged) */}
          <input
            type="text"
            className="submenu-input"
            placeholder="MRN"
            value={filterMRN}
            onChange={(e) => onMRNFilterChange(e.target.value)}
          />
          {/* Last Name Textfield */}
          <input
            type="text"
            className="submenu-input"
            placeholder="Last Name"
            value={localLastName}
            onChange={(e) => setLocalLastName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onLastNameFilterChange(localLastName);
              }
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
