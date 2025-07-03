import React, { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import SpectrogramPlugin from "wavesurfer.js/dist/plugins/spectrogram.js";

export default function WaveformPlayer2({ audioId }) {
  const waveformRef = useRef(null);
  const spectrogramRef = useRef(null);
  const wavesurferRef = useRef(null);

  useEffect(() => {
    const audioElement = document.getElementById(audioId);
    if (!audioElement || !waveformRef.current || !spectrogramRef.current) return;

    const wavesurfer = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#ccc",
      progressColor: "#3b82f6",
      height: 144,
      responsive: true,
      backend: "MediaElement",
      media: audioElement,
      plugins: [
        SpectrogramPlugin.create({
          container: spectrogramRef.current,
          labels: true,
          height: 300,
          frequencyMax: 8000,
          fftSamples: 512,
          labelsBackground: "rgba(0, 0, 0, 0.05)",
        }),
      ],
    });

    wavesurferRef.current = wavesurfer;

    return () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
        wavesurferRef.current = null;
      }
    };
  }, [audioId]);

  return (
    <div className="w-full">
      <div className="flex items-start gap-2 mb-2">
        <div className="flex flex-col text-xs text-gray-500 font-medium items-end leading-[1.5] w-10">
          <span>AMP</span>
          <span>0.75</span>
          <span>0.50</span>
          <span>0.25</span>
          <span>0</span>
          <span>-0.25</span>
          <span>-0.5</span>
          <span>-0.75</span>
        </div>
        <div className="flex-1">
          <div ref={waveformRef} />
        </div>
      </div>

      {/* Spectrogram */}
      <div ref={spectrogramRef} className="mb-2 bg-gray-100 rounded" />
    </div>
  );
}
