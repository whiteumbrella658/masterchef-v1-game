import { useState, useEffect } from 'react'
import './GameScene.scss'
import Fridge from '../../components/Crafts/Fridge'
import Oven from '../../components/Crafts/Oven'
import Kettle from '../../components/Crafts/Kettle'
import Mixer from '../../components/Crafts/Mixer'
import Ladle from '../../components/Crafts/Ladle'
import Stove01 from '../../components/Equips/Stove01'
import Stove02 from '../../components/Equips/Stove02'
import Stove03 from '../../components/Equips/Stove03'
import Stove04 from '../../components/Equips/Stove04'
import Stove05 from '../../components/Equips/Stove05'
import Adleft from '../../components/Tools/Adleft'
import Adright from '../../components/Tools/Adright'
import TipBox from '../../components/Tools/TipBox'
import MaticBox from '../../components/Tools/MaticBox'
import CountDown from '../../components/Tools/CountDown'
import SwapButton from '../../components/Tools/SwapButton'
import SaveButton from '../../components/Tools/SaveButton'
import BalanceBar from '../../components/Tools/BalanceBar'
import MusicBar from '../../components/Tools/MusicBar'
import useGameStore from '../../GameStore'

function GameScene({
  setRewardCollection,
  setMaticReward,
  setSavingMenu,
  selFood,
  setSelectRecipeMenu,
  setSaveWarningMenu,
  setInsufficientMenu,
  setLoadingMenu,
}) {
  const { level } = useGameStore()

  return (
    <div className="playground">
      <CountDown setSaveWarningMenu={setSaveWarningMenu} />
      <SwapButton />
      <SaveButton
        setSavingMenu={setSavingMenu}
        setLoadingMenu={setLoadingMenu}
      />
      <BalanceBar />
      <Fridge />
      <Ladle />
      <Kettle />
      <Mixer />
      <Oven />
      <Stove01
        level={level}
        selFood={selFood}
        setSelectRecipeMenu={setSelectRecipeMenu}
        setInsufficientMenu={setInsufficientMenu}
      />
      <Stove02
        level={level}
        selFood={selFood}
        setSelectRecipeMenu={setSelectRecipeMenu}
        setInsufficientMenu={setInsufficientMenu}
      />
      <Stove03
        level={level}
        selFood={selFood}
        setSelectRecipeMenu={setSelectRecipeMenu}
        setInsufficientMenu={setInsufficientMenu}
      />
      <Stove04
        level={level}
        selFood={selFood}
        setSelectRecipeMenu={setSelectRecipeMenu}
        setInsufficientMenu={setInsufficientMenu}
      />
      <Stove05
        level={level}
        selFood={selFood}
        setSelectRecipeMenu={setSelectRecipeMenu}
        setInsufficientMenu={setInsufficientMenu}
      />
      <Adleft level={level} />
      <Adright level={level} />
      <TipBox setRewardCollection={setRewardCollection} />
      <MaticBox setMaticReward={setMaticReward} />
      <MusicBar />
    </div>
  )
}

export default GameScene
