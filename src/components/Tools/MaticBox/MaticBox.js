import { Modal } from "react-bootstrap";
import "./MaticBox.scss";
import maticbox from './../../../assets/menus/maticbox-menu.png';
import useGameStore from './../../../GameStore'

export const MaticBox = ({setMaticReward}) => {
  const {hasFridge} = useGameStore()

  const handleRewardCollection = () => {
    if(!hasFridge) return
    setMaticReward(true)
  }

  return (
      <div className={`maticbox-area ${hasFridge ? "active" : "inactive"}`}>
        <img className={`maticbox-img`} src={maticbox} onClick={handleRewardCollection} />
      </div>
  );
};

export default MaticBox;
