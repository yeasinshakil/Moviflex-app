import React, { useState } from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import SwitchTab from '../../../components/switchTab/SwitchTab';
import Carousel from '../../../components/carousel/Carousel';
import useFetch from '../../../components/hooks/useFetch';


function TopRated() {
    const [endPoint, setEndPoint] = useState('movie');
    const { data, loading } = useFetch(`/${endPoint}/top_rated`)
    const onTabChange = (tab) => {
        setEndPoint(tab === 'Movies' ? 'movie' : 'tv')
    }
    return (
        <div className='relative mb-[70px]'>
            <ContentWrapper>
                <div className=' flex items-center justify-between mb-[20px]'>

                    <span className="text-[24px] font-semibold text-white">Top Rated</span>
                    <SwitchTab data={['Movies', 'Tv Shows']} onTabChange={onTabChange}></SwitchTab>
                </div>
            </ContentWrapper>
            <Carousel data={data?.results} loading={loading} endPoint={endPoint} />
        </div>
    )
}

export default TopRated