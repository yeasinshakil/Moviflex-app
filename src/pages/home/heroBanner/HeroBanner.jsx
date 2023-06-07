import React, { useEffect, useState } from 'react'
import './heroBanner.scss'
// import batmanPoster from '../../../assets/batman poster.png'
import Img from '../../../components/lazyLoadImage/LazyLoadImage'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import { useNavigate } from 'react-router-dom'
import useFetch from '../../../components/hooks/useFetch'
import { useSelector } from 'react-redux'

function HeroBanner() {
    const [background, setBackground] = useState('');
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const { data, loading } = useFetch('/movie/upcoming');

    const { url } = useSelector(state => state.home)
    useEffect(() => {
        const bg = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
        setBackground(bg)
    }, [data])
    const searchQueryHandler = (event) => {
        if (event.key === 'Enter' && query.length > 0) {
            navigate(`/search/${query}`)
        }
    }
    return (
        <div className=' w-full h-[450px] md:h-[700px] bg-black1 flex items-center relative'>
            {!loading && <div className=' w-full h-full absolute top-0 left-0 opacity-50 overflow-hidden'>
                <Img src={background} alt="" />
            </div>}
            <div className=' w-full h-[250px] absolute bottom-0 left-0 bg-gradient-to-b from-transparent to-black1'></div>
            <ContentWrapper>
                <div className=' flex items-center flex-col text-center text-white max-w-[800px] my-0 mx-auto relative'>
                    <span className=' text-[50px] md:text-[90px] md:mb-0 font-bold mb-[10px]'>Welcome.</span>
                    <span className=' text-[18px] mb-[40px] font-medium md:text-[24px]'>Millions of Movies, Tv shows and lot's of people to discover. Explore Now</span>
                    <div className=' w-full flex items-center'>
                        <input
                            type="text"
                            placeholder='Search for a movie or tv show.....'
                            

                            className=' w-5/6 h-[50px] bg-white border-0 outline-none rounded-l-[30px] py-0 px-[20px] text-[14px] md:w-4.5/6 md:h-[60px] md:text-[20px] md:px-[30px] text-black1'
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyUp={searchQueryHandler} />

                        <button
                            className=' w-[100px] md:w-[150px] text-[16px] md:text-[18px] text-white h-[50px] md:h-[60px] outline-none border-none cursor-pointer rounded-r-[30px] bg-gradient-to-r from-yellow-500 to-pink1 hover:bg-gradient-to-l transition duration-0 hover:transition-all hover:duration-1000'
                            onClick={() => {
                                if (query.length > 0) {
                                    navigate(`/search/${query}`)
                                }
                            }}
                        >Search</button>
                    </div>
                </div>
            </ContentWrapper>
        </div>
    )
}

export default HeroBanner