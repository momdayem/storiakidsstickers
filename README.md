# 🎨 Storiakids Stickers

A mobile-first web application that creates personalized sticker books for kids! Parents can upload photos, select a theme, and generate custom sticker pages featuring their child.

## ✨ Features

- **Mobile-First Design**: Optimized for mobile devices with responsive layout
- **Kid Name & Theme Selection**: Choose from 4 themes (Jungle, Space, Ocean, Princess/Hero)
- **Photo Upload**: Upload 3-6 photos with drag-and-drop support
- **Face Detection**: Automatic face detection using MediaPipe AI
- **Photo Scoring**: Intelligent algorithm selects the best photo
- **Hero Sticker Creation**: Generates one consistent hero sticker with transparent background, outline, and shadow
- **6 Custom Pages**: Creates 6 A4 sticker-style pages with:
  - Themed title at the top
  - Story text (60-120 words) featuring the child's name
  - Collage with hero sticker and 6-10 themed emoji stickers
- **Progress Indicator**: Clear step-by-step progress through the creation process
- **Multiple Download Options**:
  - Complete PDF with all 6 pages
  - Individual page PNGs
  - Hero sticker PNG
- **Retry Capability**: Easy retry if face detection fails or user wants to start over

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/momdayem/storiakidsstickers.git
cd storiakidsstickers

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173/`

### Build for Production

```bash
# Build the application
npm run build

# Preview production build
npm run preview
```

## 📱 How to Use

1. **Enter Kid's Name**: Type in your child's name
2. **Select Theme**: Choose from Jungle, Space, Ocean, or Princess/Hero
3. **Upload Photos**: Upload 3-6 clear photos of your child
   - Photos should have good lighting
   - Face should be clearly visible
   - Best results with simple backgrounds
4. **Processing**: The app will:
   - Detect faces in all photos
   - Score and select the best photo
   - Create a hero sticker
   - Generate 6 themed pages
5. **Preview & Download**: 
   - Preview all generated pages
   - Download complete PDF or individual PNGs
   - Download the hero sticker separately

## 🎭 Themes

### 🦁 Jungle
Explore the rainforest with lions, elephants, monkeys, and tropical birds!

### 🚀 Space
Blast off into space with rockets, planets, stars, and friendly aliens!

### 🐠 Ocean
Dive underwater with dolphins, fish, whales, and coral reefs!

### 👑 Princess/Hero
Epic adventures with castles, unicorns, crowns, and magical creatures!

## 🛠️ Technology Stack

- **Frontend**: React 19 with Vite
- **Face Detection**: MediaPipe Tasks Vision (BlazeFace)
- **Image Processing**: Canvas API
- **PDF Generation**: jsPDF
- **Styling**: Pure CSS with mobile-first approach

## 📦 Dependencies

- `@mediapipe/tasks-vision` - AI-powered face detection
- `jspdf` - PDF generation
- `html2canvas` - Canvas rendering
- `konva` / `react-konva` - Advanced canvas manipulation

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍👩‍👧‍👦 Perfect For

- Birthday parties
- Scrapbooking
- Kids' activities
- Personalized gifts
- Educational projects
- Family fun time

---

Made with ❤️ for creating magical memories with kids!
