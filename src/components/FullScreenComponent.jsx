import { useState, useEffect } from 'react';

const FullScreenComponent = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  const enterFullscreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { // Firefox
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { // Chrome, Safari and Opera
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { // IE/Edge
      elem.msRequestFullscreen();
    }
    setIsFullscreen(true);
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { // Firefox
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // IE/Edge
      document.msExitFullscreen();
    }
    setIsFullscreen(false);
  };

  const handleVisibilityChange = () => {
    if (document.visibilityState === 'hidden') {
      setShowPrompt(true);
    }
  };

  useEffect(() => {
    window.addEventListener('beforeunload', (e) => {
      e.preventDefault();
      setShowPrompt(true);
      return ''; // This is required for some browsers to display the prompt
    });

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', (e) => {
        e.preventDefault();
        setShowPrompt(true);
        return '';
      });

      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const handlePromptResponse = (response) => {
    if (response === 'yes') {
      exitFullscreen();
      window.removeEventListener('beforeunload', () => { });
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      setShowPrompt(false);
      // Perform additional exit call actions here
    } else {
      setShowPrompt(false);
    }
  };

  return (
    <div>
      {!isFullscreen && <button onClick={enterFullscreen}>Enter Fullscreen</button>}
      {showPrompt && (
        <div className="prompt">
          <p>Do you want to exit the call?</p>
          <button onClick={() => handlePromptResponse('yes')}>Yes</button>
          <button onClick={() => handlePromptResponse('no')}>No</button>
        </div>
      )}
    </div>
  );
};

export default FullScreenComponent;
