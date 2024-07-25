import { useCallStateHooks } from "@stream-io/video-react-sdk";

const LiveButton = () => {
  const { useIsCallLive } = useCallStateHooks();
  const isLive = useIsCallLive();
  return <button className="btn btn-outline btn-primary">{isLive ? "Stop Live" : "Go Live"}</button>;
};

export default LiveButton;
