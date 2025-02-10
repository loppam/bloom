import { useState } from "react";
import { LuWandSparkles } from "react-icons/lu";
import Loader from "../Loader";
import { fabric } from "fabric";
import PropTypes from "prop-types";

const DrawControls = ({ canvas }) => {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [generatedImages, setGeneratedImages] = useState([]);

  const generateImages = async () => {
    if (!prompt) {
      setError("Please enter a prompt");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://api.openai.com/v1/images/generations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            prompt: prompt,
            n: 4, // Generate 4 variations
            size: "1024x1024",
            response_format: "url",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate images");
      }

      const data = await response.json();
      setGeneratedImages(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        fabric.Image.fromURL(event.target.result, (img) => {
          img.set({
            type: "image",
            scaleToWidth: 200,
          });
          canvas.add(img);
          canvas.renderAll();
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="control-panel create">
      <h1>Bloom Create</h1>
      <hr />
      <div className="input-wrapper">
        <textarea
          placeholder="Describe your design"
          className="prompt-input"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div>

      <div className="action-row">
        <button
          className="action-button"
          onClick={() => document.getElementById("imageUpload").click()}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 8H10M8 6V10M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Add Image
        </button>
        <input
          type="file"
          id="imageUpload"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImageUpload}
        />
        <button className="action-button">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke="#1B101E"
              d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
            />
          </svg>
          1:1
        </button>
      </div>

      <button
        className="create-buttonn"
        onClick={generateImages}
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="loading-spinner"></span>
        ) : (
          <LuWandSparkles />
        )}
        {isLoading ? "Creating..." : "Create"}
      </button>

      {error && <div className="error-message">{error}</div>}

      {isLoading ? (
        <div className="variations-section">
          <h3>Generating variations...</h3>
          <Loader />
        </div>
      ) : generatedImages.length > 0 ? (
        <div className="variations-section">
          <h3>Variations</h3>
          <div className="variations-grid">
            {generatedImages.map((image, index) => (
              <div
                key={index}
                className="variation-item"
                onClick={() => {
                  fabric.Image.fromURL(image.url, (img) => {
                    img.set({
                      type: "image",
                      scaleToWidth: 200,
                    });
                    canvas.add(img);
                    canvas.renderAll();
                  });
                }}
              >
                <img src={image.url} alt={`Variation ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

DrawControls.propTypes = {
  canvas: PropTypes.object.isRequired,
};

export default DrawControls;
