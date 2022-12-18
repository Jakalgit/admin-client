import React, {useState} from 'react';
import {changeNameDialog} from "../http/API/dialogAPI";
import style_css from "../css/components/AdminChats.module.css";
import {useNavigate} from "react-router-dom";
import {CHATS_ROUTE} from "../utils/consts";

const AdminChats = (props) => {

    const navigate = useNavigate()

    const [name, setName] = useState(props.name)
    const saveName = () => {
        if (name) {
            changeNameDialog(props.chatId, name).then((data) => {
                if (data !== 'Ошибка' || data !== 'Error') {
                    alert("Название чата именено")
                } else {
                    alert("Ошибка")
                }
            })
        }
    }
    return (
        <div>
            {Number(props.lastAdminCheck) < Number(props.lastMessage) ?
                <div style={{borderStyle: 'solid', borderWidth: '1px', borderColor: 'red'}}
                    onClick={() => navigate(CHATS_ROUTE + '/' + props.chatId)} className={style_css.block +
                    ' col-xxl-10 offset-xxl-1 col-xl-10 offset-xl-1 col-lg-10 offset-lg-1 col-md-10 offset-md-1 col-sm-10 offset-sm-1 col-10 offset-1'}>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className={style_css.name_chat}
                        placeholder="Введите название чата"
                    />
                    <img src={require("../img/change.png")} alt="" className={style_css.change} onClick={(e) => {saveName(); e.stopPropagation()}} />
                </div>
                :
                <div onClick={() => navigate(CHATS_ROUTE + '/' + props.chatId)} className={style_css.block +
                    ' col-xxl-10 offset-xxl-1 col-xl-10 offset-xl-1 col-lg-10 offset-lg-1 col-md-10 offset-md-1 col-sm-10 offset-sm-1 col-10 offset-1'}>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className={style_css.name_chat}
                        placeholder="Введите название чата"
                    />
                    <img src={require("../img/change.png")} alt="" className={style_css.change} onClick={(e) => {saveName(); e.stopPropagation()}} />
                </div>
            }
        </div>
    )
};

export default AdminChats;