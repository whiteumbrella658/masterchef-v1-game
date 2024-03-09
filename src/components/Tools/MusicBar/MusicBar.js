import { useState, useEffect } from 'react'
import './MusicBar.scss'
import bar from './../../../assets/bar.png'
import play from './../../../assets/play.png'
import pause from './../../../assets/pause.png'
import volume_up from './../../../assets/volume_up.png'
import volume_down from './../../../assets/volume_down.png'
import useGameStore from './../../../GameStore'

function MusicBar(){
  const {playing, setPlaying, volume, volumeUp, volumeDown} = useGameStore()

  const handleClickPlaying = () => {
    setPlaying()
  }

  const handleClickVolumeUp = (e) => {
    if(e.target.classList.contains('active')){
      volumeUp()
    }
  }

  const handleClickVolumeDown = (e) => {
    if(e.target.classList.contains('active')){
      volumeDown()
    }
  }

  useEffect(()=>{
    document.getElementById("audio-player").volume = volume
    document.getElementById("harvest-player").volume = volume
    document.getElementById("plant-player").volume = volume
    console.log(volume)
  }, [volume])

  useEffect(()=>{
    console.log(playing)
    if(playing){
      document.getElementById("audio-player").play()
    }else{
      document.getElementById("audio-player").pause()
    }
  }, [playing])

  return (
    <div className="musicBar">
      <img className="musicBar-img" src={bar} />
      <img className="play" style={{display: !playing? 'block' : 'none'}} src={play} onClick={handleClickPlaying} />
      <img className="pause" style={{display: playing? 'block' : 'none'}} src={pause} onClick={handleClickPlaying} />
      <img className={`volume-up ${volume > 0.9 ? 'inactive' : 'active' }`} src={volume_up} onClick={handleClickVolumeUp} />
      <img className={`volume-down ${volume < 0.1 ? 'inactive' : 'active' }`} src={volume_down} onClick={handleClickVolumeDown} />
    </div>
  );
}

export default MusicBar;
