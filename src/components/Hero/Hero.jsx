import React, { useContext, useRef } from 'react'
import "./Hero.css"
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/AppContext'

const Hero = () => {

  const {  searchFilter, setSearchFilter, isSearched, setIsSearched } = useContext(StoreContext)

  const titleRef = useRef(null)
  const locationRef = useRef(null)

  const onSearchHandler = (event) => {
    event.preventDefault()
    setSearchFilter({
      title:titleRef.current.value,
      location:locationRef.current.value
      });
      setIsSearched(true)
  }
  
  return (
    <form className='hero-section'>
      <div className='hero-search-left'>
        <input 
        placeholder='Search by category' 
        className='hero-search-left-input' 
        type="text" 
        ref={titleRef}
        />
        <img className='hero-search-left-img' src={ assets.list} alt="lines" />
      </div>
      <div className='hero-search-right'>
        <input 
        placeholder='Search by location' 
        className='hero-search-right-input' 
        type="text" 
        ref={locationRef}
        />
        <img className='hero-search-right-img' src={ assets.pin } alt="pin" />
      </div>
      <div>
        <button onClick={onSearchHandler} className='search-right-btn' type='submit'>Search</button>
      </div>
    </form>
  )
}

export default Hero
