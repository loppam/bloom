import { useEffect, useState } from "react";

const Loader = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 9;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev % totalSteps) + 1);
    }, 100); // Change frame every 100ms for smoother animation

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loader-container">
      <img
        src={`/load${currentStep}.svg`}
        alt={`Loading animation frame ${currentStep}`}
        className="loader-frame"
      />
    </div>
  );
};

export default Loader;
