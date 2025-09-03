import axios from 'axios';
import { useEffect, useState } from 'react';
import './PcGame.css';

export default function PcGame() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    axios.post('https://gamehub-3l8u.onrender.com/api/videos', {})
      .then(response => {
        const data = response.data;
        if (Array.isArray(data)) setGames(data);
        else if (Array.isArray(data.games)) setGames(data.games);
        else setGames([]);
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

  return (
    <div className="wrapper">
      <h2>PC Game List</h2>
      {loading ? <p>Loading...</p> : games.map(game => {
        const videoId = extractYouTubeId(game.url);
        const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

        return (
          <div key={game._id} className="card">
            <div className="card-left">
              <h3 className="video-title">{game.title}</h3>
              {activeId === game._id ? (
               <iframe
               width="500"
               height="300"
               src={getEmbedUrl(game.url)}
               frameBorder="0"
               allow="autoplay; encrypted-media"
               allowFullScreen
               title={game.title}
             />
              ) : (
                <div className="thumbnail-wrapper" onClick={() => setActiveId(game._id)}>
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
                {game.description?.split('.').map((sentence, index) =>
                  sentence.trim() ? <li key={index}>{sentence.trim()}</li> : null
                )}
              </ul>
              {game.url1 && (
                <a href={game.url1} target="_blank" rel="noopener noreferrer" className="download-link">
                  Download Torrent
                </a>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}