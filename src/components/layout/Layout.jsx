import React from 'react';
import NavBar from '../navbar/NavBar';
import AppRoutes from '../../AppRoutes';

const Layout = () => {
  return (
    <div className="md:px-16">
      <NavBar />
      <AppRoutes />
    </div>
  );
};

export default Layout;
