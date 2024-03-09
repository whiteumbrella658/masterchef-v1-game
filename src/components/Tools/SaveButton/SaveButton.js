import { useState, useEffect } from 'react'
import './SaveButton.scss'
import saveButton from './../../../assets/save_button.png'
import {
  saveGameState,
  checkOwnerChef,
  getCurrentGameState,
  getNFTsState,
} from './../../../utils/interact'
import useGameStore from './../../../GameStore'
import levelInfos from './../../../constants/LEVELS.json'
import useCountDown from './../CountDown/Store'

function SaveButton({ setSavingMenu, setLoadingMenu }) {
  const {
    walletAddress,
    events,
    setChef,
    resetEvents,
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
  } = useGameStore()
  const {flag, setFlag ,reset} = useCountDown()

  const handleClick = async () => {
    if(flag === false) return
    console.log(events)
    setFlag(false)
    setSavingMenu(true)
    await saveGameState(events)
    setSavingMenu(false)
    setLoadingMenu(true)
    const chefState = await checkOwnerChef(walletAddress)
    console.log('chefState =>', chefState)
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

    setLevel(levelInfos[chefState.length])
    setChef(chefState)

    reset()
    resetEvents()
    setLoadingMenu(false)
  }

  return (
    <div className="saveButton">
      <img className={`saveButton-img ${flag ? "active" : "inactive"}`} src={saveButton} onClick={handleClick} />
    </div>
  )
}

export default SaveButton
