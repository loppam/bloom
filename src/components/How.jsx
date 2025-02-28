import { CiCloudOn } from "react-icons/ci";
import { TbEdit } from "react-icons/tb";
import dreamit from "/dreamit.png";
import editit from "/editit.png";
import shareit from "/shareit.png";
import sharesvg from "/share.svg";
const How = () => {
  return (
    <div className="how">
      <div className="content">
        <div className="how-content">
          <div className="title">
            <h1>How It Works</h1>
            <h3>3 Steps to Stunning Creations</h3>
          </div>
          <div className="dreamit">
            <div className="text">
              <CiCloudOn size={44} style={{ color: "#393540" }} />
              <div className="edit">Dream It</div>
              <div className="p">
                whether it&apos;s “a modern logo for a tech startup with blue
                tones” or “a cozy café interior with warm lighting and vintage
                decor.
              </div>
            </div>
            <div className="image">
              <img src={dreamit} alt="dreamit" className="it" />
            </div>
          </div>
          <div className="flex">
            <div className="editit">
              <div className="text">
                <TbEdit size={44} style={{ color: "#393540" }} />
                <div className="edit">Edit It</div>
                <div className="p">
                  Customize every element—adjust colors, move objects, change
                  backgrounds, and more.
                </div>
              </div>
              <div className="image">
                <img src={editit} alt="editit" className="it" />
              </div>
            </div>
            <div className="shareit">
              <div className="text">
                <img src={sharesvg} className="share" alt="" />
                <div className="edit">Share It</div>
                <div className="p">
                  Download in high resolution or share directly on your favorite
                  platforms.
                </div>
              </div>
              <div className="image">
                <img src={shareit} alt="shareit" className="it" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default How;
