import React, { useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Camera, X } from 'lucide-react';

const CameraCapture = ({ onCapture, onClose }) => {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState('');

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setError('');
    } catch {
      setError('Failed to access camera. Please ensure you have granted camera permissions.');
    }
  };

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  }, [stream]);

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg');
        onCapture(imageData);
        stopCamera();
        onClose();
      }
    }
  };

  React.useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 max-w-lg w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Camera Capture</h3>
          <button
            onClick={() => {
              stopCamera();
              onClose();
            }}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {error ? (
          <div className="text-red-500 text-center p-4">{error}</div>
        ) : (
          <>
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-4 flex justify-center">
              <button
                onClick={captureImage}
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Camera className="h-5 w-5 mr-2" />
                Capture Photo
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
CameraCapture.propTypes = {
  onCapture: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CameraCapture;