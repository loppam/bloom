import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      <p>The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link to="/">Go back home</Link>
    </div>
  );
};

export default NotFound;
