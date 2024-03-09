import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AlchemyMenu.scss";
import alchemyclose from './../../../assets/menus/alchemy-close.png';


export const AlchemyMenu = ({ show, hideAction}) => {
  const handlealchemy = () => {
    hideAction()
  }

  return (
    <Modal
      className="AlchemyMenu"
      dialogClassName="alchemymenu-dialog"
      contentClassName="alchemymenu-content"
      show={show}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={hideAction}
    >
      <img src={alchemyclose} className="alchemy-close hover-scale" onClick={hideAction} />
      <span className="alchemy-text">Coming soon at V2</span>
    </Modal>
  );
};

export default AlchemyMenu;
