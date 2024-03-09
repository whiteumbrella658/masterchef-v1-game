import { Modal } from "react-bootstrap"
import "./NoWalletMenu.scss"

export const NoWalletMenu = ({ show, hideAction }) => {

  return (
    <Modal
      className="NoWalletMenu"
      dialogClassName="nowalletmenu-dialog"
      contentClassName="nowalletmenu-content"
      backdrop="static"
      keyboard={false}
      show={show}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={hideAction}
    >
    </Modal>
  );
};

export default NoWalletMenu;
