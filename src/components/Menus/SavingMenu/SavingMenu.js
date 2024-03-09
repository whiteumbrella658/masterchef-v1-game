import { useState, useEffect } from 'react'
import { Modal } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import "./SavingMenu.scss"

export const SavingMenu = ({ show, hideAction }) => {

  return (
    <Modal
      className="SavingMenu"
      dialogClassName="savingmenu-dialog"
      contentClassName="savingmenu-content"
      show={show}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard={false}
      onHide={hideAction}
    >
    </Modal>
  );
};

export default SavingMenu;
