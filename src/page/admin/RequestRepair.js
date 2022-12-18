import React, {useEffect, useState} from 'react';
import style_css from "../../css/admin/RequestRepair.module.css"
import {changeResponse, getAllRequests} from "../../http/API/repairAPI";
import general from "../../css/General.module.css";
import {Spinner} from "react-bootstrap";

const RequestRepair = () => {

    const [reqList, setReqList] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getAllRequests().then(data => {
            setReqList(data)
            setLoading(false)
        })
    }, [])

    const clickChange = (id) => {
        changeResponse(id, true).then(() => {
            setLoading(true)
            getAllRequests().then(data => {
                setReqList(data)
                setLoading(false)
            })
        })
    }

    if (loading) {
        return (
            <div className={general.loading}>
                <Spinner animation="border" variant="secondary" />
            </div>
        )
    }

    return (
        <div className="block">
            <div className="container">
                <div className="row">
                    <h1 className={style_css.req}>Заявки</h1>
                    <div className={style_css.req_list}>
                        {reqList.map(request =>
                            <div
                                className={style_css.request +
                                    ' col-xxl-8 offset-xxl-2 col-xl-8 offset-xl-2 col-lg-8 offset-lg-2 col-md-8 offset-md-2 col-sm-10 offset-1 col-10 offset-1'}>
                                <h1 className={style_css.name}>{request.name}</h1>
                                <h1 className={style_css.phone}>{request.phone}</h1>
                                {request.response ?
                                    <h1 className={style_css.status + ' ' + style_css.status_green}>Отвечено</h1>
                                    :
                                    <h1 className={style_css.status + ' ' + style_css.status_red}>Не отвечено</h1>
                                }
                                {!request.response ?
                                    <button className={style_css.res} onClick={() => clickChange(request.id)}>
                                        <img src={require("../../img/check.svg")} alt="" className={style_css.check}/>
                                    </button>
                                    :
                                    <div/>
                                }
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RequestRepair;