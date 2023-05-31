import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/header/Header'
import Home from './pages/home/Home'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDataFromApi } from './utls/api'
import { getApiConfiguration, getGenres } from './store/homeSlice'
import { Route, Routes } from 'react-router-dom'

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
      </Routes>

    </>
  )
}

export default App
