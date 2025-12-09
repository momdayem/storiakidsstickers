const ProgressIndicator = ({ currentStep }) => {
  const steps = [
    { label: 'Info', number: 1 },
    { label: 'Photos', number: 2 },
    { label: 'Create', number: 3 },
    { label: 'Download', number: 4 }
  ];

  const progressPercentage = (currentStep / (steps.length - 1)) * 100;

  return (
    <div className="progress-container">
      <div className="progress-steps">
        <div className="progress-bar" style={{ width: `${progressPercentage}%` }} />
        {steps.map((step, index) => (
          <div
            key={index}
            className={`progress-step ${
              index === currentStep ? 'active' : ''
            } ${index < currentStep ? 'completed' : ''}`}
          >
            <div className="progress-step-circle">
              {index < currentStep ? '✓' : step.number}
            </div>
            <div className="progress-step-label">{step.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;
