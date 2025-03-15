import { useState } from "react";
import { UploadAssestPopup } from "../home/UploadAssetPopup.jsx";
import "./Landing.css";
export const Landing = () => {
  const [openPopup,setOpenPopup] = useState(false)
  return (
    <>
      <section className="main-section">
        <div className="text-container">
          <h1>Pneumonia Detection</h1>
          <p>Upload an x-ray to get accurate detection of Pneumonia</p>
        </div>
        <button onClick={()=>{setOpenPopup(!openPopup)}}>Choose X-ray Image</button>
        <UploadAssestPopup openPopup={openPopup} setOpenPopup={setOpenPopup} />
      </section>
    </>
  );
};
