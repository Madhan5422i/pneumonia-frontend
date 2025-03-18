/* eslint-disable react/prop-types */
import { useState } from "react";
import { UploadAssetPopup } from "../home/UploadAssetPopup.jsx";
import XraySvg from "../../assets/xray.svg";
import "./Landing.css";

export const Landing = ({ info,setInfo }) => {
  const [openPopup, setOpenPopup] = useState(false);

  return (
    <>
      <section className="main-section">
        <img className="x-image" src={XraySvg} alt="X-ray illustration" />
        <div>
          <div className="text-container">
            <h1>AI-Powered Pneumonia Detection</h1>
            <p>
              Fast and accurate pneumonia detection using advanced machine
              learning
            </p>
            <div className="features">
              <ul>
                <li>✓ Instant analysis of chest X-rays</li>
                <li>✓ High accuracy detection</li>
                <li>✓ Secure and private processing</li>
              </ul>
            </div>
          </div>
          <div className="action-section">
            <button
              className="upload-button"
              onClick={() => {
                setOpenPopup(!openPopup);
                setInfo(true);
              }}
            >
              <span className="icon">📤</span>
              Upload X-ray Image
            </button>
            <p className="support-text">
              Supports JPEG, PNG, JPG formats up to 5MB
            </p>
          </div>
        </div>
        <UploadAssetPopup info={info} openPopup={openPopup} setOpenPopup={setOpenPopup} />
      </section>
    </>
  );
};
