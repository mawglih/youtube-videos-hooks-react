import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import youtube from "../apis/youtube";
import VideoList from "./VideoList";
import VideoDetail from "./VideoDetail";

const App = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const onTermSubmit = async (term) => {
    const { data } = await youtube.get("/search", {
      params: {
        q: term,
      },
    }); 
    setVideos(data.items);
    setSelectedVideo(data.items[0])
  };

  useEffect(() => {
    onTermSubmit('buildings') 
}, [])

    return (
      <div className="ui container">
        <SearchBar onFormSubmit={onTermSubmit} />
        <div className="ui grid">
          <div className="ui row">
            <div className="eleven wide column">
              <VideoDetail video={selectedVideo} />
            </div>
            <div className="five wide column">
              <VideoList
                onVideoSelect={video => setSelectedVideo(video)}
                videos={videos}
              />
            </div>
          </div>
        </div>
      </div>
    );
}

export default App;
