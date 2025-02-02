import { BrowserRouter, Route, Routes } from "react-router";
import LinkShortener from "./app/link-shortening";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LinkShortener />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
