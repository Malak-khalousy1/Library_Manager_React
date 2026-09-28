import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Books from "./pages/Books";
import Authors from "./pages/Authors";
import Borrowing from "./pages/Borrowing";

const App = () => {
  return (
    <div className="flex min-h-screen bg-[#F5F7FA]">
      <Navbar />
      <main className="min-w-0 flex-1">
        <Routes>
          <Route path="/books" element={<Books />} />

          <Route path="/authors" element={<Authors />} />

          <Route path="/borrowing" element={<Borrowing />} />

          <Route path="*" element={<Navigate to="/books" />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
