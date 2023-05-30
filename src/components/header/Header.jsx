import React, { useState } from 'react';
import './header.scss'
import logo from '../../assets/moviflex logo.png';
import { HiOutlineSearch } from 'react-icons/hi';
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import ContentWrapper from '../contentWrapper/ContentWrapper';

const Header = () => {
    const [mobileMenu, setMobileMenu] = useState(false)
    return (
        <div className={` h-[60px] w-full fixed flex items-center translate-y-0 z-20 backdrop-blur-sm bg-black/20  ${mobileMenu ? ' bg-black3' : ''}`}>
            <ContentWrapper>
                <div className=' flex items-center justify-between'>

                    <div>
                        <img src={logo} alt="" className=' h-[50px] cursor-pointer' />
                    </div>
                        <div className={` text-white sm:flex gap-6  ${mobileMenu ? ' flex flex-col absolute top-[60px] left-0 bg-black3 w-full py-[20px] px-0 border-t-white/10 animate-mobileMenu': 'hidden'}`}>
                        <span className={`cursor-pointer ${mobileMenu? ' text-[20px] w-full h-auto py-[15px]  px-[20px] m-0 flex flex-col items-start' : ''}`}>Movies</span>
                        <span className={`cursor-pointer ${mobileMenu? 'text-[20px] w-full h-auto py-[15px]  px-[20px] m-0 flex flex-col items-start' : ''}`}>Tv Shows</span>
                        <span className={`cursor-pointer ${mobileMenu? 'text-[20px] w-full h-auto py-[15px]  px-[20px] m-0  hidden' : ''}`}>
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