import { useState, useEffect } from 'react'
import { Modal } from "react-bootstrap";
import "./SaveWarningMenu.scss";
import savewarningclose from './../../../assets/menus/save-warning-close.png'
import savewarningbutton from './../../../assets/menus/save-warning-button.png'
import useCountDown from './../../Tools/CountDown/Store'
export const SaveWarningMenu = ({ show, hideAction }) => {
  const {count} = useCountDown()
  const [time, setTime] = useState(0)

  useEffect(() => {
    setTime(Math.floor(count/60))
  },[count])

  return (
    <Modal
      className="SaveWarningMenu"
      dialogClassName="savewarningmenu-dialog"
      contentClassName="savewarningmenu-content"
      show={show}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={hideAction}
    >
      <span className="savewarning-remaining-time">{time}</span>
      <img src={savewarningbutton} className="savewarning-button" />
      <img src={savewarningclose} className="savewarning-close" onClick={hideAction} />
    </Modal>
  );
};

export default SaveWarningMenu;
