import React, { Component } from "react";
import { PropTypes } from "prop-types";

class MediaContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bridge: "",
      user: "",
    };
    this.onRemoteHangup = this.onRemoteHangup.bind(this);
    this.onMessage = this.onMessage.bind(this);
    this.sendData = this.sendData.bind(this);
    this.setupDataHandlers = this.setupDataHandlers.bind(this);
    this.setDescription = this.setDescription.bind(this);
    this.sendDescription = this.sendDescription.bind(this);
    this.hangup = this.hangup.bind(this);
    this.init = this.init.bind(this);
    this.setDescription = this.setDescription.bind(this);
  }

  componentDidMount() {
    this.props.media(this);
    this.props.getUserMedia.then((stream) => (this.localVideo.srcObject = this.localStream = stream));
    this.props.socket.on("message", this.onMessage);
    this.props.socket.on("hangup", this.onRemoteHangup);
  }

  componentWillUnmount() {
    this.props.media(null);
    if (this.localStream !== undefined) {
      this.localStream.getVideoTracks()[0].stop();
    }
    this.props.socket.emit("leave");
  }

  onRemoteHangup() {
    this.setState({ user: "host", bridge: "host-hangup" });
  }

  onMessage(message) {
    if (message.type === "offer") {
      this.pc
        .setRemoteDescription(new RTCSessionDescription(message))
        .then(() => this.pc.createAnswer())
        .then(this.setDescription)
        .then(this.sendDescription)
        .catch(this.handleError);
    } else if (message.type === "answer") {
      this.pc.setRemoteDescription(new RTCSessionDescription(message));
    } else if (message.type === "candidate") {
      this.pc.addIceCandidate(message.candidate);
    }
  }

  sendData(msg) {
    this.dc.send(JSON.stringify(msg));
  }

  setupDataHandlers() {
    this.dc.onmessage = (e) => {
      var msg = JSON.parse(e.data);
      console.log("received message over data channel:" + msg);
    };
    this.dc.onclose = () => {
      this.remoteStream.getVideoTracks()[0].stop();
      console.log("The Data Channel is Closed");
    };
  }

  setDescription(offer) {
    return this.pc.setLocalDescription(offer);
  }

  sendDescription() {
    this.props.socket.send(this.pc.localDescription);
  }

  hangup() {
    this.setState({ user: "guest", bridge: "guest-hangup" });
    this.pc.close();
    this.props.socket.emit("leave");
  }

  handleError(e) {
    console.log(e);
  }

  init() {
    const attachMediaIfReady = () => {
      this.dc = this.pc.createDataChannel("chat");
      this.setupDataHandlers();
      console.log("attachMediaIfReady");
      this.pc.createOffer().then(this.setDescription).then(this.sendDescription).catch(this.handleError);
    };

    this.pc = new RTCPeerConnection({ iceServers: [{ urls: "stun:stun.l.google.com:19302" }] });

    this.pc.onicecandidate = (e) => {
      console.log(e, "onicecandidate");
      if (e.candidate) {
        this.props.socket.send({
          type: "candidate",
          candidate: e.candidate,
        });
      }
    };

    this.pc.onaddstream = (e) => {
      console.log("onaddstream", e);
      this.remoteStream = e.stream;
      this.remoteVideo.srcObject = this.remoteStream = e.stream;
      this.setState({ bridge: "established" });
    };

    this.pc.ondatachannel = (e) => {
      this.dc = e.channel;
      this.setupDataHandlers();
      this.sendData({
        peerMediaStream: {
          video: this.localStream.getVideoTracks()[0].enabled,
        },
      });
    };

    this.localStream.getTracks().forEach((track) => this.pc.addTrack(track, this.localStream));

    if (this.state.user === "host") {
      this.props.getUserMedia.then(attachMediaIfReady);
    }
  }

  render() {
    return (
      <div className={`media-bridge ${this.state.bridge}`}>
        <video className="remote-video" ref={(ref) => (this.remoteVideo = ref)} autoPlay></video>
        <video className="local-video" ref={(ref) => (this.localVideo = ref)} autoPlay muted></video>
      </div>
    );
  }
}

MediaContainer.propTypes = {
  socket: PropTypes.object.isRequired,
  getUserMedia: PropTypes.object.isRequired,
  media: PropTypes.func.isRequired,
};
export default MediaContainer;
