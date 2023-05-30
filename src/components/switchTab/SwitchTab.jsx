import React, { useState } from 'react'

function SwitchTab({ data, onTabChange }) {
    const [selectedTab, setSelectedTab] = useState(0);
    const [left, setLeft] = useState(0);

    const activeTab = (tab, i)=> {
        setLeft(i * 100)
        setTimeout(()=>{
            setSelectedTab(i)
        }, 300)
        onTabChange(tab, i)
    }
    return (
        <div className=' h-[34px] bg-white rounded-[20px] p-[2px]'>
            <div className=' flex items-center h-[30px] relative'>
                {data.map((tab, i) => (
                    <span className={` h-full flex items-center justify-center w-[100px]  text-[14px] relative z-10 cursor-pointer transition-colors  ${selectedTab === i ? ' text-white' : 'text-black1'}`}
                    onClick={()=> activeTab(tab, i)}
                    >{tab}</span>
                ))}
                <span className=' h-[30px] w-[100px] rounded-[15px] bg-gradient-to-r from-yellow-500 to-pink1 absolute left-0 transition-all duration-300' style={{left}}></span>

                
            </div>
        </div>
    )
}

export default SwitchTab