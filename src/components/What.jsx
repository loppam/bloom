import { LuWandSparkles } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { BsSend } from "react-icons/bs";
import { SlLayers } from "react-icons/sl";
import what from "/what.png";
const What = () => {
  const navigate = useNavigate();
  return (
    <div className="what" id="features">
      <div className="content">
        <div className="what-content">
          <div className="title">
            <h1 className="color">Features Built for Creators</h1>
            <h3>What Makes Bloom Unique?</h3>
          </div>
          <div className="started">
            <div className="image">
              <img src={what} alt="what" />
            </div>
            <div className="text">
              <h1>
                Everything You Need to Create, Customise, and Elevate Your
                Designs
              </h1>
              <button onClick={() => navigate("/generator")}>
                <LuWandSparkles />
                Get Started
              </button>
            </div>
          </div>
          <div className="tripleflex">
            <div className="row">
              <h3>
                <LuWandSparkles /> Smart Ai Prompts
              </h3>
              <p>
                Transform your ideas into breathtaking visuals with just a few
                words. Simply type a description, and Bloom AI will generate a
                high-quality image.
              </p>
            </div>
            <div className="row">
              <h3>
                <BsSend /> Drag-and-Drop Editing
              </h3>
              <p>
                Make adjustments effortlessly with our user-friendly
                drag-and-drop interface. Move elements around, resize objects,
                swap out images, no design experience required.
              </p>
            </div>
            <div className="row">
              <h3>
                <SlLayers /> Layer Control
              </h3>
              <p>
                Work with individual layers to fine-tune your design like a pro.
                Adjust transparency, reorder elements, and apply effects to
                specific sections.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default What;
