import React, {useEffect, useState} from 'react';
import OrdersCss from '../../css/admin/Orders.module.css'
import {fetchAllOrders} from "../../http/API/orderAPI";
import Order from "../../components/Order";
import general from "../../css/General.module.css";
import {Spinner} from "react-bootstrap";

const Orders = () => {

    const [listOrders, setListOrders] = useState([])
    const [filteredOrders, setFilteredOrders] = useState([])
    const [loading, setLoading] = useState(true)

    const [value, setValue] = useState('')

    useEffect(() => {
        fetchAllOrders().then(data => {
            setListOrders(data)
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        if (value) {
            setFilteredOrders([])
            listOrders.forEach(order => {
                if (order.phoneNumber.startsWith(value)) {
                    setFilteredOrders(prevState => [...prevState, order])
                }
            })
        } else {
            setFilteredOrders(listOrders)
        }
    }, [value, listOrders])

    if (loading) {
        return (
            <div className={general.loading}>
                <Spinner animation="border" variant="secondary" />
            </div>
        )
    }

    return (
        <section className={OrdersCss.order_check_section}>
            <div className="container">
                <div className="row">
                    <h2 className={OrdersCss.your_order}>Ваши заказы</h2>
                    <div className={OrdersCss.example_block}>
                        <div className={OrdersCss.round + ' ' + OrdersCss.turquoise}></div>
                        <h2 className={OrdersCss.text}>Заказ выполянется</h2>
                    </div>
                    <div className={OrdersCss.example_block}>
                        <div className={OrdersCss.round + ' ' + OrdersCss.green}></div>
                        <h2 className={OrdersCss.text}>Заказ выполнен</h2>
                    </div>
                    <div className={OrdersCss.example_block}>
                        <div className={OrdersCss.round + ' ' + OrdersCss.red}></div>
                        <h2 className={OrdersCss.text}>Заказ отклонён</h2>
                    </div>
                    <div className={OrdersCss.example_block}>
                        <div className={OrdersCss.round + ' ' + OrdersCss.yellow}></div>
                        <h2 className={OrdersCss.text}>Заказ ожидает подтверждения</h2>
                    </div>
                    <input type="text" className={OrdersCss.finder} placeholder="Введите номер телефона +7"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}/>
                    <div className='list-order col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'>
                        {filteredOrders.length !== 0 ?
                            <div>
                                {filteredOrders.reverse().map(order =>
                                    <Order key={order.id} submit={order.typeSubmit.toLowerCase()} date={order.createdAt.substring(0, order.createdAt.search('T'))} id={order.id} />
                                )}
                            </div>
                            :
                            <div/>
                        }
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Orders;