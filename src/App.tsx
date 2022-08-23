import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppShell } from "./components/AppShell";
import Home from "./pages/Home";

export default function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/about" element={<h1>About</h1>} /> */}
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}
