import { getThemeData, getRandomTitle, getRandomText, replaceName } from './themes';

export async function generateStickerPages(kidName, themeName, heroStickerUrl) {
  const theme = getThemeData(themeName);
  const pages = [];
  
  for (let i = 0; i < 6; i++) {
    const pageCanvas = await createStickerPage(
      kidName,
      theme,
      heroStickerUrl
    );
    pages.push(pageCanvas.toDataURL('image/png'));
  }
  
  return pages;
}

async function createStickerPage(kidName, theme, heroStickerUrl) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  // A4 dimensions at 150 DPI (good balance between quality and size)
  const width = 1240;
  const height = 1754;
  canvas.width = width;
  canvas.height = height;
  
  // Background
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, '#ffffff');
  gradient.addColorStop(1, theme.colors[0] + '20');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  // Title at top
  const title = replaceName(getRandomTitle(theme.name.toLowerCase()), kidName);
  ctx.fillStyle = theme.colors[1];
  ctx.font = 'bold 60px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(title, width / 2, 100);
  
  // Story text
  const text = replaceName(getRandomText(theme.name.toLowerCase()), kidName);
  ctx.fillStyle = '#333333';
  ctx.font = '28px Arial';
  ctx.textAlign = 'center';
  
  // Word wrap the text
  const maxWidth = width - 100;
  const words = text.split(' ');
  let line = '';
  let y = 180;
  const lineHeight = 40;
  
  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + ' ';
    const metrics = ctx.measureText(testLine);
    
    if (metrics.width > maxWidth && i > 0) {
      ctx.fillText(line, width / 2, y);
      line = words[i] + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, width / 2, y);
  
  // Bottom collage area
  const collageTop = 350;
  const collageHeight = height - collageTop - 50;
  
  // Load hero sticker
  try {
    const heroImg = await loadImage(heroStickerUrl);
    
    // Draw hero sticker (larger, centered)
    const heroSize = 300;
    ctx.drawImage(
      heroImg,
      (width - heroSize) / 2,
      collageTop + 50,
      heroSize,
      heroSize
    );
    
    // Draw themed stickers around hero
    const stickerCount = 6 + Math.floor(Math.random() * 5); // 6-10 stickers
    const positions = generateStickerPositions(width, collageHeight, heroSize, stickerCount);
    
    ctx.font = '80px Arial';
    for (let i = 0; i < stickerCount; i++) {
      const sticker = theme.stickers[i % theme.stickers.length];
      const pos = positions[i];
      
      // Add slight shadow for depth
      ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
      ctx.shadowBlur = 5;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      
      ctx.fillText(sticker, pos.x, collageTop + pos.y);
      
      // Reset shadow
      ctx.shadowColor = 'transparent';
    }
  } catch (error) {
    console.error('Error loading hero sticker:', error);
  }
  
  return canvas;
}

function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}

const MAX_POSITIONING_ATTEMPTS = 50;

function generateStickerPositions(width, height, heroSize, count) {
  const positions = [];
  const centerX = width / 2;
  const centerY = height / 2;
  const minDistance = 150;
  const heroRadius = heroSize / 2;
  
  for (let i = 0; i < count; i++) {
    let validPosition = false;
    let attempts = 0;
    let x, y;
    
    while (!validPosition && attempts < MAX_POSITIONING_ATTEMPTS) {
      x = 100 + Math.random() * (width - 200);
      y = 100 + Math.random() * (height - 200);
      
      // Check distance from center (hero)
      const distFromCenter = Math.sqrt(
        Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
      );
      
      if (distFromCenter > heroRadius + 80) {
        // Check distance from other stickers
        validPosition = true;
        for (const pos of positions) {
          const dist = Math.sqrt(
            Math.pow(x - pos.x, 2) + Math.pow(y - pos.y, 2)
          );
          if (dist < minDistance) {
            validPosition = false;
            break;
          }
        }
      }
      
      attempts++;
    }
    
    if (validPosition) {
      positions.push({ x, y });
    }
  }
  
  return positions;
}
