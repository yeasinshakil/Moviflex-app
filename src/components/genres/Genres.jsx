import React from 'react'
// import './genres.scss'
import { useSelector } from 'react-redux'
function Genres({ data }) {
    const { genres } = useSelector(state => state.home)
    // console.log(genres)
    return (
        <div className=' flex gap-[5px] genres'>
            {data.map((genreName, i) => {
                if (!genres[genreName]?.name) return;
                return (
                    <div key={i} className=" bg-pink1 text-[12px] text-white py-[3px] px-[5px] rounded-[4px] whitespace-nowrap">
                        {genres[genreName]?.name}
                    </div>
                )
            })}
        </div>
    )
}

export default Genres