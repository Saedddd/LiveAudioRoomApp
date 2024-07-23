import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import MainPage from "../page/main";
import Room from "../page/room";
import SignIn from "../page/sign-in";
import { StreamCall } from "@stream-io/video-react-sdk";
import { useUser } from "../shared/UserContext/ui/user-context";

function App() {
  const { call } = useUser();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route
          path="/room"
          element={
            call ? (
              <StreamCall call={call}>
                <Room />
              </StreamCall>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;
