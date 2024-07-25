import { PermissionRequestEvent, useCall } from "@stream-io/video-react-sdk";
import { useCallback, useEffect, useState } from "react";

const PermissionRequestPanel = () => {
  const [permissionRequests, setPermissionRequests] = useState<PermissionRequestEvent[]>([]);
  const call = useCall();

  useEffect(() => {
    return call?.on("call.permission_request", event => {
      const request = event as PermissionRequestEvent;
      setPermissionRequests(reqs => [...reqs, request]);
    });
  }, [call]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handlePermissionRequest = useCallback(
    async (request: PermissionRequestEvent, accent: boolean) => {
      const { user, permissions } = request;
      try {
        if (accent) {
          await call?.grantPermissions(user.id, permissions);
        } else {
          await call?.revokePermissions(user.id, permissions);
        }
        setPermissionRequests(reqs => reqs.filter(req => req !== request));
      } catch (err) {
        alert("Error while revoking permissions");
      }
    },
    [call],
  );

  if (!permissionRequests.length) return;

  return (
    <div>
      <h4 className="text-center font-bold">Permission Request</h4>
      {permissionRequests.map(request => (
        <div className="flex items-center gap-4 m-4" key={request.user.id}>
          <span>
            {request.user.name} requested to {request.permissions.join(", ")}
          </span>
          <div className="flex gap-4">
            <button onClick={() => handlePermissionRequest(request, true)} className="btn btn-accent">
              Approve
            </button>
            <button onClick={() => handlePermissionRequest(request, false)} className="btn btn-error">
              Deny
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PermissionRequestPanel;
