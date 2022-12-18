import React, {useEffect, useState} from 'react';
import {fetchFullItems} from "../../http/API/itemAPI"
import {Spinner} from "react-bootstrap";
import FindChangeCss from "../../css/admin/FindChange.module.css"
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import {CHANGEITEM_ROUTE} from "../../utils/consts";
import CatalogCss from '../../css/Catalog.module.css';
import Footer from "../../components/Footer";
import LoadImage from "../../components/LoadImage";

const FindChange = observer(() => {

    const navigate = useNavigate()

    const [items, setItems] = useState([])
    const [filteredItems, setFilteredItems] = useState([])
    const [search, setSearch] = useState('')

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchFullItems().then(data => {
            setItems(data)
            setLoading(false)
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

    const onClickItem = (id) => {
        navigate(CHANGEITEM_ROUTE + '/' + id)
    }

    if (loading) {
        return <Spinner animation={"grow"} />
    }

    return (
        <div className="work-section">
            <div className="container">
                <div className="row">
                    <h2 className={FindChangeCss.select_item}>Выбрете товар</h2>
                    <input type="text"
                           value={search}
                           onChange={e => setSearch(e.target.value)}
                           className={FindChangeCss.find_item + ' col-xxl-8 offset-xxl-2 col-xl-8 offset-xl-2 col-lg-8 offset-lg-2 col-md-10 offset-md-1 col-sm-10 offset-sm-1 col-10  offset-1'}
                           placeholder="Введите название"/>
                    <div className="items-block">
                        {filteredItems.length !== 0 ?
                            <div className="row">
                                {filteredItems.map(item =>
                                    <div onClick={() => onClickItem(item.id)}
                                         className={FindChangeCss.item + ' col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12'}>
                                        <h2 className={FindChangeCss.item_name}>{item.name}</h2>
                                        <div className={FindChangeCss.img}>
                                            <LoadImage name={item.img} className={FindChangeCss.image} />
                                        </div>
                                    </div>
                                )}
                            </div>
                            :
                            <div className="row">
                                <h2 className={CatalogCss.empty_text}>Пусто...</h2>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
});

export default FindChange;