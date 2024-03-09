import { Modal } from 'react-bootstrap'
import './CharityMenu.scss'
import charitybutton from './../../../assets/menus/charity-button.png'
import { ethers } from 'ethers'
import {
  getMasterChefContract,
  checkOwnerChef,
  getCurrentGameState,
  getBalance,
  getNFTsState,
  getLastPoints,
} from './../../../utils/interact'
import ADDRESSES from './../../../constants/ADDRESSES.json'
import useGameStore from './../../../GameStore'
import levelInfos from './../../../constants/LEVELS.json'

export const CharityMenu = ({
  show,
  hideAction,
  setInsufficientMenu,
  setLoadingGif,
  setLoadingMenu,
  setMainMenu,
}) => {
  const {
    walletAddress,
    setChef,
    setMaticBalance,
    setMschBalance,
    setTotalSupply,
    setMarketRate,
    setLevel,
    setHasFridge,
    setHasLadle,
    setHasKettle,
    setHasMixer,
    setHasOven,
    setLastSync,
    setLastMatic,
    setLastMsch,
  } = useGameStore()

  const handleClick = async () => {
    setLoadingGif(true)
    let balance = await getBalance()
    balance = parseFloat(balance).toFixed(2)
    if (balance < 3) {
      setLoadingGif(false)
      setInsufficientMenu(true)
      return
    }
    const contract = getMasterChefContract()
    const overrides = {
      value: ethers.utils.parseEther('3'),
      gasPrice: 100000000000,
    }
    console.log(overrides)
    try {
      const tx = await contract.createChef(ADDRESSES.TEAM_ADDRESS, overrides)
      await tx.wait()
      const chefState = await checkOwnerChef(walletAddress)
      setLoadingGif(false)
      if (chefState.length === 0) {
        console.log('err')
      } else {
        hideAction()
        setLoadingMenu(true)
        const {
          maticBalanceF,
          mschBalanceF,
          totalSupplyF,
          marketRateF,
        } = await getCurrentGameState(walletAddress)
        const {
          tx_fridge,
          tx_ladle,
          tx_kettle,
          tx_mixer,
          tx_oven,
        } = await getNFTsState(walletAddress)

        const {
          lastSyncF,
          lastMaticF,
          lastMschF,
        } = await getLastPoints(walletAddress)
        setMaticBalance(maticBalanceF)
        setMschBalance(mschBalanceF)
        setTotalSupply(totalSupplyF)
        setMarketRate(marketRateF)

        setHasFridge(tx_fridge > 0)
        setHasLadle(tx_ladle > 0)
        setHasKettle(tx_kettle > 0)
        setHasMixer(tx_mixer > 0)
        setHasOven(tx_oven > 0)

        setLastSync(lastSyncF)
        setLastMatic(lastMaticF)
        setLastMsch(lastMschF)
      
        setLevel(levelInfos[chefState.length])
        setChef(chefState)

        setLoadingMenu(false)
        setMainMenu(true)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Modal
      className="CharityMenu"
      dialogClassName="charity-dialog"
      contentClassName="charity-content"
      show={show}
      backdrop="static"
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={hideAction}
    >
      <img
        src={charitybutton}
        className="charity-button"
        onClick={handleClick}
      />
    </Modal>
  )
}

export default CharityMenu
