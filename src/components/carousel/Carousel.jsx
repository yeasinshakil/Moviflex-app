import React from 'react'
import ContentWrapper from '../contentWrapper/ContentWrapper'
import PosterFallback from '../../assets/no-poster.png'
import Img from '../lazyLoadImage/LazyLoadImage'
import dayjs from 'dayjs'
import CircleRationg from '../circleRating/CircleRationg'

function Carousel({ data }) {
    console.log(data)
    const url = 'https://api.themoviedb.org/3/all/447277'
    return (
        <div className=' mb-[50px]'>
            <ContentWrapper>
                <div className=' relative'>
                    <div className=' flex gap-[10px] overflow-y-hidden mx-[-20px] px-[20px] md:gap-[20px] md:overflow-hidden md:m-0 md:p-0 '>
                        {
                            data?.map((item, i) => {
                                const posterUrl = item.poster_path ? url + item.poster_path : PosterFallback;
                                console.log(posterUrl)

                                return (
                                    <div key={i}>
                                        <div>
                                            <Img src={posterUrl} />
                                            <CircleRationg rating={item.vote_average.toFixed(1)} />
                                            
                                        </div>
                                        <div className="textBlock">
                                        <span className="title">
                                            {item.title || item.name}
                                        </span>
                                        <span className="date">
                                            {dayjs(item.release_date || item.first_air_date).format("MMM D, YYYY")}
                                        </span>
                                    </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </ContentWrapper>
        </div>
    )
}

export default Carousel