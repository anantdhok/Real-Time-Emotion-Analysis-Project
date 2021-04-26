import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import "./Dashboard.css";

export default function Dashboard() {
  let change = React.createRef();
  const defaultId = String(new Date() - new Date().setHours(0, 0, 0, 0));
  const [room, setRoom] = useState({ id: defaultId });

  const handleChange = () => {
    setRoom({ id: change.current.value });
  };
  return (
    <div className="dashboard container">
      <div className="dashboard-content">
        <h3>WebRTC Conference</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.  consectetur tincidunt ipsum.
        </p>
        <div className="input-field">
          <input
            type="text"
            value={room.id}
            onChange={handleChange}
            pattern="^\w+$"
            ref={change}
            maxLength="10"
            required
            autoFocus
            title="Meet ID should only contain letters or numbers."
          />
          <label htmlFor="room">Please Enter Meet ID </label>
        </div>
        <Link to={"/meet/" + room.id}>
          <button type="button" className="button-dark">
            Connect
          </button>
        </Link>
      </div>
    </div>
  );
}

Dashboard.contextTypes = {
  router: PropTypes.object,
};
