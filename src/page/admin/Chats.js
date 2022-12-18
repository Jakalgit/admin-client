import React, {useContext, useEffect, useState} from 'react';
import style_css from "../../css/components/AdminChats.module.css"
import {getAllDialogs} from "../../http/API/dialogAPI";
import general from "../../css/General.module.css";
import {Spinner} from "react-bootstrap";
import AdminChats from "../../components/AdminChats";

const Chats = () => {

    const [chats, setChats] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getAllDialogs().then((data) => {
            data = data.sort((prev, next) => prev.lastMessage <= next.lastMessage ? 1 : -1)
            if (data !== 'Ошибка' || data !== 'Error') {
                setChats(data)
            } else {
                alert("Ошибка")
            }
            setLoading(false)
        })
    }, [])

    if (loading) {
        return (
            <div className={general.loading}>
                <Spinner animation="border" variant="secondary" />
            </div>
        )
    }

    return (
        <div className={style_css.chats_list}>
            <div className="container">
                <div className="row">
                    {chats.map(chat =>
                        <AdminChats lastAdminCheck={chat.lastAdminCheck} lastMessage={chat.lastMessage} key={chat.id}
                                    name={chat.name} chatId={chat.chatId} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Chats;