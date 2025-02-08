import PropTypes from "prop-types";

const AspectControls = ({ canvas }) => {
  const ratios = [
    { id: "1:1", label: "1:1" },
    { id: "16:9", label: "16:9" },
    { id: "9:16", label: "9:16" },
    { id: "4:3", label: "4:3" },
    { id: "3:4", label: "3:4" },
    { id: "2:1", label: "2:1" },
  ];

  const handleRatioChange = (ratio) => {
    const [width, height] = ratio.split(":").map(Number);
    canvas.setDimensions({
      width: 800,
      height: (800 * height) / width,
    });
    canvas.renderAll();
  };

  return (
    <div className="control-panel ratio">
      {ratios.map((ratio) => (
        <button
          key={ratio.id}
          className={`aspect-btn ratio-${ratio.id.replace(":", "-")}`}
          onClick={() => handleRatioChange(ratio.id)}
        >
          <div className="ratio-box" />
          <span>{ratio.label}</span>
        </button>
      ))}
    </div>
  );
};

AspectControls.propTypes = {
  canvas: PropTypes.object.isRequired,
};

export default AspectControls;
