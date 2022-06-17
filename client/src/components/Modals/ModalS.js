import React from "react";

const ModalS = props => {
    //if state isn't active, don't show modal
    if (!props.show) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modalContent">
                <div className="modalHeader">
                    <h4 className="modalTitle">Success!</h4>
                </div>
                <div className="modalBody">
                    Thank you for adding a game to our database!
                </div>
                <div className="modalFooter">
                    <button onClick={props.onClose} className="modalButton">Close</button>
                </div>
            </div>
        </div>
    )
}

export default ModalS;