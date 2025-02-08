import big1 from "/big1.png";
import small1 from "/small1.png";
import small2 from "/small2.png";
import big2 from "/big2.png";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const Why = () => {
  const animationRef = useScrollAnimation();

  return (
    <div className="why">
      <div className="content">
        <div className="why-content animate-on-scroll" ref={animationRef}>
          <div className="text">
            <h1>
              Why Choose <span className="color">Bloom?</span>
            </h1>
            <h3>Your Creative Process, Simplified and Supercharged</h3>
            <p>
              Bloom combines cutting-edge AI technology with intuitive editing
              tools to give you full control of your visuals. From generating
              breathtaking designs to tweaking the tiniest detail, Bloom
              empowers creators of all levels to bring their ideas to life
              seamlessly.
            </p>
          </div>
          <div className="image">
            <img src={big1} alt="why" className="big" />
            <img src={small1} alt="why" className="small" />
            <img src={small2} alt="why" className="small" />
            <img src={big2} alt="why" className="big" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Why;
