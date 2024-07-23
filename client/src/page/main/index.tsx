import { StreamVideo } from "@stream-io/video-react-sdk";
import { useUser } from "../../shared/UserContext/ui/user-context";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";

interface NewRoom {
  name: string;
  description: string;
}

const MainPage = () => {
  const { client, user, setCall } = useUser();
  const [newRoom, setNewRoom] = useState<NewRoom>({ name: "", description: "" });

  if (!client) return <Navigate to="/sign-in" />;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();

  const createRoom = async () => {
    const { name, description } = newRoom;

    if (!client || !name || !description || !user) return;

    const call = client.call("audio_room", name);
    await call.join({
      create: true,
      data: {
        members: [{ user_id: user.username }],
        custom: {
          title: name,
          description,
        },
      },
    });
    setCall(call);
    navigate("/room");
  };

  return (
    <StreamVideo client={client}>
      <section className="text-xl">
        <h1>Welcome, {user?.name}</h1>
        <form onSubmit={createRoom} className="flex flex-col gap-3 text-center items-center pt-6">
          <h2>Create Your Own Room</h2>
          <input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewRoom(prev => ({ ...prev, name: e.target.value }))
            }
            type="text"
            placeholder="Room Name..."
            className="input input-bordered input-primary w-full max-w-xs"
          />
          <input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewRoom(prev => ({ ...prev, description: e.target.value }))
            }
            type="text"
            placeholder="Room Description..."
            className="input input-bordered input-primary w-full max-w-xs"
          />

          <button type="submit" className="btn btn-outline btn-primary">
            Sign in
          </button>
        </form>
      </section>
    </StreamVideo>
  );
};

export default MainPage;
