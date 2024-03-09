import React from 'react'
import { ethers } from 'ethers'
import ADDRESSES from './../constants/ADDRESSES.json'

export const connectWallet = async () => {
  const chainId = ADDRESSES.CHAINID

  if (window.ethereum) {
    try {
      const currentChain = await window.ethereum.request({
        method: 'eth_chainId',
      })
      const addressArr = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })

      if (parseInt(currentChain, 16) == chainId) {
        return { event: 'connected', response: addressArr[0] }
      } else {
        console.log(currentChain, chainId)
        console.log('plz switch your network!')
        return { event: 'Wrong Chain', response: currentChain }
      }
    } catch (err) {
      console.log(err.message)
    }
  } else {
    console.log('plz install metamask on your browser')
    return { event: 'No Wallet' }
  }
}

export const getBalance = async () => {
  console.log('Getting Eth balance...')
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  let result = await signer.getBalance()
  result = parseFloat(ethers.utils.formatUnits(result))

  return result
}

export const getProvider = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  
  return {provider, signer}
}

export const getMasterChefContract = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  console.log('MAsterChef SC => ', ADDRESSES.MASTERCHEF_ADDRESS)
  const contractABI = require('./../abis/MasterChef.json')
  const contract = new ethers.Contract(
    ADDRESSES.MASTERCHEF_ADDRESS,
    contractABI,
    signer,
  )
  return contract
}

export const getMSCHContract = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  console.log('MSCH SC => ', ADDRESSES.TOKEN_ADDRESS)
  const contractABI = require('./../abis/MSCH.json')
  const contract = new ethers.Contract(
    ADDRESSES.TOKEN_ADDRESS,
    contractABI,
    signer,
    )
  return contract
}

export const getERCITEMContracts = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  const contractABI = require('./../abis/ERCITEM.json')
  const fridgeContract = new ethers.Contract(
    ADDRESSES.FRIDGE_ADDRESS,
    contractABI,
    signer,
    )
  const ladleContract = new ethers.Contract(
    ADDRESSES.LADLE_ADDRESS,
    contractABI,
    signer,
    )
  const kettleContract = new ethers.Contract(
    ADDRESSES.KETTLE_ADDRESS,
    contractABI,
    signer,
  )
  const mixerContract = new ethers.Contract(
    ADDRESSES.MIXER_ADDRESS,
    contractABI,
    signer,
  )  
  const ovenContract = new ethers.Contract(
    ADDRESSES.OVEN_ADDRESS,
    contractABI,
    signer,
  )

  return {fridgeContract, ladleContract, kettleContract, mixerContract, ovenContract} 
}

export const checkOwnerChef = async (walletAddress) => {
  const contract = getMasterChefContract()
  console.log('Checking the chef state of the owner ...')
  const chef = await contract.getLand(walletAddress)
  return chef
}

export const getMSCHBalance = async (walletAddress) => {
  const contract = getMSCHContract()
  console.log('Getting MSCH Token balance ...', ADDRESSES.TOKEN_ADDRESS)
  console.log('Token smart contracts =>', contract)
  let response = await contract.balanceOf(walletAddress)
  response = parseFloat(ethers.utils.formatUnits(response))
  console.log('MSCH Token balance ...', response)

  return response
}

export const getCurrentGameState = async (walletAddress) => {
  const mschBalanceF = await getMSCHBalance(walletAddress)
  const maticBalanceF = await getBalance()
  const totalSupplyF = await getTotalSupply(walletAddress)
  const marketRateF = await getMarketRate(totalSupplyF)

  return { mschBalanceF, maticBalanceF, totalSupplyF, marketRateF }
}

export const getTotalSupply = async (walletAddress) => {
  const contract = getMSCHContract()
  console.log('Getting total supply of MSCH token ...', ADDRESSES.TOKEN_ADDRESS)
  let response = await contract.totalSupply()
  response = parseFloat(ethers.utils.formatUnits(response))
  console.log('MSCH Token Current TotalSupply', response)

  return response
}

