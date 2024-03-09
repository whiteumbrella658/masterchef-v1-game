import { useState, useEffect } from 'react'
import './Sarten.scss'
import sarten from './../../../assets/equips/sarten.png'
import foodInfos from './../../../constants/FOODS.json'
import reverseIndexes from './../../../constants/RECIPES-REVERSE.json'
import pan from './../../../assets/equips/pan.png'
import progress0 from './../../../assets/menus/progress-0.png'
import progress25 from './../../../assets/menus/progress-25.png'
import progress50 from './../../../assets/menus/progress-50.png'
import progress75 from './../../../assets/menus/progress-75.png'
import progress100 from './../../../assets/menus/progress-100.png'
import useCountDown from './../../Tools/CountDown/Store'
import useGameStore from './../../../GameStore'
import { getBlockTimestamp } from './../../../utils/interact'
import { BigNumber } from 'ethers'

function Sarten({
  stoveOrder,
  order,
  landIndex,
  selFood,
  setSelectRecipeMenu,
  setInsufficientMenu,
}) {
  const {
    chef,
    mschBalance,
    layouts,
    hasKettle,
    hasMixer,
    hasOven,
    attachEvent,
    plus,
    minus,
    setLayouts,
  } = useGameStore()
  const [foodInfo, setFoodInfo] = useState({})
  const [sartenState, setSartenState] = useState(0)
  const [count, setCount] = useState(-1)
  const [progress, setProgress] = useState(0)
  const { setFlag } = useCountDown()
  const [time, setTime] = useState('')
  let timeout = {}

  const handlePlaceRecipe = async () => {
    if (selFood === '') setSelectRecipeMenu(true)
    else if (parseFloat(mschBalance) - parseFloat(foodInfo['cost']) > 0) {
      document.getElementById('plant-player').play()
      setSartenState(1)
      setLayouts(stoveOrder, order, selFood)
      const timestamp = await getBlockTimestamp()
      const event = [
        0,
        foodInfo['index'],
        landIndex,
        timestamp,
      ]
      attachEvent(event)
      setFlag(true)
      setCount(getRecipeCount(foodInfo))
      minus(foodInfo['cost'])
      console.log(mschBalance)
    } else {
      setInsufficientMenu(true)
    }
  }

  useEffect(() => {
    setFoodInfo(foodInfos[selFood])
  })

  useEffect(() => {
    if (chef.length > 1) {
      let landState = chef[landIndex]
      console.log(landIndex, landState)
      if(landState === undefined){
        landState = [1, BigNumber.from("1")]
      }
      if (landState[0] != 0) {
        let foodName = reverseIndexes[landState[0]].toLowerCase()
        let duration = getRecipeCount(foodInfos[foodName])

        setLayouts(
          stoveOrder,
          order,
          foodName,
        )
        setFoodInfo(foodInfos[foodName])
        setLayouts(stoveOrder, order, foodName)

        if (landState[1].toNumber() == 0) {
          setSartenState(2)
          setCount(-1)
          setProgress(0)
        } else {
          let timeDifference = Math.floor(Date.now() / 1000) - landState[1].toNumber()
          if(timeDifference >= duration){
            setSartenState(2)
            setCount(-1)
            setProgress(0)  
          }else{
            setSartenState(1)
            setProgress(0)
            setCount(duration - timeDifference)
            console.log(duration - timeDifference)
          }
        }
      }
    }
  }, [chef])


  useEffect(() => {
    if (sartenState === 1) {
      timeout = setTimeout(() => {
        let duration = getRecipeCount(foodInfos[layouts[stoveOrder][order]])
        if (count === 0) {
          setSartenState(2)
          setCount(-1)
          setProgress(0)
        } else setCount(count - 1)
        // console.log(stoveOrder, order, duration, count, layouts[stoveOrder][order], sartenState, progress)
        setProgress(
          Math.floor(
            (duration - count) /
              (duration / 4),
          ),
        )
        setTime(convertTimeStr(count))
      }, 1000)
    }

    return ()=> clearTimeout(timeout)
  }, [count])

  const handleHarvestRecipe = async () => {
    document.getElementById('harvest-player').play()
    setSartenState(0)
    const timestamp = getBlockTimestamp()
    const event = [
      1,
      foodInfos[layouts[stoveOrder][order]]['index'],
      landIndex,
      timestamp,
    ]
    setLayouts(stoveOrder, order, '')
    attachEvent(event)
    setFlag(true)
    plus(foodInfos[layouts[stoveOrder][order]]['sale'])
    console.log(mschBalance)
  }

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

  const getRecipeCount = (recipe) => {
    let value = recipe['count']
    switch(recipe['index']){
      case 5:
        if(hasKettle) value = value / 3
        break;
      case 6:
        if(hasMixer) value = value / 3
        break;
      case 9:
        if(hasOven) value = value / 3
        break;
      default:
        break;
    }
 
    return value
  }

  return (
    <>
      {sartenState === 0 && (
        <>
          <img
            src={sarten}
            className={`sarten-img sarten${order}`}
            onClick={handlePlaceRecipe}
          />
        </>
      )}
      {sartenState === 1 && (
        <>
          <img src={pan} className={`pan-img pan${order}`} />
          <span className={`progress-time-text time${order}`}>{time}</span>
          {progress === 0 && (
            <>
              <img
                src={progress0}
                className={`progress-img progress${order}`}
              />
            </>
          )}
          {progress === 1 && (
            <>
              <img
                src={progress25}
                className={`progress-img progress${order}`}
              />
            </>
          )}
          {progress === 2 && (
            <>
              <img
                src={progress50}
                className={`progress-img progress${order}`}
              />
            </>
          )}
          {progress === 3 && (
            <>
              <img
                src={progress75}
                className={`progress-img progress${order}`}
              />
            </>
          )}
          {progress === 4 && (
            <>
              <img
                src={progress100}
                className={`progress-img progress${order}`}
              />
            </>
          )}
        </>
      )}
      {sartenState === 2 && (
        <>
          <img
            className={`food-img food${order}`}
            src={`/assets/foods/${layouts[stoveOrder][order]}.png`}
            onClick={handleHarvestRecipe}
          />
        </>
      )}
    </>
  )
}

export default Sarten
