import React from "react";
import { Routes, Route } from "react-router-dom";

import BrowseProperties from "./browse-properties/BrowseProperties";
import PropertyDetails from "./property-details/PropertyDetails";
import SellerDashboard, {
  AddListingPage,
  BuyerDashboard,
} from "./seller-dashboard/SellerDashboard";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import AdminDashboard from "./admin-dashboard/AdminDashboard";
import FavoritesPage from "./favorites/FavoritesPage";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<SellerDashboard />} />
      <Route path="/seller-dashboard" element={<SellerDashboard />} />
      <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
      <Route path="/add-listing" element={<AddListingPage />} />
      <Route path="/browse-properties" element={<BrowseProperties />} />
      <Route path="/property-details" element={<PropertyDetails />} />
      <Route path="/property/:id" element={<PropertyDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/favorites" element={<FavoritesPage />} />
    </Routes>
  );
};

export default App;
