import React, { useRef } from 'react'
import ContentWrapper from '../contentWrapper/ContentWrapper'
import PosterFallback from '../../assets/no-poster.png'
import Img from '../lazyLoadImage/LazyLoadImage'
import dayjs from 'dayjs'
import CircleRating from '../circleRating/CircleRating'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Genres from '../genres/Genres'
import './carousel.scss'
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";

function Carousel({ data, loading, endPoint, title }) {

    const carouselContainer = useRef();
    const { url } = useSelector((state) => state.home);
    const navigate = useNavigate();
    const navigation = (dir) => {
        const container = carouselContainer.current;
        const scrollAmount = dir === 'left' ? (
            container.scrollLeft - (container.offsetWidth + 20)
        ) : (
            container.scrollLeft + (container.offsetWidth + 20)
        )
        container.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        })
    }

    const skItem = () => {
        return (
            <div className=" w-[125px] md:w-[200px] lg:w-[225px] flex-shrink-0">
                <div className=" w-full rounded-xl aspect-[1/1.5] mb-7 skeleton"></div>
                <div className="flex flex-col">
                    <span className="w-full h-5 mb-2.5 skeleton"></span>
                    <span className=" w-[75%] h-5 skeleton"></span>
                </div>
            </div>
        )
    }
    return (
        <div className=' mb-[50px]'>
            <ContentWrapper>
                <div className=' relative' >
                    {title &&
                        <div className="text-[24px] text-white mb-5 font-medium">{title}</div>
                    }
                    <BsFillArrowLeftCircleFill
                        className='carouselLeftNav text-[30px] text-black1 absolute top-[44%] left-[30px] -translate-y-[50%] cursor-pointer opacity-50 z-10 hidden md:block hover:opacity-80 '
                        onClick={() => navigation('left')}
                    />
                    <BsFillArrowRightCircleFill
                        className='carouselRighttNav text-[30px] text-black1 absolute top-[44%] right-[30px] -translate-y-[50%] cursor-pointer opacity-50 z-10 hidden md:block hover:opacity-80'
                        onClick={() => navigation('right')}
                    />
                    {!loading ? (

                        <div className=' flex gap-[10px] overflow-y-hidden mx-[-20px] px-[20px] md:gap-[20px] md:overflow-hidden md:m-0 md:p-0 ' ref={carouselContainer}>
                            {data?.map((item) => {
                                const posterUrl = item.poster_path ? url.poster + item.poster_path : PosterFallback;
                                return (
                                    <div
                                        key={item.id}
                                        className="w-[125px] cursor-pointer lg:w-[calc(20%-16px)] md:w-[calc(25%-15px)] flex-shrink-0" onClick={() => navigate(
                                            `/${item.media_type || endPoint}/${item.id
                                            }`
                                        )}>
                                        <div className="relative w-full aspect-[1/1.5] bg-cover bg-center mb-[30px] flex items-end justify-between p-[10px] posterBlock">
                                            <Img src={posterUrl} />
                                            <CircleRating rating={item.vote_average.toFixed(1)} />
                                            <Genres data={item.genre_ids.slice(0, 2)} />
                                        </div>
                                        <div className="text-white flex flex-col">
                                            <span className="text-[16px] mb-[10px] leading-6 md:text-[20px] truncate hover:text-clip">
                                                {item.title || item.name}
                                            </span>
                                            <span className="text-[14px] opacity-50">
                                                {dayjs(item.release_date || item.first_air_date).format("MMM D, YYYY")}
                                            </span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                    ) : (
                        <div className=' flex gap-2.5 overflow-y-hidden -mx-5 px-5 md:gap-5 md:overflow-hidden md:p-0 md:m-0 '>
                            {skItem()}
                            {skItem()}
                            {skItem()}
                            {skItem()}
                            {skItem()}
                            {skItem()}
                            
                        </div>
                    )}
                </div>
            </ContentWrapper>
        </div>
    )
}

export default Carousel