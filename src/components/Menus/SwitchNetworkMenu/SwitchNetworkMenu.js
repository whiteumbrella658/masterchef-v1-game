import { Modal } from "react-bootstrap"
import "./SwitchNetworkMenu.scss"

export const SwitchNetworkMenu = ({ show, hideAction }) => {

  return (
    <Modal
      className="SwitchNetworkMenu"
      dialogClassName="switchnetworkmenu-dialog"
      contentClassName="switchnetworkmenu-content"
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

export default SwitchNetworkMenu;
