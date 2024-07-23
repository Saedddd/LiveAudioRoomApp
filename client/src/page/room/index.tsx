import { useCallStateHooks } from "@stream-io/video-react-sdk";

const Room = () => {
  const { useCallCustomData, useParticipants, useCallCreatedBy } = useCallStateHooks();

  const custom = useCallCustomData();
  const createdBy = useCallCreatedBy();
  const participants = useParticipants();

  return (
    <section>
      <h1>{custom?.title ?? "TITLE"} H2</h1>
      <h2>{custom?.description ?? "Description"} H3</h2>
      <p>{participants.length} participants</p>
    </section>
  );
};

export default Room;
