// Background removal thresholds
const BRIGHTNESS_THRESHOLD_HIGH = 240;
const BRIGHTNESS_THRESHOLD_LOW = 200;
const COLOR_SIMILARITY_THRESHOLD = 10;

export async function removeBackground(imageDataUrl) {
  // Simple background removal using edge detection and threshold
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      // Simple color-based background removal (assumes lighter background)
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const brightness = (r + g + b) / 3;
        
        // If pixel is very bright or very similar across channels, make it transparent
        if (brightness > BRIGHTNESS_THRESHOLD_HIGH || 
            (Math.abs(r - g) < COLOR_SIMILARITY_THRESHOLD && 
             Math.abs(g - b) < COLOR_SIMILARITY_THRESHOLD && 
             brightness > BRIGHTNESS_THRESHOLD_LOW)) {
          data[i + 3] = 0; // Set alpha to 0
        }
      }
      
      ctx.putImageData(imageData, 0, 0);
      resolve(canvas.toDataURL('image/png'));
    };
    img.src = imageDataUrl;
  });
}

export async function addOutlineAndShadow(imageDataUrl) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Add padding for shadow
      const padding = 20;
      canvas.width = img.width + padding * 2;
      canvas.height = img.height + padding * 2;
      
      // Draw shadow
      ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 5;
      ctx.shadowOffsetY = 5;
      
      // Draw main image
      ctx.drawImage(img, padding, padding);
      
      // Add outline
      ctx.shadowColor = 'transparent';
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 3;
      ctx.drawImage(img, padding, padding);
      
      resolve(canvas.toDataURL('image/png'));
    };
    img.src = imageDataUrl;
  });
}

export async function createHeroSticker(imageDataUrl) {
  try {
    // Remove background
    const withoutBg = await removeBackground(imageDataUrl);
    
    // Add outline and shadow
    const withEffects = await addOutlineAndShadow(withoutBg);
    
    return withEffects;
  } catch (error) {
    console.error('Error creating hero sticker:', error);
    return imageDataUrl; // Return original on error
  }
}

export function resizeImage(imageDataUrl, maxWidth, maxHeight) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      let width = img.width;
      let height = img.height;
      
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width *= ratio;
        height *= ratio;
      }
      
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      
      resolve(canvas.toDataURL('image/jpeg', 0.9));
    };
    img.src = imageDataUrl;
  });
}
