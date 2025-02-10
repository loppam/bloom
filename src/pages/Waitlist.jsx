import { useState } from "react";
import logo from "/logoblack.svg";
import { db } from "../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useLocation } from "react-router-dom";

const Waitlist = () => {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({
    type: "",
    message: location.state?.message || "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      // Add email to Firebase collection
      await addDoc(collection(db, "waitlist"), {
        email,
        timestamp: serverTimestamp(),
      });

      setStatus({
        type: "success",
        message: "Thank you for joining our waitlist!",
      });
      setEmail("");
    } catch (error) {
      console.error("Error adding email:", error);
      setStatus({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="waitlist-page">
      <div className="waitlist-page__left">
        <img src={logo} alt="Bloom Logo" className="waitlist-page__logo" />

        <div className="waitlist-page__content">
          <h1 className="waitlist-page__title">
            Join the Bloom AI Waitlist — Be the First to Create Without Limits!
          </h1>

          <p className="waitlist-page__description">
            Imagine an AI image generator where every element is fully
            customizable. Sign up now to get exclusive early access.
          </p>

          <form onSubmit={handleSubmit} className="waitlist-page__form">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="waitlist-page__input"
              required
              disabled={isSubmitting}
            />
            <button
              type="submit"
              className="waitlist-page__submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Joining..." : "Join now"}
            </button>
          </form>

          {status.message && (
            <div
              className={`waitlist-page__message waitlist-page__message--${status.type}`}
            >
              {status.message}
            </div>
          )}

          <div className="waitlist-page__social">
            <div className="waitlist-page__avatars">
              <img
                src="/avatar1.png"
                alt=""
                className="waitlist-page__avatar"
              />
              <img
                src="/avatar2.png"
                alt=""
                className="waitlist-page__avatar"
              />
              <img
                src="/avatar3.png"
                alt=""
                className="waitlist-page__avatar"
              />
            </div>
            <span className="waitlist-page__count">
              500+ creators have already joined
            </span>
          </div>
        </div>
      </div>

      <div className="waitlist-page__right">
        <img
          src="/astronaut.png"
          alt="Astronaut in space"
          className="waitlist-page__hero"
        />
      </div>
    </div>
  );
};

export default Waitlist;
