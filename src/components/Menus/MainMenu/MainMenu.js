import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./MainMenu.scss";
import mmplay from './../../../assets/menus/mmplay.png';
import mmdollar from './../../../assets/menus/mmdollar.png';
import mmabout from './../../../assets/menus/mmabout.png';

export const MainMenu = ({ show, hideAction }) => {

  return (
    <Modal
      className="MainMenu"
      dialogClassName="mainmenu-dialog"
      contentClassName="mainmenu-content"
      show={show}
      backdrop="static"
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={hideAction}
    >
      <img src={mmplay} className="mainmenu-btns mainmenu-play-btn" onClick={hideAction} />
      <img src={mmabout} className="mainmenu-btns mainmenu-about-btn" />
      <img src={mmdollar} className="mainmenu-btns mainmenu-dollar-btn" />
    </Modal>
  );
};

export default MainMenu;
