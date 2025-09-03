import axios from 'axios';
import { useEffect, useState } from 'react';
import './SportVideo.css';

export default function SportVideo() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    axios.post('https://gamehub-3l8u.onrender.com/api/torrentfiles', {})
      .then(response => {
        const data = response.data;
        if (Array.isArray(data)) setVideos(data);
        else if (Array.isArray(data.videos)) setVideos(data.videos);
        else setVideos([]);
      })
      .catch(err => console.error('Axios fetch error:', err))
      .finally(() => setLoading(false));
  }, []);

  const extractYouTubeId = (url) => {
    const match = url?.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
    return match ? match[1] : null;
  };
  const getEmbedUrl = (url) => {
    const id = extractYouTubeId(url);
    return id ? `https://www.youtube.com/embed/${id}?autoplay=1&mute=1` : null;
  };
  const getDesc = (description)=> {
    return description?.split('\n').filter(line => line.trim()) ?? [];
  }

  return (
    <div className="wrapper">
      <h2>Sport Video List</h2>
      {loading ? <p>Loading...</p> : videos.map(video => {
        const videoId = extractYouTubeId(video.videourl);
        const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

        return (
          <div key={video._id} className="card">
            <div className="card-left">
              <h3 className="video-title">{video.soccermatch}</h3>
              {activeId === video._id ? (
               <iframe
               width="500"
               height="300"
               src={getEmbedUrl(video.videourl)}
               frameBorder="0"
               allow="autoplay; encrypted-media"
               allowFullScreen
               title={video.title}
             />
              ) : (
                <div className="thumbnail-wrapper" onClick={() => setActiveId(video._id)}>
                  <img
                    src={thumbnail}
                    alt="thumbnail"
                    className="thumbnail"
                    width="500"
                    height="300"
                    loading="lazy"
                  />
                  <div className="play-icon">▶</div>
                </div>
              )}
            </div>

            <div className="card-right">
              <ul className="video-description">
                {getDesc(video.description)?.map((sentence, index) =>
                  sentence.trim() ? <li key={index}>{sentence.trim()}</li> : null
                )}
              </ul>
           
              {video.torrentdownloadlink && (
                <ul>
                <a href={video.torrentdownloadlink} target="_blank" rel="noopener noreferrer" className="download-link">
                📥 Download from Dropbox
                </a>
                <a href={video.torrentdownloadlink} target="_blank" rel="noopener noreferrer" className="download-link">
                🧲 Open Magnet Link
                </a>
                </ul>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}