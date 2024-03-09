import { useState, useEffect } from 'react';
import './SwapButton.scss';
import swapButton from './../../../assets/swap_button.png';

function SwapButton(){
  const handleClick = () => {
    window.open(`https://quickswap.exchange/#/swap?outputCurrency=0x6d4e2536e17e4Bd27200aBe4bD7429f104Bf1ca0`, `_blank`)
  }

  return (
    <div className="swapButton">
      <img className="swapButton-img" src={swapButton} onClick={handleClick} />
    </div>
  );
}

export default SwapButton;
