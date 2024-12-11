import React, { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { FaBold, FaItalic, FaUnderline, FaStrikethrough, FaLink, FaPlay, FaClock, FaRobot, FaMinus, FaCommentAlt } from "react-icons/fa";
import { PiCornersOut} from "react-icons/pi";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";

const MessageRightPanel = ({ messageDivRef, conditionDivRef, isFocused, setIsFocused, newMessage, selectedNode, setSelectedNode, handlePlay, handleInsertLink, handleDelay, addVariant, removeVariant, variants, variantConditions, visibleCondition, conditionCount, conditions, handleSaveMessage, handleMessageChange, handleFormatText, handleCondition, renderConditionLength, addCondition, removeCondition, setActiveTabForCondition, handleConditionChange }) => {
    return (
        <div
            ref={messageDivRef}
            style={{
                width: "380px",
                backgroundColor: "#f9f9f9",
                padding: "20px",
                borderLeft: "1px solid #ddd",
                display: selectedNode ? "block" : "none",
            }}
        >
            <h3 style={{ borderBottom: "1px solid #ddd", padding: '10px' }}>Message</h3>
            <div style={{ marginBottom: "10px", borderBottom: '1px solid #ddd' }}>
                <div>
                    <button onClick={handlePlay} style={{ marginRight: "5px", marginBottom: '5px', border: 'none', backgroundColor: "#f9f9f9" }}><FaPlay /></button>
                    <button onClick={() => handleFormatText('bold')} style={{ marginRight: "5px", marginBottom: '5px', border: 'none', backgroundColor: "#f9f9f9" }}><FaBold /></button>
                    <button onClick={() => handleFormatText('italic')} style={{ marginRight: "5px", marginBottom: '5px', border: 'none', backgroundColor: "#f9f9f9" }}><FaItalic /></button>
                    <button onClick={() => handleFormatText('underline')} style={{ marginRight: "5px", marginBottom: '5px', border: 'none', backgroundColor: "#f9f9f9" }}><FaUnderline /></button>
                    <button onClick={() => handleFormatText('strikeThrough')} style={{ marginRight: "5px", marginBottom: '5px', border: 'none', backgroundColor: "#f9f9f9" }}><FaStrikethrough /></button>
                    <button onClick={handleInsertLink} style={{ marginRight: "5px", border: 'none', marginBottom: '5px', backgroundColor: "#f9f9f9" }}><FaLink /></button>
                    <button onClick={handleDelay} style={{ marginRight: "5px", border: 'none', backgroundColor: "#f9f9f9" }}><FaClock /></button>
                </div>
                <div style={{ position: 'relative' }}>
                    {!isFocused && !newMessage && (
                        <span style={{
                            position: 'absolute',
                            left: '5px',
                            top: '5px',
                            color: '#aaa',
                            pointerEvents: 'none',
                        }}>
                            {/* Enter your message... */}
                        </span>
                    )}
                    <div
                        id="messageInput"
                        contentEditable
                        suppressContentEditableWarning
                        onInput={(e) => handleMessageChange(e.currentTarget.innerHTML)}
                        style={{
                            minHeight: '100px',
                            paddingTop: '10px',
                            fontSize: '16px',
                            backgroundColor: "#f9f9f9",
                            outline: 'none',
                            border: 'none'
                        }}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        dangerouslySetInnerHTML={{ __html: newMessage }}
                    />
                </div>
            </div>
            <strong>Variants</strong>
            {/* <button
                
                style={{
                    border: 'none',
                    // backgroundColor: "#007BFF",
                    color: '#fff',
                    fontSize: '24px',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    float: 'right',
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#0056b3'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#007BFF'}
            >
                
            </button> */}
            <FiPlusCircle style={{float: 'right', cursor: 'pointer'}} size={20} onClick={addVariant} />
            <br></br>
            <br></br>
            {variants.map((variant) => (
                <div key={variant.id} style={{ marginBottom: "10px", marginTop: '15px', paddingBotton: '10px', borderBottom: '1px solid #ddd' }}>
                    <FiMinusCircle style={{float: 'right', cursor: 'pointer'}} size={20} onClick={() => removeVariant(variant.id)} />
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                        <button onClick={handlePlay} style={{ marginRight: "5px", border: 'none', backgroundColor: "#f9f9f9" }}>
                            <FaPlay />
                        </button>
                        <button onClick={() => handleFormatText('bold')} style={{ marginRight: "5px", border: 'none', backgroundColor: "#f9f9f9" }}>
                            <FaBold />
                        </button>
                        <button onClick={() => handleFormatText('italic')} style={{ marginRight: "5px", border: 'none', backgroundColor: "#f9f9f9" }}>
                            <FaItalic />
                        </button>
                        <button onClick={() => handleFormatText('underline')} style={{ marginRight: "5px", border: 'none', backgroundColor: "#f9f9f9" }}>
                            <FaUnderline />
                        </button>
                        <button onClick={() => handleFormatText('strikeThrough')} style={{ marginRight: "5px", border: 'none', backgroundColor: "#f9f9f9" }}>
                            <FaStrikethrough />
                        </button>
                        <button onClick={handleInsertLink} style={{ marginRight: "5px", border: 'none', backgroundColor: "#f9f9f9" }}>
                            <FaLink />
                        </button>
                        <button onClick={handleDelay} style={{ marginRight: "5px", border: 'none', backgroundColor: "#f9f9f9" }}>
                            <FaClock />
                        </button>
                    </div>

                    <div style={{ position: 'relative' }}>
                        {!isFocused && !variant.message && (
                            <span style={{
                                position: 'absolute',
                                left: '5px',
                                top: '5px',
                                color: '#aaa',
                                pointerEvents: 'none',
                            }}>
                                {/* Enter your message... */}
                            </span>
                        )}
                        <div
                            contentEditable
                            suppressContentEditableWarning
                            onInput={(e) => handleMessageChange(e.currentTarget.innerHTML)}
                            style={{
                                minHeight: '10px',
                                padding: '5px',
                                fontSize: '16px',
                                backgroundColor: "#f9f9f9",
                                border: 'none',
                                outline: 'none'
                            }}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            dangerouslySetInnerHTML={{ __html: variant.message }}
                        />
                    </div>
                    <button
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            padding: '8px 12px',
                            marginTop: '5px',
                            marginBottom: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            backgroundColor: '#f9f9f9',
                            color: '#333',
                            fontSize: '14px',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s, border-color 0.3s',
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = '#e6e6e6';
                            e.currentTarget.style.borderColor = '#999';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = '#f9f9f9';
                            e.currentTarget.style.borderColor = '#ccc';
                        }}
                        onMouseDown={(e) => {
                            e.currentTarget.style.backgroundColor = '#dcdcdc';
                            e.currentTarget.style.borderColor = '#666';
                        }}
                        onMouseUp={(e) => {
                            e.currentTarget.style.backgroundColor = '#e6e6e6';
                            e.currentTarget.style.borderColor = '#999';
                        }}
                        onClick={() => handleCondition(variant.id)}
                    >
                        <span
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                            }}
                        >
                            <PiCornersOut size={19} />
                        </span>
                        {/* Condition */}
                        {/* Uncomment and adjust the conditional rendering logic as needed */}
                        {/* {conditions.length === 1 ? ' Condition' : ' ' + conditions.length} */}
                        {
                            variantConditions[variant.id] ? (
                                <div>{renderConditionLength(variant.id)}</div>
                            ) : (
                                <div>Condition</div>
                            )
                        }
                    </button>

                    {visibleCondition !== null && (
                        <div
                            ref={conditionDivRef}
                            style={{
                                width: "350px",
                                height: `${50 + (conditionCount - 1) * 31}px`,
                                maxHeight: '50%',
                                backgroundColor: "#f9f9f9",
                                padding: "20px",
                                border: "1px solid #ddd",
                                display: visibleCondition !== null ? "block" : "none",
                                position: "absolute",
                                top: `${350 + variants.findIndex(v => v.id === visibleCondition.variantId) * 100}px`,
                                right: "350px",
                                overflow: "hidden",
                                borderRadius: '10px',
                                zIndex: 10001,
                                transition: "height 0.3s ease-in-out",
                                overflowY: "visible"
                            }}
                        >
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                                <div style={{ display: "flex", borderBottom: "1px solid #ddd", width: "70%" }}>
                                    <div
                                        style={{
                                            padding: "5px 10px",
                                            cursor: "pointer",
                                            backgroundColor: visibleCondition.activeTab === "all" ? "#fff" : "#f0f0f0",
                                            borderBottom: visibleCondition.activeTab === "all" ? "2px solid #007bff" : "none"
                                        }}
                                        onClick={() => setActiveTabForCondition("all")}
                                    >
                                        Match all
                                    </div>
                                    <div
                                        style={{
                                            padding: "5px 10px",
                                            cursor: "pointer",
                                            backgroundColor: visibleCondition.activeTab === "any" ? "#fff" : "#f0f0f0",
                                            borderBottom: visibleCondition.activeTab === "any" ? "2px solid #007bff" : "none"
                                        }}
                                        onClick={() => setActiveTabForCondition("any")}
                                    >
                                        Match any
                                    </div>
                                </div>
                                <div>
                                    <button style={{ marginRight: "5px", cursor: 'pointer' }}>?</button>
                                    <button style={{ cursor: 'pointer' }} onClick={addCondition}>+</button>
                                </div>
                            </div>
                            {conditions.map((condition, index) => (
                                <div key={condition.id} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                                    <p style={{ margin: "0 5px" }}>if</p>
                                    <select style={{ marginRight: "15px", border: 'none', backgroundColor: "#f9f9f9", outline: 'none' }}>
                                        <option>variable</option>
                                    </select>
                                    <p style={{ margin: "0 5px" }}>is</p>
                                    <input
                                        onChange={(e) => handleConditionChange(visibleCondition.variantId, condition.id, e.target.value)}
                                        value={variantConditions[visibleCondition.variantId]?.[condition.id] || ''}
                                        type="text"
                                        placeholder="value or {var}"
                                        style={{ backgroundColor: "#f9f9f9", marginRight: "5px", border: 'none', outline: 'none' }}
                                    />
                                    <button
                                        style={{
                                            cursor: conditions.length > 1 ? 'pointer' : 'not-allowed',
                                            opacity: conditions.length > 1 ? 1 : 0.5
                                        }}
                                        onClick={() => conditions.length > 1 && removeCondition(condition.id)}
                                        disabled={conditions.length === 1}
                                    >
                                        -
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}

            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <button
                    onClick={handleSaveMessage}
                    style={{
                        padding: "10px",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        borderRadius: "5px",
                        border: "none",
                        cursor: "pointer",
                        width: '100%',
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007BFF'}
                >
                    Save
                </button>
            </div>
        </div>
    )
}

export default MessageRightPanel;