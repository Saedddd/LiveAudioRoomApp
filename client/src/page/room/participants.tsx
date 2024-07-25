import { ParticipantsAudio, useCallStateHooks } from "@stream-io/video-react-sdk";
import Participant from "./Participant";

const Participants = () => {
  const { useParticipants } = useCallStateHooks();
  const participants = useParticipants();

  return (
    <div className="flex items-center gap-4">
      <ParticipantsAudio participants={participants} />
      {participants.map(p => (
        <Participant participant={p} key={p.sessionId} />
      ))}
    </div>
  );
};

export default Participants;
