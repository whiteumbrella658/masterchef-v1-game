import { useState, useEffect } from 'react'
import logo from './logo.svg'
import './App.css'
import Header from './components/Header'
import GameScene from './views/GameScene/GameScene'
import Footer from './components/Footer'
import Orientation from './components/Tools/Orientation'
import MainMenu from './components/Menus/MainMenu'
import RecipesMenu from './components/Menus/RecipesMenu'
import InventoryMenu from './components/Menus/InventoryMenu'
import RewardCollection from './components/Menus/RewardCollection'
import UpgradeMenu from './components/Menus/UpgradeMenu'
import AlchemyMenu from './components/Menus/AlchemyMenu'
import SavingMenu from './components/Menus/SavingMenu'
import MaxLevelMenu from './components/Menus/MaxLevelMenu'
import SelectRecipeMenu from './components/Menus/SelectRecipeMenu'
import SaveWarningMenu from './components/Menus/SaveWarningMenu'
import InsufficientMenu from './components/Menus/InsufficientMenu'
import ConnectWalletMenu from './components/Menus/ConnectWalletMenu'
import NoWalletMenu from './components/Menus/NoWalletMenu'
import SwitchNetworkMenu from './components/Menus/SwitchNetworkMenu'
import CharityMenu from './components/Menus/CharityMenu'
import LoadingGif from './components/Menus/LoadingGif'
import LoadingMenu from './components/Menus/LoadingMenu'
import ShopMenu from './components/Menus/ShopMenu'
import MaticRewardCollection from './components/Menus/MaticRewardCollection'
import PlayMusic from './components/Tools/PlayMusic'
import useGameStore from './GameStore'

