import create from 'zustand'
import produce from 'immer'
const useGameStore = create((set) => ({
    walletAddress: '',
    chef: [],
    level: 1,
    maticBalance: 0,
    mschBalance: 0,
    totalSupply: 0,
    marketRate: 0,
    hasFridge: false,
    hasLadle: false,
    hasKettle: false,
    hasMixer: false,
    hasOven: false,
    events: [],
    layouts: {
        "01": {
          "01": '',
          "02": '',
          "03": '',
          "04": '',
          "05": '',
        },
        "02": {
          "01": '',
          "02": '',
          "03": '',
        },
        "03": {
          "01": '',
          "02": '',
          "03": '',
        },
        "04": {
          "01": '',
          "02": '',
          "03": '',
        },
        "05": {
          "01": '',
          "02": '',
          "03": '',
        },
      },
    lastSync: 0,
    lastMatic: 0,
    lastMsch: 0,
   
    fridgeCount: 0,
    ladleCount: 0,
    kettleCount: 0,
    mixerCount: 0,
    ovenCount: 0,
    
    volume: 1,
    playing: false,

    setChef: (value) => {set({chef: value})},
    setWalletAddress: (value) => {set({walletAddress: value})},
    setLevel: (value) => {set({level: value})},
    setMaticBalance: (value) => {set({maticBalance: value})},
    setMschBalance: (value) => {set({mschBalance: value})},
    setTotalSupply: (value) => {set({totalSupply: value})},
    setMarketRate: (value) => {set({marketRate: value})},
    
    setHasFridge: (value) => {set({hasFridge: value})},
    setHasLadle: (value) => {set({hasLadle: value})},
    setHasKettle: (value) => {set({hasKettle: value})},
    setHasMixer: (value) => {set({hasMixer: value})},
    setHasOven: (value) => {set({hasOven: value})},

    plus: (value) => set((state) => ({ mschBalance: state.mschBalance + value})),
    minus: (value) => set((state) => ({ mschBalance: state.mschBalance - value})),

    attachEvent: (value) =>  set(produce(state => {
        state.events.push(value);
    })),
    resetEvents: () => {set({events: []})},

    setLayouts: (stove, sarten, recipe) => set(produce(state => {
        state.layouts[stove][sarten] = recipe
    })),

    setLastSync: (value) => {set({lastSync: value})},
    setLastMatic: (value) => {set({lastMatic: value})},
    setLastMsch: (value) => {set({lastMsch: value})},

    setFridgeCount: (value) => {set({fridgeCount: value})},
    setLadleCount: (value) => {set({ladleCount: value})},
    setKettleCount: (value) => {set({kettleCount: value})},
    setMixerCount: (value) => {set({mixerCount: value})},
    setOvenCount: (value) => {set({ovenCount: value})},

    volumeUp: () => set((state) => ({volume: state.volume < 1 ? Math.round( (state.volume + 0.1) * 10 ) / 10 : state.volume})),
    volumeDown: () => set((state) => ({volume: state.volume > 0 ? Math.round( (state.volume - 0.1) * 10 ) / 10 : state.volume})),
    setPlaying: () => set((state) => ({playing: !state.playing}))
}))

export default useGameStore