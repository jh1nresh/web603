import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import BookEdit from "./BookEdit";
import BookList from "./BookList";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/books/:id" element={<BookEdit />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
