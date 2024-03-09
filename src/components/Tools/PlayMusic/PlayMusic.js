import React, {useState, useEffect} from 'react'
import backgroundMusic from './../../../assets/audios/background.mp3'
import harvest from './../../../assets/audios/harvest.mp3'
import plant from './../../../assets/audios/plant.mp3'
import ReactAudioPlayer from 'react-audio-player'

const PlayMusic = () => {
    useEffect(()=>{
    }, [])
    
    return (
        <>
            <ReactAudioPlayer id="audio-player" src={backgroundMusic} autoPlay controls loop />
            <ReactAudioPlayer id="harvest-player" src={harvest} controls />
            <ReactAudioPlayer id="plant-player" src={plant} controls />
        </>
    )
}
export default PlayMusic