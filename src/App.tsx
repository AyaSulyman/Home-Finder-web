import React from "react";
import { Routes, Route } from "react-router-dom";

import BrowseProperties from "./browse-properties/BrowseProperties";
import PropertyDetails from "./property-details/PropertyDetails";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/browse-properties" element={<BrowseProperties />} />
      <Route path="/property/:id" element={<PropertyDetails />} />
    </Routes>
  );
};

export default App;