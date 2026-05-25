import { useState, useEffect, useRef, useCallback } from 'react';

const STORAGE_KEY = 'audioPlaying';

export function useAmbientAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const wasPlaying = localStorage.getItem(STORAGE_KEY) === 'true';
    const audio = new Audio('/audio/ambient-rain.mp3');
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;

    if (wasPlaying) {
      audio.play().catch(() => {
        // Autoplay blocked
      });
      setIsPlaying(true);
    }

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      // Fade out
      let vol = audio.volume;
      const fadeOut = setInterval(() => {
        vol = Math.max(0, vol - 0.02);
        audio.volume = vol;
        if (vol <= 0) {
          clearInterval(fadeOut);
          audio.pause();
        }
      }, 50);
      setIsPlaying(false);
      localStorage.setItem(STORAGE_KEY, 'false');
    } else {
      audio.play().catch(() => {});
      // Fade in
      let vol = 0;
      const fadeIn = setInterval(() => {
        vol = Math.min(0.3, vol + 0.005);
        audio.volume = vol;
        if (vol >= 0.3) clearInterval(fadeIn);
      }, 50);
      setIsPlaying(true);
      localStorage.setItem(STORAGE_KEY, 'true');
    }
  }, [isPlaying]);

  return { isPlaying, toggle };
}
