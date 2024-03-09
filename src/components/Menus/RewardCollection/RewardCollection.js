import { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './RewardCollection.scss'
import rewardbtn from './../../../assets/menus/reward-collection-btn.png'
import rewardclose from './../../../assets/menus/reward-close.png'
import { getMasterChefContract, getBlockTimestamp, getLastMsch } from './../../../utils/interact'
import useGameStore from './../../../GameStore'

export const RewardCollection = ({ show, hideAction, setLoadingGif }) => {
  const [available, setAvailable] = useState(false)
  const {walletAddress, lastMsch, setLastMsch} = useGameStore()
  const [count, setCount] = useState(0)
  let intval = 0

  const handleClick = async () => {
    if(!available) return
    setLoadingGif(true)
    const contract = getMasterChefContract()
    try{
      const receive = await contract.receiveReward()
      console.log(receive)
      const response = await getLastMsch(walletAddress)
      console.log(response)
      setLastMsch(response)
      setCount(259200)
    } catch(err){
      console.log(err)
    }
    setLoadingGif(false)
    hideAction()
  }

  const initAvailable = async () =>  {
    const timestamp = await getBlockTimestamp()
    const timeLeft = 259200 + lastMsch - timestamp
    console.log('MSCH', timestamp, lastMsch, timeLeft)
    if(timeLeft < 0) setAvailable(true)
    else{
      setCount(timeLeft)
    }
  }
  
  useEffect(()=>{
    intval = setTimeout(()=>{
      if(count == 0){
        setAvailable(true)
        clearTimeout(intval)
      }else{
        setAvailable(false)
        setCount(count - 1)
      }
      console.log('MSCH', count, convertTimeStr(count))
    }, 1000)
    return () => clearTimeout(intval)
  }, [count])

  const convertTimeStr = (value) => {
    let str = ''
    if (value < 60) {
      str = value > 9 ? `${value} S` : `0${value} S`
    } else if (value < 3600) {
      str =
        Math.floor(value / 60) > 9
          ? `${Math.floor(value / 60)} M`
          : `0${Math.floor(value / 60)} M`
    } else {
      str =
        Math.floor(value / 3600) > 9
          ? `${Math.floor(value / 3600)} H`
          : `0${Math.floor(value / 3600)} H`
    }
    return str
  }

  return (
    <Modal
      className="RewardCollection"
      dialogClassName="rewardcollection-dialog"
      contentClassName="rewardcollection-content"
      show={show}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onEntered={initAvailable}
      onHide={hideAction}
    >
      <img src={rewardbtn} className={`reward-btn ${available? "active" : "inactive"}`} onClick={handleClick} />
      <img src={rewardclose} className="reward-close" onClick={hideAction} />
      <span className="msch-time-left">{`TIME LEFT : ${convertTimeStr(count)}`}</span>
    </Modal>
  )
}

export default RewardCollection
