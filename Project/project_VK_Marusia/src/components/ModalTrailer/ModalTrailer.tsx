
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import './modalTrailer.css';

type ModalTrailerProps = {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
  title: string;
  autoplay?: boolean;
  mutedAutoplay?: boolean;
};

export const ModalTrailer: React.FC<ModalTrailerProps> = ({
  isOpen,
  onClose,
  videoSrc,
  title,
  autoplay = true,
  mutedAutoplay = true,
}) => {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (isOpen) setPlaying(autoplay);
    else setPlaying(false);
  }, [isOpen, autoplay]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-trailer__overlay" onClick={onClose}>
      <div className="modal-trailer__content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-trailer__close" onClick={onClose} aria-label="Close">✕</button>

        <div className="modal-trailer__video-wrapper" onClick={() => setPlaying(p => !p)}>
          <ReactPlayer
            src={videoSrc}
            playing={playing}
            muted={mutedAutoplay}
            controls={false}
            width="100%"
            height="100%"
            
        
            config={{
              youtube: {
                iv_load_policy: 3,
                disablekb: 1,
                fs: 0,
                rel: 0,
          
           
              }
            }}
          />

          <div className={`modal-trailer__small-indicator ${playing ? 'hidden' : 'visible'}`} />
          <div className={`modal-trailer__overlay-ui ${playing ? 'hidden' : ''}`}>
            <div className="modal-trailer__play" aria-label="Play">
              <span className="modal-trailer__play-icon">▶</span>
            </div>
            <div className="modal-trailer__title">{title}</div>
          </div>
        </div>
      </div>
    </div>
  );
};