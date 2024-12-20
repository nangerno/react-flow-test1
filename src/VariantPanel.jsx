import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from "react";
import AddVariable from "./AddVariable";

const VariantPanel = ({
  variableData,
  setVariableData,
  variableType,
  setVariableType,
  appliedColor,
  handleColorChange,
  colorVariable,
  setColorVariable,
  handleClickColor
}) => {
  const [selectedVariable, setSelectedVariable] = useState("");
  const [selectedVariableType, setSelectedVariableType] = useState(0);
  const [showVariableModal, setShowVariableModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleEditVariable = (index) => {
    setEditIndex(index);
    setSelectedVariable(variableData[index]);
    setSelectedVariableType(variableType[index]);
    setShowVariableModal((prevState) => !prevState);
  };
  const handleNewVariable = () => {
    setEditIndex(null);
    setSelectedVariable("");
    setShowVariableModal((prevState) => !prevState);
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        left: "55px",
        zIndex: "1000",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        backgroundColor: "#ffffff",
        padding: "10px",
        borderRadius: "15px",
        width: "100px",
        height: "220px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
        border: "0.1px solid rgb(148, 197, 248)",
      }}
    >
      <strong
        style={{
          fontSize: "1rem",
          textAlign: "center",
        }}
      >
        Variables
      </strong>

      <div
        style={{
          overflowX: "hidden",
          overflowY: "auto",
          maxHeight: "130px",
          paddingBottom: "10px",
          scrollBehavior: "smooth",
        }}
      >
        {variableData.map((variable, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#ffffff",
              border: "0.1px solid rgb(148, 197, 248)",
              borderRadius: "5px",
              padding: "2px",
              marginBottom: "2px",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: "1.1rem",
                color: "#555",
                textAlign: "center",
                cursor: "pointer",
              }}
              onClick={() => handleEditVariable(index)}
            >
              {variable}
            </p>
          </div>
        ))}
      </div>
      <button
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translate(-50%, -50%)",
          border: "none",
          backgroundColor: "#007BFF",
          color: "#fff",
          fontSize: "24px",
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#007BFF")}
        onClick={handleNewVariable}
      >
        +
      </button>
      <AddVariable
        showVariableModal={showVariableModal}
        setShowVariableModal={setShowVariableModal}
        variableData={variableData}
        setVariableData={setVariableData}
        selectedVariable={selectedVariable}
        selectedVariableType={selectedVariableType}
        editIndex={editIndex}
        setEditIndex={setEditIndex}
        appliedColor={appliedColor}
        handleColorChange={handleColorChange}
        colorVariable={colorVariable}
        setColorVariable={setColorVariable}
        handleClickColor={handleClickColor}
      />
    </div>
  );
};
export default VariantPanel;
