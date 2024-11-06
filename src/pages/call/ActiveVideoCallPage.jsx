import { useEffect, useRef } from "react";
import {
  useGetCallQuery,
  usePatchCallMutation,
} from "../../services/callSlice";
import Button from "../../components/form/Button";
import PageLoading from "../../components/PageLoading";
import { useNavigate, useParams } from "react-router-dom";
import ApiErrorModal from "../../components/modal/ApiErrorModal";
import VideoCall from "../../webrtc/VideoCall";
import ReactCountdownClock from "react-countdown-clock"; // Ensure this is the correct import path and spelling
import TimerV1 from "../../components/TimerV1";
import { MdCallEnd } from "react-icons/md";

const ActiveVideoCallPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const callRes = useGetCallQuery(id);
  const [patchCallStatus, patchCallStatusRes] = usePatchCallMutation();
  const remoteVideoRef = useRef();




  useEffect(() => {
    callRes.refetch()
  }, [])

  useEffect(() => {
    if (window.cordova) window.StatusBar.hide()
    return () => {
      if (window.cordova) window.StatusBar.show()
    }
  }, [])



  useEffect(() => {
    if (callRes.data && (callRes.data.status === "Completed" || call.status === "UserRejected")) {
      navigate("/");
    }
  }, [callRes.data?.status]);

  const handleCall = async (status) => {
    const res = await patchCallStatus({ id, status });
    if (res.data) navigate("/");
  };


  if (callRes.isLoading) return <PageLoading />;
  if (callRes.isError) return <ApiErrorModal res={callRes} />;

  const call = callRes.data;

  if (call.status === "Completed") {
    navigate("/");
    return null;
  }



  return (
    <>
      {patchCallStatusRes.isError && <ApiErrorModal res={patchCallStatusRes} />}
      <div></div>
      {call.status === "Accepted" && (
        <div className="h-100 d-flex justify-content-center flex-column align-items-center">
          <h2>Waiting for {call?.user.name}...</h2>
          <ReactCountdownClock
            seconds={60}
            color="#000"
            alpha={0.9}
            size={300}
            onComplete={() => handleCall("AstroRejected")}
          />
        </div>
      )}

      {call.status === "Active" && (
        <div className="position-relative w-100 h-100 overflow-hidden">
          <div className="">
            <div
              className="position-absolute top-0 px-3 py-4"
              style={{ zIndex: 10, backgroundColor: "rgba(0, 0, 0, 0)" }}
            >
              <TimerV1 endTime={call.timeout} />

              {/* <div className="d-flex flex-column align-items-end me-5">
                <label htmlFor="audioOutput"></label>
                <select
                  id="audioOutput"
                  value={selectedAudioOutput}
                  onChange={handleAudioOutputChange}
                  className="form-select"
                >
                  {audioOutputDevices.map((device) => (
                    <option key={device.deviceId} value={device.deviceId}>
                      {device.label || `Speaker ${device.deviceId}`}
                    </option>
                  ))}
                </select>
              </div> */}
            </div>
          </div>

          <VideoCall remoteVideoRef={remoteVideoRef} />
          <div
            className="position-absolute bottom-0 w-100 text-center pb-5"
            style={{ zIndex: 10, backgroundColor: "rgba(0, 0, 0, 0)" }}
          >
            <div className="mx-5 mt-3">
              <Button
                className={
                  "py-2 rounded-circle bg-danger text-white shadow-lg "
                }
                type="button"
                res={patchCallStatusRes}
                data-bs-dismiss="modal"
                onClick={() => handleCall("Completed")}
                color={"white"}
                icon
              >
                <MdCallEnd
                  style={{
                    fontSize: 30,
                    marginLeft: 10,
                    marginRight: 10,
                    marginBottom: 13,
                    marginTop: 13,
                  }}
                />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ActiveVideoCallPage;
