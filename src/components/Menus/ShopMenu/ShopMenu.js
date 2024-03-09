import { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './ShopMenu.scss'
import rmpreview from './../../../assets/menus/recipes-preview.png'
import craftItem from './../../../assets/menus/craft-item.png'
import close from './../../../assets/menus/shop-close.png'
import fridge from './../../../assets/items/fridge.png'
import ladle from './../../../assets/items/ladle.png'
import kettle from './../../../assets/items/kettle.png'
import mixer from './../../../assets/items/mixer.png'
import oven from './../../../assets/items/oven.png'
import itemInfos from './../../../constants/NFTS.json'
import useGameStore from './../../../GameStore'
import {
  getMasterChefContract,
  getCurrentGameState,
  getNfTsState,
  checkOwnerChef,
  getNFTsState,
  getLastPoints,
  getNFTsCounts,
} from './../../../utils/interact'
import ADDRESSES from './../../../constants/ADDRESSES.json'
import { ethers } from 'ethers'
import useCountDown from './../../Tools/CountDown/Store'

export const ShopMenu = ({
  show,
  hideAction,
  setLoadingGif,
  setLoadingMenu,
  setInsufficientMenu,
}) => {
  const [previewImage, setPreviewImage] = useState(rmpreview)
  const [amount, setAmount] = useState('')
  const [craftFlag, setCraftFlag] = useState(true)
  const [selectedItemInfos, setSelectedItemInfos] = useState({
    name: '',
    cost: '',
    type: '',
    description: '',
  })
  const {
    walletAddress,
    hasFridge,
    hasLadle,
    hasKettle,
    hasMixer,
    hasOven,
    maticBalance,
    fridgeCount,
    ladleCount,
    kettleCount,
    mixerCount,
    ovenCount,
    setChef,
    setWalletAddress,
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
    setFridgeCount,
    setLadleCount,
    setKettleCount,
    setMixerCount,
    setOvenCount,
  } = useGameStore()

  const { flag } = useCountDown()

  const handleClick = (e) => {
    setSelectedItemInfos(itemInfos[e.target.alt])
    setAmount(getCountStr(e.target.alt))
    setCraftFlag(e.target.classList.contains('active'))
    const tempUrl = `/assets/items/${e.target.alt.toLowerCase()}.png`
    setPreviewImage(tempUrl)

  }

  useEffect(() => {
    console.log(flag, craftFlag, flag&&craftFlag)
  }, [craftFlag])

  useEffect(async () => {
    if(show !== false){
      setLoadingGif(true)
      const {fridgeCountF, ladleCountF, kettleCountF, mixerCountF, ovenCountF} = await getNFTsCounts()
      setFridgeCount(fridgeCountF.toNumber())   //1050 fridgeCountF-50
      setLadleCount(ladleCountF.toNumber())
      setKettleCount(kettleCountF.toNumber())
      setMixerCount(mixerCountF.toNumber())
      setOvenCount(ovenCountF.toNumber())       //3100 ovenCountF-fridgeCountF-100
      console.log({fridgeCount, ladleCount, kettleCount, mixerCount, ovenCount})
      setLoadingGif(false)
    }
  }, [show])

  const getCountStr = (nftName) => {
    let str = ''
    switch(nftName){
      case 'Fridge':
        str = `${1050 - parseInt(fridgeCount)}/1000`
        break;
      case 'Ladle':
        str = `${1050 - parseInt(ladleCount)}/1000`
        break;
      case 'Kettle':
        str = `${2100 - parseInt(kettleCount) + parseInt(fridgeCount) - 50}/2000`
        break;
      case 'Mixer':
        str = `${2100 - parseInt(mixerCount) + parseInt(fridgeCount) - 50}/2000`
        break;
      case 'Oven':
        str = `${2100 - parseInt(ovenCount) + parseInt(fridgeCount) - 50}/2000`
        break;
      default:
        break;
    }
    return str
  }

  const handleCraftItem = async () => {
    if(selectedItemInfos['name'] == '') return
    if(flag === true) return
    if (selectedItemInfos['name'] === 'Fridge') {
      if (hasFridge) return
    } else if (selectedItemInfos['name'] === 'Ladle') {
      if (hasLadle) return
    } else if (selectedItemInfos['name'] === 'Kettle') {
      if (hasKettle) return
    } else if (selectedItemInfos['name'] === 'Mixer') {
      if (hasMixer) return
    } else {
      if (hasOven) return
    }

    if (maticBalance < selectedItemInfos['cost']) {
        setInsufficientMenu(true)
        return
      }

      setLoadingGif(true)
      const contract = getMasterChefContract()
      try {
        const overrides = {
          value: ethers.utils.parseEther(
            selectedItemInfos['cost'].toString(),
          ),
          gasPrice: 100000000000,
        }
        console.log(overrides)
        const tx = await contract.mintNFT(selectedItemInfos['symbol'] ,overrides)
        await tx.wait()
        setLoadingGif(false)
      } catch (err) {
        console.log(err)
      }

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

    console.log(
      maticBalanceF,
      mschBalanceF,
      totalSupplyF,
      marketRateF,
      tx_fridge,
      tx_ladle,
      tx_kettle,
      tx_mixer,
      tx_oven,
      lastSyncF,
      lastMaticF,
      lastMschF,
    )
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
    
    const chefState = await checkOwnerChef(walletAddress)
    setChef(chefState)

    setLoadingMenu(false)
    hideAction()
  }

  return (
    <Modal
      className="Shopmenu"
      dialogClassName="shopmenu-dialog"
      contentClassName="shopmenu-content"
      show={show}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard={false}
      onHide={hideAction}
    >
      <div className="crafts-list">
        <div className="crafts">
          <div className="craft">
            <img
              className={`craft-item-img ${hasFridge ? 'active' : 'inactive'}`}
              alt="Fridge"
              src={fridge}
              onClick={handleClick}
            />
          </div>
          <div className="craft">
            <img
              className={`craft-item-img ${hasLadle ? 'active' : 'inactive'}`}
              alt="Ladle"
              src={ladle}
              onClick={handleClick}
            />
          </div>
          <div className="craft">
            <img
              className={`craft-item-img ${hasKettle ? 'active' : 'inactive'}`}
              alt="Kettle"
              src={kettle}
              onClick={handleClick}
            />
          </div>
          <div className="craft">
            <img
              className={`craft-item-img ${hasMixer ? 'active' : 'inactive'}`}
              alt="Mixer"
              src={mixer}
              onClick={handleClick}
            />
          </div>
          <div className="craft">
            <img
              className={`craft-item-img ${hasOven ? 'active' : 'inactive'}`}
              alt="Oven"
              src={oven}
              onClick={handleClick}
            />
          </div>
        </div>
      </div>
      <div className="item-preview">
        <img
          src={previewImage}
          alt="craft preview"
          className="item-preview-img"
        />
      </div>

      <img
        src={craftItem}
        className={`craft-item hover-scale ${flag || craftFlag? "inactive" : "active"}`}
        onClick={handleCraftItem}
      />
      <div className="craft-info">
        <span className="craft-info-text">{`NAME : ${selectedItemInfos.name}`}</span>
        <span className="craft-info-text">{`COST : ${selectedItemInfos.cost} ${selectedItemInfos.type}`}</span>
        <span className="craft-info-text">{`REMAIN : ${amount}`}</span>
        <span
          className="craft-info-text"
          style={{ fontSize: '1.8vw' }}
        >{`DESCRIPTION : ${selectedItemInfos.description}`}</span>
      </div>
      <img src={close} className="shop-close" onClick={hideAction} />
    </Modal>
  )
}

export default ShopMenu
