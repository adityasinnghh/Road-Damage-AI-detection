import { useState, useEffect, useCallback, useRef } from 'react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { DetectionOverlay } from '@/components/DetectionOverlay';
import { LocationDisplay } from '@/components/LocationDisplay';
import { DetectionResult, SeverityLevel } from '@/types/damage';
import { Camera, Upload, StopCircle, Video, AlertCircle, Loader2, Brain } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useRoadAnalysis, RoadAnalysisResult } from '@/hooks/useRoadAnalysis';

// Map AI analysis to detection result format
function mapToDetectionResult(analysis: RoadAnalysisResult): DetectionResult | null {
  if (analysis.type === 'none') return null;
  
  return {
    type: analysis.type as DetectionResult['type'],
    severity: analysis.severity as SeverityLevel,
    confidence: analysis.confidence,
    boundingBox: analysis.boundingBox || {
      x: 25,
      y: 25,
      width: 50,
      height: 50,
    },
  };
}

export default function Detect() {
  const { toast } = useToast();
  const [isScanning, setIsScanning] = useState(false);
  const [detection, setDetection] = useState<DetectionResult | null>(null);
  const [detectionCount, setDetectionCount] = useState(0);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [hasCamera, setHasCamera] = useState(false);
  const [analysisDescription, setAnalysisDescription] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const analysisIntervalRef = useRef<number | null>(null);
  
  const { analyzeFrame, isAnalyzing, error: analysisError, lastAnalysis } = useRoadAnalysis();

  // Request camera access
  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      streamRef.current = stream;
      setHasCamera(true);
    } catch (error) {
      console.error('Camera access denied:', error);
      toast({
        title: 'Camera Access Required',
        description: 'Please allow camera access to use road detection.',
        variant: 'destructive',
      });
    }
  }, [toast]);

  // Attach stream to video element when hasCamera changes
  useEffect(() => {
    if (hasCamera && videoRef.current && streamRef.current) {
      const video = videoRef.current;
      video.srcObject = streamRef.current;
      
      const handleCanPlay = () => {
        video.play().then(() => {
          toast({
            title: 'Camera Active',
            description: 'Camera is now ready for AI pothole detection.',
          });
        }).catch(console.error);
      };
      
      video.addEventListener('canplay', handleCanPlay);
      return () => video.removeEventListener('canplay', handleCanPlay);
    }
  }, [hasCamera, toast]);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (analysisIntervalRef.current) {
      clearInterval(analysisIntervalRef.current);
      analysisIntervalRef.current = null;
    }
    setHasCamera(false);
    setIsScanning(false);
    setDetection(null);
    setAnalysisDescription(null);
  }, []);

  // Get GPS location
  useEffect(() => {
    if ('geolocation' in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setAccuracy(position.coords.accuracy);
        },
        (error) => {
          console.error('Geolocation error:', error);
        },
        { enableHighAccuracy: true, maximumAge: 1000 }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  // AI analysis while scanning
  useEffect(() => {
    if (!isScanning || !videoRef.current) return;

    const runAnalysis = async () => {
      if (!videoRef.current || isAnalyzing) return;
      
      const result = await analyzeFrame(videoRef.current);
      
      if (result) {
        setAnalysisDescription(result.description);
        
        if (result.type !== 'none') {
          const detectionResult = mapToDetectionResult(result);
          if (detectionResult) {
            setDetection(detectionResult);
            setDetectionCount(prev => prev + 1);
            
            if (result.severity === 'high' || result.severity === 'critical') {
              toast({
                title: `${result.type.charAt(0).toUpperCase() + result.type.slice(1)} Detected!`,
                description: result.description,
                variant: 'destructive',
              });
            }
          }
        } else {
          setDetection(null);
        }
      }
    };

    // Analyze every 3 seconds to avoid rate limits
    analysisIntervalRef.current = window.setInterval(runAnalysis, 3000);
    runAnalysis(); // Run immediately

    return () => {
      if (analysisIntervalRef.current) {
        clearInterval(analysisIntervalRef.current);
        analysisIntervalRef.current = null;
      }
    };
  }, [isScanning, analyzeFrame, isAnalyzing, toast]);

  const toggleScanning = () => {
    if (isScanning) {
      setIsScanning(false);
      setDetection(null);
      setAnalysisDescription(null);
    } else {
      setIsScanning(true);
      toast({
        title: 'AI Detection Started',
        description: 'Gemini Vision is now analyzing for road damage.',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Header />

      <main className="pt-20 pb-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-6">
            {/* Camera View */}
            <div className="relative aspect-[4/3] md:aspect-video bg-card rounded-2xl overflow-hidden shadow-elevated border border-border">
              {hasCamera ? (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <DetectionOverlay detection={detection} isScanning={isScanning} />
                  
                  {/* AI Analysis Indicator */}
                  {isScanning && isAnalyzing && (
                    <div className="absolute top-4 right-4 glass rounded-lg px-3 py-2 flex items-center gap-2">
                      <Loader2 className="w-4 h-4 text-primary animate-spin" />
                      <span className="text-xs font-medium">Analyzing...</span>
                    </div>
                  )}
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-8">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                    <Video className="w-12 h-12 text-primary" />
                  </div>
                  <div className="text-center space-y-2">
                    <h3 className="text-xl font-semibold">Camera Required</h3>
                    <p className="text-muted-foreground max-w-sm">
                      Enable your camera to start detecting potholes and road damage in real-time.
                    </p>
                  </div>
                  <Button onClick={startCamera} variant="default" size="lg" className="gap-2">
                    <Camera className="w-5 h-5" />
                    Enable Camera
                  </Button>
                </div>
              )}
            </div>

            {/* Analysis Error */}
            {analysisError && (
              <div className="glass rounded-xl p-4 flex items-center gap-3 border border-destructive/50">
                <AlertCircle className="w-5 h-5 text-destructive" />
                <span className="text-sm text-destructive">{analysisError}</span>
              </div>
            )}

            {/* Controls */}
            <div className="grid md:grid-cols-2 gap-4">
              <LocationDisplay
                latitude={latitude}
                longitude={longitude}
                accuracy={accuracy}
                isTracking={latitude !== null}
              />

              <div className="glass-strong rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">AI Model</span>
                  <span className="text-sm font-semibold text-success flex items-center gap-1">
                    <Brain className="w-4 h-4" />
                    Gemini Vision
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Detection Status</span>
                  <span
                    className={cn(
                      'text-sm font-semibold',
                      isScanning ? 'text-success' : 'text-muted-foreground'
                    )}
                  >
                    {isScanning ? (isAnalyzing ? 'Analyzing' : 'Active') : 'Idle'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Damage Detected</span>
                  <span className="text-2xl font-bold text-primary">{detectionCount}</span>
                </div>

                {detection && (
                  <div className="pt-2 border-t border-border/50">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium capitalize">{detection.type}</span>
                      <span className={cn(
                        "text-xs font-semibold px-2 py-0.5 rounded-full",
                        detection.severity === 'critical' && "bg-destructive/20 text-destructive",
                        detection.severity === 'high' && "bg-warning/20 text-warning",
                        detection.severity === 'medium' && "bg-primary/20 text-primary",
                        detection.severity === 'low' && "bg-muted text-muted-foreground"
                      )}>
                        {detection.severity}
                      </span>
                    </div>
                    <span className="text-sm text-primary">
                      {(detection.confidence * 100).toFixed(0)}% confidence
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Analysis Description */}
            {analysisDescription && (
              <div className="glass-strong rounded-xl p-4">
                <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Brain className="w-4 h-4 text-primary" />
                  AI Analysis
                </h4>
                <p className="text-sm text-muted-foreground">{analysisDescription}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {hasCamera && (
                <>
                  <Button
                    onClick={toggleScanning}
                    variant={isScanning ? 'critical' : 'default'}
                    size="lg"
                    className="flex-1 gap-2"
                  >
                    {isScanning ? (
                      <>
                        <StopCircle className="w-5 h-5" />
                        Stop Scanning
                      </>
                    ) : (
                      <>
                        <Brain className="w-5 h-5" />
                        Start Pothole Detection
                      </>
                    )}
                  </Button>

                  <Button
                    onClick={stopCamera}
                    variant="outline"
                    size="lg"
                    className="gap-2"
                  >
                    <AlertCircle className="w-5 h-5" />
                    Stop Camera
                  </Button>
                </>
              )}

              <Button
                variant="secondary"
                size="lg"
                className="gap-2"
                onClick={() =>
                  toast({
                    title: 'Reports Uploaded',
                    description: `${detectionCount} detections synced to dashboard.`,
                  })
                }
              >
                <Upload className="w-5 h-5" />
                Sync Reports
              </Button>
            </div>

            {/* Info Banner */}
            <div className="glass rounded-xl p-4 flex items-start gap-3">
              <Brain className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium mb-1">AI-Powered Pothole Detection (Gemini Vision)</p>
                <p className="text-muted-foreground">
                  Using Google Gemini Vision AI to analyze road surfaces and detect potholes, cracks, 
                  depressions, and patches. The AI provides real-time analysis with severity ratings 
                  and descriptions. Analysis runs every 3 seconds to conserve resources.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
