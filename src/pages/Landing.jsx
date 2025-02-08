import Home from "../components/home";
import SlidingCard from "../components/slidingCard";
import Why from "../components/Why";
import How from "../components/How";
import What from "../components/What";
import Everyone from "../components/Everyone";
import Ready from "../components/Ready";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
function Landing() {
  return (
    <>
      <Navbar />
      <Home />
      <SlidingCard />
      <Why />
      <How />
      <What />
      <Everyone />
      <Ready />
      <Footer />
    </>
  );
}

export default Landing;
