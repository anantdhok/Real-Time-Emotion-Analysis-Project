import React from "react";
import Navigation from "../../components/navigation/Navigation";
import { FooterSources } from "../../components/footer/Footer";
import "./Welcome.css";

export default function welcome() {
  return (
    <>
      <Navigation />
      <div className="container">
        <div className="row welcome">
          <div className="welcome-content">
            <h1>Tell Your Story to the Right Person!</h1>
            <p>Join with us! Login or Register. Share your story, we're here to listen!!</p>
          </div>
          <div className="welcome-image">
            <img src="/media/images/Welcome.png" width="100%" alt="img" />
          </div>
        </div>

        <div className="row welcome-desc">
          <h1>
            Real-Time Emotion Analysis <br />
            using Cloud and Machine Learning
          </h1>
          <p>
            Our project would help psychologists with their study on their patients, by facilitating features such as
            real time emotion detection during video one-to-one sessions. Through which the doctor would get greater
            insights about how his/her therapy and words are having the effect on the concerned person.
            <br />
            <br />
            All the existing software for this purpose only provides basic features such as scheduling meetings, note
            taking provision, e-prescription, etc. Emotion detection is also possible using a microcontroller unit to do
            the processing and stand-alone camera but this apparatus wouldn’t be practical for everyone. On the other
            hand, our project will have the feature of emotion detection using speech and video in real time, processed
            on cloud.
          </p>
        </div>
      </div>
      <FooterSources />
    </>
  );
}
