import { Modal } from "react-bootstrap";
import "./MaxLevelMenu.scss";
import maxlevelclose from './../../../assets/menus/max-level-close.png';

export const MaxLevelMenu = ({ show, hideAction }) => {

  return (
    <Modal
      className="MaxLevelMenu"
      dialogClassName="maxlevelmenu-dialog"
      contentClassName="maxlevelmenu-content"
      show={show}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={hideAction}
    >
      <img src={maxlevelclose} className="maxlevel-close" onClick={hideAction} />
    </Modal>
  );
};

export default MaxLevelMenu;
