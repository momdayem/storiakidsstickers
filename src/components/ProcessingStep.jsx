import { useEffect, useState } from 'react';
import { initializeFaceDetector, detectFaces, scorePhoto } from '../utils/faceDetection';
import { createHeroSticker } from '../utils/imageProcessing';
import { generateStickerPages } from '../utils/pageGenerator';

const ProcessingStep = ({ photos, kidName, theme, onComplete, onError, onRetry }) => {
  const [status, setStatus] = useState('Initializing...');
  const [showTips, setShowTips] = useState(false);

  const processPhotos = async () => {
    try {
      // Initialize face detector
      setStatus('Loading face detection...');
      await initializeFaceDetector();

      // Detect faces in all photos
      setStatus('Analyzing photos...');
      const photoResults = [];

      for (let i = 0; i < photos.length; i++) {
        const img = new Image();
        img.src = photos[i].url;
        
        await new Promise((resolve) => {
          img.onload = resolve;
        });

        const faces = await detectFaces(img);
        const score = scorePhoto(faces, img.width, img.height);

        photoResults.push({
          photo: photos[i],
          faces: faces.length,
          score,
          img
        });
      }

      // Check if any photos have faces
      const photosWithFaces = photoResults.filter(r => r.faces > 0);
      
      if (photosWithFaces.length === 0) {
        setShowTips(true);
        setStatus('No faces detected in photos');
        onError('No faces detected. Please check the tips below and try again.');
        return;
      }

      // Pick best photo
      setStatus('Selecting best photo...');
      const bestPhoto = photoResults.reduce((best, current) => 
        current.score > best.score ? current : best
      );

      // Create hero sticker
      setStatus('Creating hero sticker...');
      const heroSticker = await createHeroSticker(bestPhoto.photo.url);

      // Generate pages
      setStatus('Generating sticker pages...');
      const pages = await generateStickerPages(kidName, theme, heroSticker);

      setStatus('Complete!');
      setTimeout(() => {
        onComplete(heroSticker, pages);
      }, 500);

    } catch (error) {
      console.error('Processing error:', error);
      onError('An error occurred during processing. Please try again.');
      setStatus('Error occurred');
    }
  };

  useEffect(() => {
    processPhotos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h2>Creating Your Sticker Book</h2>
      
      <div style={{ textAlign: 'center', padding: '40px 0' }}>
        <div className="loading-spinner" />
        <p style={{ marginTop: '20px', fontSize: '1.1rem', fontWeight: '600' }}>
          {status}
        </p>
      </div>

      {showTips && (
        <div className="tips-box">
          <h3>📸 Tips for Better Photos</h3>
          <ul>
            <li>Make sure the face is clearly visible and well-lit</li>
            <li>Avoid photos taken from too far away</li>
            <li>Face should be looking towards the camera</li>
            <li>Avoid heavy shadows on the face</li>
            <li>Try photos with a plain or simple background</li>
          </ul>
          
          <button onClick={onRetry} style={{ marginTop: '15px' }}>
            Try Different Photos
          </button>
        </div>
      )}
    </div>
  );
};

export default ProcessingStep;
