import { useCallback, useEffect, useRef, useState } from "react";

const SOUND_STORAGE_KEY = "shine:simulation:sound-enabled";

function readStoredPreference() {
  try {
    const stored = window.localStorage?.getItem(SOUND_STORAGE_KEY);
    return stored === null ? true : stored === "true";
  } catch {
    return true;
  }
}

export function useShineSound() {
  const [soundEnabled, setSoundEnabled] = useState(readStoredPreference);
  const audioContextRef = useRef(null);

  useEffect(() => {
    try {
      window.localStorage?.setItem(SOUND_STORAGE_KEY, String(soundEnabled));
    } catch {
      // Sound preference is nice-to-have; blocked storage should not affect the UI.
    }
  }, [soundEnabled]);

  const getAudioContext = useCallback(() => {
    if (!soundEnabled) return null;

    try {
      const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextCtor) return null;

      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContextCtor();
      }

      if (audioContextRef.current.state === "suspended") {
        audioContextRef.current.resume().catch(() => {});
      }

      return audioContextRef.current;
    } catch {
      return null;
    }
  }, [soundEnabled]);

  const playSequence = useCallback((notes) => {
    const audioContext = getAudioContext();
    if (!audioContext) return;

    const startAt = audioContext.currentTime + 0.015;
    const volume = 0.055;

    notes.forEach(([frequency, offset, duration]) => {
      try {
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();

        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(frequency, startAt + offset);
        gain.gain.setValueAtTime(0, startAt + offset);
        gain.gain.linearRampToValueAtTime(volume, startAt + offset + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.001, startAt + offset + duration);

        oscillator.connect(gain);
        gain.connect(audioContext.destination);
        oscillator.start(startAt + offset);
        oscillator.stop(startAt + offset + duration + 0.02);
      } catch {
        // Blocked audio should never block interaction.
      }
    });
  }, [getAudioContext]);

  return {
    soundEnabled,
    toggleSound: () => setSoundEnabled((enabled) => !enabled),
    playSelect: () => playSequence([[440, 0, 0.08], [554, 0.09, 0.08]]),
    playHint: () => playSequence([[392, 0, 0.09], [523, 0.1, 0.12]]),
    playCorrect: () => playSequence([[523, 0, 0.08], [659, 0.09, 0.08], [784, 0.18, 0.12]]),
    playIncorrect: () => playSequence([[392, 0, 0.1], [330, 0.11, 0.14]]),
    playChallengeComplete: () => playSequence([[523, 0, 0.08], [659, 0.09, 0.08], [784, 0.18, 0.08], [1047, 0.27, 0.14]]),
    playSimulationComplete: () => playSequence([[392, 0, 0.08], [523, 0.1, 0.08], [659, 0.2, 0.08], [1047, 0.3, 0.18]])
  };
}
