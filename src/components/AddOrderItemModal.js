import React, {useContext, useEffect, useState} from 'react';
import style_css from "../css/components/AddOrderItemModal.module.css"
import {fetchFullItems} from "../http/API/itemAPI";
import {createOrderItem} from "../http/API/orderItemAPI"
import "../css/components/ModalTransition.css"
import {CSSTransition} from "react-transition-group";
import {observer} from "mobx-react-lite";

const AddOrderItemModal = observer((props) => {

    const [search, setSearch] = useState('')
    const [price, setPrice] = useState('')

    const [items, setItems] = useState([])
    const [filteredItems, setFilteredItems] = useState([])

    const [currentItem, setCurrentItem] = useState(null)

    useEffect(() => {
        fetchFullItems().then(data => {
            setItems(data)
        })
    }, [])

    useEffect(() => {
        if (search) {
            setFilteredItems(Object.values(items).filter(item => {
                return item.name.toLowerCase().includes(search.toLowerCase())
            }))
        } else {
            setFilteredItems(items)
        }
    }, [items, search])

    const addOrderItem = () => {
        if (currentItem && price) {
            createOrderItem(currentItem.id, currentItem.name, price, currentItem.img, 1, props.orderId).then(data => {
                if (data !== "Ошибка") {
                    props.setMessage("Добавлено")
                    props.setStyle("primary")
                } else {
                    props.setMessage("Ошибка")
                    props.setStyle("danger")
                }
                props.setStart(true)
            })
        } else {
            props.setMessage("Выбрете товар и введите цену")
            props.setStyle("danger")
            props.setStart(true)
        }
    }

    return (
        <CSSTransition
            in={props.show}
            timeout={350}
            classNames="modal-item"
            mountOnEnter
            unmountOnExit
        >
            <div className={style_css.modal_item + ' modal-item'}>
                <div className="container">
                    <div className="row">
                        <div className={style_css.up_line}>
                            <h2 className={style_css.select_text}>Выберете товар</h2>
                            <img onClick={() => props.setShow(false)} src={require("../img/x_black.svg")} alt="" className={style_css.close_modal} />
                        </div>
                        <input type="text"
                               value={search}
                               onChange={(e) => setSearch(e.target.value)}
                               className={style_css.input + ' col-xxl-8 offset-xxl-2 col-xl-8 offset-xl-2 col-lg-8 offset-lg-2 col-md-8 offset-md-2 col-sm-10 offset-sm-1 col-10 offset-1'}
                               placeholder="Введите названия"/>
                        <div className={style_css.items}>
                            <div className="row">
                                {filteredItems.map(item =>
                                    <div key={item.id} className={style_css.item + ' col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12'}>
                                        <h2 className={style_css.item_name}>{item.name}</h2>
                                        <div onClick={() => setCurrentItem(item)}
                                             className={style_css.img}>
                                            <img src={process.env.REACT_APP_API_URL + item.img} alt="" className={style_css.image}/>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <input type="number"
                               value={price}
                               onChange={(e) => setPrice(e.target.value)}
                               className={style_css.input + ' col-xxl-4 offset-xxl-1 col-xl-4 offset-xl-1 col-lg-4 offset-lg-1 col-md-4 offset-md-1 col-sm-10 offset-sm-1 col-10 offset-1'}
                               placeholder="Введите цену"/>
                        <button onClick={addOrderItem}
                                className={style_css.save + ' col-xxl-4 offset-xxl-2 col-xl-4 offset-xl-2 col-lg-4 offset-lg-2 col-md-4 offset-md-2 col-sm-10 offset-sm-1 col-10 offset-1'}>Добавить
                        </button>
                    </div>
                </div>
            </div>
        </CSSTransition>
    );
});

export default AddOrderItemModal;