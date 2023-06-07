import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { fetchDataFromApi } from '../../utls/api';
import Spinner from '../../components/spinner/Spinner';
import ContentWrapper from '../../components/contentWrapper/ContentWrapper';
import InfiniteScroll from 'react-infinite-scroll-component';
import MovieCard from '../../components/movieCard/MovieCard';

function SearchResult() {
  const [data, setData] = useState(null)
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();

  const fetchInitialData = () => {
    setLoading(true)
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`)
      .then((res) => {
        setData(res)
        setPageNum((prev) => prev + 1)
        setLoading(false)
      })

  }

  const setNextPageData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`)
      .then((res) => {
        if (data?.results) {
          setData({
            ...data, results: [...data?.results, ...res?.results]
          })
        } else {
          setData(res)
        }
        setPageNum((prev) => prev + 1)
      })

  }

  useEffect(() => {
    setPageNum(1)
    fetchInitialData()
  }, [query])
  return (
    <div className='min-h-[700px] pt-[100px]'>
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className=" text-2xl leading-8 text-white mb-6">

                {`search ${data?.total_results > 1 ? 'results' : 'result'} of '${query}'`}
              </div>

              <InfiniteScroll
              className=' flex flex-wrap gap-2 mb-12 md:gap-5'
              dataLength={data?.results?.length || []}
              next={setNextPageData}
              hasMore={pageNum <= data?.total_pages}
              loader={<Spinner />}
              >
                {data?.results.map((item, i)=> {
                  if(item?.media_type === 'person') return
                  return (
                    <MovieCard key={i} data={item} mediaType={item?.media_type} fromSearch={true} />
                  )
                })}
              </InfiniteScroll>
            </>
          ) : (
            <span className=" text-2xl text-blackLight">Sorry, no result found.</span>
          )}
        </ContentWrapper>
      )}
    </div>
  )
}

export default SearchResult