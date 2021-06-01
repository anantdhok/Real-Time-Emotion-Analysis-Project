import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Peer from "simple-peer";
import io from "socket.io-client";
import "./Dashboard.css";

const socket = io.connect("http://localhost:8000");
const Dashboard = (props) => {
  const [me, setMe] = useState("");
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  let change = React.createRef();
  const handleChange = () => {
    setIdToCall(change.current.value);
  };

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      setStream(stream);
      myVideo.current.srcObject = stream;
    });
    socket.on("me", (id) => {
      setMe(id);
    });
    socket.on("callUser", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });
  }, []);

  const callUser = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name: name,
      });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });
    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });
    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: caller });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });
    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
  };

  return (
    <>
      <div className="dashboard container">
        {!callAccepted ? (
          <div className="dashboard-content">
            <h3>WebRTC Conference</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. consectetur tincidunt ipsum.</p>
            <div className="input-field">
              <input
                type="text"
                value={idToCall}
                onChange={handleChange}
                ref={change}
                required
                autoFocus
                title="Call ID should only contain letters or numbers."
              />
              <label htmlFor="room">Please Enter phone to make a call </label>
            </div>

            <div className="input-options">
              <button
                type="button"
                className="button-dark"
                onClick={() => {
                  callUser(idToCall);
                }}
              >
                Connect
              </button>
              <CopyToClipboard
                style={{ marginLeft: "40px", fontSize: "12px", cursor: "pointer", color: "gray" }}
                text={me}
              >
                <div>Click to copy your ID - {me}</div>
              </CopyToClipboard>
            </div>
          </div>
        ) : null}

        <div className="dashboard-media">
          <div className="video">
            {stream && <video className={`local-stream-${callAccepted}`} playsInline muted ref={myVideo} autoPlay />}
          </div>
          <div className="video">
            {callAccepted && !callEnded ? (
              <video className="client-stream" playsInline ref={userVideo} autoPlay />
            ) : null}
          </div>
          <div className="result">{callAccepted ? <div className="dashboard-analytics">Hello</div> : null}</div>
        </div>
      </div>

      <div className="dashboard-options">
        {callAccepted ? (
          <span style={{ color: "white" }}>
            <h4>on call with Sherlock Holmes, time elapsed </h4>
            <br />
            <button type="button" className="button-light" onClick={leaveCall}>
              Disconnect
            </button>
          </span>
        ) : null}
      </div>

      {receivingCall && !callAccepted ? (
        <div className="dashboard-alert container">
          Incoming call from {name}
          <button type="button" className="button-dark" onClick={answerCall}>
            Click to Accept
          </button>
        </div>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
export default connect(mapStateToProps, null)(Dashboard);