function App() {
  const [orientation, setOrientation] = useState(false)
  const [mainMenu, setMainMenu] = useState(false)
  const [recipesMenu, setRecipesMenu] = useState(false)
  const [inventoryMenu, setInventoryMenu] = useState(false)
  const [rewardCollection, setRewardCollection] = useState(false)
  const [upgradeMenu, setUpgradeMenu] = useState(false)
  const [alchemyMenu, setAlchemyMenu] = useState(false)
  const [savingMenu, setSavingMenu] = useState(false)
  const [maxLevelMenu, setMaxLevelMenu] = useState(false)
  const [selectRecipeMenu, setSelectRecipeMenu] = useState(false)
  const [saveWarningMenu, setSaveWarningMenu] = useState(false)
  const [insufficientMenu, setInsufficientMenu] = useState(false)
  const [connectWalletMenu, setConnectWalletMenu] = useState(true)
  const [noWalletMenu, setNoWalletMenu] = useState(false)
  const [switchNetworkMenu, setSwitchNetworkMenu] = useState(false)
  const [charityMenu, setCharityMenu] = useState(false)
  const [loadingGif, setLoadingGif] = useState(false)
  const [loadingMenu, setLoadingMenu] = useState(false)
  const [shopMenu, setShopMenu] = useState(false)
  const [maticReward, setMaticReward] = useState(false)
  const [selFood, setSelFood] = useState('')
  const { level } = useGameStore()

  useEffect(() => {
    window.screen.orientation.lock('landscape').catch((e) => {
      console.log(e)
    })
    window.addEventListener(
      'resize',
      function () {
        setOrientation(window.innerHeight > window.innerWidth)
      },
      false,
    )
    setOrientation(window.innerHeight > window.innerWidth)

    if (window.ethereum) {
      window.ethereum.on('disconnect', async (error) => {
        console.log(error)
        window.location.reload(false)
      })
    }
  }, [])

  const handleCloseMainMenu = () => {
    setMainMenu(false)
  }

  const handleCloseRecipesMenu = () => {
    setRecipesMenu(false)
  }

  const handleCloseInventoryMenu = () => {
    setInventoryMenu(false)
  }

  const handleCloseRewardCollection = () => {
    setRewardCollection(false)
  }

  const handleCloseUpgradeMenu = () => {
    setUpgradeMenu(false)
  }

  const handleCloseAlchemyMenu = () => {
    setAlchemyMenu(false)
  }

  const handleCloseSavingMenu = () => {
    setSavingMenu(false)
  }

  const handleCloseMaxLevelMenu = () => {
    setMaxLevelMenu(false)
  }

  const handleCloseSelectRecipeMenu = () => {
    setSelectRecipeMenu(false)
  }

  const handleCloseSaveWarningMenu = () => {
    setSaveWarningMenu(false)
  }

  const handleCloseInsufficientMenu = () => {
    setInsufficientMenu(false)
  }

  const handleCloseConnectWalletMenu = () => {
    setConnectWalletMenu(false)
  }

  const handleCloseNoWalletMenu = () => {
    setNoWalletMenu(false)
  }

  const handleCloseSwitchNetworkMenu = () => {
    setSwitchNetworkMenu(false)
  }

  const handleCloseCharityMenu = () => {
    setCharityMenu(false)
  }

  const handleCloseLoadingGif = () => {
    setLoadingGif(false)
  }

  const handleCloseLoadingMenu = () => {
    setLoadingMenu(false)
  }

  const handleCloseShopMenu = () => {
    setShopMenu(false)
  }

  const handleCloseMaticReward = () => {
    setMaticReward(false)
  }

  return (
    <div className="App">
      <Header />
      <GameScene
        setRewardCollection={setRewardCollection}
        setMaticReward={setMaticReward}
        setSavingMenu={setSavingMenu}
        selFood={selFood}
        setSelFood={setSelFood}
        setSelectRecipeMenu={setSelectRecipeMenu}
        setSaveWarningMenu={setSaveWarningMenu}
        setInsufficientMenu={setInsufficientMenu}
        setLoadingMenu={setLoadingMenu}
      />
      <Footer
        setRecipesMenu={setRecipesMenu}
        setInventoryMenu={setInventoryMenu}
        setUpgradeMenu={setUpgradeMenu}
        setMaxLevelMenu={setMaxLevelMenu}
        setAlchemyMenu={setAlchemyMenu}
        setShopMenu={setShopMenu}
        level={level}
      />
      <Orientation show={orientation} />
      <MainMenu show={mainMenu} hideAction={handleCloseMainMenu} />
      <RecipesMenu
        show={recipesMenu}
        hideAction={handleCloseRecipesMenu}
        setSelFood={setSelFood}
        setSelectRecipeMenu={setSelectRecipeMenu}
        level={level}
      />
      <InventoryMenu
        show={inventoryMenu}
        hideAction={handleCloseInventoryMenu}
      />
      <RewardCollection
        show={rewardCollection}
        hideAction={handleCloseRewardCollection}
        setLoadingGif={setLoadingGif}
      />
      <MaticRewardCollection 
        show={maticReward}
        hideAction={handleCloseMaticReward}
        setLoadingGif={setLoadingGif}
      />
      <UpgradeMenu
        show={upgradeMenu}
        hideAction={handleCloseUpgradeMenu}
        setInsufficientMenu={setInsufficientMenu}
        setLoadingGif={setLoadingGif}
        setLoadingMenu={setLoadingMenu}
        setMainMenu={setMainMenu}
      />
      <AlchemyMenu show={alchemyMenu} hideAction={handleCloseAlchemyMenu} />
      <SavingMenu show={savingMenu} hideAction={handleCloseSavingMenu} />
      <MaxLevelMenu show={maxLevelMenu} hideAction={handleCloseMaxLevelMenu} />
      <SelectRecipeMenu
        show={selectRecipeMenu}
        hideAction={handleCloseSelectRecipeMenu}
        setRecipesMenu={setRecipesMenu}
      />
      <SaveWarningMenu
        show={saveWarningMenu}
        hideAction={handleCloseSaveWarningMenu}
      />
      <InsufficientMenu
        show={insufficientMenu}
        hideAction={handleCloseInsufficientMenu}
      />
      <ConnectWalletMenu
        show={connectWalletMenu}
        hideAction={handleCloseConnectWalletMenu}
        setNoWalletMenu={setNoWalletMenu}
        setSwitchNetworkMenu={setSwitchNetworkMenu}
        setLoadingGif={setLoadingGif}
        setCharityMenu={setCharityMenu}
        setLoadingMenu={setLoadingMenu}
        setMainMenu={setMainMenu}
      />
      <NoWalletMenu show={noWalletMenu} hideAction={handleCloseNoWalletMenu} />
      <SwitchNetworkMenu
        show={switchNetworkMenu}
        hideAction={handleCloseSwitchNetworkMenu}
      />
      <CharityMenu
        show={charityMenu}
        hideAction={handleCloseCharityMenu}
        setInsufficientMenu={setInsufficientMenu}
        setLoadingGif={setLoadingGif}
        setLoadingMenu={setLoadingMenu}
        setMainMenu={setMainMenu}
      />
      <ShopMenu
        show={shopMenu}
        hideAction={handleCloseShopMenu}
        setLoadingGif={setLoadingGif}
        setLoadingMenu={setLoadingMenu}
        setInsufficientMenu={setInsufficientMenu}
      />

      <LoadingGif show={loadingGif} hideAction={handleCloseLoadingGif} />
      <LoadingMenu show={loadingMenu} hideAction={handleCloseLoadingMenu} />
      <PlayMusic />
    </div>
  )
}

export default App
