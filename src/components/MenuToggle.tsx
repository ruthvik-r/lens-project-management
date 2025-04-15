import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

interface MenuToggleProps {
  isOpen: boolean;
  onToggle: () => void;
}

const MenuToggle: React.FC<MenuToggleProps> = ({ isOpen, onToggle }) => {
  return (
    <button className="menu-toggle" onClick={onToggle}>
      {isOpen ? <CloseIcon /> : <MenuIcon />}
    </button>
  );
};

export default MenuToggle; 