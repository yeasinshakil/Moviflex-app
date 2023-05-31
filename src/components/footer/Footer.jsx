import React from "react";
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedin,
} from "react-icons/fa";
import ContentWrapper from "../contentWrapper/ContentWrapper";



// import "./footer.scss";

const Footer = () => {
    return (
        <footer className=" bg-black3 py-[50px] text-white relative ">
            <ContentWrapper>
                <div className=" flex items-center flex-col">
                    <ul className=" list-none flex items-center justify-center gap-[15px] mb-[20px] md:mb-[30px] md:gap-[30px] ">
                        <li className=" cursor-pointer text-[12px] transition duration-300 md:text-[16px] hover:text-pink1 ">Terms Of Use</li>
                        <li className=" cursor-pointer text-[12px] transition duration-300 md:text-[16px] hover:text-pink1 ">Privacy-Policy</li>
                        <li className=" cursor-pointer text-[12px] transition duration-300 md:text-[16px] hover:text-pink1 ">About</li>
                        <li className=" cursor-pointer text-[12px] transition duration-300 md:text-[16px] hover:text-pink1 ">Blog</li>
                        <li className=" cursor-pointer text-[12px] transition duration-300 md:text-[16px] hover:text-pink1 ">FAQ</li>
                    </ul>
                    <div className=" text-[12px] leading-5 opacity-50 text-center max-w-[800px] mb-5 md:text-sm md:mb-[30px] ">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                        do eiusmod tempor incididunt ut labore et dolore magna
                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Duis aute irure dolor in reprehenderit in voluptate velit
                        esse cillum dolore eu fugiat nulla pariatur.
                    </div>
                    <div className=" flex items-center justify-center gap-[10px]">
                        <span className="w-[50px] h-[50px] rounded-full bg-black1 flex items-center justify-center cursor-pointer transition-all duration-300 hover:shadow-pink1 shadow-sm hover:text-pink1 ">
                            <FaFacebookF />
                        </span>
                        <span className="w-[50px] h-[50px] rounded-full bg-black1 flex items-center justify-center cursor-pointer transition-all duration-300 hover:shadow-pink1 shadow-sm hover:text-pink1 ">
                            <FaInstagram />
                        </span>
                        <span className="w-[50px] h-[50px] rounded-full bg-black1 flex items-center justify-center cursor-pointer transition-all duration-300 hover:shadow-pink1 shadow-sm hover:text-pink1 ">
                            <FaTwitter />
                        </span>
                        <span className="w-[50px] h-[50px] rounded-full bg-black1 flex items-center justify-center cursor-pointer transition-all duration-300 hover:shadow-pink1 shadow-sm hover:text-pink1 ">
                            <FaLinkedin />
                        </span>
                    </div>
                </div>
            </ContentWrapper>
        </footer>
    );
};

export default Footer