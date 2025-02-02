import { useState, useEffect } from 'react';

// Custom hook for typewriter effect
function useTypewriter(text, speed = 150, resetDelay = 5000) {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let i = 0;
    let typingTimeout;
    let resetTimeout;

    const typeCharacter = () => {
      if (i < text.length) {
        setDisplayText((prevText) => prevText + text.charAt(i));
        i++;
        typingTimeout = setTimeout(typeCharacter, speed);
      } else {
        clearTimeout(typingTimeout); // Clear typing timeout
      }
    };

    typeCharacter(); // Start typing

    // Set a reset timeout to clear and restart typing
    resetTimeout = setTimeout(() => {
      setDisplayText(''); // Clear text
      i = 0; // Reset index
      typeCharacter(); // Restart typing
    }, resetDelay);

    return () => {
      clearTimeout(typingTimeout);
      clearTimeout(resetTimeout);
    };
  }, [text, speed, resetDelay]);

  return displayText;
}

export default useTypewriter;
