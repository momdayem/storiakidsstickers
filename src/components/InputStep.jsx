import { useState } from 'react';
import { themes } from '../utils/themes';

const InputStep = ({ onComplete }) => {
  const [name, setName] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && selectedTheme) {
      onComplete(name.trim(), selectedTheme);
    }
  };

  return (
    <div>
      <h2>Let's Get Started!</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="kidName">What's your kid's name?</label>
          <input
            type="text"
            id="kidName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name..."
            required
          />
        </div>

        <div className="form-group">
          <label>Choose a theme:</label>
          <div className="theme-selector">
            {Object.entries(themes).map(([key, theme]) => (
              <div
                key={key}
                className={`theme-option ${selectedTheme === key ? 'selected' : ''}`}
                onClick={() => setSelectedTheme(key)}
              >
                <div className="theme-icon">{theme.icon}</div>
                <div className="theme-name">{theme.name}</div>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" disabled={!name.trim() || !selectedTheme}>
          Continue to Photos
        </button>
      </form>
    </div>
  );
};

export default InputStep;
