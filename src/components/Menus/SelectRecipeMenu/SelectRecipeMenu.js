import { Modal } from "react-bootstrap";
import "./SelectRecipeMenu.scss";
import selectrecipeclose from './../../../assets/menus/select-recipe-close.png';
import selectrecipebutton from './../../../assets/menus/select-recipe-button.png';

export const SelectRecipeMenu = ({ show, hideAction, setRecipesMenu }) => {
  const handleClick = () => {
    hideAction()
    setRecipesMenu(true)
  }

  return (
    <Modal
      className="SelectRecipeMenu"
      dialogClassName="selectrecipe-dialog"
      contentClassName="selectrecipe-content"
      show={show}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={hideAction}
    >
      <img src={selectrecipeclose} className="selectrecipe-close" onClick={hideAction} />
      <img src={selectrecipebutton} className="selectrecipe-button" onClick={handleClick} />
    </Modal>
  );
};

export default SelectRecipeMenu;
