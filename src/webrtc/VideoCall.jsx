import { useEffect, useRef } from "react";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
import Api from "../constants/Api";
import { useSelector } from "react-redux";

const VideoCall = ({ remoteVideoRef }) => {
  const userType = "Astro";
  const token = useSelector((state) => state.auth.authToken);
  const { id: callId } = useParams();

  const remoteStreamRef = useRef(null);
  const localStreamRef = useRef(null);
  const localVideoRef = useRef();
  const socket = useRef(null);
  const peerConnection = useRef(null);

  const servers = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  };

  useEffect(() => {
    socket.current = io(Api.RISHIVAR_BACKEND_URL, {
      auth: { token, type: userType, callId },
    });

    socket.current.on("connect", async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        localStreamRef.current = stream;
        localVideoRef.current.srcObject = stream;

        peerConnection.current = new RTCPeerConnection(servers);
        peerConnection.current.onicecandidate = handleICECandidateEvent;
        peerConnection.current.ontrack = handleTrackEvent;

        stream
          .getTracks()
          .forEach((track) => peerConnection.current.addTrack(track, stream));

        const offer = await peerConnection.current.createOffer();
        await peerConnection.current.setLocalDescription(offer);
        socket.current.emit("call-user", { callId, offer });
      } catch (error) {
        console.error("Error accessing media devices.", error);
      }
    });

    socket.current.on("receive-offer", async (data) => {
      await peerConnection.current.setRemoteDescription(
        new RTCSessionDescription(data.offer)
      );
      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);
      socket.current.emit("answer-call", { callId, answer });
    });

    socket.current.on("call-answered", async (data) => {
      await peerConnection.current.setRemoteDescription(
        new RTCSessionDescription(data.answer)
      );
    });

    socket.current.on("ice-candidate", async (data) => {
      if (data.candidate) {
        try {
          await peerConnection.current.addIceCandidate(
            new RTCIceCandidate(data.candidate)
          );
        } catch (e) {
          console.error("Error adding received ice candidate", e);
        }
      }
    });

    return () => {
      if (peerConnection.current) {
        peerConnection.current.onicecandidate = null;
        peerConnection.current.ontrack = null;
        peerConnection.current.close();
        peerConnection.current = null;
      }

      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => track.stop());
      }

      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [callId, token, userType]);

  const handleICECandidateEvent = (event) => {
    if (event.candidate) {
      socket.current.emit("ice-candidate", {
        callId,
        candidate: event.candidate,
      });
    }
  };

  const handleTrackEvent = (event) => {
    remoteStreamRef.current = event.streams[0];
    remoteVideoRef.current.srcObject = event.streams[0];
  };

  return (
    <div className="position-relative w-100 h-100 z-12 shadow-lg">
      <div
        className="position-absolute top-0 end-0 m-3 rounded-4 overflow-hidden"
        style={{ width: "150px", height: "200px" }}
      >
        <video
          ref={localVideoRef}
          autoPlay
          muted
          className="w-100 h-100"
          style={{ objectFit: "cover" }}
        ></video>
      </div>
      <div className="w-100 h-100 z-0">
        <video
          ref={remoteVideoRef}
          autoPlay
          className="w-100 h-100"
          style={{ objectFit: "cover" }}
        ></video>
      </div>
    </div>
  );
};

export default VideoCall;
