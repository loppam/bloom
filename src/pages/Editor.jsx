/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { FiPenTool, FiGrid, FiType, FiImage, FiSquare } from "react-icons/fi";
import { LuWandSparkles } from "react-icons/lu";
import { fabric } from "fabric";
import TextControls from "../components/controls/TextControls";
import DrawControls from "../components/controls/DrawControls";
import ElementsControls from "../components/controls/ElementsControls";
import BackgroundControls from "../components/controls/BackgroundControls";
import AspectControls from "../components/controls/AspectControls";
import { useLocation, useNavigate } from "react-router-dom";
// import Home from "/home-2.svg"

const Editor = () => {
  const [canvas, setCanvas] = useState(null);
  const [activeTab, setActiveTab] = useState("home");
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    target: null,
  });

  const handleTabClick = (tabId) => {
    setActiveTab((currentTab) => (currentTab === tabId ? "home" : tabId));
  };

  useEffect(() => {
    // Check if user came from generator (will have imageUrl in state)
    // OR if there's an imageUrl in the history state
    if (location.state?.imageUrl || navigate.state?.usr?.imageUrl) {
      // Set a timeout to redirect after 3 seconds
      const redirectTimer = setTimeout(() => {
        navigate("/waitlist", {
          replace: true,
          state: {
            message:
              "The editor is currently in beta. Join our waitlist to get early access!",
          },
        });
      }, 3000); // 3 seconds delay

      // Cleanup the timer if component unmounts
      return () => clearTimeout(redirectTimer);
    }
  }, [location.state, navigate]);

  useEffect(() => {
    let fabricCanvas = null;

    const initCanvas = () => {
      try {
        // Create canvas element
        const canvasEl = document.createElement("canvas");
        canvasEl.id = "canvas";

        // Get container and append canvas
        const container = document.querySelector(".canvas-container");
        if (!container) throw new Error("Canvas container not found");
        container.innerHTML = ""; // Clear any existing content
        container.appendChild(canvasEl);

        // Calculate dimensions while maintaining aspect ratio
        const padding = 40;
        const containerWidth = container.clientWidth - padding;
        const containerHeight = container.clientHeight - padding;

        // Default to 1:1 aspect ratio if not specified
        const aspectRatio = 1;

        // Calculate dimensions that fit the container while maintaining aspect ratio
        let width, height;
        if (containerWidth / aspectRatio <= containerHeight) {
          // Width is the limiting factor
          width = containerWidth;
          height = containerWidth / aspectRatio;
        } else {
          // Height is the limiting factor
          height = containerHeight;
          width = height * aspectRatio;
        }

        // Initialize Fabric canvas
        fabricCanvas = new fabric.Canvas("canvas", {
          width,
          height,
          backgroundColor: "#f5f5f5",
          preserveObjectStacking: true,
        });

        setCanvas(fabricCanvas);

        // Handle window resize
        const handleResize = () => {
          const newContainerWidth = container.clientWidth - padding;
          const newContainerHeight = container.clientHeight - padding;

          let newWidth, newHeight;
          if (newContainerWidth / aspectRatio <= newContainerHeight) {
            newWidth = newContainerWidth;
            newHeight = newContainerWidth / aspectRatio;
          } else {
            newHeight = newContainerHeight;
            newWidth = newHeight * aspectRatio;
          }

          fabricCanvas.setDimensions({
            width: newWidth,
            height: newHeight,
          });
          fabricCanvas.renderAll();
        };

        window.addEventListener("resize", handleResize);

        return () => {
          window.removeEventListener("resize", handleResize);
        };
      } catch (err) {
        setError(err.message);
        console.error("Canvas initialization error:", err);
      }
    };

    initCanvas();

    // Cleanup
    return () => {
      if (fabricCanvas) {
        fabricCanvas.dispose();
      }
    };
  }, []); // Empty dependency array since we only want to initialize once

  useEffect(() => {
    if (!canvas) return;

    const handleContextMenu = (e) => {
      e.preventDefault();
      const target = canvas.findTarget(e);
      if (target) {
        canvas.setActiveObject(target);
        setContextMenu({
          visible: true,
          x: e.clientX,
          y: e.clientY,
          target: target,
        });
      }
    };

    const handleClick = () => {
      setContextMenu({ visible: false, x: 0, y: 0, target: null });
    };

    // Add the event listener to the canvas container instead of just the canvas element
    const canvasContainer = document.querySelector(".canvas-container");
    canvasContainer.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("click", handleClick);

    return () => {
      canvasContainer.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("click", handleClick);
    };
  }, [canvas]);

  useEffect(() => {
    if (!canvas) return;

    const imageUrl = location.state?.imageUrl;

    if (imageUrl) {
      // For base64 images, we don't need additional CORS settings
      const options = imageUrl.startsWith("data:")
        ? {}
        : { crossOrigin: "anonymous" };

      fabric.Image.fromURL(
        imageUrl,
        (img) => {
          const canvasWidth = canvas.width;
          const canvasHeight = canvas.height;
          const scale = Math.min(
            (canvasWidth * 0.8) / img.width,
            (canvasHeight * 0.8) / img.height
          );

          img.scale(scale);
          img.set({
            type: "image",
            left: (canvasWidth - img.width * scale) / 2,
            top: (canvasHeight - img.height * scale) / 2,
          });

          canvas.add(img);
          canvas.renderAll();
        },
        options
      );
    }
  }, [canvas, location.state?.imageUrl]);

  const handleLayerOrder = (action) => {
    const activeObject = canvas.getActiveObject();
    if (!activeObject) return;

    switch (action) {
      case "front":
        activeObject.bringToFront();
        break;
      case "forward":
        activeObject.bringForward();
        break;
      case "back":
        activeObject.sendToBack();
        break;
      case "backward":
        activeObject.sendBackwards();
        break;
    }
    canvas.renderAll();
    setContextMenu({ visible: false, x: 0, y: 0, target: null });
  };

  const handleDeleteObject = () => {
    if (contextMenu.target) {
      canvas.remove(contextMenu.target);
      canvas.renderAll();
      setContextMenu({ visible: false, x: 0, y: 0, target: null });
    }
  };

  const handleRemoveBackground = async () => {
    if (!contextMenu.target || contextMenu.target.type !== "image") return;

    try {
      // Convert image to base64
      const imageData = contextMenu.target.toDataURL({
        format: "png",
      });
      const base64Data = imageData.replace(/^data:image\/\w+;base64,/, "");

      const response = await fetch("https://api.remove.bg/v1.0/removebg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": import.meta.env.VITE_REMOVEBG_API_KEY,
        },
        body: JSON.stringify({
          image_file_b64: base64Data,
          size: "regular",
        }),
      });

      if (!response.ok) throw new Error("Failed to remove background");

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      fabric.Image.fromURL(url, (img) => {
        img.set({
          left: contextMenu.target.left,
          top: contextMenu.target.top,
          scaleX: contextMenu.target.scaleX,
          scaleY: contextMenu.target.scaleY,
        });
        canvas.remove(contextMenu.target);
        canvas.add(img);
        canvas.renderAll();
        URL.revokeObjectURL(url);
      });
    } catch (err) {
      console.error("Error removing background:", err);
    }
    setContextMenu({ visible: false, x: 0, y: 0, target: null });
  };

  const handleDownload = () => {
    if (!canvas) return;

    const dataURL = canvas.toDataURL({
      format: "png",
      quality: 1,
    });

    const link = document.createElement("a");
    link.download = "canvas-design.png";
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderControls = () => {
    if (activeTab === "home") return null;

    const controlComponents = {
      text: TextControls,
      elements: ElementsControls,
      background: BackgroundControls,
      create: DrawControls,
      aspect: AspectControls,
    };

    const ControlComponent = controlComponents[activeTab];
    return ControlComponent ? (
      <div className="controls-sidebar">
        <ControlComponent canvas={canvas} />
      </div>
    ) : null;
  };

  const sidebarItems = [
    {
      id: "home",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="icon-path"
            d="M9.02 2.83992L3.63 7.03992C2.73 7.73992 2 9.22992 2 10.3599V17.7699C2 20.0899 3.89 21.9899 6.21 21.9899H17.79C20.11 21.9899 22 20.0899 22 17.7799V10.4999C22 9.28992 21.19 7.73992 20.2 7.04992L14.02 2.71992C12.62 1.73992 10.37 1.78992 9.02 2.83992Z"
            strokeLinejoin="round"
          />
          <path
            className="icon-path"
            d="M12 17.99V14.99"
            strokeLinejoin="round"
          />
        </svg>
      ),
      label: "Home",
    },
    {
      id: "create",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="icon-path"
            d="M3.49945 20.4999C4.32945 21.3299 5.66945 21.3299 6.49945 20.4999L19.4995 7.49994C20.3295 6.66994 20.3295 5.32994 19.4995 4.49994C18.6695 3.66994 17.3295 3.66994 16.4995 4.49994L3.49945 17.4999C2.66945 18.3299 2.66945 19.6699 3.49945 20.4999Z"
          />
          <path className="icon-path" d="M18.0098 8.98999L15.0098 5.98999" />
          <path
            className="icon-path"
            d="M8.5 2.44L10 2L9.56 3.5L10 5L8.5 4.56L7 5L7.44 3.5L7 2L8.5 2.44Z"
          />
          <path
            className="icon-path"
            d="M4.5 8.44L6 8L5.56 9.5L6 11L4.5 10.56L3 11L3.44 9.5L3 8L4.5 8.44Z"
          />
          <path
            className="icon-path"
            d="M19.5 13.44L21 13L20.56 14.5L21 16L19.5 15.56L18 16L18.44 14.5L18 13L19.5 13.44Z"
          />
        </svg>
      ),
      label: "Create",
    },
    {
      id: "elements",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="icon-path"
            d="M22 8.27V4.23C22 2.64 21.36 2 19.77 2H15.73C14.14 2 13.5 2.64 13.5 4.23V8.27C13.5 9.86 14.14 10.5 15.73 10.5H19.77C21.36 10.5 22 9.86 22 8.27Z"
          />
          <path
            className="icon-path"
            d="M10.5 8.52V3.98C10.5 2.57 9.86 2 8.27 2H4.23C2.64 2 2 2.57 2 3.98V8.51C2 9.93 2.64 10.49 4.23 10.49H8.27C9.86 10.5 10.5 9.93 10.5 8.52Z"
          />
          <path
            className="icon-path"
            d="M10.5 19.77V15.73C10.5 14.14 9.86 13.5 8.27 13.5H4.23C2.64 13.5 2 14.14 2 15.73V19.77C2 21.36 2.64 22 4.23 22H8.27C9.86 22 10.5 21.36 10.5 19.77Z"
          />
          <path className="icon-path" d="M14.5 17.5H20.5" />
          <path className="icon-path" d="M17.5 20.5V14.5" />
        </svg>
      ),
      label: "Elements",
    },
    {
      id: "text",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="icon-path"
            d="M2.66992 7.17003V5.35003C2.66992 4.20003 3.59992 3.28003 4.73992 3.28003H19.2599C20.4099 3.28003 21.3299 4.21003 21.3299 5.35003V7.17003"
          />
          <path className="icon-path" d="M12 20.7201V4.11011" />
          <path className="icon-path" d="M8.06055 20.72H15.9405" />
        </svg>
      ),
      label: "Text",
    },
    {
      id: "background",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_2138_2059)">
            <path
              className="icon-path"
              d="M15 8.25H4.5C4.08579 8.25 3.75 8.58579 3.75 9V19.5C3.75 19.9142 4.08579 20.25 4.5 20.25H15C15.4142 20.25 15.75 19.9142 15.75 19.5V9C15.75 8.58579 15.4142 8.25 15 8.25Z"
            />
            <path className="icon-path" d="M15 3.75H13.5" />
            <path
              className="icon-path"
              d="M18.75 3.75H19.5C19.6989 3.75 19.8897 3.82902 20.0303 3.96967C20.171 4.11032 20.25 4.30109 20.25 4.5V5.25"
            />
            <path className="icon-path" d="M20.25 10.5V9" />
            <path
              className="icon-path"
              d="M18.75 15.75H19.5C19.6989 15.75 19.8897 15.671 20.0303 15.5303C20.171 15.3897 20.25 15.1989 20.25 15V14.25"
            />
            <path
              className="icon-path"
              d="M9.75 3.75H9C8.80109 3.75 8.61032 3.82902 8.46967 3.96967C8.32902 4.11032 8.25 4.30109 8.25 4.5V5.25"
            />
            <path
              className="icon-path"
              opacity="0.2"
              d="M19.5 3.75H9C8.80109 3.75 8.61032 3.82902 8.46967 3.96967C8.32902 4.11032 8.25 4.30109 8.25 4.5V8.25H15C15.1989 8.25 15.3897 8.32902 15.5303 8.46967C15.671 8.61032 15.75 8.80109 15.75 9V15.75H19.5C19.6989 15.75 19.8897 15.671 20.0303 15.5303C20.171 15.3897 20.25 15.1989 20.25 15V4.5C20.25 4.30109 20.171 4.11032 20.0303 3.96967C19.8897 3.82902 19.6989 3.75 19.5 3.75Z"
              fill="#393939"
            />
          </g>
          <defs>
            <clipPath id="clip0_2138_2059">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
      label: "Background",
    },
    {
      id: "aspect",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="icon-path"
            d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
          />
        </svg>
      ),
      label: "Aspect Ratio",
    },
    {
      id: "download",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="icon-path"
            d="M8.0625 10.3125L12 14.25L15.9375 10.3125"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            className="icon-path"
            d="M12 3.75V14.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            className="icon-path"
            d="M20.25 14.25V19.5C20.25 19.6989 20.171 19.8897 20.0303 20.0303C19.8897 20.171 19.6989 20.25 19.5 20.25H4.5C4.30109 20.25 4.11032 20.171 3.96967 20.0303C3.82902 19.8897 3.75 19.6989 3.75 19.5V14.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      label: "Download",
    },
  ];

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="editor-container">
      <div className="editor-sidebar">
        {sidebarItems.map((item) => (
          <div
            key={item.id}
            className={`sidebar-items ${item.icon ? "" : "invisible"}`}
            onClick={() => {
              if (item.id === "download") {
                handleDownload();
              } else {
                handleTabClick(item.id);
              }
            }}
          >
            <div
              className={`sidebar-item ${
                activeTab === item.id ? "active" : ""
              }`}
            >
              {item.icon}
            </div>
            {item.label && <span>{item.label}</span>}
          </div>
        ))}
      </div>
      {renderControls()}
      <div className="editor-workspace">
        <div className="canvas-container">
          {/* Canvas will be initialized here */}
        </div>
      </div>
      {contextMenu.visible && (
        <div
          className="canvas-context-menu"
          style={{ left: contextMenu.x, top: contextMenu.y }}
        >
          {contextMenu.target?.type === "image" && (
            <div className="context-menu-item" onClick={handleRemoveBackground}>
              Remove Background
            </div>
          )}
          <div className="context-menu-item" onClick={handleDeleteObject}>
            Delete
          </div>
          <div
            className="context-menu-item"
            onClick={() => handleLayerOrder("front")}
          >
            Bring to Front
          </div>
          <div
            className="context-menu-item"
            onClick={() => handleLayerOrder("forward")}
          >
            Bring Forward
          </div>
          <div
            className="context-menu-item"
            onClick={() => handleLayerOrder("backward")}
          >
            Send Backward
          </div>
          <div
            className="context-menu-item"
            onClick={() => handleLayerOrder("back")}
          >
            Send to Back
          </div>
        </div>
      )}
    </div>
  );
};

export default Editor;
