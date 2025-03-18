/* eslint-disable react/prop-types */
import "./popup.css";
import AiContent from "../../assets/ai.jpg";

export const Popup = ({ setInfo }) => {
  return (
    <div className="popup-i">
      <div className="popup-content-i">
        <h1>Important Disclaimer</h1>
        <div className="popup-body">
          <div className="ai-image">
            <img src={AiContent} alt="" />
          </div>
          <div className="right">
            <p>
              Please note that this pneumonia detection system utilizes
              artificial intelligence and medical image analysis technology.
              While it can assist in preliminary screening, the results are not
              definitive and should be used as a supplementary tool only. For
              proper diagnosis:
            </p>
            <ul>
              <li>Always consult a licensed healthcare professional</li>
              <li>
                Use only high-quality chest X-ray images - other image types
                will yield inaccurate results
              </li>
              <li>
                This tool is not a replacement for professional medical
                evaluation
              </li>
            </ul>
            <button
              onClick={() => {
                setInfo(false);
              }}
              className="understand"
            >
              I Understand
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
