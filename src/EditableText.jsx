import React, { useState, useEffect, useRef } from "react";

// An editable text component
export default function EditableText({ card }) {

    const [isEditable, setIsEditable] = useState(false);
    const [text, setText] = useState(card.title);
    const prevText = useRef();

    useEffect(() => {
        prevText.current = text; // save the current title text
    }, []);

    const handleEdit = (event) => {
        event.stopPropagation(); // Prevents the event from bubbling up to the parent
        { event.target.id == "Edit" ? setIsEditable(true) : null }
        { event.target.id == "Save" ? setIsEditable(false) : null }
        { event.target.id == "Cancel" ? (setIsEditable(false), setText(prevText.current)) : null }
    };

    const handleChange = (event) => {
        event.stopPropagation();
        setText(event.target.value);
    };

    return (
        <>
            <div style={{ padding: "5px", fontFamily: "Arial", color: "red" }}>
                {isEditable ? (
                    <input
                        type="text"
                        value={text}
                        onClick={handleEdit}
                        onChange={handleChange}
                        style={{ display: 'flex', fontSize: "16px", justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}
                    />
                ) : (
                    <p id='Edit' onClick={handleEdit}
                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px' }}>
                        {text}
                    </p>
                )}

                <div>
                    {isEditable ? (
                        <div>
                            <button
                                id="Save"
                                onClick={handleEdit}
                                style={{
                                    padding: "10px 20px",
                                    fontSize: "16px",
                                    cursor: "pointer",
                                    backgroundColor: "#28a745",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "5px",
                                }}>
                                Save
                            </button>
                            <button
                                id="Cancel"
                                onClick={handleEdit}
                                style={{
                                    padding: "10px 20px",
                                    fontSize: "16px",
                                    cursor: "pointer",
                                    backgroundColor: "#28a745",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "5px",
                                }}>
                                Cancel
                            </button>
                        </div>
                    ) :
                        <div></div>
                    }
                </div>
            </div>
        </>
    );
};

