import React from 'react';
import {Modal} from "react-bootstrap";
import ModalCss from '../css/components/Modal.module.css'

const ModalWindow = (props) => {
    return (
        <div onClick={props.onHide}>
            <Modal className={'modal'}  show={props.show} aria-labelledby="contained-modal-title-vcenter" centered>
                <div className={ModalCss.modal_div + ' col-xxl-12'}>
                    <h2 className={ModalCss.modal_text}>{props.text}</h2>
                </div>
            </Modal>
        </div>
    );
};

export default ModalWindow;