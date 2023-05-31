import React, { useEffect, useState } from 'react';
import './header.scss'
import logo from '../../assets/moviflex logo.png';
import { HiOutlineSearch } from 'react-icons/hi';
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import ContentWrapper from '../contentWrapper/ContentWrapper';
import { useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
    const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(()=> {
    window.scrollTo(0, 0)
  }, [location])

  const openSearch = () => {
    setMobileMenu(false)
    setShowSearch(true)
  }
  const openMobileMenu = () => {
    setMobileMenu(true)
    setShowSearch(false)
  }
  const controlNavbar = () => {
    // console.log(window.scrollY)
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setLastScrollY('hide')
      } else {
        setShow('show')
      }
      setShow('show')
    } else{
      setShow('top')
    }
    setLastScrollY(window.scrollY)
  }

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar)
    return () => {
      window.removeEventListener('scroll', controlNavbar)
    }
  }, [lastScrollY])

  const searchQueryHandler = (event) => {
    if (event.key === 'Enter' && query.length > 0) {
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(false)
      }, 1000)
    }
  }

  const navigationHandler = (type) => {
    if (type === 'movie') {
      navigate('/explore/movie')
      setMobileMenu(false)
    } else {
      navigate('/explore/tv')
      setMobileMenu(false)
    }
  }

    return (
        <div className={` h-[60px] w-full fixed flex items-center translate-y-0 z-20 backdrop-blur-sm  ${mobileMenu ? ' bg-black3' : 'bg-black/20'} ${show==='top' && ' backdrop-blur-sm'} ${show==='show' && 'bg-black3'} ${show==='hide' && ' -translate-y-[60px]'} `}>
            <ContentWrapper>
                <div className=' flex items-center justify-between'>

                    <div>
                        <img src={logo} alt="" className=' h-[50px] cursor-pointer' onClick={()=> navigate('/')} />
                    </div>
                        <div className={` text-white sm:flex gap-6  ${mobileMenu ? ' flex flex-col absolute top-[60px] left-0 bg-black3 w-full py-[20px] px-0 border-t-white/10 animate-mobileMenu': 'hidden'}`}>
                        <span className={`cursor-pointer ${mobileMenu? ' text-[20px] w-full h-auto py-[15px]  px-[20px] m-0 flex flex-col items-start' : ''} hover:text-pink1`}>Movies</span>
                        <span className={`cursor-pointer ${mobileMenu? 'text-[20px] w-full h-auto py-[15px]  px-[20px] m-0 flex flex-col items-start' : ''} hover:text-pink1`}>Tv Shows</span>
                        <span className={`cursor-pointer ${mobileMenu? 'text-[20px] w-full h-auto py-[15px]  px-[20px] m-0  hidden' : ''} hover:text-pink1`}>
                            <HiOutlineSearch />
                        </span>
                    </div>
                    <div className=' text-white sm:hidden'>
                        {mobileMenu ? (<VscChromeClose onClick={()=> setMobileMenu(false)}/>) : (<SlMenu onClick={()=> setMobileMenu(true)}/>)}
                    </div>
                </div>
            </ContentWrapper>


        </div>
    );
};

export default Header;