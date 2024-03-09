import { useState, useEffect } from 'react'
import './Stove02.scss'
import stove02 from './../../../assets/equips/stove-3-2.png'
import Sarten from '../Sarten'

function Stove02({
  level,
  selFood,
  setSelectRecipeMenu,
  setInsufficientMenu,
}) {
  return (
    <div className="stove stove02">
      <img className="stove02-img" src={stove02} />
      {level > 1 && (
        <>
          <Sarten
            stoveOrder="02"
            order="01"
            landIndex={5}
            selFood={selFood}
            setSelectRecipeMenu={setSelectRecipeMenu}
            setInsufficientMenu={setInsufficientMenu}
          />
          <Sarten
            stoveOrder="02"
            order="02"
            landIndex={6}
            selFood={selFood}
            setSelectRecipeMenu={setSelectRecipeMenu}
            setInsufficientMenu={setInsufficientMenu}
          />
          <Sarten
            stoveOrder="02"
            order="03"
            landIndex={7}
            selFood={selFood}
            setSelectRecipeMenu={setSelectRecipeMenu}
            setInsufficientMenu={setInsufficientMenu}
          />
        </>
      )}
    </div>
  )
}

export default Stove02
