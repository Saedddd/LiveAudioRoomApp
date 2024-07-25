import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";

const LiveButton = () => {
  const { useIsCallLive } = useCallStateHooks();
  const call = useCall();
  const isLive = useIsCallLive();
  return (
    <button
      onClick={async () => {
        if (isLive) {
          call?.stopLive();
        } else {
          call?.goLive();
        }
      }}
      className={`btn btn-outline ${isLive ? "btn-accent" : "btn-primary"} `}
    >
      {isLive ? "Stop Live" : "Go Live"}
    </button>
  );
};

export default LiveButton;
