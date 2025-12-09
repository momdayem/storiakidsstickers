import { useState } from 'react';
import { generatePDF, downloadPDF, downloadImage } from '../utils/pdfGenerator';

const PreviewStep = ({ heroSticker, pages, kidName, onRetry }) => {
  const [selectedPage, setSelectedPage] = useState(0);
  const [downloading, setDownloading] = useState(false);

  const handleDownloadPDF = async () => {
    setDownloading(true);
    try {
      const pdf = await generatePDF(pages);
      downloadPDF(pdf, `${kidName}-sticker-book.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
    setDownloading(false);
  };

  const handleDownloadCurrentPage = () => {
    downloadImage(
      pages[selectedPage],
      `${kidName}-page-${selectedPage + 1}.png`
    );
  };

  const handleDownloadHero = () => {
    downloadImage(heroSticker, `${kidName}-hero-sticker.png`);
  };

  const handleDownloadAllPages = () => {
    pages.forEach((page, index) => {
      setTimeout(() => {
        downloadImage(page, `${kidName}-page-${index + 1}.png`);
      }, index * 200);
    });
  };

  return (
    <div>
      <h2>🎉 Your Sticker Book is Ready!</h2>
      
      <div className="message success">
        Successfully created {pages.length} sticker pages!
      </div>

      {/* Hero Sticker Preview */}
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <h3 style={{ color: '#667eea', marginBottom: '10px' }}>Hero Sticker</h3>
        <div style={{ 
          display: 'inline-block',
          padding: '20px',
          background: 'white',
          borderRadius: '15px',
          border: '2px solid #e0e0e0'
        }}>
          <img 
            src={heroSticker} 
            alt="Hero Sticker" 
            style={{ 
              maxWidth: '200px',
              maxHeight: '200px',
              borderRadius: '10px'
            }}
          />
        </div>
      </div>

      {/* Page Navigation */}
      <div style={{ margin: '30px 0' }}>
        <h3 style={{ color: '#667eea', marginBottom: '10px' }}>
          Preview Pages ({selectedPage + 1}/{pages.length})
        </h3>
        
        <div style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '15px',
          overflowX: 'auto',
          padding: '10px 0'
        }}>
          {pages.map((_, index) => (
            <button
              key={index}
              onClick={() => setSelectedPage(index)}
              style={{
                padding: '10px 20px',
                background: selectedPage === index ? '#667eea' : 'white',
                color: selectedPage === index ? 'white' : '#667eea',
                border: '2px solid #667eea',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                minWidth: '60px'
              }}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <div className="preview-page">
          <img 
            src={pages[selectedPage]} 
            alt={`Page ${selectedPage + 1}`}
            style={{ width: '100%', borderRadius: '10px' }}
          />
        </div>
      </div>

      {/* Download Options */}
      <div className="download-options">
        <button 
          onClick={handleDownloadPDF}
          disabled={downloading}
        >
          {downloading ? 'Generating...' : '📄 Download Complete PDF'}
        </button>
        
        <button 
          className="secondary"
          onClick={handleDownloadCurrentPage}
        >
          🖼️ Download Current Page PNG
        </button>
        
        <button 
          className="secondary"
          onClick={handleDownloadAllPages}
        >
          📚 Download All Pages (PNG)
        </button>
        
        <button 
          className="secondary"
          onClick={handleDownloadHero}
        >
          ⭐ Download Hero Sticker PNG
        </button>
      </div>

      <div style={{ marginTop: '30px' }}>
        <button 
          className="secondary"
          onClick={onRetry}
        >
          🔄 Create Another Sticker Book
        </button>
      </div>
    </div>
  );
};

export default PreviewStep;
