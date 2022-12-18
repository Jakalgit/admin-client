import React, {useEffect, useRef, useState} from 'react';
import style_css from "../../css/components/MessageModal.module.css"
import firebase from "firebase/compat";
import {useCollectionData} from "react-firebase-hooks/firestore";
import ContentEditable from "react-contenteditable";
import {changeLastAdminCheck} from "../../http/API/dialogAPI";
import {useParams} from "react-router-dom";

const AdminChat = () => {

    const scrollableRef = useRef(null)
    const firestore = firebase.firestore()
    const {chatId} = useParams()

    const [message, setMessage] = useState('')

    const [messages, loading] = useCollectionData(
        firestore.collection('messages').orderBy('createdAt').where('uid', '==', Number(chatId))
    )

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            setMessage(e.currentTarget.innerText)
            if (e.currentTarget.innerText.length !== 0) {
                sendMessage(e.currentTarget.innerText)
            }
            e.preventDefault()
        }
    }

    const sendMessage = (mess) => {
        if (mess) {
            firestore.collection('messages').add({
                uid: Number(chatId),
                text: mess,
                createdAt: Date.now(),
                type: 'admin',
            }).then(() => {
                setMessage('')
            })
        }
    }

    useEffect(() => {
        if (scrollableRef.current) {
            const lastItem = scrollableRef.current.lastElementChild;
            if (lastItem) {
                lastItem.scrollIntoView({ behavior: "smooth", block: "nearest" });
            }
        }
    }, [messages])

    if (loading) {
        return (
            <div>Ошибка загрузки</div>
        )
    } else {
        changeLastAdminCheck(chatId, Date.now()).then()
    }

    return (
        <div style={{display: "flex", alignItems: 'center', justifyContent: 'center', height: '100vh', width: '100%'}}>
            <div className={style_css.messages} style={{position: 'static'}}>
                <div className={style_css.up_line}>
                    <h1 className={style_css.text}>Сообщения</h1>
                </div>
                <div className={style_css.scrollable} ref={scrollableRef}>
                    {messages !== undefined ?
                        <div className={style_css.ribbon}>
                            {messages.map(mess =>
                                <div key={mess.createdAt}>
                                    {mess.type === 'user' ?
                                        <div className={style_css.mes_block + ' ' + style_css.left} key={mess.createdAt + ' 1'}>
                                            <div className={style_css.user + ' ' + style_css.message} key={mess.createdAt + ' 2'}>{mess.text}</div>
                                        </div>
                                        :
                                        <div className={style_css.mes_block + ' ' + style_css.right} key={mess.createdAt + ' 1'}>
                                            <div className={style_css.admin + ' ' + style_css.message} key={mess.createdAt + ' 2'}>{mess.text}</div>
                                        </div>
                                    }
                                </div>
                            )}
                        </div>
                        :
                        <div/>
                    }
                    <div/>
                </div>
                <div className={style_css.input_message}>
                    <div className={style_css.down_line}>
                        <ContentEditable
                            className={style_css.in_message}
                            html={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e)}
                            data-placeholder="Введите сообщение"
                        />
                        <div className={style_css.send} onClick={() => sendMessage(message)}>
                            <img src={require("../../img/arrow.png")} alt="" className={style_css.arr}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminChat;