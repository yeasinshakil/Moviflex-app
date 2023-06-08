import React, { useState } from "react";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadImage/LazyLoadImage";
import { PlayIcon } from "../detailsBanner/PlayBtn";
import VideoPopup from "../../../components/videoPopup/VideoPopup";

import './videoSection.scss'

const VideosSection = ({ data, loading }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);
   

    const loadingSkeleton = () => {
        return (
            <div className=" w-[150px] flex-shrink-0 md:w-[25%]">
                <div className=" w-full aspect-video rounded-xl mb-2.5 skeleton"></div>
                <div className=" h-[20px] w-full rounded-lg mb-2.5 skeleton"></div>
                <div className="h-[20px] w-[75%] rounded-lg skeleton"></div>
            </div>
        );
    };

    return (
        <div className="relative mb-12">
            <ContentWrapper>
                <div className=" text-2xl text-white mb-6">Official Videos</div>
                {!loading ? (
                    <div className="flex gap-2 overflow-x-auto -mx-5 px-5 md:gap-5 m-0 p-0">
                        {data?.results.map((video)=> (
                            <div 
                            key={video.id}
                            onClick={()=> {
                                setShow(true)
                                setVideoId(video.key)
                            }}
                            className=" w-[150px] flex-shrink-0 md:w-[25%] cursor-pointer videoItem">
                                <div className=" mb-4 relative videoThumbnail">
                                    <Img  src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`} />
                                    <PlayIcon  />
                                </div>
                                <div className="text-white text-sm leading-5 md:text-base md:leading-6">
                                    {video.name}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className=' flex gap-2.5 overflow-y-hidden -mx-5 px-5 md:gap-5 md:overflow-hidden md:p-0 md:m-0 '>
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                    </div>
                )}
            </ContentWrapper>
            <VideoPopup
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
            />
        </div>
    );
};

export default VideosSection;
