import "./App.css";
import { Routes, Route } from "react-router-dom";
import React, { Suspense, lazy } from "react";

// Lazy-load the components
const Body = lazy(() => import("./pages/Body"));
const PreviewLinks = lazy(() => import("./pages/PreviewLinks"));

function App() {
  return (
    <div>
      <Suspense fallback={<div className="flex justify-center items-center text-indigo-500 h-screen">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/preview" element={<PreviewLinks />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