export const getNFTsState = async (walletAddress) => {
  const contract = getMasterChefContract()
  const response = await contract.getNFTsState()
  const tx_fridge = response[0].toNumber()
  const tx_ladle = response[1].toNumber()
  const tx_kettle = response[2].toNumber()
  const tx_mixer = response[3].toNumber()
  const tx_oven = response[4].toNumber()
  console.log(tx_fridge, tx_ladle, tx_kettle, tx_mixer, tx_oven)
  
  return {tx_fridge, tx_ladle, tx_kettle, tx_mixer, tx_oven}
}

export const saveGameState = async (events) =>{
  const {provider, signer} = getProvider()
  console.log(events)
  const contract = getMasterChefContract({gasPrice: 100000000000})
  try{
    const tx = await contract.sync(events)
    await tx.wait()
  }catch(err){
    console.log(err)
  }
}

export const getMarketRate = (totalSupply) => {
  let rate = 1
  if(totalSupply < 500000){
    rate = 1
  } else if(totalSupply < 1000000){
    rate = 2
  } else if(totalSupply < 5000000){
    rate = 4
  } else if(totalSupply < 10000000){
    rate = 8
  } else{
    rate = 16
  }
  console.log('Current Market Rate is ...', rate)

  return rate
}

export const approveMSCHTransfer = async (address, amount) => {
  const msch = getMSCHContract()
  console.log(msch)
  console.log('Requsting MSCH Token Approve for levelup ...')
  console.log(ethers.utils.parseEther(amount.toString()))
  const msch_response = await msch.approve(address, ethers.utils.parseEther(amount.toString()),{gasPrice: 100000000000})
  await msch_response.wait()
  console.log('MSCH Approved')
} 

export const getBlockTimestamp = async () => {
  const contract = getMasterChefContract()
  let response = await contract.getBlockTimestamp()
  console.log(response)
  response = response.toNumber()

  return response
}

export const getLastPoints = async (walletAddress) => {
  const contract = getMasterChefContract()
  console.log('Getting last points for Sync, Matic Reward, Msch Reward ...', walletAddress)
  let lastSyncF = await contract.lastSyncedAt(walletAddress)
  let lastMaticF = await contract.lastMaticRewardsOpenedAt(walletAddress)
  let lastMschF = await contract.lastMschRewardsOpenedAt(walletAddress)

  lastSyncF = lastSyncF.toNumber()
  lastMaticF = lastMaticF.toNumber()
  lastMschF = lastMschF.toNumber()
  console.log(lastSyncF, lastMaticF, lastMschF)

  return {lastSyncF, lastMaticF, lastMschF}
}

export const getLastSync = async (walletAddress) => {
  const contract = getMasterChefContract()
  console.log('Getting last point for Sync ...', walletAddress)
  let lastSyncF = await contract.lastSyncedAt(walletAddress)

  lastSyncF = lastSyncF.toNumber()
  console.log(lastSyncF)

  return lastSyncF
}

export const getLastMatic = async (walletAddress) => {
  const contract = getMasterChefContract()
  console.log('Getting last point for Matic Reward ...', walletAddress)
  let lastMaticF = await contract.lastMaticRewardsOpenedAt(walletAddress)

  lastMaticF = lastMaticF.toNumber()
  console.log(lastMaticF)

  return lastMaticF
}

export const getLastMsch = async (walletAddress) => {
  const contract = getMasterChefContract()
  console.log('Getting last point for Msch Reward ...', walletAddress)
  let lastMschF = await contract.lastMschRewardsOpenedAt(walletAddress)

  lastMschF = lastMschF.toNumber()
  console.log(lastMschF)

  return lastMschF
}

export const getNFTsCounts = async () => {
  const {fridgeContract, ladleContract, kettleContract, mixerContract, ovenContract} = getERCITEMContracts()
  const fridgeCountF = await fridgeContract.totalSupply()
  const ladleCountF = await ladleContract.totalSupply()
  const kettleCountF = await kettleContract.totalSupply()
  const mixerCountF = await mixerContract.totalSupply()
  const ovenCountF = await ovenContract.totalSupply()

  return {fridgeCountF, ladleCountF, kettleCountF, mixerCountF, ovenCountF}
}