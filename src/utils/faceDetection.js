import { FaceDetector, FilesetResolver } from '@mediapipe/tasks-vision';

let faceDetector = null;

export async function initializeFaceDetector() {
  if (faceDetector) return faceDetector;
  
  try {
    const vision = await FilesetResolver.forVisionTasks(
      'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
    );
    
    faceDetector = await FaceDetector.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite',
        delegate: 'GPU'
      },
      runningMode: 'IMAGE'
    });
    
    return faceDetector;
  } catch (error) {
    console.error('Failed to initialize face detector:', error);
    throw error;
  }
}

export async function detectFaces(imageElement) {
  try {
    if (!faceDetector) {
      await initializeFaceDetector();
    }
    
    const detections = faceDetector.detect(imageElement);
    return detections.detections || [];
  } catch (error) {
    console.error('Face detection error:', error);
    return [];
  }
}

export function scorePhoto(faces, imageWidth, imageHeight) {
  if (!faces || faces.length === 0) return 0;
  
  let score = 0;
  
  // Prefer exactly 1 face
  if (faces.length === 1) {
    score += 50;
  } else if (faces.length > 1) {
    score += 30; // Multiple faces are okay but less ideal
  }
  
  // Score based on face size and position
  faces.forEach(face => {
    const bbox = face.boundingBox;
    const faceWidth = bbox.width;
    const faceHeight = bbox.height;
    const faceArea = faceWidth * faceHeight;
    const imageArea = imageWidth * imageHeight;
    const areaRatio = faceArea / imageArea;
    
    // Prefer faces that occupy 15-40% of image
    if (areaRatio >= 0.15 && areaRatio <= 0.40) {
      score += 30;
    } else if (areaRatio > 0.10 && areaRatio < 0.50) {
      score += 20;
    } else {
      score += 10;
    }
    
    // Prefer centered faces
    const faceCenterX = bbox.originX + faceWidth / 2;
    const faceCenterY = bbox.originY + faceHeight / 2;
    const imageCenterX = imageWidth / 2;
    const imageCenterY = imageHeight / 2;
    
    const distanceFromCenter = Math.sqrt(
      Math.pow(faceCenterX - imageCenterX, 2) + 
      Math.pow(faceCenterY - imageCenterY, 2)
    );
    const maxDistance = Math.sqrt(
      Math.pow(imageWidth / 2, 2) + Math.pow(imageHeight / 2, 2)
    );
    const centerScore = 1 - (distanceFromCenter / maxDistance);
    score += centerScore * 20;
  });
  
  return Math.min(100, Math.round(score));
}
