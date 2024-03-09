import { useState, useEffect } from 'react';
import './Footer.scss';
import alchemy from './../../assets/buttons/alchemy.png'
import receipes from './../../assets/buttons/receipes.png'
import shop from './../../assets/buttons/shop.png'
import upgrade from './../../assets/buttons/upgrade.png'
import inventory from './../../assets/buttons/inventory.png'
import useCountDown from './../Tools/CountDown/Store'

function Footer({setRecipesMenu, setInventoryMenu, level, setUpgradeMenu, setMaxLevelMenu, setAlchemyMenu, setShopMenu}) {
  const { flag } = useCountDown()

  const handleRecipesMenu = () => {
    setRecipesMenu(true)
  }
  const handleInventoryMenu = () => {
    setInventoryMenu(true)
  }
  const handleUpgradeMenu = () => {
    console.log(level, flag)
    if( flag === true ) return
    else if(level < 5) setUpgradeMenu(true)
    else setMaxLevelMenu(true)
  }
  const handleAlchemyMenu = () => {
    setAlchemyMenu(true)
  }
  const handleShopMenu = () => {
    setShopMenu(true)
  }

  return (
    <div className="Footer">
      <div className="grey"></div>
      <div className="dark-grey"></div>
      <div className="buttons">
        <div className="btn_groups">
          <img className="footer_buttons hover-scale" src={receipes} onClick={handleRecipesMenu} />
          <img className={`footer_buttons hover-scale ${flag? "inactive" : "active" }`} src={upgrade} onClick={handleUpgradeMenu} />
          <img className="footer_buttons hover-scale" src={inventory} onClick={handleInventoryMenu} />
          <img className="footer_buttons hover-scale" src={shop} onClick={setShopMenu} />
          <img className="footer_buttons hover-scale" src={alchemy} onClick={handleAlchemyMenu} />
        </div>
      </div>
    </div>
  );
}

export default Footer;
