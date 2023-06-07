import React from 'react'
import DetailsBanner from './detailsBanner/DetailsBanner'
import useFetch from '../../components/hooks/useFetch';
import { useParams } from 'react-router-dom';
import Cast from './cast/Cast';
import VideosSection from './videoSection/VideoSection';
import Recommendation from './carousels/Recommendation';
import Similar from './carousels/Similar';

function Details() {
  const {mediaType, id} = useParams();
  const {data, loading} = useFetch(`/${mediaType}/${id}/videos`);
  const {data: credits, loading: creditsLoading} = useFetch(`/${mediaType}/${id}/credits`);
  return (
    <div>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew}/>
      <Cast data={credits?.cast} loading={creditsLoading} />
      <VideosSection data={data} loading={loading} />
      <Similar  mediaType={mediaType} id={id} />
      <Recommendation  mediaType={mediaType} id={id} />
    </div>
  )
}

export default Details