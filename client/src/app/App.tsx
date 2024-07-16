import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainPage from "../page/main";
import Room from "../page/room";
import SignIn from "../page/sign-in";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/room" element={<Room />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;
