import React from "react";
import { useSelector } from "react-redux";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadImage/LazyLoadImage";
import avatar from '../../../assets/avatar.png'
import './cast.scss'


const Cast = ({ data, loading }) => {
    const { url } = useSelector((state) => state.home);

    
    return (
        <div className=" relative mb-[50px]">
            <ContentWrapper>
                <div className="text-2xl text-white mb-6">Top Cast</div>
                {!loading ? (
                    <div className=" flex gap-5 overflow-y-hidden -mx-5 px-5 md:p-0 md:m-0">
                        {data?.map((item)=> {
                            const imgUrl = item.profile_path ? url.profile + item.profile_path : avatar;
                            return (
                                <div className="text-center text-white">
                                    <div className=" w-[125px] h-[125px] rounded-full overflow-hidden mb-4 md:w-[175px] md:h-[175px] md:mb-6 profileImg ">
                                        <Img src={imgUrl} />
                                    </div>
                                    <div className=" text-sm md:text-lg leading-5 md:leading-6 font-semibold">{item.name}</div>
                                    <div className="text-sm md:text-[16px] leading-5 md:leading-6 opacity-50">{item.character}</div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <p></p>
                )}
            </ContentWrapper>
        </div>
    );
};

export default Cast;
