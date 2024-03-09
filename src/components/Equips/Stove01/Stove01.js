import { useState, useEffect } from 'react'
import Sarten from '../Sarten'
import './Stove01.scss'
import stove01 from './../../../assets/equips/stove-5.png'

function Stove01({
  level,
  selFood,
  setSelectRecipeMenu,
  setInsufficientMenu,
}) {
  return (
    <div className="stove stove01">
      <img className="stove01-img" src={stove01}></img>
      <Sarten
        stoveOrder="01"
        order="01"
        landIndex={0}
        selFood={selFood}
        setSelectRecipeMenu={setSelectRecipeMenu}
        setInsufficientMenu={setInsufficientMenu}
      />
      <Sarten
        stoveOrder="01"
        order="02"
        landIndex={1}
        selFood={selFood}
        setSelectRecipeMenu={setSelectRecipeMenu}
        setInsufficientMenu={setInsufficientMenu}
      />
      <Sarten
        stoveOrder="01"
        order="03"
        landIndex={2}
        selFood={selFood}
        setSelectRecipeMenu={setSelectRecipeMenu}
        setInsufficientMenu={setInsufficientMenu}
      />
      <Sarten
        stoveOrder="01"
        order="04"
        landIndex={3}
        selFood={selFood}
        setSelectRecipeMenu={setSelectRecipeMenu}
        setInsufficientMenu={setInsufficientMenu}
      />
      <Sarten
        stoveOrder="01"
        order="05"
        landIndex={4}
        selFood={selFood}
        setSelectRecipeMenu={setSelectRecipeMenu}
        setInsufficientMenu={setInsufficientMenu}
      />
    </div>
  )
}

export default Stove01
