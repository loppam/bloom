import PropTypes from "prop-types";
import { fabric } from "fabric";

const TextControls = ({ canvas }) => {
  const defaultStyles = [
    {
      name: "Heading",
      style: {
        fontSize: 32,
        fontWeight: "600",
        fontFamily: "Arial",
      },
    },
    {
      name: "Subheading",
      style: {
        fontSize: 20,
        fontWeight: "400",
        fontFamily: "Arial",
      },
    },
    {
      name: "Body",
      style: {
        fontSize: 16,
        fontWeight: "300",
        fontFamily: "Arial",
      },
    },
  ];

  const fonts = ["Arial", "Gendy", "Genos", "Times New Roman", "Helvetica"];

  const addText = (styleConfig = defaultStyles[2]) => {
    const text = new fabric.IText("Click to edit", {
      left: 100,
      top: 100,
      ...styleConfig.style,
    });
    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.renderAll();
  };

  const changeFont = (font) => {
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === "i-text") {
      activeObject.set("fontFamily", font);
      canvas.renderAll();
    }
  };

  const changeFontSize = (size) => {
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === "i-text") {
      activeObject.set("fontSize", size);
      canvas.renderAll();
    }
  };

  const changeFontWeight = (weight) => {
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === "i-text") {
      activeObject.set("fontWeight", weight);
      canvas.renderAll();
    }
  };

  return (
    <div className="control-panel text">
      <div className="text-controls-section">
        <button className="add-text-button" onClick={() => addText()}>
          Add a text box
        </button>
      </div>

      <div className="text-controls-section">
        <h3>Default styles</h3>
        {defaultStyles.map((style, index) => (
          <button
            key={index}
            className="style-button"
            onClick={() => addText(style)}
          >
            <div
              className="fixed"
              style={{
                fontSize: style.style.fontSize,
                fontWeight: style.style.fontWeight,
              }}
            >
              {style.name}
            </div>
          </button>
        ))}
      </div>

      <div className="text-controls-section">
        <h3>Font Size</h3>
        <input
          type="range"
          min="8"
          max="72"
          defaultValue="16"
          onChange={(e) => changeFontSize(parseInt(e.target.value))}
        />
      </div>

      <div className="text-controls-section">
        <h3>Font Weight</h3>
        <select onChange={(e) => changeFontWeight(e.target.value)}>
          <option value="300">Light</option>
          <option value="400">Regular</option>
          <option value="600">Semi Bold</option>
          <option value="700">Bold</option>
        </select>
      </div>

      <div className="text-controls-section">
        <h3>Fonts</h3>
        <div className="fonts-grid">
          {fonts.map((font, index) => (
            <button
              key={index}
              className="font-button"
              onClick={() => changeFont(font)}
              style={{ fontFamily: font }}
            >
              <div style={{ fontFamily: font }}>{font}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

TextControls.propTypes = {
  canvas: PropTypes.object.isRequired,
};

export default TextControls;
