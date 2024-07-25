import LiveButton from "./live-button";
import MicButton from "./mic-button";

const Controls = () => {
  return (
    <div className="flex gap-4">
      <MicButton />
      <LiveButton />
    </div>
  );
};

export default Controls;
