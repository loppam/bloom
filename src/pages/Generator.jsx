/* eslint-disable no-unused-vars */
import { useState } from "react";
import { LuWandSparkles } from "react-icons/lu";
import { HiDownload } from "react-icons/hi";
import { FiEdit, FiShare2, FiCopy } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import Cake from "/cake.svg";
import Money from "/money.svg";
import Fav from "/fav.svg";
import Blend from "/blend.svg";
import EmptyState from "/empty.svg";
import Loader from "../components/Loader";

const Generator = () => {
  const [prompt, setPrompt] = useState("");
  const [aspectRatio, setAspectRatio] = useState("1:1");
  const [isAspectRatioOpen, setIsAspectRatioOpen] = useState(false);
  const [generatedDesigns, setGeneratedDesigns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [generatedImages, setGeneratedImages] = useState([]);
  const [copyStatus, setCopyStatus] = useState("");

  const navigate = useNavigate();

  const presetPrompts = [
    { icon: <img src={Cake} alt="Cake" />, text: "Create a Birthday flyer" },
    { icon: <img src={Blend} alt="Money" />, text: "Create a Logo" },
    { icon: <img src={Fav} alt="Fav" />, text: "Create an Instagram post" },
    { icon: <img src={Money} alt="Blend" />, text: "Design Business cards" },
  ];

  const aspectRatioOptions = ["1:1", "16:9", "9:16"];

  const generateImages = async () => {
    if (!prompt) {
      setError("Please enter a prompt");
      return;
    }

    // const supportedRatios = ["1:1", "16:9", "9:16"];
    // if (!supportedRatios.includes(aspectRatio)) {
    //   setError("Please select a supported aspect ratio (1:1, 16:9, or 9:16)");
    //   return;
    // }

    setIsLoading(true);
    setError(null);

  //   try {
  //     const response = await fetch(
  //       "https://api.openai.com/v1/images/generations",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
  //         },
  //         body: JSON.stringify({
  //           prompt: prompt,
  //           n: 1,
  //           model: "dall-e-3",
  //           quality: "standard",
  //           size: getImageSize(aspectRatio),
  //           response_format: "url",
  //         }),
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Failed to generate images");
  //     }

  //     const data = await response.json();
  //     setGeneratedImages(data.data);
  //     setGeneratedDesigns(data.data);
  //   } catch (err) {
  //     setError(err.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
    if (!prompt) {
      setError("Please enter a prompt");
      return;
    }
  
    setIsLoading(true);
    setError(null);
  
    // Set a timeout to simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate("/waitlist", {
        state: {
          message: "Join our waitlist to start creating amazing AI-generated designs!",
        },
      });
    }, 5000);
  };
  // Update the getImageSize function for DALL-E 3 supported sizes
  const getImageSize = (ratio) => {
    const sizes = {
      "1:1": "1024x1024",
      "16:9": "1792x1024",
      "9:16": "1024x1792",
    };
    return sizes[ratio] || "1024x1024";
  };

  const handleDownload = (imageUrl, index) => {
    // Create a temporary link
    const link = document.createElement("a");
    link.href = imageUrl;
    link.target = "_blank"; // Open in new tab
    link.rel = "noopener noreferrer";

    // Trigger click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopy = async (imageUrl) => {
    try {
      await navigator.clipboard.writeText(imageUrl);
      setCopyStatus("Copied!");
      setTimeout(() => setCopyStatus(""), 2000);
    } catch (error) {
      console.error("Error copying URL:", error);
      setCopyStatus("Failed to copy");
    }
  };

  const handleEdit = async (image) => {
    try {
      const proxyUrl = `/api/proxy-image?imageUrl=${encodeURIComponent(
        image.url
      )}`;
      const response = await fetch(proxyUrl);

      if (!response.ok) {
        throw new Error("Failed to fetch image");
      }

      const blob = await response.blob();
      const base64 = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });

      navigate("/editor", {
        state: {
          imageUrl: base64,
          imageType: "image",
          crossOrigin: "anonymous",
        },
      });
    } catch (error) {
      console.error("Error processing image:", error);
      setError(
        "Unable to edit image. Please try refreshing the page or generating a new image."
      );
    }
  };

  const handleShare = async (imageUrl) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Check out my Bloom design!",
          text: "Created with Bloom AI",
          url: imageUrl,
        });
      } else {
        await navigator.clipboard.writeText(imageUrl);
        // You might want to show a toast notification here
        console.log("Image URL copied to clipboard");
      }
    } catch (error) {
      console.error("Error sharing image:", error);
    }
  };

  return (
    <div className="generator">
      <div className="content">
        <div className="generator-content">
          <div className="title">
            <h2>Hello Bloomer</h2>
            <h1>What can I help bloom today?</h1>
          </div>
          <div className="prompter">
            <div className="preset-prompts">
              {presetPrompts.map((preset, index) => (
                <button
                  key={index}
                  className="preset-prompt"
                  onClick={() => setPrompt(preset.text)}
                >
                  <span>{preset.icon}</span>
                  {preset.text}
                </button>
              ))}
            </div>

            <div className="input-container">
              <div className="input-wrapper">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe your design"
                  className="prompt-inputt"
                />
                <button
                  className="create-button"
                  onClick={generateImages}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="loading-spinner"></span>
                  ) : (
                    <LuWandSparkles />
                  )}
                  {isLoading ? "Blooming..." : "Create"}
                </button>
              </div>
            </div>

            <div className="options">
              {/* <button className="option-button">
              <CiImageOn />
              Add Image
            </button> */}
              <div className="aspect-ratio-container">
                <button
                  className="option-button aspect-ratio-button"
                  onClick={() => setIsAspectRatioOpen(!isAspectRatioOpen)}
                >
                  <div className="ratio-shape"></div>
                  <span>{aspectRatio}</span>
                </button>
                {isAspectRatioOpen && (
                  <div className="aspect-ratio-popup">
                    {aspectRatioOptions.map((ratio) => (
                      <button
                        key={ratio}
                        className={`ratio-option ${
                          aspectRatio === ratio ? "active" : ""
                        }`}
                        onClick={() => {
                          setAspectRatio(ratio);
                          setIsAspectRatioOpen(false);
                        }}
                      >
                        <div
                          className={`ratio-icon ratio-${ratio.replace(
                            ":",
                            "-"
                          )}`}
                        />
                        {ratio}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* <div className="tabs">
            <button className="tab active">Recent history</button>
            <button className="tab">Inspirations</button>
          </div> */}

          {error && <div className="error-message">{error}</div>}

          {isLoading ? (
            <div className="empty-state">
              <Loader />
            </div>
          ) : generatedImages.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <img src={EmptyState} alt="Empty State" />
              </div>
              <p>No designs yet</p>
            </div>
          ) : (
            <div className="generated-designs">
              {generatedImages.map((image, index) => (
                <div key={index} className="design-item">
                  <img src={image.url} alt={`Generated design ${index + 1}`} />
                  <div className="design-actions">
                    <button
                      className="design-action-button"
                      onClick={() => handleCopy(image.url)}
                      title={copyStatus || "Copy URL"}
                    >
                      {copyStatus ? copyStatus : <FiCopy size={20} />}
                    </button>
                    <button
                      className="design-action-button"
                      onClick={() => handleDownload(image.url, index)}
                      title="Download"
                    >
                      <HiDownload size={20} />
                    </button>
                    <button
                      className="design-action-button"
                      onClick={() => handleEdit(image)}
                      title="Edit"
                    >
                      <FiEdit size={20} />
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Generator;
