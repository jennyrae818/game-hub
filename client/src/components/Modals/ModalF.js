import React from "react";

const ModalF = props => {
    if (!props.show) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modalContent">
                <div className="modalHeader">
                    <h4 className="modalTitle">Not Successful!</h4>
                </div>
                <div className="modalBody">
                    Something is missing in the information provided, please try again.
                </div>
                <div className="modalFooter">
                    <button onClick={props.onClose} className="modalButton">Close</button>
                </div>
            </div>
        </div>
    )
}

export default ModalF;