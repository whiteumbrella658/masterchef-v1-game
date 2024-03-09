import { useState, useEffect } from 'react'
import './Stove03.scss'
import stove03 from './../../../assets/equips/stove-3-3.png'
import Sarten from '../Sarten'

function Stove03({
  level,
  selFood,
  setSelectRecipeMenu,
  setInsufficientMenu,
}) {
  return (
    <div className="stove03">
      <img className="stove03-img" src={stove03} />
      {level > 2 && (
        <>
          <Sarten
            stoveOrder="03"
            order={'01'}
            landIndex={8}
            selFood={selFood}
            setSelectRecipeMenu={setSelectRecipeMenu}
            setInsufficientMenu={setInsufficientMenu}
          />
          <Sarten
            stoveOrder="03"
            order={'02'}
            landIndex={9}
            selFood={selFood}
            setSelectRecipeMenu={setSelectRecipeMenu}
            setInsufficientMenu={setInsufficientMenu}
          />
          <Sarten
            stoveOrder="03"
            order={'03'}
            landIndex={10}
            selFood={selFood}
            setSelectRecipeMenu={setSelectRecipeMenu}
            setInsufficientMenu={setInsufficientMenu}
          />
        </>
      )}
    </div>
  )
}

export default Stove03
