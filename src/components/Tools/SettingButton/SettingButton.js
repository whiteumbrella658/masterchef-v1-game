import { useState, useEffect } from 'react';
import './SettingButton.scss';
import settingButton from './../../../assets/setting.png';

function SettingButton({setMainMenu}){
  const handleClick = () => {
    setMainMenu(true)
  }

  return (
    <div className="settingButton">
      <img className="settingButton-img" src={settingButton} onClick={handleClick}></img>
    </div>
  );
}

export default SettingButton;
