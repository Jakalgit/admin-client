import React, {useEffect, useState} from 'react';
import Alert from "../../components/Alert";
import styles from "../../css/admin/CreateTag.module.css";
import {changeTagName, getAllTags} from "../../http/API/tagAPI";

const ChangeTag = () => {

    const [name, setName] = useState('')
    const [currentTag, setCurrentTag] = useState(null)
    const [filteredTags, setFilteredTags] = useState([])
    const [findTag, setFindTag] = useState('')

    const [startAlert, setStartAlert] = useState(false)
    const [textAlert, setTextAlert] = useState('')
    const [typeAlert, setTypeAlert] = useState('primary')

    const [tags, setTags] = useState([])

    useEffect(() => {
        if (findTag) {
            setFilteredTags(Object.values(tags).filter(tag => {
                return tag.name.toLowerCase().includes(findTag.toLowerCase())
            }))
        } else {
            setFilteredTags(tags)
        }
    }, [tags, findTag])

    useEffect(() => {
        getAllTags().then(data => {
            setTags(data)
        })
    }, [])

    useEffect(() => {
        setTimeout(() => setStartAlert(false), 2500)
    }, [startAlert])

    const updateStart = (value) => {
        setStartAlert(value)
    }

    const changeName = () => {
        if (name && currentTag) {
            changeTagName(currentTag.id, name).then(data => {
                if (data !== "Error" && data !== "Ошибка") {
                    setStartAlert(true)
                    setTypeAlert('primary')
                    setTextAlert('Имя сохранено')
                    setName('')
                    setCurrentTag(null)
                }
                getAllTags().then(data => {
                    setTags(data)
                })
            })
        } else {
            setStartAlert(true)
            setTypeAlert('error')
            setTextAlert('Имя не может быть пустым')
        }
    }

    return (
        <div>
            <Alert
                start={startAlert}
                variant={typeAlert}
                text={textAlert}
                updateStart={(value) => updateStart(value)}
            />
            <div className={styles.block + ' container'}>
                <div className="row">
                    <div className={styles.tags_area +
                        ' col-xxl-6 offset-xl-0 col-xl-6 offset-xl-0 col-lg-6 offset-lg-0 col-md-6 offset-md-0 col-sm-6 offset-sm-0 col-10 offset-1'}>
                        <input
                            value={findTag}
                            onChange={e => setFindTag(e.target.value)}
                            type="text"
                            className={styles.find_tag}
                            placeholder="Название тега"
                        />
                        {filteredTags &&
                            <div className={styles.tag_list}>
                                {filteredTags.map(tag =>
                                    <div key={tag.id + 1}
                                         onClick={() => setCurrentTag(tag)}
                                         className={styles.tag}>
                                        <p key={tag.id + 2} className={styles.tag_text}>{tag.name}</p>
                                    </div>
                                )}
                            </div>
                        }
                    </div>
                    <div
                        className="col-xxl-5 offset-xxl-1 col-xl-5 offset-xl-1 col-lg-5 offset-lg-1 col-md-5 offset-md-1 col-sm-5 offset-sm-1 col-10 offset-1">
                        <input
                            value={name}
                            onChange={e => setName(e.target.value)}
                            type="text"
                            className={styles.name_tag + ' col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12'}
                            placeholder="Введите название тега"
                        />
                        <button onClick={() => changeName()}
                                className={styles.create +
                                    ' col-xxl-5 offset-xxl-1 col-xl-5 offset-xl-1 col-lg-5 offset-lg-1 col-md-6 offset-md-3 col-sm-6 offset-sm-3 col-6 offset-3'}>
                            Сохранить название
                        </button>
                        <h1 className={styles.current_tag + ' col-xxl-6 col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12'}>
                            Выбранный тег: <strong>{currentTag ? currentTag.name : 'не выбрано'}</strong>
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangeTag;