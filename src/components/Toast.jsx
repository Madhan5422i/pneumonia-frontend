/* eslint-disable react/prop-types */
import "./Toast.css";
import { IoCloseSharp } from "react-icons/io5";

export const Toast = ({
  message,
  show,
  color = "red",
  position = "right",
  onClose,
}) => {
  const positionStyle = {
    position: "fixed",
    top: "20px",
    [position]: "20px",
    backgroundColor: color,
    zIndex: 1000,
  };

  if (!show) return null;

return (
    <div className="toast" style={positionStyle}>
        <div className="toast-content">
            <span style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                {message}
            </span>
            <div
                style={{ color: "white", cursor: "pointer", display: "flex" }}
                onClick={onClose}
            >
                <IoCloseSharp />
            </div>
        </div>
    </div>
);
};
