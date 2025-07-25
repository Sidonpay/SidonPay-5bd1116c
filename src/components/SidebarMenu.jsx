import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import CurrentPage from '../contexts/CurrentPageContext'
import SidebarContext from '../contexts/SidebarContext'

const SidebarMenu = ({path, Icon, text}) => {

  const { page, setPage } = useContext(CurrentPage)
  const { open } = useContext(SidebarContext)

  const handleMenuClick = (value) => {
    setPage(value)
    console.log(`You are now on the ${page} page`)
  };
  return (
    <NavLink
      to={path}
      onClick={() => handleMenuClick(text)}
      className={({ isActive }) =>
        isActive
          ? `text-white bg-brand_color1 px-2 py-3 rounded-2xl duration-500 flex items-center ${
              open ? "" : "justify-center"
            }`
          : `text-brand_color1 px-2 py-3 rounded-2xl hover:transform hover:translate-x-2 duration-300 flex items-center gap-2 ${
              open ? "" : "justify-center"
            }`
      }
    >
      {Icon && <Icon size="20" />}
      <span className={`transition-transform duration-500 overflow-hidden { ${open ? "w-52 ml-2" : "w-0 ml-0"} }`}>{text}</span>
    </NavLink>
  );
}

SidebarMenu.propTypes = {
  path: PropTypes.string,
  Icon: PropTypes.string,
  text: PropTypes.string.isRequired
}

export default SidebarMenu
