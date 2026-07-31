import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Home from "./Home";
import InventoryEdit from "./InventoryEdit";
import InventoryList from "./InventoryList";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inventories" element={<InventoryList />} />
        <Route path="/inventories/:id" element={<InventoryEdit />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
