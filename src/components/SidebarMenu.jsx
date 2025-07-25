import PropTypes from "prop-types";
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import CurrentPage from "../contexts/CurrentPageContext.jsx";
import SidebarContext from "../contexts/SidebarContext";

const SidebarMenu = ({ path, Icon, text }) => {
  const { setPage } = useContext(CurrentPage);
  const { open } = useContext(SidebarContext);

  const handleMenuClick = (value) => {
    setPage(value);
  };
  return (
    <NavLink
      to={path}
      onClick={() => handleMenuClick(text)}
      className={({ isActive }) =>
        isActive
          ? `flex items-center text-white bg-brand_color1 px-3 py-3 rounded-2xl duration-300 ease-linear  ${
              open ? "" : "mx-auto w-12 h-12 justify-center"
            }`
          : `flex items-center text-brand_color1 px-2 py-3 rounded-xl hover:transform hover:translate-x-2 duration-300 ease-linear gap-2 ${
              open ? "" : "mx-auto w-12 h-12 justify-center"
            }`
      }
    >
      {Icon && <Icon size="20" />}
      <span
        className={`transition-all duration-300 ease-linear overflow-hidden { ${
          open ? "w-38 md:44 ml-2" : "w-0 ml-0"
        } }`}
      >
        {text}
      </span>
    </NavLink>
  );
};

SidebarMenu.propTypes = {
  path: PropTypes.string,
  Icon: PropTypes.string,
  text: PropTypes.string.isRequired,
};

export default SidebarMenu;
