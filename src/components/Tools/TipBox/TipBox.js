import { Modal } from "react-bootstrap";
import "./TipBox.scss";
import tipbox from './../../../assets/menus/tipbox-menu.png';
import useGameStore from './../../../GameStore'

export const TipBox = ({setRewardCollection}) => {
  const {hasLadle} = useGameStore()

  const handleRewardCollection = () => {
    if(!hasLadle) return
    setRewardCollection(true)
  }

  return (
      <div className={`tipbox-area ${hasLadle ? "active" : "inactive"}`}>
        <img className={`tipbox-img`} src={tipbox} onClick={handleRewardCollection} />
      </div>
  );
};

export default TipBox;
