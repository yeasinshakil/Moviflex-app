import React from 'react';

const ContentWrapper = ({children}) => {
    return (
        <div className=' max-w-[1200px] w-full mt-o mx-auto py-0 px-[20px] contentWrapper'>
            {children}
        </div>
    );
};

export default ContentWrapper;