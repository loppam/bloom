// import magicpen from "/magicpen.svg";
import avatar2 from "/circ.png";
import avatar1 from "/circ1.png";
import avatar3 from "/circ2.png";
import avatar4 from "/circ3.png";
import { useNavigate } from "react-router-dom";
import { LuWandSparkles } from "react-icons/lu";
const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="home" id="home">
        <div className="content">
          <div className="home-content">
            <div className="text">
              <h1>Design Smarter, Edit Faster</h1>
              <h3>It&apos;s your creative playground</h3>
              <p>Generate editable designs from a simple text description.</p>
              <button  onClick={() => navigate("/generator")}>
                {/* <img src={magicpen} alt="magicpen" /> */}
                <LuWandSparkles />
                Get Started
              </button>
            </div>
            <div className="orbital-system">
              <div className="orbits-container">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className={`orbit orbit-${i}`} />
                ))}
                {[...Array(15)].map((_, i) => (
                  <div key={`dot-${i}`} className={`orbital-dot dot-${i}`} />
                ))}
              </div>
              <div className="avatar avatar-1">
                <img src={avatar1} alt="avatar" />
              </div>
              <div className="avatar avatar-2">
                <img src={avatar2} alt="avatar" />
              </div>
              <div className="avatar avatar-3">
                <img src={avatar3} alt="avatar" />
              </div>
              <div className="avatar avatar-4">
                <img src={avatar4} alt="avatar" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
