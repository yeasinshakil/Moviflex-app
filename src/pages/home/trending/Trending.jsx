import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import SwitchTab from '../../../components/switchTab/SwitchTab';
import Carousel from '../../../components/carousel/Carousel';
import useFetch from '../../../components/hooks/useFetch';

function Trending() {
    const [endPoint, setEndPoint] = useState('day')
    const { data, loading } = useFetch(`/trending/all/${endPoint}`)


    const onTabChange = (tab) => {
        setEndPoint(tab === 'Day' ? 'day' : 'week')
      }

    return (
        <div className=' relative mb-[70px]'>
            <ContentWrapper>
                <div className=' flex items-center justify-between mb-[20px]'>
                    <span className=' text-[24px] font-semibold text-white'>Trending</span>
                   <SwitchTab data={['Day', 'Week']} onTabChange={onTabChange} />

                </div>
            </ContentWrapper>

            <Carousel data={data?.results} loading={loading} />
        </div>
    )
}

export default Trending