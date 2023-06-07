import React from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import './movieCard.scss'

import PosterFallback from "../../assets/no-poster.png";
import Img from "../lazyLoadImage/LazyLoadImage";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";

const MovieCard = ({ data, fromSearch, mediaType }) => {
    const { url } = useSelector((state) => state.home);
    const navigate = useNavigate();
    const posterUrl = data.poster_path
        ? url.poster + data.poster_path
        : PosterFallback;
    return (
        <div
            className=" w-[calc(50%-5px)] mb-6 cursor-pointer flex-shrink-0 md:w-[calc(25%-16px)] lg:w-[calc(20%-16px)] "
            onClick={() =>
                navigate(`/${data.media_type || mediaType}/${data.id}`)
            }
        >
            <div className=" relative w-full aspect-[1/1.5] bg-cover bg-center mb-7 flex items-end justify-between p-2 transition-all ease-in duration-500 hover:opacity-50 posterBlock">
                <Img className="posterImg" src={posterUrl} />
                {/* {!fromSearch && ( */}
                    <React.Fragment>
                        <CircleRating rating={data.vote_average.toFixed(1)} />
                        <Genres data={data.genre_ids.slice(0, 2)} />
                    </React.Fragment>
                {/* )} */}
            </div>
            <div className=" text-white flex flex-col">
                <span className=" text-base mb-2 leading-6 truncate text-ellipsis md:text-xl">{data.title || data.name}</span>
                <span className=" text-sm opacity-50">
                    {dayjs(data.release_date).format("MMM D, YYYY")}
                </span>
            </div>
        </div>
    );
};

export default MovieCard;