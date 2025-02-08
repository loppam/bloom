import PropTypes from "prop-types";
import { useState, useEffect } from "react";

const ElementsControls = ({ canvas }) => {
  const [selectedColor, setSelectedColor] = useState("#393939");
  const [strokeWidth, setStrokeWidth] = useState(4);
  const [activeObject, setActiveObject] = useState(null);

  useEffect(() => {
    const handleSelection = () => {
      const activeObj = canvas.getActiveObject();
      setActiveObject(activeObj);
      if (activeObj) {
        setSelectedColor(activeObj.fill || "#393939");
        setStrokeWidth(activeObj.strokeWidth || 4);
      }
    };

    canvas.on("selection:created", handleSelection);
    canvas.on("selection:cleared", handleSelection);
    canvas.on("selection:updated", handleSelection);

    return () => {
      canvas.off("selection:created", handleSelection);
      canvas.off("selection:cleared", handleSelection);
      canvas.off("selection:updated", handleSelection);
    };
  }, [canvas]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Delete" && canvas.getActiveObject()) {
        canvas.remove(canvas.getActiveObject());
        canvas.renderAll();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [canvas]);

  const handleColorChange = (color) => {
    setSelectedColor(color);
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      activeObject.set("fill", color);
      canvas.renderAll();
    }
  };

  const handleStrokeWidthChange = (width) => {
    setStrokeWidth(width);
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      activeObject.set("strokeWidth", width);
      canvas.renderAll();
    }
  };

  return (
    <div className="control-panel element">
      <div className="shapes-grid">
        <button
          onClick={() => {
            const rect = new window.fabric.Rect({
              left: 100,
              top: 100,
              width: 100,
              height: 100,
              fill: "#393939",
            });
            canvas.add(rect);
            canvas.renderAll();
          }}
        >
          <div className="shape-preview square"></div>
          Square
        </button>

        <button
          onClick={() => {
            const circle = new window.fabric.Circle({
              left: 100,
              top: 100,
              radius: 50,
              fill: "#393939",
            });
            canvas.add(circle);
            canvas.renderAll();
          }}
        >
          <div className="shape-preview circle"></div>
          Circle
        </button>

        <button
          onClick={() => {
            const triangle = new window.fabric.Triangle({
              left: 100,
              top: 100,
              width: 100,
              height: 87, // To make it equilateral: height = width * (√3/2)
              fill: "#393939",
            });
            canvas.add(triangle);
            canvas.renderAll();
          }}
        >
          <div className="shape-preview triangle"></div>
          Triangle
        </button>

        <button
          onClick={() => {
            const line = new window.fabric.Line([50, 50, 200, 50], {
              stroke: "#393939",
              strokeWidth: 4,
            });
            canvas.add(line);
            canvas.renderAll();
          }}
        >
          <div className="shape-preview line"></div>
          Line
        </button>

        <button
          onClick={() => {
            const arrow = new window.fabric.Path(
              "M 0 0 L 200 0 L 190 -10 M 200 0 L 190 10",
              {
                left: 100,
                top: 100,
                stroke: "#393939",
                strokeWidth: 4,
                fill: "",
              }
            );
            canvas.add(arrow);
            canvas.renderAll();
          }}
        >
          <div className="shape-preview arrow"></div>
          Arrow
        </button>

        <button
          onClick={() => {
            const roundedRect = new window.fabric.Rect({
              left: 100,
              top: 100,
              width: 100,
              height: 100,
              fill: "#393939",
              rx: 15,
              ry: 15,
            });
            canvas.add(roundedRect);
            canvas.renderAll();
          }}
        >
          <div className="shape-preview rounded-square"></div>
          Rounded
        </button>
      </div>

      {activeObject && (
        <div className="element-controls">
          <div className="control-section">
            <h3>Color</h3>
            <input
              type="color"
              value={selectedColor}
              onChange={(e) => handleColorChange(e.target.value)}
            />
          </div>

          <div className="control-section">
            <h3>Stroke Width</h3>
            <input
              type="range"
              min="1"
              max="20"
              value={strokeWidth}
              onChange={(e) =>
                handleStrokeWidthChange(parseInt(e.target.value))
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};

ElementsControls.propTypes = {
  canvas: PropTypes.object.isRequired,
};

export default ElementsControls;
