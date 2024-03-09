import { Modal } from "react-bootstrap";
import "./LoadingMenu.scss";
export const LoadingMenu = ({ show, hideAction }) => {

  return (
    <Modal
      className="LoadingMenu"
      dialogClassName="loadingmenu-dialog"
      contentClassName="loadingmenu-content"
      show={show}
      backdrop="static"
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={hideAction}
    >
    </Modal>
  );
};

export default LoadingMenu;
