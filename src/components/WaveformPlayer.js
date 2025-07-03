import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

export default function WaveformPlayer({ audioUrl }) {
  const containerRef = useRef(null);
  const wavesurferRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!audioUrl || !containerRef.current) return;

    const wavesurfer = WaveSurfer.create({
      container: containerRef.current,
      waveColor: "#ccc",
      progressColor: "#3b82f6",
      height: 80,
      responsive: true,
    });

    const timeout = setTimeout(() => {
      wavesurfer.load(audioUrl);
    }, 100);

    wavesurfer.on("ready", () => {
      console.log("WaveSurfer ready");
    });

    wavesurfer.on("finish", () => {
      setIsPlaying(false);
    });

    wavesurferRef.current = wavesurfer;

    return () => {
      clearTimeout(timeout);
      wavesurfer.destroy();
      wavesurferRef.current = null;
    };
  }, [audioUrl]);

  const togglePlay = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.playPause();
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="w-full">
      <div ref={containerRef} />
      <button
        onClick={togglePlay}
        className="mt-2 px-4 py-1 bg-blue-600 text-white rounded"
      >
        {isPlaying ? "Pause" : "Play"}
      </button>
    </div>
  );
}
