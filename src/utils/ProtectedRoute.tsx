import {  Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ category, title }: { category: string; title: string }) => {
  const token = localStorage.getItem('token');
  return token ? <Outlet context={{ category, title }} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;