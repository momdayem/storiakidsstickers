import { useState } from 'react'
import './App.css'
import InputStep from './components/InputStep'
import PhotoUploadStep from './components/PhotoUploadStep'
import ProcessingStep from './components/ProcessingStep'
import PreviewStep from './components/PreviewStep'
import ProgressIndicator from './components/ProgressIndicator'

const STEPS = {
  INPUT: 0,
  UPLOAD: 1,
  PROCESSING: 2,
  PREVIEW: 3
};

function App() {
  const [currentStep, setCurrentStep] = useState(STEPS.INPUT);
  const [kidName, setKidName] = useState('');
  const [theme, setTheme] = useState('');
  const [photos, setPhotos] = useState([]);
  const [heroSticker, setHeroSticker] = useState(null);
  const [generatedPages, setGeneratedPages] = useState([]);
  const [error, setError] = useState('');

  const handleInputComplete = (name, selectedTheme) => {
    setKidName(name);
    setTheme(selectedTheme);
    setCurrentStep(STEPS.UPLOAD);
    setError('');
  };

  const handlePhotosUploaded = (uploadedPhotos) => {
    setPhotos(uploadedPhotos);
    setCurrentStep(STEPS.PROCESSING);
    setError('');
  };

  const handleProcessingComplete = (hero, pages) => {
    setHeroSticker(hero);
    setGeneratedPages(pages);
    setCurrentStep(STEPS.PREVIEW);
    setError('');
  };

  const handleRetry = () => {
    setCurrentStep(STEPS.INPUT);
    setKidName('');
    setTheme('');
    setPhotos([]);
    setHeroSticker(null);
    setGeneratedPages([]);
    setError('');
  };

  const handleError = (errorMessage) => {
    setError(errorMessage);
  };

  return (
    <div className="app-container">
      <div className="card">
        <h1>🎨 Storiakids Stickers</h1>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>
          Create personalized sticker books for your kids!
        </p>

        <ProgressIndicator currentStep={currentStep} />

        {error && (
          <div className="message error">
            {error}
          </div>
        )}

        {currentStep === STEPS.INPUT && (
          <InputStep onComplete={handleInputComplete} />
        )}

        {currentStep === STEPS.UPLOAD && (
          <PhotoUploadStep
            onComplete={handlePhotosUploaded}
            onBack={() => setCurrentStep(STEPS.INPUT)}
            onError={handleError}
          />
        )}

        {currentStep === STEPS.PROCESSING && (
          <ProcessingStep
            photos={photos}
            kidName={kidName}
            theme={theme}
            onComplete={handleProcessingComplete}
            onError={handleError}
            onRetry={handleRetry}
          />
        )}

        {currentStep === STEPS.PREVIEW && (
          <PreviewStep
            heroSticker={heroSticker}
            pages={generatedPages}
            kidName={kidName}
            onRetry={handleRetry}
          />
        )}
      </div>
    </div>
  )
}

export default App
