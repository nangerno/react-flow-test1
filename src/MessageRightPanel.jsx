import React, { useState, useEffect } from "react";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaStrikethrough,
  FaLink,
  FaPlay,
  FaClock,
} from "react-icons/fa";
import { PiCornersOut } from "react-icons/pi";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";

const MessageRightPanel = ({
  messageDivRef,
  conditionDivRef,
  isFocused,
  setIsFocused,
  newMessage,
  selectedNode,
  setSelectedNode,
  handlePlay,
  handleInsertLink,
  handleDelay,
  addVariant,
  removeVariant,
  variants,
  variantConditions,
  visibleCondition,
  conditionCount,
  conditions,
  handleSaveMessage,
  handleNodeContentChange,
  handleFormatText,
  handleCondition,
  addCondition,
  removeCondition,
  setActiveTabForCondition,
  handleConditionChange,
  variableData,
  msgNodeTitles,
}) => {
  const messageNode =
    selectedNode?.type === "Message node" ? selectedNode : null;
  const [newVariable, setNewVariable] = useState([]);
  const [count, setCount] = useState([]);
  const [selectedOption, setSelectedOption] = useState("variables");
  const [dropdownValues, setDropdownValues] = useState({});
  useEffect(() => {
    setDropdownValues((prev) => {
      const newDropdownValues = conditions.reduce((acc, condition) => {
        const key = condition.id - 1;
        acc[key] = prev[key] || "variables";
        return acc;
      }, {});
      if (JSON.stringify(prev) !== JSON.stringify(newDropdownValues)) {
        return newDropdownValues;
      }
      return prev;
    });

    setNewVariable(variableData);
    const len = Object.values(variantConditions).map((innerObj) => {
      if (Object.keys(innerObj).length === 0) {
        return "Condition";
      }
      if (Object.values(innerObj).every((value) => value.trim() === "")) {
        return "Condition";
      }
      const nonEmptyCount = Object.values(innerObj).filter(
        (value) => value.trim() !== ""
      ).length;
      return nonEmptyCount > 0 ? nonEmptyCount : "Condition";
    });
    setCount(len.length > 0 ? len : ["Condition"]);
  }, [variableData, variantConditions, conditions, variants, dropdownValues]);

  const handleAddVariant = () => {
    addVariant();
  };

  return (
    <div
      ref={messageDivRef}
      style={{
        width: "380px",
        backgroundColor: "#f9f9f9",
        padding: "20px",
        borderLeft: "1px solid #ddd",
        display: selectedNode ? "block" : "none",
        overflowX: "hidden",
        maxHeight: "100%",
        overflowY: "auto",
      }}
    >
      <h3
        style={{
          borderBottom: "1px solid #ddd",
          padding: "10px",
          paddingLeft: "0px",
        }}
      >
        {msgNodeTitles[selectedNode?.id] || messageNode.data.label}
      </h3>
      <div style={{ marginBottom: "10px", borderBottom: "1px solid #ddd" }}>
        <div>
          <button onClick={handlePlay} className="message-toolbaar-icon">
            <FaPlay className="icon-style" />
          </button>
          <button
            onClick={() => handleFormatText("bold")}
            className="message-toolbaar-icon"
          >
            <FaBold className="icon-style" />
          </button>

          <button
            onClick={() => handleFormatText("italic")}
            className="message-toolbaar-icon"
          >
            <FaItalic className="icon-style" />
          </button>
          <button
            onClick={() => handleFormatText("underline")}
            className="message-toolbaar-icon"
          >
            <FaUnderline className="icon-style" />
          </button>
          <button
            onClick={() => handleFormatText("strikeThrough")}
            className="message-toolbaar-icon"
          >
            <FaStrikethrough className="icon-style" />
          </button>
          <button onClick={handleInsertLink} className="message-toolbaar-icon">
            <FaLink className="icon-style" />
          </button>
          <button onClick={handleDelay} className="message-toolbaar-icon">
            <FaClock className="icon-style" />
          </button>
        </div>
        <div style={{ position: "relative" }}>
          <div
            id="nodeContentDiv"
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => handleNodeContentChange(e.currentTarget.innerHTML)}
            style={{
              minHeight: "100px",
              paddingTop: "10px",
              fontSize: "16px",
              backgroundColor: "#f9f9f9",
              outline: "none",
              border: "none",
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            dangerouslySetInnerHTML={{ __html: newMessage }}
          />
        </div>
      </div>
      <strong>Variants</strong>
      <FiPlusCircle
        style={{ float: "right", cursor: "pointer" }}
        size={20}
        onClick={handleAddVariant}
      />
      <br></br>
      {variants.map((variant) => (
        <div
          key={variant.id}
          style={{
            marginBottom: "10px",
            marginTop: "15px",
            paddingBotton: "10px",
            borderBottom: "1px solid #ddd",
            // justifyContent: 'center'
          }}
        >
          <FiMinusCircle
            style={{ float: "right", cursor: "pointer", marginTop: "5px" }}
            size={20}
            onClick={() => removeVariant(variant.id)}
          />
          <div>
            <button onClick={handlePlay} className="message-toolbaar-icon">
              <FaPlay className="icon-style" />
            </button>
            <button
              onClick={() => handleFormatText("bold")}
              className="message-toolbaar-icon"
            >
              <FaBold className="icon-style" />
            </button>

            <button
              onClick={() => handleFormatText("italic")}
              className="message-toolbaar-icon"
            >
              <FaItalic className="icon-style" />
            </button>
            <button
              onClick={() => handleFormatText("underline")}
              className="message-toolbaar-icon"
            >
              <FaUnderline className="icon-style" />
            </button>
            <button
              onClick={() => handleFormatText("strikeThrough")}
              className="message-toolbaar-icon"
            >
              <FaStrikethrough className="icon-style" />
            </button>
            <button
              onClick={handleInsertLink}
              className="message-toolbaar-icon"
            >
              <FaLink className="icon-style" />
            </button>
            <button onClick={handleDelay} className="message-toolbaar-icon">
              <FaClock className="icon-style" />
            </button>
          </div>

          <div style={{ position: "relative" }}>
            <div
              contentEditable
              suppressContentEditableWarning
              onInput={(e) =>
                handleNodeContentChange(e.currentTarget.innerHTML)
              }
              style={{
                minHeight: "10px",
                padding: "5px",
                fontSize: "16px",
                backgroundColor: "#f9f9f9",
                border: "none",
                outline: "none",
              }}
              placeholder="Enter agent message..."
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              dangerouslySetInnerHTML={{ __html: variant.message }}
            />
          </div>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              padding: "8px 12px",
              marginTop: "5px",
              marginBottom: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor: conditionCount == 0 ? "#ddd" : "#f9f9f9",
              color: "#333",
              fontSize: "14px",
              cursor: "pointer",
            }}
            onClick={() => handleCondition(variant.id)}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              <PiCornersOut size={19} />
            </span>
            <div key={variant.id}>{count[variant.id]?count[variant.id]:"Condition"}</div>
          </button>

          {visibleCondition !== null && (
            <div
              ref={conditionDivRef}
              style={{
                width: "350px",
                height: `${90 + (conditionCount - 1) * 35}px`,
                maxHeight: "40%",
                backgroundColor: "#f9f9f9",
                padding: "10px",
                border: "1px solid #ddd",
                display: visibleCondition !== null ? "block" : "none",
                position: "absolute",
                top: (() => {
                  const variantIndex = variants.findIndex((v) => v.id === visibleCondition.variantId);
                  const calculatedTop = 350 + variantIndex * 100;
                  const windowHeight = window.innerHeight;
                  const maxTop = windowHeight - 100;
                  return Math.min(calculatedTop, maxTop) + "px";
                })(),
                right: "350px",
                borderRadius: "10px",
                zIndex: 800,
                transition: "height 0.3s ease-in-out",
                overflowX: "hidden",
                overflowY: "auto",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    backgroundColor: "#f0f0f0",
                    padding: "3px",
                    borderRadius: "5px",
                    width: "70%",
                    marginTop: "7px",
                  }}
                >
                  <div
                    style={{
                      padding: "5px 10px",
                      cursor: "pointer",
                      borderRadius: "5px",
                      width: "50%",
                      backgroundColor:
                        visibleCondition.activeTab === "all"
                          ? "#fff"
                          : "#f0f0f0",
                      textAlign: "center",
                    }}
                    onClick={() => setActiveTabForCondition("all")}
                  >
                    Match all
                  </div>
                  <div
                    style={{
                      padding: "5px 10px",
                      cursor: "pointer",
                      borderRadius: "5px",
                      width: "50%",
                      backgroundColor:
                        visibleCondition.activeTab === "any"
                          ? "#fff"
                          : "#f0f0f0",
                      textAlign: "center",
                    }}
                    onClick={() => setActiveTabForCondition("any")}
                  >
                    Match any
                  </div>
                </div>
                <button
                  style={{
                    marginTop: "7px",
                    cursor: "pointer",
                    border: "none",
                    outline: "none",
                    backgroundColor: "#f9f9f9",
                    fontSize: "20px",
                    width: "30px",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#ddd")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#f9f9f9")
                  }
                >
                  ?
                </button>
                <button
                  style={{
                    marginTop: "7px",
                    cursor: "pointer",
                    border: "none",
                    outline: "none",
                    backgroundColor: "#f9f9f9",
                    fontSize: "30px",
                    width: "30px",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#ddd")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#f9f9f9")
                  }
                  onClick={addCondition}
                  disabled={selectedOption === "variables"}
                >
                  +
                </button>
              </div>
              {conditions.map((condition, index) => (
                <div
                  key={condition.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "1px",
                  }}
                >
                  <p style={{ margin: "0 5px" }}>if</p>
                  <select
                    id={`sel-obj-${index}`}
                    style={{
                      marginRight: "15px",
                      border: "none",
                      backgroundColor: "#f9f9f9",
                      outline: "none",
                      padding: "2px",
                      borderRadius: "5px",
                    }}
                    onChange={(e) => {
                      setSelectedOption(e.target.value);
                      setDropdownValues((prev) => ({ ...prev, [index]: e.target.value}));
                    }}
                  >
                    <option value="variables">variables</option>
                    {newVariable.map((data, index) => (
                      <option key={index} value={index}>
                        {data}
                      </option>
                    ))}
                  </select>
                  <p style={{ margin: "0 5px" }}>is</p>
                  <input
                    onChange={(e) => {
                      handleConditionChange(
                        visibleCondition.variantId,
                        condition.id,
                        e.target.value
                      )
                    }}
                    value={
                      variantConditions[visibleCondition.variantId]?.[
                        condition.id
                      ] || ""
                    }
                    type="text"
                    placeholder="value or {var}"
                    style={{
                      backgroundColor: "#f9f9f9",
                      marginRight: "5px",
                      border: "none",
                      outline: "none",
                    }}
                    disabled={dropdownValues[index] === "variables"}
                  />
                  <button
                    style={{
                      cursor:
                        conditions.length > 1 && condition != ""
                          ? "pointer"
                          : "not-allowed",
                      opacity: conditions.length > 1 ? 1 : 0.5,
                      border: "none",
                      outline: "none",
                      backgroundColor: "#f9f9f9",
                      fontSize: "30px",
                      position: "absolute",
                      right: "15px"
                    }}
                    onClick={() =>
                      conditions.length > 1 &&
                      removeCondition(visibleCondition.variantId, condition.id)
                    }
                    disabled={conditions.length === 1}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#ddd")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#f9f9f9")
                    }
                  >
                    -
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <button
          onClick={handleSaveMessage}
          style={{
            padding: "10px",
            backgroundColor: "#007bff",
            color: "#fff",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
            width: "100%",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#0056b3")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#007BFF")
          }
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default MessageRightPanel;
