import { Modal } from "react-bootstrap";
import "./InsufficientMenu.scss";
import insufficientclose from './../../../assets/menus/insufficient-close.png'
export const InsufficientMenu = ({ show, hideAction }) => {

  return (
    <Modal
      className="InsufficientMenu"
      dialogClassName="insufficientmenu-dialog"
      contentClassName="insufficientmenu-content"
      show={show}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={hideAction}
    >
      <img src={insufficientclose} className="insufficient-close" onClick={hideAction} />
    </Modal>
  );
};

export default InsufficientMenu;
