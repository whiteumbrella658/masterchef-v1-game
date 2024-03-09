import { useState, useEffect } from 'react'
import { Modal } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import "./InventoryMenu.scss"
import inpreview from './../../../assets/menus/inventory-preview.png'
import inclose from './../../../assets/menus/inventory-close.png'
import fridge from './../../../assets/items/fridge.png'
import ladle from './../../../assets/items/ladle.png'
import kettle from './../../../assets/items/kettle.png'
import mixer from './../../../assets/items/mixer.png'
import oven from './../../../assets/items/oven.png'
import itemInfos from './../../../constants/NFTS.json'
import useGameStore from './../../../GameStore'

export const InventoryMenu = ({ show, hideAction }) => {
  const [previewImage, setPreviewImage] = useState(inpreview)
  const [selectedItemInfos, setSelectedItemInfos] = useState({cost: 0, type: '', description: ''})
  const{ hasFridge, hasLadle, hasKettle, hasMixer, hasOven } = useGameStore()

  const handleClick = (e) => {
    setSelectedItemInfos(itemInfos[e.target.alt])
    const tempUrl = `/assets/items/${e.target.alt.toLowerCase()}.png`
    setPreviewImage(tempUrl)
  }

  return (
    <Modal
      className="InventoryMenu"
      dialogClassName="inventorymenu-dialog"
      contentClassName="inventorymenu-content"
      show={show}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={hideAction}
    >
    <div className="crafts-list">
        <div className="crafts">
        {hasFridge &&
          <div className="craft">
            <img
              className={`craft-item-img`}
              alt="Fridge"
              src={fridge}
              onClick={handleClick}
            />
          </div>
        }
        {hasLadle &&
          <div className="craft">
            <img
              className={`craft-item-img`}
              alt="Ladle"
              src={ladle}
              onClick={handleClick}
            />
          </div>
        }
        {hasKettle &&
          <div className="craft">
            <img
              className={`craft-item-img`}
              alt="Kettle"
              src={kettle}
              onClick={handleClick}
            />
          </div>
        }
        {hasMixer &&
          <div className="craft">
            <img
              className={`craft-item-img`}
              alt="Mixer"
              src={mixer}
              onClick={handleClick}
            />
          </div>
        }
        {hasOven &&
          <div className="craft">
            <img
              className={`craft-item-img`}
              alt="Oven"
              src={oven}
              onClick={handleClick}
            />
          </div>
        }
        </div>
      </div>

      <div className="item-preview">
        <img src={previewImage} alt="craft preview" className="item-preview-img" />
      </div>

      <img src={inclose} className="in-close" onClick={hideAction}></img>
      <div className="craft-info">
        <span className="craft-info-text">{`COST: ${selectedItemInfos.cost}`}</span>
        <span className="craft-info-text">{`TYPE: ${selectedItemInfos.type}`}</span>
        <span className="craft-info-text" style={{fontSize: "1.8vw"}}>{`DESCIPTION: ${selectedItemInfos.description}`}</span>
      </div>
    </Modal>
  );
};

export default InventoryMenu;
