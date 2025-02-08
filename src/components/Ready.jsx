import magicpen from "/magicpen.svg";
import { useNavigate } from "react-router-dom";

const Ready = () => {
  const navigate = useNavigate();
  return (
    <div className="ready">
      <div className="content">
        <div className="ready-content">
          <div className="text">
            <h1>Ready to Bloom?</h1>
            <p>
              Your creativity deserves the best tools. Start creating with Bloom
              today and watch your ideas come to life!
            </p>
            <button onClick={() => navigate("/generator")}>
              <img src={magicpen} alt="magicpen" />
              Create for free
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ready;
