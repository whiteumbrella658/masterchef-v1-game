import { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import './ConnectWalletMenu.scss'
import connectwalletbutton from './../../../assets/menus/connect-wallet-button.png'
import {
  connectWallet,
  checkOwnerChef,
  getCurrentGameState,
  getNFTsState,
  getLastPoints,
} from './../../../utils/interact'
import useGameStore from './../../../GameStore'
import levelInfos from './../../../constants/LEVELS.json'

export const ConnectWalletMenu = ({
  show,
  hideAction,
  setNoWalletMenu,
  setSwitchNetworkMenu,
  setLoadingGif,
  setCharityMenu,
  setLoadingMenu,
  setMainMenu,
}) => {
  const {
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
    setPlaying
  } = useGameStore()

  const onClickConnectWallet = async () => {
    setPlaying()
    setLoadingGif(true)
    const { event, response } = await connectWallet()
    setLoadingGif(false)
    switch (event) {
      case 'No Wallet':
        hideAction()
        setNoWalletMenu(true)
        break
      case 'Wrong Chain':
        hideAction()
        setSwitchNetworkMenu(true)
        break
      case 'connected':
        console.log('wallet connected =>', response)
        hideAction()
        setSwitchNetworkMenu(false)
        setWalletAddress(response)
        setLoadingGif(true)
        const chefState = await checkOwnerChef(response)
        setLoadingGif(false)
        console.log('chefState =>', chefState)
        if (chefState.length === 0) {
          setCharityMenu(true)
        } else {
          setLoadingMenu(true)
          const {
            maticBalanceF,
            mschBalanceF,
            totalSupplyF,
            marketRateF,
          } = await getCurrentGameState(response)
          const {
            tx_fridge,
            tx_ladle,
            tx_kettle,
            tx_mixer,
            tx_oven,
          } = await getNFTsState(response)

          const {
            lastSyncF,
            lastMaticF,
            lastMschF,
          } = await getLastPoints(response)

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
          setLevel(levelInfos[chefState.length])
          setChef(chefState)
          setLoadingMenu(false)
          setMainMenu(true)
        }
        break
    }
  }

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('chainChanged', async (chain) => {
        await onClickConnectWallet()
      })
    }
    return () => {
      window.ethereum.removeListener('chainChanged', async (chain) => {
        await onClickConnectWallet()
      })
    }
  }, [])

  return (
    <Modal
      className="ConnectWalletMenu"
      dialogClassName="connectwalletmenu-dialog"
      contentClassName="connectwalletmenu-content"
      backdrop="static"
      keyboard={false}
      show={show}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={hideAction}
    >
      <img
        src={connectwalletbutton}
        className="connectwallet-button"
        onClick={onClickConnectWallet}
      />
    </Modal>
  )
}

export default ConnectWalletMenu
