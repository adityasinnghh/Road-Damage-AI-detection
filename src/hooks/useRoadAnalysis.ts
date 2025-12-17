import { useState, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface RoadAnalysisResult {
  type: 'pothole' | 'crack' | 'depression' | 'patch' | 'none';
  severity: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
  description: string;
  boundingBox?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export function useRoadAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastAnalysis, setLastAnalysis] = useState<RoadAnalysisResult | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Initialize canvas once
  const getCanvas = useCallback(() => {
    if (!canvasRef.current) {
      canvasRef.current = document.createElement('canvas');
    }
    return canvasRef.current;
  }, []);

  // Capture frame from video and convert to base64
  const captureFrame = useCallback((video: HTMLVideoElement): string | null => {
    if (!video || video.videoWidth === 0 || video.videoHeight === 0) {
      return null;
    }

    const canvas = getCanvas();
    // Use smaller dimensions for faster upload
    const maxWidth = 640;
    const scale = Math.min(1, maxWidth / video.videoWidth);
    canvas.width = video.videoWidth * scale;
    canvas.height = video.videoHeight * scale;

    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/jpeg', 0.7);
  }, [getCanvas]);

  // Analyze a single frame
  const analyzeFrame = useCallback(async (video: HTMLVideoElement): Promise<RoadAnalysisResult | null> => {
    if (isAnalyzing) return null;

    const imageBase64 = captureFrame(video);
    if (!imageBase64) {
      setError('Failed to capture frame');
      return null;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke('analyze-road', {
        body: { imageBase64 }
      });

      if (fnError) {
        throw new Error(fnError.message);
      }

      if (data.error) {
        throw new Error(data.error);
      }

      const result = data as RoadAnalysisResult;
      setLastAnalysis(result);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Analysis failed';
      setError(message);
      console.error('Road analysis error:', err);
      return null;
    } finally {
      setIsAnalyzing(false);
    }
  }, [isAnalyzing, captureFrame]);

  return {
    analyzeFrame,
    isAnalyzing,
    error,
    lastAnalysis,
    captureFrame,
  };
}
