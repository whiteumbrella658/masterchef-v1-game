import { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './RecipesMenu.scss'
import rmpreview from './../../../assets/menus/recipes-preview.png'
import rmitem from './../../../assets/menus/recipes-item.png'
import rmclose from './../../../assets/menus/recipes-close.png'
import rmselect from './../../../assets/menus/recipes-select.png'
import crepe from './../../../assets/foods/crepe.png'
import burger from './../../../assets/foods/burger.png'
import pizza from './../../../assets/foods/pizza.png'
import pasta from './../../../assets/foods/pasta.png'
import chicken from './../../../assets/foods/chicken.png'
import soup from './../../../assets/foods/soup.png'
import steak from './../../../assets/foods/steak.png'
import bread from './../../../assets/foods/bread.png'
import cake from './../../../assets/foods/cake.png'
import foodInfos from './../../../constants/FOODS.json'

export const RecipesMenu = ({
  show,
  hideAction,
  setSelFood,
  setSelectRecipeMenu,
  level,
}) => {
  const [foodAttrs, setFoodAttrs] = useState({
    name: '',
    cost: '0',
    sale: '0',
    time: '0 M',
  })
  const [previewImage, setPreviewImage] = useState(rmpreview)
  const [selectedFood, setSelectedFood] = useState('')
  const handleClick = (e) => {
    if (level >= foodInfos[e.target.alt].level) {
      setSelectedFood(e.target.alt)
    }
    setFoodAttrs(foodInfos[e.target.alt])
    const tempUrl = `/assets/foods/${e.target.alt}.png`
    setPreviewImage(tempUrl)
  }

  const handleSelect = () => {
    if (selectedFood === '') {
      hideAction()
      setSelectRecipeMenu(true)
    } else {
      setSelFood(selectedFood)
      hideAction()
    }
  }
  return (
    <Modal
      className="RecipesMenu"
      dialogClassName="recipesmenu-dialog"
      contentClassName="recipesmenu-content"
      show={show}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard={false}
      onHide={hideAction}
    >
      <div className="foods-list">
        <div className="foods">
          <div className="food">
            <img
              className={`food-item-img`}
              alt="crepe"
              src={crepe}
              onClick={handleClick}
            />
          </div>
          <div className="food">
            <img
              className={`food-item-img`}
              alt="burger"
              src={burger}
              onClick={handleClick}
            />
          </div>
          <div className="food">
            <img
              className={`food-item-img ${
                level >= foodInfos['pizza'].level ? 'active' : 'inactive'
              }`}
              alt="pizza"
              src={pizza}
              onClick={handleClick}
            />
          </div>
          <div className="food">
            <img
              className={`food-item-img ${
                level >= foodInfos['pasta'].level ? 'active' : 'inactive'
              }`}
              alt="pasta"
              src={pasta}
              onClick={handleClick}
            />
          </div>
          <div className="food">
            <img
              className={`food-item-img ${
                level >= foodInfos['chicken'].level ? 'active' : 'inactive'
              }`}
              alt="chicken"
              src={chicken}
              onClick={handleClick}
            />
          </div>
        </div>
        <div className="foods">
          <div className="food">
            <img
              className={`food-item-img ${
                level >= foodInfos['soup'].level ? 'active' : 'inactive'
              }`}
              alt="soup"
              src={soup}
              onClick={handleClick}
            />
          </div>
          <div className="food">
            <img
              className={`food-item-img ${
                level >= foodInfos['steak'].level ? 'active' : 'inactive'
              }`}
              alt="steak"
              src={steak}
              onClick={handleClick}
            />
          </div>
          <div className="food">
            <img
              className={`food-item-img ${
                level >= foodInfos['bread'].level ? 'active' : 'inactive'
              }`}
              alt="bread"
              src={bread}
              onClick={handleClick}
            />
          </div>
          <div className="food">
            <img
              className={`food-item-img ${
                level >= foodInfos['cake'].level ? 'active' : 'inactive'
              }`}
              alt="cake"
              src={cake}
              onClick={handleClick}
            />
          </div>
          <div className="food"></div>
        </div>
      </div>
      <img src={previewImage} alt="food preview" className="rm-preview" />

      <img
        src={rmselect}
        className="rm-select hover-scale"
        onClick={handleSelect}
      />
      <div className="food-info">
        <span className="food-info-text">{`NAME : ${foodAttrs.name.toUpperCase()}`}</span>
        <span className="food-info-text">{`COST : ${foodAttrs.cost} MSCH`}</span>
        <span className="food-info-text">{`SALE : ${foodAttrs.sale} MSCH`}</span>
        <span className="food-info-text">{`TIME : ${foodAttrs.time}`}</span>
      </div>
      <img src={rmclose} className="rm-close" onClick={hideAction} />
    </Modal>
  )
}

export default RecipesMenu
