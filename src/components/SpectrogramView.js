import React, { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';
import SpectrogramPlugin from 'wavesurfer.js/dist/plugins/spectrogram.js';

export default function SpectrogramView({ audioUrl }) {
  const containerRef = useRef();
  const spectrogramRef = useRef();

  useEffect(() => {
    if (!audioUrl) return;

    if (spectrogramRef.current) {
      spectrogramRef.current.destroy();
    }

    const wavesurfer = WaveSurfer.create({
      container: containerRef.current,
      waveColor: '#ccc',
      progressColor: '#3b82f6',
      plugins: [
        SpectrogramPlugin.create({
          container: containerRef.current,
          labels: true,
          fftSamples: 512,
          frequencyMax: 8000,
        }),
      ],
    });

    wavesurfer.load(audioUrl);
    spectrogramRef.current = wavesurfer;

    return () => wavesurfer.destroy();
  }, [audioUrl]);

  return <div ref={containerRef} className="w-full h-40 bg-black" />;
}
