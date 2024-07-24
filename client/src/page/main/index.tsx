import { StreamVideo } from "@stream-io/video-react-sdk";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import CryptoJS from "crypto-js";

import { useUser } from "../../shared/UserContext/ui/user-context";

interface NewRoom {
  name: string;
  description: string;
}

const MainPage = () => {
  const { client, user, setCall, isLoadingClient } = useUser();
  const [newRoom, setNewRoom] = useState<NewRoom>({ name: "", description: "" });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();

  const hashRoomName = (roomName: string): string => {
    const hash = CryptoJS.SHA256(roomName).toString(CryptoJS.enc.Base64);
    return hash.replace(/[^A-Za-z0-9_-]/g, "");
  };

  const createRoom = async () => {
    const { name, description } = newRoom;

    if (!client || !name || !description || !user) return;

    const call = client.call("audio_room", hashRoomName(name));
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

  if (isLoadingClient) return <h1>Loading...</h1>;

  if ((!isLoadingClient && !user) || (!isLoadingClient && !client)) return <Navigate to="/sign-in" />;

  return (
    <StreamVideo client={client!}>
      <section className="text-xl">
        <h1>Welcome, {user?.name}</h1>
        <div onSubmit={createRoom} className="flex flex-col gap-3 text-center items-center pt-6">
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

          <button onClick={createRoom} className="btn btn-outline btn-primary">
            Create room
          </button>
        </div>
      </section>
    </StreamVideo>
  );
};

export default MainPage;
