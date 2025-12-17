import { useState, useEffect, useCallback, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';

export interface DetectedObject {
  class: string;
  score: number;
  bbox: [number, number, number, number]; // [x, y, width, height]
}

export function useObjectDetection() {
  const [model, setModel] = useState<cocoSsd.ObjectDetection | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load the COCO-SSD model
  const loadModel = useCallback(async () => {
    if (model || isLoading) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Loading TensorFlow.js backend...');
      await tf.ready();
      console.log('TensorFlow.js backend ready:', tf.getBackend());
      
      console.log('Loading COCO-SSD model...');
      const loadedModel = await cocoSsd.load({
        base: 'lite_mobilenet_v2', // Faster, lighter model
      });
      console.log('COCO-SSD model loaded successfully');
      
      setModel(loadedModel);
      setIsReady(true);
    } catch (err) {
      console.error('Failed to load model:', err);
      setError(err instanceof Error ? err.message : 'Failed to load AI model');
    } finally {
      setIsLoading(false);
    }
  }, [model, isLoading]);

  // Run detection on a video element
  const detect = useCallback(async (
    videoElement: HTMLVideoElement
  ): Promise<DetectedObject[]> => {
    if (!model || !videoElement) return [];
    
    try {
      const predictions = await model.detect(videoElement);
      return predictions.map(pred => ({
        class: pred.class,
        score: pred.score,
        bbox: pred.bbox as [number, number, number, number],
      }));
    } catch (err) {
      console.error('Detection error:', err);
      return [];
    }
  }, [model]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (model) {
        // Model cleanup if needed
        setModel(null);
        setIsReady(false);
      }
    };
  }, []);

  return {
    loadModel,
    detect,
    isLoading,
    isReady,
    error,
  };
}

// Map COCO-SSD classes to road-related categories for display
export const ROAD_RELATED_CLASSES = [
  'car', 'truck', 'bus', 'motorcycle', 'bicycle', 
  'person', 'traffic light', 'stop sign', 'parking meter'
];

export function isRoadRelated(className: string): boolean {
  return ROAD_RELATED_CLASSES.includes(className.toLowerCase());
}
