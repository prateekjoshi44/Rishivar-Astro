import { useEffect } from "react";
import {
  useGetCallQuery,
  usePatchCallMutation,
} from "../../services/callSlice";
import Button from "../../components/form/Button";
import PageLoading from "../../components/PageLoading";
import { useNavigate, useParams } from "react-router";
import ApiErrorModal from "../../components/modal/ApiErrorModal";
import ReactCountdownClock from "react-countdown-clock";
import AudioCall from "../../webrtc/AudioCall";
import { MdCallEnd } from "react-icons/md";
import TimerV1 from "../../components/TimerV1";

const ActiveAudioCallPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const callRes = useGetCallQuery(id);
  const [patchCallStatus, patchCallStatusRes] = usePatchCallMutation();
  // const [audioOutputDevices, setAudioOutputDevices] = useState([]);
  // const [selectedAudioOutput, setSelectedAudioOutput] = useState("");
  // const remoteVideoRef = useRef();

  const handleCall = async (status) => {
    const res = await patchCallStatus({ id, status });
    if (res.data) navigate("/");
  };

  const handleTimerComplete = async () => {
    const res = await patchCallStatus({ id, status: "AstroRejected" });
    if (res.data) navigate("/");
  };

  useEffect(() => {
    callRes.refetch()
  }, [])


  // useEffect(() => {
  //   function startCapture() {
  //     window.audioinput.start({
  //       streamToWebAudio: true
  //     });

  //     // Connect the audioinput to the device speakers in order to hear the captured sound.
  //     window.audioinput.connect(window.audioinput.getAudioContext().destination);
  //   }

  //   // First check whether we already have permission to access the microphone.
  //   window.audioinput.checkMicrophonePermission(function (hasPermission) {
  //     if (hasPermission) {
  //       console.log("We already have permission to record.");
  //       startCapture();
  //     }
  //     else {
  //       // Ask the user for permission to access the microphone
  //       window.audioinput.getMicrophonePermission(function (hasPermission) {
  //         if (hasPermission) {
  //           console.log("User granted us permission to record.");
  //           startCapture();
  //         } else {
  //           console.warn("User denied permission to record.");
  //         }
  //       });
  //     }
  //   });
  // }, [])


  useEffect(() => {
    if (callRes.isLoading) return;

    if (callRes.isError) return <ApiErrorModal res={callRes} />;

    const call = callRes.data;

    if (call.status === "Completed" || call.status === "UserRejected") {
      navigate("/");
    }
  }, [callRes, navigate]);


  // useEffect(() => {
  //   navigator.mediaDevices.enumerateDevices().then((devices) => {
  //     const audioOutputs = devices.filter(
  //       (device) => device.kind === "audiooutput"
  //     );
  //     setAudioOutputDevices(audioOutputs);
  //     if (audioOutputs.length > 0) {
  //       setSelectedAudioOutput(audioOutputs[0].deviceId);
  //     }
  //   });
  // }, []);

  // const handleAudioOutputChange = (event) => {
  //   const deviceId = event.target.value;
  //   setSelectedAudioOutput(deviceId);
  //   if (remoteVideoRef.current && remoteVideoRef.current.setSinkId) {
  //     remoteVideoRef.current.setSinkId(deviceId).catch((error) => {
  //       console.error("Error setting audio output device", error);
  //     });
  //   } else {
  //     console.warn("Browser does not support audio output device selection.");
  //   }
  // };

  if (callRes.isLoading) return <PageLoading />;

  if (callRes.isError) return <ApiErrorModal res={callRes} />;

  const call = callRes.data;

  return (
    <>
      {patchCallStatusRes.isError && <ApiErrorModal res={patchCallStatusRes} />}

      {call.status === "Accepted" && (
        <div className="h-100 d-flex justify-content-center flex-column align-items-center">
          <h2>Waiting for {call?.user.name}...</h2>
          <ReactCountdownClock
            seconds={60}
            color="#000"
            alpha={0.9}
            size={300}
            onComplete={handleTimerComplete}
          />
        </div>
      )}

      {call.status === "Active" && (
        <div className="h-100 d-flex flex-column">
          <div
            className=" d-flex flex-column  mt-5 align-items-center p-3 "
            style={{ zIndex: 10, backgroundColor: "rgba(0, 0, 0, 0)" }}
          >
            {" "}
            <AudioCall />
            <TimerV1 endTime={call.timeout} />
            <div className="d-flex flex-column align-items-end my-3">
              {/* <label htmlFor="audioOutput"></label>
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
              </select> */}
            </div>
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

export default ActiveAudioCallPage;
