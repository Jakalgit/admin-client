import React from 'react';
import {CSSTransition} from "react-transition-group";
import "../css/components/Alert.css"

const Alert = (props) => {

    return (
        <CSSTransition
            in={props.start}
            timeout={350}
            classNames="alert"
            mountOnEnter
            unmountOnExit
        >
            <div className="alert" onClick={() => props.updateStart(false)}>
                {props.variant === 'primary' ?
                    <div className="alert_block alert_primary">
                        <h2 className="alert_text">{props.text}</h2>
                    </div>
                    :
                    <div className="alert_block alert_danger">
                        <h2 className="alert_text">{props.text}</h2>
                    </div>
                }
            </div>
        </CSSTransition>
    );
};

export default Alert;