import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/header/Header'
import Home from './pages/home/Home'
import Details from './pages/details/Details';
import SearchResult from './pages/searchResult/SearchResult';
import Explore from './pages/explore/Explore';
import PageNotFound from './pages/404/PageNotFound';
import { useDispatch, useSelector } from 'react-redux'
import { fetchDataFromApi } from './utls/api'
import { getApiConfiguration, getGenres } from './store/homeSlice'
import { Route, Routes } from 'react-router-dom'
import Footer from './components/footer/Footer';

function App() {
  const { url } = useSelector((state) => state.home)
  const dispatch = useDispatch();

  useEffect(() => {
    fetchApiConfig()
    genresCall()
  }, [])

  const fetchApiConfig = () => {
    fetchDataFromApi('/configuration')
      .then(res => {
        // console.log(res)
        const url = {
          backdrop: res.images.secure_base_url + 'original',
          poster: res.images.secure_base_url + 'original',
          profile: res.images.secure_base_url + 'original',
        }
        dispatch(getApiConfiguration(url))
      })
  }

  const genresCall = async () => {
    let promises = [];
    let endPoints = ['tv', 'movie'];
    let allGenres = {};

    endPoints.forEach((url) => promises.push(fetchDataFromApi(`/genre/${url}/list`)))
    console.log(promises)

    const data = await Promise.all(promises)

    data.map(({ genres }) => {
      return genres.map((item) => (
        allGenres[item.id] = item
      ))
    })
    dispatch(getGenres(allGenres))
  }


  return (
    <>

      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/:mediaType/:id" element={<Details />}></Route>
        <Route path="/search/:query" element={<SearchResult />}></Route>
        <Route path="/explore/:mediaType" element={<Explore />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>

      <Footer />

    </>
  )
}

export default App
