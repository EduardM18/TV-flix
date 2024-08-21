import { memo } from "react";

function MovieCard(props){
    const movie = props.movie;
    
    return(
        <>
            <div className="w-full h-[90%] object-cover overflow-hidden rounded-[20px]">
                <img className="w-full h-full" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="movie"/>
            </div>
            <div className="flex flex-col items-start w-full mt-2.5">
                <h3 className="text-[20.5px]">{movie.title}</h3>
                <div className="flex flex-row justify-between w-full mt-[7px]">
                <div className="flex items-center flex-row gap-x-[7px]">
                    <i className="fa-solid fa-star text-[goldenrod] ml-[3px]"></i>
                <div className="text-[17.5px]">{movie.vote_average.toFixed(1)}</div>
                </div>
                    <div className="flex justify-center items-center h-[22px] bg-[rgba(49,48,54,1)] text-md rounded pt-[2.5px] pb-px px-1.5">{movie.release_date.slice(0,4)}</div>
                </div>
            </div>
        </>
    )
}

export default memo(MovieCard);