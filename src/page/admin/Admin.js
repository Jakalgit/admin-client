import React from 'react';
import AdminCss from "../../css/admin/Admin.module.css"
import {useNavigate} from "react-router-dom";
import {
    CHANGE_TAG_ROUTE,
    CHATS_ROUTE,
    CREATE_TAG_ROUTE,
    CREATEITEM_ROUTE,
    FINDCHANGE_ROUTE,
    ORDERS_ROUTE, REQUEST_REPAIR_ROUTE
} from "../../utils/consts";
import Footer from "../../components/Footer";

const Admin = () => {

    const navigate = useNavigate()

    return (
        <section className="admin-section">
            <div className={AdminCss.admin + ' admin'}>
                <div className="container">
                    <div className="row">
                        <h1 className={AdminCss.admin_panel + ' col-xxl-8 offset-xxl-2'}>Страница администратора</h1>
                        <div className={AdminCss.admin_button_block}>
                            <div className="row">
                                <button onClick={() => navigate(CREATEITEM_ROUTE)} className={AdminCss.button_admin +
                                    ' col-xxl-8 offset-xxl-2 col-xl-8 offset-xl-2 col-lg-8 offset-lg-2 col-md-10 offset-md-1 col-sm-10 offset-sm-1 col-10 offset-1'}>
                                    Добавить товар
                                </button>
                                <button onClick={() => navigate(CREATE_TAG_ROUTE)} className={AdminCss.button_admin +
                                    ' col-xxl-8 offset-xxl-2 col-xl-8 offset-xl-2 col-lg-8 offset-lg-2 col-md-10 offset-md-1 col-sm-10 offset-sm-1 col-10 offset-1'}>
                                    Добавить / Удалить тег
                                </button>
                                <button onClick={() => navigate(ORDERS_ROUTE)} className={AdminCss.button_admin +
                                    ' col-xxl-8 offset-xxl-2 col-xl-8 offset-xl-2 col-lg-8 offset-lg-2 col-md-10 offset-md-1 col-sm-10 offset-sm-1 col-10 offset-1'}>
                                    Заказы
                                </button>
                                <button onClick={() => navigate(REQUEST_REPAIR_ROUTE)} className={AdminCss.button_admin +
                                    ' col-xxl-8 offset-xxl-2 col-xl-8 offset-xl-2 col-lg-8 offset-lg-2 col-md-10 offset-md-1 col-sm-10 offset-sm-1 col-10 offset-1'}>
                                    Заявки на ремнот
                                </button>
                                <button onClick={() => navigate(CHATS_ROUTE)} className={AdminCss.button_admin +
                                    ' col-xxl-8 offset-xxl-2 col-xl-8 offset-xl-2 col-lg-8 offset-lg-2 col-md-10 offset-md-1 col-sm-10 offset-sm-1 col-10 offset-1'}>
                                    Чаты
                                </button>
                            </div>
                        </div>
                        <div className={AdminCss.change_block}>
                            <div className="row">
                                <button onClick={() => navigate(FINDCHANGE_ROUTE)} className={AdminCss.button_admin +
                                    ' col-xxl-8 offset-xxl-2 col-xl-8 offset-xl-2 col-lg-8 offset-lg-2 col-md-10 offset-md-1 col-sm-10 offset-sm-1 col-10 offset-1'}>
                                    Редактировать товар
                                </button>
                                <button onClick={() => navigate(CHANGE_TAG_ROUTE)} className={AdminCss.button_admin +
                                    ' col-xxl-8 offset-xxl-2 col-xl-8 offset-xl-2 col-lg-8 offset-lg-2 col-md-10 offset-md-1 col-sm-10 offset-sm-1 col-10 offset-1'}>
                                    Редактировать теги
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </section>
    );
};

export default Admin;