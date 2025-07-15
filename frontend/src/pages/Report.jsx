import React from "react";
import { useLocation } from "react-router-dom";
import html2pdf from "html2pdf.js";
import "../styles/report.scss"; // Import the SCSS file
import Header from "../components/Header";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
const Report = ({ isLoggedIn }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { patientDetails, image, generatedText, prediction } =
    location.state || {};
  console.log("pred:", prediction);
  const [cookies, removeCookie] = useCookies([]);

  async function handleOnClick() {
    const element = document.getElementById("report");
    html2pdf(element, {
      margin: 0,
    });
  }
  const handleLogout = () => {
    removeCookie("token");
    navigate("/signup");
  };

  return (
    <>
      <Header isLoggedIn={isLoggedIn} logout={handleLogout} />

      <div id="report" className="report-container">
        <div
          className="back-button"
          onClick={() => navigate("/user")}
          data-html2canvas-ignore
        >
          <button className="back-btn">← Back to Dashboard</button>
        </div>
        <h2>Report</h2>
        {patientDetails ? (
          <div className="patient-details">
            <p id="details">
              Name :{" "}
              <span>
                <p>{patientDetails.patientName}</p>
              </span>
            </p>
            <p id="details">
              Age :{" "}
              <span>
                <p>{patientDetails.patientAge}</p>
              </span>
            </p>
            <p id="details">
              Sex :{" "}
              <span>
                <p>{patientDetails.patientSex}</p>
              </span>{" "}
            </p>
          </div>
        ) : (
          <p>No patient details available.</p>
        )}
        {image && (
          <div className="image-container">
            <h6>X-Ray</h6>
            <img src={URL.createObjectURL(image)} alt="Patient" />
          </div>
        )}
        <div className="generated-text">
          <h4>Generated caption by InsightXray</h4>
          <p>{generatedText}</p>
          <div>
            <strong>Prediction:</strong> {prediction}
          </div>
        </div>

        <div className="actions" data-html2canvas-ignore>
          <button class="styled-button" onClick={handleOnClick}>
            Download
          </button>
        </div>
      </div>
    </>
  );
};

export default Report;
