import React from 'react';
import OrderCss from '../css/components/Order.module.css'
import {useNavigate} from "react-router-dom";
import {ORDERPAGE_ROUTE} from "../utils/consts";

const Order = (props) => {

    const navigate = useNavigate()

    return (
        <div>
            <div onClick={() => navigate(ORDERPAGE_ROUTE + '/' + props.id)}
                className={OrderCss.list_elem + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                <h2 className={OrderCss.text_order + ' col-xxl-2 offset-xxl-1 col-xl-2 offset-xl-1 col-lg-2 offset-lg-1 col-md-2 offset-md-1 col-sm-2 offset-sm-1 col-3 offset-1'}>{'Заказ ' + props.id}</h2>
                <h2 className={OrderCss.text_order + ' col-xxl-3 offset-xxl-0 col-xl-3 offset-xl-0 col-lg-4 offset-lg-0 ' +
                    'col-md-5 offset-md-0 col-sm-5 offset-sm-1 col-5 offset-0'}>{props.date}</h2>
                {props.submit === 'ожидает подтверждения' ?
                    <div className={OrderCss.round + ' ' + OrderCss.yellow + ' offset-xxl-5 offset-xl-4 offset-lg-4 offset-md-3 offset-sm-1 offset-1'}></div>
                    : props.submit === 'отклонён' ?
                        <div className={OrderCss.round + ' ' + OrderCss.red + ' offset-xxl-5 offset-xl-4 offset-lg-4 offset-md-3 offset-sm-1 offset-1'}></div>
                        : props.submit === 'выполняется' ?
                            <div className={OrderCss.round + ' ' + OrderCss.turquoise + ' offset-xxl-5 offset-xl-4 offset-lg-4 offset-md-3 offset-sm-1 offset-1'}></div>
                            : props.submit === 'выполнен' ?
                                <div className={OrderCss.round + ' ' + OrderCss.green + ' offset-xxl-5 offset-xl-4 offset-lg-4 offset-md-3 offset-sm-1 offset-1'}></div>
                                :
                                <div></div>
                }
            </div>
        </div>
    );
};

export default Order;