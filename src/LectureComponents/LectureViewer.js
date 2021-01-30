import React, { useState, useEffect } from "react";
import firebase, { getVideo } from "../firebase";
import { useClassCode } from "../stores";
import Video from "react-video-renderer";

function LectureViewer({ match }) {
  const [videoSrc, setVideoSrc] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDesc, setVideoDesc] = useState("");
  const classroom = useClassCode((state) => state.classCode);

  useEffect(() => {
    const video = getVideo(classroom, match.params.videoName);
    setVideoSrc(firebase.storage().ref(classroom + "/" + video.data.src));
    setVideoTitle(video.data.title);
    setVideoDesc(video.data.description);
  }, [classroom, match]);

  return (
    <div>
      <Video src={videoSrc}>
        {(video, state, actions) => (
          <div>
            {video}
            <div>
              {state.currentTime} / {state.duration} / {state.buffered}
            </div>
            <progress
              value={state.currentTime}
              max={state.duration}
              onChange={actions.navigate}
            />
            <progress
              value={state.volume}
              max={1}
              onChange={actions.setVolume}
            />
            <button onClick={actions.play}>Play</button>
            <button onClick={actions.pause}>Pause</button>
            <button onClick={actions.requestFullScreen}>Fullscreen</button>
          </div>
        )}
      </Video>

      <h1>Lecture Title</h1>
      <h2>Lecture Description</h2>
    </div>
  );
}

export default LectureViewer;
