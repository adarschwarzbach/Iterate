import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FullScreenForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    school: "",
    classYear: "",
    resume: null,
  });
  const [submitted, setSubmitted] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  
  const navigate = useNavigate();

  useEffect(() => {
    const handleBack = () => {
      onClose();
      navigate("/");
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handleBack);

    return () => {
      window.removeEventListener("popstate", handleBack);
    };
  }, [navigate, onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setIsValidEmail(emailRegex.test(value));
    }
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/pdf") {
      setFormData((prev) => ({ ...prev, resume: file }));
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setFormData((prev) => ({ ...prev, resume: file }));
    }
  };

  const handleSubmit = () => {
    if (Object.values(formData).every((value) => value) && isValidEmail) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "black",
        color: "white",
        textAlign: "center",
      }}>
        <h1>Application Received</h1>
        <p>You will be hearing from us soon.</p>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "black",
        color: "white",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>Apply to TDTC '25</h1>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        style={{
          width: "300px",
          padding: "10px",
          marginBottom: "15px",
          backgroundColor: "transparent",
          color: "white",
          border: "1px solid white",
          outline: "none",
        }}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        style={{
          width: "300px",
          padding: "10px",
          marginBottom: "15px",
          backgroundColor: "transparent",
          color: "white",
          border: "1px solid white",
          outline: "none",
        }}
      />
      {!isValidEmail && <p style={{ color: "red" }}>Enter a valid email</p>}
      <input
        type="text"
        name="school"
        placeholder="School"
        value={formData.school}
        onChange={handleChange}
        style={{
          width: "300px",
          padding: "10px",
          marginBottom: "15px",
          backgroundColor: "transparent",
          color: "white",
          border: "1px solid white",
          outline: "none",
        }}
      />
      <input
        type="text"
        name="classYear"
        placeholder="Class Year"
        value={formData.classYear}
        onChange={handleChange}
        style={{
          width: "300px",
          padding: "10px",
          marginBottom: "15px",
          backgroundColor: "transparent",
          color: "white",
          border: "1px solid white",
          outline: "none",
        }}
      />
      <div
        onDrop={handleFileDrop}
        onDragOver={(e) => e.preventDefault()}
        style={{
          width: "300px",
          height: "100px",
          border: "2px dashed white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "15px",
          cursor: "pointer",
          textAlign: "center",
        }}
        onClick={() => document.getElementById("fileInput").click()}
      >
        {formData.resume ? (
          <span>{formData.resume.name}</span>
        ) : (
          <span>Drop PDF Resume Here or Click to Upload</span>
        )}
      </div>
      <input
        type="file"
        id="fileInput"
        accept="application/pdf"
        onChange={handleFileSelect}
        style={{ display: "none" }}
      />
      <button
        style={{
          padding: "10px 20px",
          backgroundColor: "transparent",
          color: "white",
          border: "1px solid white",
          cursor: "pointer",
          outline: "none",
        }}
        onClick={handleSubmit}
        disabled={!Object.values(formData).every((value) => value) || !isValidEmail}
      >
        Submit
      </button>
    </div>
  );
};

export default FullScreenForm;