import { useState, useEffect} from 'react'
import { Modal } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import "./UpgradeMenu.scss"
import upgradebutton from './../../../assets/menus/upgrade-button.png'
import upgradeclose from './../../../assets/menus/upgrade-close.png'
import useGameStore from './../../../GameStore'
import levelUpCosts from './../../../constants/LEVELUP.json'
import ADDRESSES from './../../../constants/ADDRESSES.json'
import levelInfos from './../../../constants/LEVELS.json'
import { getMasterChefContract, approveMSCHTransfer, checkOwnerChef, getCurrentGameState } from './../../../utils/interact'

export const UpgradeMenu = ({ show, hideAction, setInsufficientMenu, setLoadingGif, setLoadingMenu, setMainMenu }) => {
  const {
    level,
    marketRate,
    mschBalance,
    walletAddress,
    setChef,
    setMaticBalance,
    setMschBalance,
    setTotalSupply,
    setMarketRate,
    setLevel
  } = useGameStore()
  const [marketPrice, setMarketPrice] = useState(0)  

  useEffect(() => {
    if(show === true){
      let price = levelUpCosts[level+1]
      price = price / marketRate
      setMarketPrice(price)
    }
  })

  const handleUpgrade = async () => {
    hideAction()
    
    if(mschBalance < marketPrice){
      setInsufficientMenu(true)
    }else{
      setLoadingGif(true)
      await approveMSCHTransfer(ADDRESSES.MASTERCHEF_ADDRESS, marketPrice)
      const contract = getMasterChefContract()
      console.log('Chef Level Up!')
      try{
        const tx = await contract.levelUp({gasPrice: 100000000000})
        await tx.wait()
        setLoadingGif(false)
        setLoadingMenu(true)
        const {
          maticBalanceF,
          mschBalanceF,
          totalSupplyF,
          marketRateF,
        } = await getCurrentGameState(walletAddress)
        setMaticBalance(maticBalanceF)
        setMschBalance(mschBalanceF)
        setTotalSupply(totalSupplyF)
        setMarketRate(marketRateF)
        await waitOneMinute()
        const chefState = await checkOwnerChef(walletAddress)
        setLevel(levelInfos[chefState.length])
        console.log(chefState)
        setChef(chefState)

        setLoadingMenu(false)
        setMainMenu(true)
      }catch(err){
        console.log(err)
      }
    }
  }

  const waitOneMinute = async () =>  {
    return new Promise(resolve => setTimeout(resolve, 60000))
  }

  return (
    <Modal
      className="UpgradeMenu"
      contentClassName="upgrademenu-dialog"
      show={show}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={hideAction}
    >
      <img src={upgradeclose} className="upgrade-close hover-scale" onClick={hideAction} />
      <img src={upgradebutton} className="upgrade-button hover-scale" onClick={handleUpgrade} />
      <span className="upgrade-text upgrade-level">{`Level:   ${level + 1}`}</span>
      <span className="upgrade-text upgrade-cost">{`Cost:    ${marketPrice} MSCH`}</span>
    </Modal>
  );
};

export default UpgradeMenu;
