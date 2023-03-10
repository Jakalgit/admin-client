import React, {useEffect, useState} from 'react';
import style_css from "../../css/admin/OrderPage.module.css"
import {changeSubmit, deleteOrder, fetchOneOrder, setTrackNumber} from "../../http/API/orderAPI"
import {deleteOrderItems, fetchOrderItems} from "../../http/API/orderItemAPI";
import Footer from "../../components/Footer";
import OrderItem from "../../components/OrderItem";
import {Spinner} from "react-bootstrap";
import BasketPageCss from "../../css/BasketPage.module.css";
import Alert from "../../components/Alert";
import AddOrderItemModal from "../../components/AddOrderItemModal";
import {useParams} from "react-router-dom";

const OrderPage = () => {

    const [order, setOrder] = useState(null)
    const [orderItems, setOrderItems] = useState([])
    const {id} = useParams()

    const [fullPrice, setFullPrice] = useState('0')
    const [track, setTrack] = useState('')

    const [start, setStart] = useState(false)
    const [message, setMessage] = useState('')
    const [style, setStyle] = useState('primary')

    const [showModal, setShowModal] = useState(false)

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchOneOrder(id).then(data => {
            setOrder(data)
            fetchOrderItems(id).then(data => {
                setOrderItems(data.rows)
                setLoading(false)
            })
        })
    }, [])

    useEffect(() => {
        if (start) {
            setTimeout(() => {
                setStart(false)
            }, 2500)
        }
    }, [start])

    useEffect(() => {
        if (order) {
            let prc = '0'
            orderItems.forEach(item => {
                prc = String(Number(prc) + Number(item.price) * Number(item.count))
            })
            if (prc.length > 3) {
                prc = prc.slice(0, prc.length - 3) + ' ' + prc.slice(prc.length - 3, prc.length)

                if (prc.length > 7) {
                    prc = prc.slice(0, prc.length - 7) + ' ' + prc.slice(prc.length - 7, prc.length)
                }
            }
            setFullPrice(prc)
        }
    }, [orderItems])

    const updateOrderItems = () => {
        fetchOrderItems(id).then(data => {
            setOrderItems(data.rows)
        })
    }

    const updateOrder = () => {
        fetchOneOrder(id).then(data => {
            setOrder(data)
        })
    }

    const onChangeStatus = () => {
        if (order.typeSubmit === '?????????????? ??????????????????????????') {
            changeSubmit(id, '??????????????????????').then(() => {
                updateOrder()
            })
        }

        if (order.typeSubmit === '??????????????????????') {
            changeSubmit(id, '????????????????').then(() => {
                updateOrder()
            })
        }
    }

    const rejectOrder = () => {
        changeSubmit(id, '????????????????').then(() => {
            updateOrder()
        })
    }

    const deleteCurrentOrder = () => {
        if (order.typeSubmit === '????????????????' || order.typeSubmit === '????????????????') {
            deleteOrder(id).then(() => {
                deleteOrderItems(id).then(() => {
                    setOrder(null)
                    setOrderItems(null)
                })
            })
        }
    }

    const saveTrack = () => {
        if (track.length === 10) {
            setTrackNumber(id, track).then(data => {
                if (data === '??????????????????') {
                    setStyle('primary')
                } else {
                    setStyle('danger')
                }
                setMessage(data)
                updateOrder()
            })
        } else {
            setStyle('danger')
            setMessage('?????????? ?????????? ??????????: 10')
            setStart(true)
        }
    }

    const updateMessage = (value) => {
        setMessage(value)
    }

    const updateStart = (value) => {
        setStart(value)
    }

    const updateStyle = (value) => {
        setStyle(value)
    }

    const updateModal = (value) => {
        setShowModal(value)
    }

    if (loading) {
        return <Spinner animation={"grow"}/>
    }

    return (
        <div>
            <Alert start={start} variant={style} text={message} updateStart={(value) => updateStart(value)}/>
            <AddOrderItemModal
                orderId={id} show={showModal}
                setShow={(value) => updateModal(value)}
                setMessage={(value) => updateMessage(value)}
                setStyle={(value) => updateStyle(value)}
                setStart={(value) => updateStyle(value)}
            />
            {order !== null ?
                <div>
                    <div className={style_css.check_order}>
                        <div className="container">
                            <div className="row">
                                <h2 className={style_css.check_order_text + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>{'?????????? ??? ' + order.number}</h2>
                                <div className={style_css.left_block + ' col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12'}>
                                    <h2 className={style_css.header_info}>??????:</h2>
                                    <h2 className={style_css.info}>{(order.lastName === '???? ??????????????' ? '' : order.lastName) + ' ' +
                                        order.firstName + ' ' + (order.secondName === '???? ??????????????' ? '' : order.secondName)}</h2>
                                    <h2 className={style_css.header_info}>???????????????????? ????????????:</h2>
                                    {order.phoneNumber ?
                                        <h2 className={style_css.info}>{order.phoneNumber}</h2>
                                        :
                                        <h2 className={style_css.info}>?????????? ????????????????: ???? ??????????????</h2>
                                    }
                                    {order.email ?
                                        <h2 className={style_css.info}>{'?????????? ??????????: ' + order.email}</h2>
                                        :
                                        <h2 className={style_css.info}>?????????? ??????????: ???? ??????????????</h2>
                                    }
                                    {order.typeDelivery === '1' ?
                                        <div/>
                                        :
                                        <div>
                                            {order.typeDelivery === '2' ?
                                                <div>
                                                    <h2 className={style_css.header_info}>??????????:</h2>
                                                    <h2 className={style_css.info}>{order.street + ' ' + order.house + ', ' + order.flat}</h2>
                                                    <h2 className={style_css.info}>{'????????????: ' + order.index}</h2>
                                                </div>
                                                :
                                                <div>
                                                    <h2 className={style_css.header_info}>??????????:</h2>
                                                    <h2 className={style_css.info}>{'????????????: ' + order.index}</h2>
                                                </div>
                                            }
                                        </div>
                                    }
                                </div>
                                <div className={style_css.right_block + ' col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12'}>
                                    <h2 className={style_css.header_info}>???????????? ????????????:</h2>
                                    {order.typePay === '1' ?
                                        <h2 className={style_css.info}>???????????? ????????????</h2>
                                        :
                                        <h2 className={style_css.info}>???????????? ??????????????????</h2>
                                    }
                                    <h2 className={style_css.header_info}>???????????? ????????????????:</h2>
                                    {order.typeDelivery === '1' ?
                                        <h2 className={style_css.info}>??????????????????</h2>
                                        :
                                        order.typeDelivery === '2' ?
                                            <h2 className={style_css.info}>???????????????? ???? ????????????</h2>
                                            :
                                            <h2 className={style_css.info}>{order.house}</h2>
                                    }
                                    {order.track === '???? ??????????????' ?
                                        <h2 className={style_css.info}>---------------------</h2>
                                        :
                                        <h2 className={style_css.info}>{order.track}</h2>
                                    }
                                    <h2 className={style_css.header_info}>???????????? ????????????:</h2>
                                    <h2 className={style_css.info}>{order.typeSubmit}</h2>
                                </div>
                                {order.typeDelivery === '3' ?
                                    <div className="col-xxl-10 offset-xxl-1 col-xl-10 offset-xl-1 col-lg-10 offset-lg-1 col-md-10 offset-md-1 col-sm-12 offset-sm-0 col-10 offset-1">
                                        <input type="text"
                                               value={track}
                                               onChange={(e) => setTrack(e.target.value)}
                                               className={style_css.input + ' col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8'}
                                               placeholder="?????????????? ????????-??????????"/>
                                        <button onClick={saveTrack}
                                            className={style_css.save + ' col-xxl-3 offset-xxl-1 col-xl-3 offset-xl-1 col-lg-3 offset-lg-1 col-md-3 offset-md-1 col-sm-3 offset-sm-1 col-3 offset-1'}>
                                            ??????????????????
                                        </button>
                                    </div>
                                    :
                                    <div/>
                                }
                                {order.typeSubmit === '?????????????? ??????????????????????????' ?
                                    <div>
                                        <button onClick={onChangeStatus}
                                            className={style_css.button + ' ' + style_css.turquoise + ' col-xxl-4 offset-xxl-1 col-xl-4 offset-xl-1 col-lg-4 offset-lg-1 col-md-4 offset-md-1 col-sm-12 offset-sm-0 col-10 offset-1'}>
                                            ??????????????????
                                        </button>
                                        <button onClick={rejectOrder}
                                            className={style_css.button + ' ' + style_css.red + ' col-xxl-4 offset-xxl-2 col-xl-4 offset-xl-2 col-lg-4 offset-lg-2 col-md-4 offset-md-2 col-sm-12 offset-sm-0 col-10 offset-1'}>
                                            ??????????????????
                                        </button>
                                    </div>
                                    :
                                    <div/>
                                }
                                {order.typeSubmit === '??????????????????????' ?
                                    <div>
                                        <button onClick={onChangeStatus}
                                            className={style_css.button + ' ' + style_css.green + ' col-xxl-4 offset-xxl-1 col-xl-4 offset-xl-1 col-lg-4 offset-lg-1 col-md-4 offset-md-1 col-sm-12 offset-sm-0 col-10 offset-1'}>
                                            ????????????????
                                        </button>
                                        <button onClick={rejectOrder}
                                            className={style_css.button + ' ' + style_css.red + ' col-xxl-4 offset-xxl-2 col-xl-4 offset-xl-2 col-lg-4 offset-lg-2 col-md-4 offset-md-2 col-sm-12 offset-sm-0 col-10 offset-1'}>
                                            ??????????????????
                                        </button>
                                    </div>
                                    :
                                    <div/>
                                }
                                {order.typeSubmit === '????????????????' || order.typeSubmit === '????????????????' ?
                                    <div>
                                        <button onClick={deleteCurrentOrder}
                                            className={style_css.button + ' ' + style_css.red + ' col-xxl-4 offset-xxl-4 col-xl-4 offset-xl-4 col-lg-4 offset-lg-4 col-md-4 offset-md-4 col-sm-12 offset-sm-0 col-10 offset-1'}>
                                            ??????????????
                                        </button>
                                    </div>
                                    :
                                    <div/>
                                }
                            </div>
                        </div>
                    </div>

                    <div className={style_css.order_items}>
                        <div className="container">
                            <div className="row">
                                <h2 className={style_css.sum}>??????????</h2>
                                <h2 className={style_css.digital_sum}>{fullPrice + ' ???'}</h2>
                                <button onClick={() => setShowModal(true)}
                                    style={{backgroundColor: "#000", marginTop: "1rem"}}
                                    className={style_css.button + ' ' + style_css.red + ' col-xxl-4 offset-xxl-4 col-xl-4 offset-xl-4 col-lg-4 offset-lg-4 col-md-4 offset-md-4 col-sm-12 offset-sm-0 col-10 offset-1'}>
                                    ???????????????? ??????????
                                </button>
                                <div className='items'>
                                    {orderItems.map(item =>
                                        <OrderItem updateItems={() => updateOrderItems()} itemId={item.id} count={item.count} orderId={item.orderId}/>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
                :
                <div className="container">
                    <div className="row">
                        <h2 className={BasketPageCss.empty_text}>?????????? ????????????</h2>
                    </div>
                </div>
            }
        </div>
    );
};

export default OrderPage;