import { StreamVideo } from "@stream-io/video-react-sdk";
import { useUser } from "../../shared/UserContext/ui/user-context";
import { Navigate } from "react-router-dom";

const MainPage = () => {
  const { client } = useUser();

  if (!client) return <Navigate to="/sign-in" />;

  return (
    <StreamVideo client={client}>
      <div className="">MainPage</div>
    </StreamVideo>
  );
};

export default MainPage;
