import { useState, useRef } from 'react';

const PhotoUploadStep = ({ onComplete, onBack, onError }) => {
  const [photos, setPhotos] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = async (files) => {
    const fileArray = Array.from(files);
    
    if (photos.length + fileArray.length > 6) {
      onError('Maximum 6 photos allowed');
      return;
    }

    if (fileArray.length < 3 && photos.length === 0) {
      onError('Please upload at least 3 photos');
      return;
    }

    const validFiles = fileArray.filter(file => 
      file.type.startsWith('image/')
    );

    if (validFiles.length === 0) {
      onError('Please upload valid image files');
      return;
    }

    const newPhotos = await Promise.all(
      validFiles.map(file => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            resolve({
              id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              url: e.target.result,
              file
            });
          };
          reader.readAsDataURL(file);
        });
      })
    );

    setPhotos(prev => [...prev, ...newPhotos]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removePhoto = (id) => {
    setPhotos(prev => prev.filter(photo => photo.id !== id));
  };

  const handleContinue = () => {
    if (photos.length >= 3 && photos.length <= 6) {
      onComplete(photos);
    } else {
      onError('Please upload 3-6 photos');
    }
  };

  return (
    <div>
      <h2>Upload Photos</h2>
      <p style={{ color: '#666', marginBottom: '20px' }}>
        Upload 3-6 photos of your kid. We'll detect faces and create the best sticker!
      </p>

      <div
        className={`upload-area ${isDragging ? 'dragging' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
      >
        <div style={{ fontSize: '3rem', marginBottom: '10px' }}>📸</div>
        <p style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '5px' }}>
          Click to upload or drag photos here
        </p>
        <p style={{ color: '#999', fontSize: '0.9rem' }}>
          Upload 3-6 photos (JPG, PNG)
        </p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => handleFileSelect(e.target.files)}
      />

      {photos.length > 0 && (
        <div className="photo-grid">
          {photos.map(photo => (
            <div key={photo.id} className="photo-item">
              <img src={photo.url} alt="Uploaded" />
              <button
                className="remove-photo"
                onClick={() => removePhoto(photo.id)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="action-buttons">
        <button className="secondary" onClick={onBack}>
          Back
        </button>
        <button
          onClick={handleContinue}
          disabled={photos.length < 3 || photos.length > 6}
        >
          Create Stickers ({photos.length}/3-6)
        </button>
      </div>
    </div>
  );
};

export default PhotoUploadStep;
