import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import SwitchTab from '../../../components/switchTab/SwitchTab';
import Carousel from '../../../components/carousel/Carousel';

function Trending() {
    const [data, setData] = useState([])
    const [endPoind, setEndPoint] = useState('day')
    const fetchUrl = `https://api.themoviedb.org/3/trending/all/${endPoind}`;
    const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

    const headers = {
        authorization: 'bearer ' + TMDB_TOKEN,
    }
    useEffect(() => {
        fetchDataFromApi(fetchUrl)
    }, [])
    const fetchDataFromApi = async (url, params) => {
        try {
            const { data } = await axios.get(url, { headers, params })

            setData(data)
        }
        catch (err) {
            console.log(err)
            return err
        }
    }
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

            <Carousel data={data?.results} />
        </div>
    )
}

export default Trending