import React, { useState, useEffect } from "react";
import firebase, { db } from "../firebase";
import { useClassCode } from "../stores";
// import Video from "react-video-renderer";
import QierPlayer from 'qier-player';

function LectureViewer({ match }) {
  const [videoSrc, setVideoSrc] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDesc, setVideoDesc] = useState("");
  const classroom = useClassCode((state) => state.classCode);

  useEffect(() => {
    const fetchData = async () => {
      console.log(match.params.video);
      const data = await (await db.collection("classes").doc(classroom).collection("lectures").doc(match.params.video).get()).data();
      console.log(data);
      firebase.storage().ref(classroom + "/" + match.params.video).getDownloadURL().then((url) => {
        console.log(url);
        setVideoSrc(url);
      }).catch((error) => {
        console.log(error);
      });
      setVideoTitle(data.data.title);
      setVideoDesc(data.data.description);
    }
    fetchData();
  }, [classroom, match]);

  return (
    <div>
      {videoSrc && <QierPlayer srcOrigin={videoSrc} />/*<Video src={videoSrc}>
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
      </Video>} */}

      <h1>{videoTitle}</h1>
      <h4>{videoDesc}</h4>
    </div>
  );
}

export default LectureViewer;
