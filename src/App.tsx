import React from "react";

import { Routes, Route } from "react-router-dom";

import Login from "./auth/Login";
import Signup from "./auth/Signup";

import BrowseProperties from "./browse-properties/BrowseProperties";
import PropertyDetails from "./property-details/PropertyDetails";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/browse-properties" element={<BrowseProperties />} />
      <Route path="/property/:id" element={<PropertyDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default App;