/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";

const BackgroundControls = (/* { canvas } */) => {
  // console.log("BackgroundControls rendering", canvas);

  // if (!canvas) {
  //   console.log("No canvas provided to BackgroundControls");
  //   return null;
  // }

  return (
    <div className="control-panel">
      <div className="background-styles">
        <div className="upload">
          <button>
            <svg
              width="13"
              height="14"
              viewBox="0 0 13 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="icon-path"
                d="M11.375 8.625V10.7917C11.375 11.079 11.2609 11.3545 11.0577 11.5577C10.8545 11.7609 10.579 11.875 10.2917 11.875H2.70833C2.42102 11.875 2.14547 11.7609 1.9423 11.5577C1.73914 11.3545 1.625 11.079 1.625 10.7917V8.625M9.20833 4.83333L6.5 2.125M6.5 2.125L3.79167 4.83333M6.5 2.125V8.625"
              />
            </svg>

            <span>Upload</span>
          </button>
        </div>
        <h4>Default styles</h4>
        <div className="style-options">
          <button className="style-btn">
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="icon-path transparent-icon"
                d="M21.44 0.965C21.3639 0.781738 21.2183 0.636106 21.035 0.56C20.9448 0.521569 20.848 0.501185 20.75 0.5H5.75C5.55109 0.5 5.36032 0.579018 5.21967 0.71967C5.07902 0.860322 5 1.05109 5 1.25V5H1.25C1.05109 5 0.860322 5.07902 0.71967 5.21967C0.579018 5.36032 0.5 5.55109 0.5 5.75V20.75C0.5 20.9489 0.579018 21.1397 0.71967 21.2803C0.860322 21.421 1.05109 21.5 1.25 21.5H16.25C16.4489 21.5 16.6397 21.421 16.7803 21.2803C16.921 21.1397 17 20.9489 17 20.75V17H20.75C20.9489 17 21.1397 16.921 21.2803 16.7803C21.421 16.6397 21.5 16.4489 21.5 16.25V1.25C21.4988 1.15199 21.4784 1.05517 21.44 0.965ZM20 12.1925L16.6925 15.5H15.0575L20 10.5575V12.1925ZM20 8.4425L12.9425 15.5H11.3075L20 6.8075V8.4425ZM20 4.6925L9.1925 15.5H7.5575L20 3.0575V4.6925ZM11.4425 2L6.5 6.9425V5.3075L9.8075 2H11.4425ZM15.1925 2L6.5 10.6925V9.0575L13.5575 2H15.1925ZM6.5 12.8075L17.3075 2H18.9425L6.5 14.4425V12.8075ZM7.6925 2L6.5 3.1925V2H7.6925ZM15.5 20H2V6.5H5V16.25C5.00118 16.348 5.02157 16.4448 5.06 16.535C5.13611 16.7183 5.28174 16.8639 5.465 16.94C5.55517 16.9784 5.65199 16.9988 5.75 17H15.5V20ZM18.8075 15.5L20 14.3075V15.5H18.8075Z"
              />
            </svg>

            <span>Transparent</span>
          </button>

          <button className="style-btn">
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 16.5C14 18.27 13.23 19.87 12 20.96C10.94 21.92 9.54 22.5 8 22.5C4.69 22.5 2 19.81 2 16.5C2 13.74 3.88 11.4 6.42 10.71C7.11 12.45 8.59 13.79 10.42 14.29C10.92 14.43 11.45 14.5 12 14.5C12.55 14.5 13.08 14.43 13.58 14.29C13.85 14.97 14 15.72 14 16.5Z"
                className="icon-path"
              />
              <path
                d="M18 8.5C18 9.28 17.85 10.03 17.58 10.71C16.89 12.45 15.41 13.79 13.58 14.29C13.08 14.43 12.55 14.5 12 14.5C11.45 14.5 10.92 14.43 10.42 14.29C8.59 13.79 7.11 12.45 6.42 10.71C6.15 10.03 6 9.28 6 8.5C6 5.19 8.69 2.5 12 2.5C15.31 2.5 18 5.19 18 8.5Z"
                className="icon-path"
              />
              <path
                d="M22 16.5C22 19.81 19.31 22.5 16 22.5C14.46 22.5 13.06 21.92 12 20.96C13.23 19.87 14 18.27 14 16.5C14 15.72 13.85 14.97 13.58 14.29C15.41 13.79 16.89 12.45 17.58 10.71C20.12 11.4 22 13.74 22 16.5Z"
                className="icon-path"
              />
            </svg>

            <span>Color</span>
          </button>

          <button className="style-btn">
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.0002 3.5L16.4402 5.84003L8.49023 5.82001C4.92023 5.82001 1.99023 8.75003 1.99023 12.34C1.99023 14.13 2.72024 15.76 3.90024 16.94"
                className="icon-path"
              />
              <path
                d="M10.0005 21.5001L7.56055 19.16L15.5106 19.1801C19.0806 19.1801 22.0106 16.25 22.0106 12.66C22.0106 10.87 21.2806 9.24006 20.1006 8.06006"
                className="icon-path"
              />
              <path
                d="M12.25 15.17V9.83008L10.75 11.5001"
                className="icon-path"
              />
            </svg>

            <span>Replace</span>
          </button>
        </div>

        <button
          className="remove-bg-btn"
          // onClick={() => {
          //   canvas.setBackgroundImage(null, () => canvas.renderAll());
          //   canvas.setBackgroundColor("", () => canvas.renderAll());
          // }}
        >
          Remove Background
        </button>
      </div>
    </div>
  );
};

// BackgroundControls.propTypes = {
//   canvas: PropTypes.object.isRequired,
// };

export default BackgroundControls;
