import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import useFetch from '../../../components/hooks/useFetch';
import { useSelector } from 'react-redux';
import Img from '../../../components/lazyLoadImage/LazyLoadImage';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import Genres from '../../../components/genres/Genres';
import CircleRating from '../../../components/circleRating/CircleRating';
import {PlayIcon} from './PlayBtn'
import dayjs from 'dayjs';
import VideoPopup from '../../../components/videoPopup/VideoPopup';
import './detailsBanner.scss'

function DetailsBanner({ video, crew }) {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);
    const { mediaType, id } = useParams();
    const { data, loading } = useFetch(`/${mediaType}/${id}`)
    const { url } = useSelector(state => state.home)

    const _genres = data?.genres?.map((g) => g.id)
    const director = crew?.filter((f)=> f.job==='Director');
    const writer = crew?.filter((f)=> f.job==='Screenplay' || f.job==='Writer' || f.job==='Story')

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };
  return (
    <div className=" w-full bg-black1 pt-[100px] mb-[50px] md:mb-0 md:pt-[120px] min-h-[700px] ">
            {!loading ? (
                <>
                    {!!data && (
                        <React.Fragment>
                            <div className=" w-full h-full absolute top-0 left-0 opacity-10 overflow-hidden">
                                <Img src={url.backdrop + data.backdrop_path} />
                            </div>
                            <div className=" w-full h-[250px] bg-gradient-to-b from-transparent to-black1 absolute bottom-0 left-0 "></div>
                            <ContentWrapper>
                                <div className="flex relative flex-col gap-[25px] md:gap-[50px] md:flex-row backdrop-img">

                                    <div className=" flex-shrink-0">
                                        {data.poster_path ? (
                                            <Img className=' w-full block rounded-xl md:max-w-[350px]' src={url.backdrop + data.poster_path} />
                                        ) : (<Img className=' w-full block rounded-xl md:max-w-[350px]' src={PosterFallback} />)}
                                    </div>
                                    <div className=" text-white">
                                        <div className=" text-[28px] leading-10 md:text-[34px] md:leading-[44px]">
                                            {
                                                `${data.title || data.name} (${dayjs(data.release_date || data.first_air_date).format('YYYY')})`
                                            }
                                        </div>
                                        <div className=" text-base leading-6 mb-[15px] italic opacity-50 md:text-xl md:leading-7">
                                            {data.tagline}
                                        </div>
                                        <Genres data={_genres} />
                                        <div className="flex items-center gap-6 mb-6">
                                            <CircleRating rating={data?.vote_average.toFixed(1)} />
                                            <div className=" playbtn" onClick={()=> {
                                                setShow(true)
                                                setVideoId(video.key)
                                            }}>
                                                <PlayIcon/>
                                                <span className=" text ">
                                                    Watch Trailer
                                                </span>
                                            </div>
                                        </div>

                                        <div className=" mb-6">
                                            <div className=" text-2xl mb-3">
                                                Overview
                                            </div>
                                            <div className=" leading-6 md:pr-[100px]">
                                                {data.overview}
                                            </div>
                                        </div>

                                        <div className=" border-b-white/10 py-4 flex">
                                            {data.status && (
                                                <div className=" mr-3 flex flex-nowrap">
                                                    <span className=" mr-3 opacity-50 leading-6 bold">
                                                        status: {" "}
                                                    </span>
                                                    <span className="mr-3 opacity-50 leading-6">
                                                        {data.status}
                                                    </span>
                                                </div>
                                            )}
                                            {data.release_date && (
                                                <div className=" mr-3 flex flex-nowrap">
                                                    <span className="mr-3 opacity-50 leading-6 bold">
                                                        Release Date: {" "}
                                                    </span>
                                                    <span className="mr-3 opacity-50 leading-6">
                                                        {dayjs(data.release_date || data.first_air_date).format("MMM D, YYYY")}
                                                    </span>
                                                </div>
                                            )}
                                            {data.runtime && (
                                                <div className="infoItem">
                                                    <span className="mr-3 opacity-50 leading-6 bold">
                                                        Run Time: {" "}
                                                    </span>
                                                    <span className="mr-3 opacity-50 leading-6">
                                                        {toHoursAndMinutes(data.runtime)}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {
                                            director?.length > 0 && (
                                                <div className="info">
                                                    <span className="mr-3 opacity-50 leading-6 bold">
                                                        Director: {" "}
                                                    </span>
                                                    <span className="mr-3 opacity-50 leading-6">
                                                        {director?.map((d, i)=> (
                                                            <span key={i}>
                                                                {d.name}
                                                                {director?.length -1 !== i && ", "}
                                                            </span>
                                                        ))}
                                                    </span>
                                                </div>
                                            )
                                        }
                                        {
                                            writer?.length > 0 && (
                                                <div className="info">
                                                    <span className="mr-3 opacity-50 leading-6 bold">
                                                        Writer: {" "}
                                                    </span>
                                                    <span className="mr-3 opacity-50 leading-6">
                                                        {writer?.map((w, i)=> (
                                                            <span key={i}>
                                                                {w.name}
                                                                {writer?.length -1 !== i && ", "}
                                                            </span>
                                                        ))}
                                                    </span>
                                                </div>
                                            )
                                        }
                                        {
                                            data?.created_by?.length > 0 && (
                                                <div className="info">
                                                    <span className="mr-3 opacity-50 leading-6 bold">
                                                        Creator: {" "}
                                                    </span>
                                                    <span className="mr-3 opacity-50 leading-6">
                                                        {data?.created_by?.map((w, i)=> (
                                                            <span key={i}>
                                                                {w.name}
                                                                {data?.created_by?.length -1 !== i && ", "}
                                                            </span>
                                                        ))}
                                                    </span>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                                <VideoPopup
                                show={show}
                                setShow={setShow}
                                videoId={videoId}
                                setVideoId={setVideoId}
                                />
                            </ContentWrapper>
                        </React.Fragment>
                    )}
                </>
            ) : (
                <p></p>
            )}
        </div>
  )
}

export default DetailsBanner