import { memo } from "react";

function GenreMovieCard(props){
    const movie = props.movie;
    const save_selected_movie_info = props.save_selected_movie_info;
    const setSearchParams = props.setSearchParams;
    const setRedirectToMoviePage = props.setRedirectToMoviePage;
    
    return(
        <div key={movie.id} onClick={()=>{save_selected_movie_info(setSearchParams,movie.id,movie.genre_ids[0]);setRedirectToMoviePage(true)}} className="flex flex-col items-center w-[18%] h-[30%] min-w-[150px] text-[white] transition-[250ms] rounded-[20px] hover:cursor-pointer hover:scale-[1.08]">
            <div className="w-full h-[90%] object-cover overflow-hidden rounded-[20px]">
                <img
                    className="w-full h-full"
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt="movie"
                />
            </div>
            <div className="flex flex-col items-start w-full min-h-[150px] mt-2.5">
                <h3 className="text-[20.5px]">{movie.title}</h3>
                <div className="flex flex-row justify-between items-center w-full mt-[7px]">
                    <div className="flex items-center flex-row gap-x-[7px]">
                        <i className="fa-solid fa-star text-[goldenrod] ml-[3px]"></i>
                        <div className="text-[17.5px]">{movie.vote_average.toFixed(1)}</div>
                    </div>
                    <div className="flex justify-center items-center h-[20px] bg-[rgba(49,48,54,1)] text-sm rounded pt-[2.5px] pb-px px-1.5">{movie.release_date.slice(0,4)}</div>
                </div>
            </div>
        </div>
    )
}

export default memo(GenreMovieCard);