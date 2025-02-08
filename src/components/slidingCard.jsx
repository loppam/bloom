import { GoArrowUpRight } from "react-icons/go";
const SlidingCard = () => {
  const leftCards = (
    <>
      <div className="card">
        <p>
          Gradient-heavy background with fluid shapes and sleek modern text.
          <GoArrowUpRight />
        </p>
      </div>
      <div className="card">
        <p>
          Minimalist grid layout with bold black and white contrasts for a
          creative studio.
          <GoArrowUpRight />
        </p>
      </div>
      <div className="card">
        <p>
          Futuristic neon design with geometric elements and glowing text.
          <GoArrowUpRight />
        </p>
      </div>
      <div className="card">
        <p>
          Collage-style poster with layered textures, photos, and bold
          sans-serif font.
          <GoArrowUpRight />
        </p>
      </div>
    </>
  );

  const rightCards = (
    <>
      <div className="card">
        <p>
          Pop art-inspired design with bright colors, halftone patterns, and
          playful graphics.
          <GoArrowUpRight />
        </p>
      </div>
      <div className="card">
        <p>
          Vintage poster with retro fonts, warm colors, and distressed textures.
          <GoArrowUpRight />
        </p>
      </div>
      <div className="card">
        <p>
          Abstract shapes and vibrant colors with modern typography for a design
          agency poster.
          <GoArrowUpRight />
        </p>
      </div>
      <div className="card">
        <p>
          Typography-focused poster with overlapping bold text and subtle
          gradients.
          <GoArrowUpRight />
        </p>
      </div>

    </>
  );

  return (
    <div className="container">
      <div className="card-row">
        <div className="cards-wrapper">
          <div className="cards">
            {leftCards}
            {leftCards}
            {leftCards}
            {leftCards}
          </div>
        </div>
      </div>
      <div className="card-row">
        <div className="cards-wrapper">
          <div className="cards reverse">
            {rightCards}
            {rightCards}
            {rightCards}
            {rightCards}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlidingCard;
