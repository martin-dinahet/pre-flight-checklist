import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";

import Index from "./pages/Index";
import EditChecklist from "./pages/EditChecklist";
import ViewChecklist from "./pages/ViewChecklist";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/edit" element={<EditChecklist />} />
      <Route path="/view" element={<ViewChecklist />} />
    </Routes>
  </BrowserRouter>
);
