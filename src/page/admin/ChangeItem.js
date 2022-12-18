import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {
    changeAvailability,
    changeDiscount,
    changeDiscountFlag,
    changeHeight,
    changeInfo,
    changeLength,
    changeName,
    changePrice,
    changeVisibility,
    changeWeight,
    changeWidth,
    fetchOneItem,
    fetchAllInfo,
    changeNew
} from "../../http/API/itemAPI"
import {
    changeImg_1,
    changeImg_2,
    changeImg_3,
    changeImg_4,
    createItemColor,
    deleteColor,
    fetchAllColor
} from "../../http/API/colorAPI"
import {Spinner} from "react-bootstrap";
import Alert from "../../components/Alert";
import ChangeItemCss from "../../css/admin/ChangeItem.module.css"
import Footer from "../../components/Footer";
import LoadImage from "../../components/LoadImage";
import style_css from "../../css/admin/CreateItem.module.css";
import {changeTagsAddiction, getAddictionById, getAllTags, getOneTag} from "../../http/API/tagAPI";

const ChangeItem = () => {

    const {id} = useParams()

    const [start, setStart] = useState(false)
    const [message, setMessage] = useState('')
    const [style, setStyle] = useState('primary')

    const [loading, setLoading] = useState(true)

    const [tags, setTags] = useState([])
    const [filteredTags, setFilteredTags] = useState([])
    const [currentTags, setCurrentTags] = useState([])

    const [findTagName, setFindTagName] = useState('')

    const [name,setName] = useState('')
    const [price, setPrice] = useState('')
    const [availability, setAvailability] = useState(true)
    const [visibility, setVisibility] = useState(false)
    const [colors, setColors] = useState([])
    const [length, setLength] = useState('')
    const [width, setWidth] = useState('')
    const [height, setHeight] = useState('')
    const [weight, setWeight] = useState('')
    const [discountFlag, setDiscountFlag] = useState(false)
    const [discount, setDiscount] = useState('')
    const [oldPrice, setOldPrice] = useState('')
    const [info, setInfo] = useState([])
    const [newItem, setNewItem] = useState(false)

    const [currentColor, setCurrentColor] = useState({})

    useEffect(() => {
        fetchOneItem(id).then(data => {
            setName(data.name)
            setPrice(data.price)
            setLength(data.length)
            setWidth(data.width)
            setHeight(data.height)
            setWeight(data.weight)
            setDiscountFlag(data.discount_flag)
            setDiscount(data.discount)
            setOldPrice(data.old_price)
            setAvailability(data.availability)
            setVisibility(data.visibility)
            setNewItem(data.new_item)
            fetchAllInfo(data.id).then(data => {
                setInfo(data.rows)
                fetchAllColor(id).then(data => {
                    let colorSwap = []
                    let k = 0
                    data.forEach(color => {
                        colorSwap.push({
                            id: color.id,
                            itemId: color.itemId,
                            number: Number(Date.now()) + k,
                            img1: color.img1,
                            change1: false,
                            img2: color.img2,
                            change2: false,
                            img3: color.img3,
                            change3: false,
                            img4: color.img4,
                            change4: false,
                        })
                        k++
                    })
                    setCurrentColor(colorSwap[0])
                    setColors(colorSwap)
                    getAllTags().then(data => {
                        setTags(data)
                        getAddictionById(id).then(data => {
                            if (data !== "Error") {
                                data.forEach(tag_to_item => {
                                    getOneTag(tag_to_item.itemTagId).then(data => {
                                        setCurrentTags(prevState => [...prevState, data])
                                    })
                                })
                                setLoading(false)
                            }
                        })
                    })
                })
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
        if (findTagName) {
            setFilteredTags(Object.values(tags).filter(tag => {
                return tag.name.toLowerCase().includes(findTagName.toLowerCase())
            }))
        } else {
            setFilteredTags(tags)
        }
    }, [tags, findTagName])

    const updateColors = () => {
        fetchAllColor(id).then(data => {
            let colorSwap = []
            let k = 0
            data.forEach(color => {
                colorSwap.push({
                    id: color.id,
                    itemId: color.itemId,
                    number: Number(Date.now()) + k,
                    img1: color.img1,
                    change1: false,
                    img2: color.img2,
                    change2: false,
                    img3: color.img3,
                    change3: false,
                    img4: color.img4,
                    change4: false,
                })
                k++
            })
            setColors(colorSwap)
        })
    }

    const clickChangeName = () => {
        if (name) {
            changeName(name, id).then(() => {
                setStart(true)
                setMessage('Название изменено')
                setStyle('primary')
            })
        } else {
            setStart(true)
            setMessage('Ошибка')
            setStyle('danger')
        }
    }

    const clickChangePrice = () => {
        if (price) {
            changePrice(price, id).then(() => {
                setStart(true)
                setMessage('Цена изменена')
                setStyle('primary')
            })
        } else {
            setStart(true)
            setMessage('Ошибка')
            setStyle('danger')
        }
    }

    const clickAddColor = () => {
        setColors([...colors, {id: -1, itemId: id, number: Date.now(), img1: null, img2: null, img3: null, img4: null}])
    }

    const clickDeleteColor = () => {
        fetchAllColor(id).then(data => {
            if (currentColor.id === -1) {
                setColors(colors.filter(el => el.number !== currentColor.number))
                setCurrentColor(colors[0])
            } else if (data.length > 1) {
                deleteColor(currentColor.id).then(data => {
                    if (data !== "Ошибка") {
                        setColors(colors.filter(el => el.number !== currentColor.number))
                        setCurrentColor(colors[0])
                        setMessage('Удалено')
                        setStyle('primary')
                    } else {
                        setMessage('Ошибка')
                        setStyle('primary')
                    }
                    setStart(true)
                })
            } else {
                setMessage('В БД не меньше 1 цвета')
                setStyle('danger')
                setStart(true)
            }
        })
    }

    const clickChangeColor = () => {
        let flag = true
        colors.forEach(color => {
            if (color.img1 === null || color.img2 === null || color.img3 === null || color.img4 === null) {
                flag = false
            }
        })

        if (flag) {
            colors.forEach(color => {
                if (color.id === -1) {
                    const formData = new FormData()
                    formData.append('itemId', `${id}`)
                    formData.append('img_1', color.img1)
                    formData.append('img_2', color.img2)
                    formData.append('img_3', color.img3)
                    formData.append('img_4', color.img4)
                    createItemColor(formData).then(data => {
                        if (data !== "Ошибка") {
                            setMessage('Сохранено')
                            setStyle('primary')
                        } else {
                            setMessage('Ошибка')
                            setStyle('danger')
                        }
                        updateColors()
                        setStart(true)
                    })
                } else {
                    const formData = new FormData()
                    formData.append('id', `${id}`)
                    if (color.change1) {
                        formData.append('img1', color.img1)
                        changeImg_1(formData).then(data => {
                            if (data !== "Ошибка") {
                                setMessage('Сохранено')
                                setStyle('primary')
                            } else {
                                setMessage('Ошибка изображения')
                                setStyle('danger')
                            }
                            updateColors()
                            setStart(true)
                        })
                    }

                    if (color.change2) {
                        formData.append('img2', color.img2)
                        changeImg_2(formData).then(data => {
                            if (data !== "Ошибка" && message !== 'Ошибка изображения') {
                                setMessage('Сохранено')
                                setStyle('primary')
                            } else {
                                setMessage('Ошибка изображения')
                                setStyle('danger')
                            }
                            updateColors()
                            setStart(true)
                        })
                    }

                    if (color.change3) {
                        formData.append('img3', color.img3)
                        changeImg_3(formData).then(data => {
                            if (data !== "Ошибка" && message !== 'Ошибка изображения') {
                                setMessage('Сохранено')
                                setStyle('primary')
                            } else {
                                setMessage('Ошибка изображения')
                                setStyle('danger')
                            }
                            updateColors()
                            setStart(true)
                        })
                    }

                    if (color.change4) {
                        formData.append('img4', color.img4)
                        changeImg_4(formData).then(data => {
                            if (data !== "Ошибка" && message !== 'Ошибка изображения') {
                                setMessage('Сохранено')
                                setStyle('primary')
                            } else {
                                setMessage('Ошибка изображения')
                                setStyle('danger')
                            }
                            updateColors()
                            setStart(true)
                        })
                    }
                }
            })
        } else {
            setMessage('Выберите изображения')
            setStyle('danger')
            setStart(true)
        }
    }

    const clickChangeLength = () => {
        if (length) {
            changeLength(length, id).then(() => {
                setStart(true)
                setMessage('Длина изменена')
                setStyle('primary')
            })
        } else {
            setStart(true)
            setMessage('Ошибка')
            setStyle('danger')
        }
    }

    const clickChangeWidth = () => {
        if (width) {
            changeWidth(width, id).then(() => {
                setStart(true)
                setMessage('Ширина изменена')
                setStyle('primary')
            })
        } else {
            setStart(true)
            setMessage('Ошибка')
            setStyle('danger')
        }
    }

    const clickChangeHeight = () => {
        if (height) {
            changeHeight(height, id).then(() => {
                setStart(true)
                setMessage('Высота изменена')
                setStyle('primary')
            })
        } else {
            setStart(true)
            setMessage('Ошибка')
            setStyle('danger')
        }
    }

    const clickChangeWeight = () => {
        if (weight) {
            changeWeight(weight, id).then(() => {
                setStart(true)
                setMessage('Вес изменена')
                setStyle('primary')
            })
        } else {
            setStart(true)
            setMessage('Ошибка')
            setStyle('danger')
        }
    }

    const clickChangeDiscount = () => {
        if (discountFlag) {
            if (discount && oldPrice) {
                changeDiscount(id, discount, discountFlag, oldPrice).then(data => {
                    if (data !== "Ошибка") {
                        setMessage('Сохранено')
                        setStyle('primary')
                    } else {
                        setMessage('Ошибка')
                        setStyle('danger')
                    }
                    setStart(true)
                })
            } else {
                setMessage('Ошибка')
                setStyle('danger')
                setStart(true)
            }
        } else {
            changeDiscountFlag(id, discountFlag).then(data => {
                if (data !== "Ошибка") {
                    setMessage('Сохранено')
                    setStyle('primary')
                } else {
                    setMessage('Ошибка')
                    setStyle('danger')
                }
                setStart(true)
            })
        }
    }

    const clickChangeAvailability = () => {
        changeAvailability(availability, id).then(() => {
            setStart(true)
            setMessage('Наличие изменено')
            setStyle('primary')
        })
    }

    const clickChangeVisibility = () => {
        changeVisibility(visibility, id).then(() => {
            setStart(true)
            setMessage('Видимость изменена')
            setStyle('primary')
        })
    }

    const clickChangeNew = () => {
        changeNew(newItem, id).then(() => {
            setStart(true)
            setMessage('Новинки измененены')
            setStyle('primary')
        })
    }

    const clickChangeInfo = (id) => {
        const text = String(info[info.findIndex(el => el.id === id)].info)
        if (text) {
            changeInfo(text, id).then(() => {
                setStart(true)
                setMessage('Информация изменена')
                setStyle('primary')
            })
        } else {
            setStart(true)
            setMessage('Ошибка')
            setStyle('danger')
        }
    }

    const addTag = (tag) => {
        if (currentTags.findIndex(el => el.id === tag.id) === -1) {
            setCurrentTags([...currentTags, tag])
        }
    }

    const deleteTag = (tag) => {
        setCurrentTags(currentTags.filter(item => item.name !== tag.name))
    }

    const saveTagAddiction = () => {
        changeTagsAddiction(JSON.stringify(currentTags), id).then(data => {
            if (data !== "Error" && data !== "Ошибка") {
                setStart(true)
                setMessage('Теги сохранены')
                setStyle('primary')
            } else {
                setStart(true)
                setMessage('Ошибка')
                setStyle('danger')
            }
        })
    }

    const updateStart = (value) => {
        setStart(value)
    }

    if (loading) {
        return <Spinner animation={"grow"} />
    }

    return (
        <div>
            <Alert start={start} variant={style} text={message} updateStart={(value) => updateStart(value)}/>
            <div className="container">
                <div className="row">
                    <div className={style_css.tags_block
                        + ' col-xxl-6 offset-xxl-0 col-xl-6 offset-xl-0 col-lg-6 offset-lg-0 col-md-6 offset-md-0 col-sm-6 offset-sm-0 col-10 offset-1'}>
                        <input value={findTagName}
                               onChange={e => setFindTagName(e.target.value)}
                               type="text" className={style_css.find_tags} placeholder="Введите название тега"/>
                        {filteredTags &&
                            <div className={style_css.tags_list}>
                                {filteredTags.map(tag =>
                                    <div onClick={() => addTag(tag)} className={style_css.tag + ' ' + style_css.tag_l}>
                                        <p className={style_css.tag_text}>{tag.name}</p>
                                    </div>
                                )}
                            </div>
                        }
                    </div>
                    <div style={{borderStyle: 'none'}} className={style_css.tags_block +
                        ' col-xxl-6 offset-xxl-0 col-xl-6 offset-xl-0 col-lg-6 offset-lg-0 col-md-6 offset-md-0 col-sm-6 offset-sm-0 col-10 offset-1'}>
                        {currentTags.map(tag =>
                            <div onClick={() => deleteTag(tag)} className={style_css.tag + ' ' + style_css.tag_r}>
                                <p className={style_css.tag_text}>{tag.name}</p>
                            </div>
                        )}
                    </div>
                    <button onClick={() => saveTagAddiction()}
                        className={ChangeItemCss.save + ' col-xxl-4 offset-xxl-4 col-xl-4 offset-xl-4 ' +
                            'col-lg-6 offset-lg-3 col-md-6 offset-md-3 col-sm-6 offset-sm-3, col-8 offset-2'}>
                        Сохранить теги
                    </button>
                </div>
            </div>
            <div className={ChangeItemCss.name_price}>
                <div className="container">
                    <div className="row">
                        <input type="text"
                               value={name}
                               onChange={(e) => {setName(e.target.value)}}
                               className={ChangeItemCss.input + ' col-xxl-8 offset-xxl-0 col-xl-8 offset-xl-0 col-lg-8 offset-lg-0 col-md-8 offset-md-0 col-sm-8 offset-sm-0 col-6 offset-1'}
                               placeholder="Введите название"/>
                        <button onClick={clickChangeName}
                            className={ChangeItemCss.save + ' col-xxl-3 offset-xxl-1 col-xl-3 offset-xl-1 col-lg-3 offset-lg-1 col-md-3 offset-md-1 col-sm-3 offset-sm-1 col-3 offset-1'}>
                            Сохранить
                        </button>
                        <input type="number"
                               value={price}
                               onChange={(e) => {setPrice(e.target.value)}}
                               className={ChangeItemCss.input + ' col-xxl-8 offset-xxl-0 col-xl-8 offset-xl-0 col-lg-8 offset-lg-0 col-md-8 offset-md-0 col-sm-8 offset-sm-0 col-6 offset-1'}
                               placeholder="Введите цену"/>
                        <button onClick={clickChangePrice}
                            className={ChangeItemCss.save + ' col-xxl-3 offset-xxl-1 col-xl-3 offset-xl-1 col-lg-3 offset-lg-1 col-md-3 offset-md-1 col-sm-3 offset-sm-1 col-3 offset-1'}>
                            Сохранить
                        </button>
                    </div>
                </div>
            </div>



            <div className={ChangeItemCss.radio_item}>
                <div className="container">
                    <div className="row">
                        <div className='left col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-4 col-6'>
                            <div className={ChangeItemCss.line + ' offset-xxl-3 offset-xl-3 offset-lg-3 offset-md-2 offset-sm-2 offset-3'}>
                                <input onClick={() => setAvailability(true)} type="radio" className={ChangeItemCss.radio} name="stock" checked={availability}/>
                                <h2 className={ChangeItemCss.line_text}>В наличии</h2>
                            </div>
                            <div className={ChangeItemCss.line + ' offset-xxl-3 offset-xl-3 offset-lg-3 offset-md-2 offset-sm-2 offset-3'}>
                                <input onClick={() => setAvailability(false)} type="radio" className={ChangeItemCss.radio} name="stock" checked={!availability}/>
                                <h2 className={ChangeItemCss.line_text}>Нет в наличии</h2>
                            </div>
                            <button onClick={clickChangeAvailability}
                                className={ChangeItemCss.save + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>Сохранить
                            </button>
                        </div>
                        <div className='left col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-4 col-6'>
                            <div className={ChangeItemCss.line + ' offset-xxl-3 offset-xl-3 offset-lg-3 offset-md-2 offset-sm-2 offset-3'}>
                                <input onClick={() => setNewItem(true)} type="radio" className={ChangeItemCss.radio} name="new" checked={newItem}/>
                                <h2 className={ChangeItemCss.line_text}>Новинка</h2>
                            </div>
                            <div className={ChangeItemCss.line + ' offset-xxl-3 offset-xl-3 offset-lg-3 offset-md-2 offset-sm-2 offset-3'}>
                                <input onClick={() => setNewItem(false)} type="radio" className={ChangeItemCss.radio} name="new" checked={!newItem}/>
                                <h2 className={ChangeItemCss.line_text}>Не новинка</h2>
                            </div>
                            <button onClick={clickChangeNew}
                                    className={ChangeItemCss.save + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>Сохранить
                            </button>
                        </div>
                        <div
                            className='right col-xxl-4 offset-xxl-0 col-xl-4 offset-xl-0 col-lg-4 offset-lg-0 col-md-4 offset-md-0 col-sm-4 offset-sm-0 col-6 offset-3'>
                            <div className={ChangeItemCss.line + ' offset-xxl-3 offset-xl-3 offset-lg-3 offset-md-2 offset-sm-2 offset-3'}>
                                <input onClick={() => setVisibility(true)} type="radio" className={ChangeItemCss.radio} name="visibility" checked={visibility}/>
                                <h2 className={ChangeItemCss.line_text}>Видимый</h2>
                            </div>
                            <div className={ChangeItemCss.line + ' offset-xxl-3 offset-xl-3 offset-lg-3 offset-md-2 offset-sm-2 offset-3'}>
                                <input onClick={() => setVisibility(false)} type="radio" className={ChangeItemCss.radio} name="visibility" checked={!visibility}/>
                                <h2 className={ChangeItemCss.line_text}>Невидимый</h2>
                            </div>
                            <button onClick={clickChangeVisibility}
                                className={ChangeItemCss.save + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>Сохранить
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className={ChangeItemCss.images_item}>
                <div className="container">
                    <div className="row">
                        <div className={ChangeItemCss.colors}>
                            {colors.map(color =>
                                <div style={{display: "inline-block"}}>
                                    {color.number === currentColor.number ?
                                        <div onClick={() => setCurrentColor(color)}
                                            className={ChangeItemCss.select_color + ' ' + ChangeItemCss.selected_color}>
                                            {color.change1 ?
                                                <img src={URL.createObjectURL(color.img1)} alt="" className={ChangeItemCss.img_color}/>
                                                :
                                                <LoadImage name={color.img1} className={ChangeItemCss.img_color} />
                                            }
                                        </div>
                                        :
                                        <div onClick={() => setCurrentColor(color)}
                                            className={ChangeItemCss.select_color}>
                                            {color.change1 ?
                                                <img src={URL.createObjectURL(color.img1)} alt="" className={ChangeItemCss.img_color}/>
                                                :
                                                <LoadImage name={color.img1} className={ChangeItemCss.img_color} />
                                            }
                                        </div>
                                    }
                                </div>
                            )}
                        </div>
                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                            <button onClick={clickAddColor}
                                className={ChangeItemCss.save + ' ' + ChangeItemCss.margin + ' ' + ChangeItemCss.margin_small + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                                Добавить цвет
                            </button>
                        </div>
                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                            <button onClick={clickDeleteColor}
                                className={ChangeItemCss.delete + ' ' + ChangeItemCss.margin_small + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                                Удалить цвет
                            </button>
                        </div>
                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                            <button onClick={clickChangeColor}
                                className={ChangeItemCss.save + ' ' + ChangeItemCss.margin + ' ' + ChangeItemCss.margin_small + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                                Сохранить
                            </button>
                        </div>
                        <div className={ChangeItemCss.img_block + ' col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6'}>
                            <label className={ChangeItemCss.input_file}>
                                <input type="file" className={ChangeItemCss.file} onChange={(e) => {
                                    setColors(colors.map(el => el.number === currentColor.number ? {...el, img1: e.target.files[0], change1: true} : el))
                                    setCurrentColor({...currentColor, img1: e.target.files[0], change1: true})
                                }}/>
                                <h2 className={ChangeItemCss.file_text}>Выберете изображение 1</h2>
                            </label>
                            <div className={ChangeItemCss.change}>
                                {currentColor.img1 === null ?
                                    <div/>
                                    :
                                    <div>
                                        {currentColor.change1 ?
                                            <img src={URL.createObjectURL(currentColor.img1)} alt="" className={ChangeItemCss.change_image}/>
                                            :
                                            <LoadImage name={currentColor.img1} className={ChangeItemCss.change_image} />
                                        }
                                    </div>
                                }
                            </div>
                        </div>
                        <div className={ChangeItemCss.img_block + ' col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6'}>
                            <label className={ChangeItemCss.input_file}>
                                <input type="file" className={ChangeItemCss.file} onChange={(e) => {
                                    setColors(colors.map(el => el.number === currentColor.number ? {...el, img2: e.target.files[0], change2: true} : el))
                                    setCurrentColor({...currentColor, img2: e.target.files[0], change2: true})
                                }}/>
                                <h2 className={ChangeItemCss.file_text}>Выберете изображение 2</h2>
                            </label>
                            <div className={ChangeItemCss.change}>
                                {currentColor.img2 === null ?
                                    <div/>
                                    :
                                    <div>
                                        {currentColor.change2 ?
                                            <img src={URL.createObjectURL(currentColor.img2)} alt="" className={ChangeItemCss.change_image}/>
                                            :
                                            <LoadImage name={currentColor.img2} className={ChangeItemCss.change_image} />
                                        }
                                    </div>
                                }
                            </div>
                        </div>
                        <div className={ChangeItemCss.img_block + ' col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6'}>
                            <label className={ChangeItemCss.input_file}>
                                <input type="file" className={ChangeItemCss.file} onChange={(e) => {
                                    setColors(colors.map(el => el.number === currentColor.number ? {...el, img3: e.target.files[0], change3: true} : el))
                                    setCurrentColor({...currentColor, img3: e.target.files[0], change3: true})
                                }}/>
                                <h2 className={ChangeItemCss.file_text}>Выберете изображение 3</h2>
                            </label>
                            <div className={ChangeItemCss.change}>
                                {currentColor.img3 === null ?
                                    <div/>
                                    :
                                    <div>
                                        {currentColor.change3 ?
                                            <img src={URL.createObjectURL(currentColor.img3)} alt="" className={ChangeItemCss.change_image}/>
                                            :
                                            <LoadImage name={currentColor.img3} className={ChangeItemCss.change_image} />
                                        }
                                    </div>
                                }
                            </div>
                        </div>
                        <div className={ChangeItemCss.img_block + ' col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6'}>
                            <label className={ChangeItemCss.input_file}>
                                <input type="file" className={ChangeItemCss.file} onChange={(e) => {
                                    setColors(colors.map(el => el.number === currentColor.number ? {...el, img4: e.target.files[0], change4: true} : el))
                                    setCurrentColor({...currentColor, img4: e.target.files[0], change4: true})
                                }}/>
                                <h2 className={ChangeItemCss.file_text}>Выберете изображение 4</h2>
                            </label>
                            <div className={ChangeItemCss.change}>
                                {currentColor.img4 === null ?
                                    <div/>
                                    :
                                    <div>
                                        {currentColor.change4 ?
                                            <img src={URL.createObjectURL(currentColor.img4)} alt="" className={ChangeItemCss.change_image}/>
                                            :
                                            <LoadImage name={currentColor.img4} className={ChangeItemCss.change_image} />
                                        }
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={ChangeItemCss.name_price}>
                <div className="container">
                    <div className="row">
                        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6">
                            <input type="number"
                                   value={length}
                                   onChange={(e) => setLength(e.target.value)}
                                   className={ChangeItemCss.input + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}
                                   placeholder='Длина(см)'/>
                            <button onClick={clickChangeLength}
                                className={ChangeItemCss.save + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                                Сохранить
                            </button>
                        </div>
                        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6">
                            <input type="number"
                                   value={width}
                                   onChange={(e) => setWidth(e.target.value)}
                                   className={ChangeItemCss.input + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}
                                   placeholder='Ширина(см)'/>
                            <button onClick={clickChangeWidth}
                                className={ChangeItemCss.save + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                                Сохранить
                            </button>
                        </div>
                        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6">
                            <input type="number"
                                   value={height}
                                   onChange={(e) => setHeight(e.target.value)}
                                   className={ChangeItemCss.input + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}
                                   placeholder='Высота(см)'/>
                            <button onClick={clickChangeHeight}
                                className={ChangeItemCss.save + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                                Сохранить
                            </button>
                        </div>
                        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6">
                            <input type="number"
                                   value={weight}
                                   onChange={(e) => setWeight(e.target.value)}
                                   className={ChangeItemCss.input + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}
                                   placeholder='Вес(кг)'/>
                            <button onClick={clickChangeWeight}
                                className={ChangeItemCss.save + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                                Сохранить
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className={ChangeItemCss.discount}>
                <div className="container">
                    <div className="row">
                        <div className="col-xxl-4 offset-xxl-0 col-xl-4 offset-xl-0 col-lg-4 offset-lg-0 col-md-4 offset-md-0 col-sm-4 offset-sm-0 col-6 offset-0">
                            <div className={ChangeItemCss.line + ' offset-xxl-3 offset-xl-3 offset-lg-3 offset-md-2 offset-sm-2 offset-3'}>
                                <input onClick={() => setDiscountFlag(true)}
                                    type="radio" className={ChangeItemCss.radio} name="discount" checked={discountFlag}/>
                                <h2 className={ChangeItemCss.line_text}>Со скидкой</h2>
                            </div>
                            <div className={ChangeItemCss.line + ' offset-xxl-3 offset-xl-3 offset-lg-3 offset-md-2 offset-sm-2 offset-3'}>
                                <input onClick={() => setDiscountFlag(false)}
                                    type="radio" className={ChangeItemCss.radio} name="discount" checked={!discountFlag}/>
                                <h2 className={ChangeItemCss.line_text}>Без скидки</h2>
                            </div>
                        </div>
                        {discountFlag ?
                            <div className="row col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12" style={{display: "inline-block"}}>
                                <div style={{display: "inline-block"}} className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                                    <input type="text"
                                           value={oldPrice}
                                           onChange={(e) => setOldPrice(e.target.value)}
                                           className={ChangeItemCss.input + ' ' + ChangeItemCss.margin + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}
                                           placeholder="Старая цена"/>
                                </div>
                                <div style={{display: "inline-block"}} className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                                    <input type="text"
                                           value={discount}
                                           onChange={(e) => setDiscount(e.target.value)}
                                           className={ChangeItemCss.input + ' ' + ChangeItemCss.margin + ' ' + ChangeItemCss.margin_small + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}
                                           placeholder="Скидка %"/>
                                </div>
                            </div>
                            :
                            <div/>
                        }
                        <div className="col-xxl-4 offset-xxl-4 col-xl-4 offset-xl-4 col-lg-4 offset-lg-4 col-md-4 offset-md-4 col-sm-8 offset-sm-2 col-12">
                            <button onClick={clickChangeDiscount}
                                    className={ChangeItemCss.save + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                                Сохранить
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className={ChangeItemCss.description_block}>
                <div className="container">
                    <div className="row">
                        {info.map(i =>
                            <div className="description">
                                <textarea className={ChangeItemCss.des_text + ' col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}
                                    value={i.info}
                                    onChange={(e) => {
                                        const index = info.findIndex(el => el.id === i.id)
                                        setInfo(prevState => {
                                            const newState = [...prevState]
                                            newState[index].info = e.target.value
                                            return newState
                                        })
                                    }}
                                    placeholder="Введите описание"/>
                                <button onClick={() => clickChangeInfo(i.id)} className={ChangeItemCss.save + ' col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-3 col-4'}>Сохранить</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ChangeItem;