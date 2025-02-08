import everyone from "/everyone.png";
import Bloombubble from "/Bloombubble.svg";
import Bloomdesign from "/Bloomdesign.svg";
import Bloompeople from "/Bloompeople.svg";
import statusup from "/status-up.svg";
const Everyone = () => {
  return (
    <div className="everyone">
      <div className="content">
        <div className="everyone-content">
          <div className="text">
            <h1>For Everyone, Everywhere</h1>
            <p className="text-p">
              No matter your industry or skill level, Bloom AI gives you the
              tools you need to create stunning visuals effortlessly.
            </p>

            <ul className="table">
              <li>
                <img src={statusup} alt="everyone" />
                <p>For Small Business Owners & Entrepreneurs</p>
              </li>
              <li>
                <img src={Bloomdesign} alt="everyone" />
                <p>For Graphic Designers & Creatives</p>
              </li>
              <li>
                <img src={Bloombubble} alt="everyone" />
                <p>For Freelancers & Agencies</p>
              </li>
              <li>
                <img src={Bloompeople} alt="everyone" />
                <p>For Anyone</p>
              </li>
            </ul>
          </div>
          <div className="image">
            <img src={everyone} alt="everyone" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Everyone;
