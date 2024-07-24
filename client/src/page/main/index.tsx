import { Call, StreamVideo } from "@stream-io/video-react-sdk";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CryptoJS from "crypto-js";

import { useUser } from "../../shared/UserContext/ui/user-context";

interface NewRoom {
  name: string;
  description: string;
}

interface Room {
  id: string;
  title: string;
  description: string;
  participantsLength: number;
  createBy: string;
}

type CustomCallData = {
  title?: string;
  description?: string;
};

const MainPage = () => {
  const { client, user, setCall, isLoadingClient } = useUser();
  const [newRoom, setNewRoom] = useState<NewRoom>({ name: "", description: "" });
  const [availableRooms, setavailableRooms] = useState<Room[]>([]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();

  useEffect(() => {
    if (client) fetchListOfCalls();
  }, [client]);

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

  const fetchListOfCalls = async () => {
    const callsQueryResponse = await client?.queryCalls({
      filter_conditions: { ongoing: true },
      limit: 4,
      watch: true,
    });

    if (!callsQueryResponse) {
      alert("No calls");
    } else {
      const getCallInfo = async (call: Call): Promise<Room> => {
        const callInfo = await call.get();
        const customData = callInfo.call.custom;
        const { title, description } = (customData || {}) as CustomCallData;
        const participantsLength = callInfo.members.length ?? 0;
        const createBy = callInfo.call.created_by.name ?? "";
        const id = callInfo.call.id ?? "";

        return {
          id,
          title: title ?? "",
          description: description ?? "",
          participantsLength,
          createBy,
        };
      };

      const roomPromises = await callsQueryResponse.calls.map(call => getCallInfo(call));

      const rooms = await Promise.all(roomPromises);
      setavailableRooms(rooms);
    }
  };

  const joinCall = async (callID: string) => {
    const call = client?.call("audio_room", callID);
    try {
      await call?.join();
      setCall(call);
      navigate("/room");
    } catch (err) {
      alert("Error while joining call");
    }
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

          {availableRooms.length !== 0 ? (
            <>
              <h2>Available Rooms</h2>
              <div className="">
                {availableRooms.map(room => (
                  <div
                    className="card bg-primary text-primary-content w-72 text-left"
                    onClick={() => joinCall(room.id)}
                    key={room.id}
                  >
                    <div className="card-body">
                      <h1 className="card-title">{room.title}</h1>
                      <h2>{room.description}</h2>
                      <p>Participants: {room.participantsLength}</p>
                      <p>Created By {room.createBy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <h2>No available rooms at the moment</h2>
          )}
        </div>
      </section>
    </StreamVideo>
  );
};

export default MainPage;
