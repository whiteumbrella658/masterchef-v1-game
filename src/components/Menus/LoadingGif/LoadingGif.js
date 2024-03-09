import { Modal } from "react-bootstrap";
import "./LoadingGif.scss";
export const LoadingGif = ({ show, hideAction }) => {

  return (
    <Modal
      className="LoadingGif"
      dialogClassName="loadinggif-dialog"
      contentClassName="loadinggif-content"
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

export default LoadingGif;
