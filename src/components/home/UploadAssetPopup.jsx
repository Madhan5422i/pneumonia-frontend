/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "./asset.css";
import { IoCloseSharp } from "react-icons/io5";
import UploadIcon from "../../assets/file_upload_upload_picture_photo_image-512.webp";
import { useState } from "react";
import { useEffect } from "react";
import Spinner from "../Spinner";
import { Toast } from "./../Toast";

export const UploadAssetPopup = ({
  info = false,
  openPopup = false,
  setOpenPopup,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(UploadIcon);
  const [fileName, setFileName] = useState("");
  const [isDragActive, setDragActive] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [openToast, setOpenToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    let timeoutId;
    if (openToast) {
      timeoutId = setTimeout(() => {
        setOpenToast(false);
      }, 5000);
    }

    const handleDragLeave = () => setDragActive(false);
    document.addEventListener("dragleave", handleDragLeave);

    return () => {
      document.removeEventListener("dragleave", handleDragLeave);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [openToast]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFile(file);
    }
  };
  const isValidFileType = (file) => {
    const validTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (file && file.type) {
      return validTypes.includes(file.type);
    }
    return false;
  };

  const formatPercentage = (probability) => {
    // Convert to percentage and round to 2 decimal places
    let percentage = parseFloat(probability) * 100;

    // Cap at 99% if it's very close to 100%
    if (percentage > 99 && percentage < 100) {
      percentage = 99;
    }

    return percentage.toFixed(2);
  };

  const getPrediction = async () => {
    setLoading(true);
    setOpenToast(false);
    const url = "/predict";
    const formData = new FormData();
    formData.append("image", selectedFile);

    const options = {
      method: "POST",
      body: formData,
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (data && data.success) {
        setResult(data);
        console.log(data);
        const percentage = formatPercentage(data.probability);
        setPercentage(percentage);
      } else if (data.error) {
        setToastMsg(data.error);
        setOpenToast(true);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  const handleDragOver = (e) => {
    setDragActive(true);
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const items = e.clipboardData?.items;
    const imageItem = Array.from(items).find(
      (item) => item.type.indexOf("image") !== -1
    );

    if (imageItem) {
      const file = imageItem.getAsFile();
      handleFile(file);
    }
  };

  const handleFile = (file) => {
    if (!isValidFileType(file)) {
      setToastMsg("Invalid file type. Please upload a valid image file");
      setOpenToast(true);
      return;
    }
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearStates = () => {
    setOpenPopup(!openPopup);
    setSelectedFile(null);
    setPreview(UploadIcon);
    setFileName("");
    setResult(null);
  };

  return (
    <div>
      {openPopup && !info ? (
        <div className={`backdrop ${isLoading ? "backdrop-active" : ""}`}>
          <div
            className={`popup-container ${isDragActive ? "drag-active" : ""} ${
              isLoading ? "blur" : ""
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onPaste={handlePaste}
            tabIndex="0"
          >
            <div
              className="close-icon"
              onClick={() => {
                clearStates();
              }}
            >
              <IoCloseSharp />
            </div>
            <div className="images-container">
              <div className="popup-content">
                <img
                  style={
                    selectedFile && selectedFile.name
                      ? { boxShadow: " 0 0 10px rgba(0, 0, 0, 0.1)" }
                      : {}
                  }
                  className="uploaded-image"
                  src={preview}
                  alt="Upload Icon"
                />
                <p className="file-name">
                  {fileName
                    ? fileName
                    : "Please upload, drag and drop or paste an x-ray image"}
                </p>
              </div>
              {result && result.label && result.probability && (
                <div className="result-content">
                  <code>
                    <h3 style={{ textAlign: "center" }}>Analysis</h3>

                    <p>Label : {result.label}</p>
                    <p>Model Confidence : {percentage}%</p>
                    <div className="progress-container">
                      <div
                        className="progress-bar"
                        style={{ width: `${percentage}%` }}
                      >
                        <span className="progress-text">{percentage}%</span>
                      </div>
                    </div>
                    {/* <pre>{JSON.stringify(result, null, 2)}</pre> */}
                  </code>
                </div>
              )}
            </div>
            <div className="button-container">
              <div>
                {selectedFile && selectedFile.name && (
                  <div>
                    <button
                      className="button"
                      onClick={() => {
                        getPrediction();
                      }}
                    >
                      Get prediction
                    </button>
                  </div>
                )}
              </div>
              <div className="button">
                <label htmlFor="file-upload">
                  {" "}
                  {selectedFile && selectedFile.name
                    ? "Change Image"
                    : "Choose X-ray Image"}
                </label>
                <input
                  className="button"
                  id="file-upload"
                  accept=".png,.jpg,.jpeg"
                  type="file"
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </div>
          <div className="spinner">
            <Spinner loading={isLoading} color="#3498db" />
          </div>
        </div>
      ) : (
        <></>
      )}
      <Toast
        message={toastMsg}
        show={openToast}
        color="red"
        position="right"
        onClose={() => {
          setOpenToast(!openToast);
        }}
      />
    </div>
  );
};
