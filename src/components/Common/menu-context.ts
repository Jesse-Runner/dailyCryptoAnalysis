import React from 'react';

export const MenuContext = React.createContext({
    selectedMenu: 'Dashboard',
    updateMenu: (menuItem: string) => {},
  });

  export const MenuContextProvider = MenuContext.Provider
