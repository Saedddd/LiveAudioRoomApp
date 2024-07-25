import { Avatar, StreamVideoParticipant } from "@stream-io/video-react-sdk";

interface Props {
  participant: StreamVideoParticipant;
}

const Participant = (props: Props) => {
  return (
    <div className="text-center">
      <Avatar
        imageSrc={props.participant.image}
        className={`w-[60px] h-[60px] ${props.participant.isSpeaking ? "shadow-xl shadow-lime-500" : ""}`}
      />
      <p>{props.participant.name}</p>
    </div>
  );
};

export default Participant;
