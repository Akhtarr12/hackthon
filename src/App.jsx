import { useState } from 'react';
import { Upload, Camera, Loader2 } from 'lucide-react';
import ChatInterface from './components/chatinterface';
import ImagePreview from './components/ImagePreview';
import CameraCapture from './components/cameracapture';
import { analyzeImage } from './api/https://picsum.photos/id/237/200/300';

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  
  const handleImageAnalysis = async (imageData) => {
    setIsAnalyzing(true);
    setError(null);
    
    try {
      const result = await analyzeImage(imageData);
      setAnalysis({
        text: result.analysis,
        confidence: result.confidence
      });
    } catch (err) {
      setError(err.message || 'An unknown error occurred');
      setSelectedImage(null);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const imageData = reader.result;
          setSelectedImage(imageData);
          handleImageAnalysis(imageData);
        };
        reader.readAsDataURL(file);
      } else {
        setError('Please upload an image file');
      }
    }
  };

  const handleCameraCapture = (imageData) => {
    setSelectedImage(imageData);
    handleImageAnalysis(imageData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">Medical AI Scanner</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Image Upload */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Upload or Scan Image</h2>
              
              {!selectedImage ? (
                <div className="space-y-4">
                  {/* Upload Button */}
                  <label className="block">
                    <div className="flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400 cursor-pointer">
                      <div className="space-y-1 text-center">
                        <Upload className="mx-auto h-8 w-8 text-gray-400" />
                        <div className="text-sm text-gray-600">
                          <span className="font-medium text-blue-600 hover:underline">Upload a file</span>
                          <span className="text-gray-500"> or drag and drop</span>
                        </div>
                      </div>
                    </div>
                    <input 
                      type="file" 
                      className="hidden" 
                      onChange={handleImageUpload} 
                      accept="image/*" 
                    />
                  </label>

                  {/* Camera Button */}
                  <button 
                    onClick={() => setShowCamera(true)}
                    className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <Camera className="mr-2 h-5 w-5" />
                    Open Camera
                  </button>
                </div>
              ) : (
                <ImagePreview 
                  imageUrl={selectedImage} 
                  onRemove={() => {
                    setSelectedImage(null);
                    setAnalysis(null);
                    setError(null);
                  }} 
                />
              )}
            </div>

            {isAnalyzing && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-center space-x-2">
                  <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
                  <span className="text-gray-600">Analyzing image...</span>
                </div>
              </div>
            )}

            {analysis && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-medium mb-2">Analysis Results</h3>
                <p className="text-gray-600 mb-2">{analysis.text}</p>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span>Confidence:</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${analysis.confidence}%` }}
                    />
                  </div>
                  <span>{analysis.confidence}%</span>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Chat Interface */}
          <div className="bg-white rounded-xl shadow-md p-6 h-[600px]">
            <ChatInterface 
              isActive={!!analysis} 
              analysisContext={analysis?.text || ''}
            />
          </div>
        </div>
      </main>

      {showCamera && (
        <CameraCapture
          onCapture={handleCameraCapture}
          onClose={() => setShowCamera(false)}
        />
      )}
    </div>
  );
}

export default App;