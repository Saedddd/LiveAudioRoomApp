import { OwnCapability, useCallStateHooks, useRequestPermission } from "@stream-io/video-react-sdk";
import Controls from "./controls";
import { useUser } from "../../shared/UserContext/ui/user-context";
import PermissionRequestPanel from "./permission-request";

const Room = () => {
  const { useCallCustomData, useParticipants, useCallCreatedBy } = useCallStateHooks();
  const { user } = useUser();

  const custom = useCallCustomData();
  const createdBy = useCallCreatedBy();
  const participants = useParticipants();

  const { hasPermission, requestPermission } = useRequestPermission(OwnCapability.SEND_AUDIO);

  return (
    <section className="flex flex-col items-center gap-3">
      <h1>{custom?.title ?? "TITLE"} H2</h1>
      <h2>{custom?.description ?? "Description"} H3</h2>
      <p>{participants.length} participants</p>
      {user?.username === createdBy?.id && <PermissionRequestPanel />}
      {hasPermission ? (
        <Controls />
      ) : (
        <button onClick={requestPermission} className="btn-ghost">
          &#9995;
        </button>
      )}
    </section>
  );
};

export default Room;
