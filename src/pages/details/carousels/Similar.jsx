import React from "react";
import useFetch from "../../../components/hooks/useFetch";
import Carousel from "../../../components/carousel/Carousel";



const Similar = ({ mediaType, id }) => {
    const { data, loading, error } = useFetch(
        `/${mediaType}/${id}/similar`
    );
    
    const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";

    return (
        <Carousel
            title={title}
            data={data?.results}
            loading={loading}
            endPoint={mediaType}
        />
    );
};

export default Similar;