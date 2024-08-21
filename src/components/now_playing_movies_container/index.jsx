import { memo } from "react";

function NowPlayingMoviesContainer(props){
    const now_playing_movies = props.now_playing_movies;
    const afisha_movie_index = props.afisha_movie_index;
    const setSearchParams = props.setSearchParams;
    const afisha_movie_genres = props.afisha_movie_genres;
    const setRedirectToMoviePage = props.setRedirectToMoviePage;
    const save_selected_movie_info = props.save_selected_movie_info;

    return(
        <div className="relative flex items-center overflow-hidden h-[550px] w-full pb-[30px] rounded-[20px] max-lg:rounded-tr-none max-[1285px]:relative max-[1285px]:flex max-[1285px]:items-center max-[1285px]:w-full max-xl:h-[87vh] max-[1285px]:rounded-[20px] max-[800px]:relative max-[800px]:flex max-[800px]:items-center max-[800px]:min-w-[100vw] max-[800px]:mt-[-50px] max-[800px]:pb-[30px] max-[800px]:rounded-bl-[50px] max-[800px]:rounded-none">
            <img src={`https://image.tmdb.org/t/p/original/${now_playing_movies[afisha_movie_index].backdrop_path}`} className="absolute left-0 top-0 w-[100%] h-[100%] max-[1285]:min-h-[800px] min-[1285px]:h-[550px] bg-gradient-to-r from-[#000000] to-[#0000004d] object-cover" alt="movie" />
            <div className="flex flex-col justify-center relative w-[45%] min-w-[490px] h-[88%] left-[7%] top-2.5" id="main_movie_info_wrapper">
                <h2 className="text-[white] max-xl:max-w-[350px] text-[50px] mb-[17px] max-xl:mb-[0px]" id="main_movie_name">{now_playing_movies[afisha_movie_index].title}</h2>
                <div className="flex items-center flex-row max-xl:mb-[10px]">
                    <p className="text-[gray] text-lg" id="main_movie_release_date">{now_playing_movies[afisha_movie_index].release_date.slice(0,4)}</p>
                    <i id="main_grade_star_icon" className="fa-solid fa-star text-[gold] ml-[7px]"></i>
                    <div className="flex items-center justify-center bg-[rgba(49,48,54,1)] rounded text-[white] text-[15px] px-1 p-0.5" id="main_movie_grade">{now_playing_movies[afisha_movie_index].vote_average.toFixed(1)}</div>
                </div>
                <p className="text-red-600 font-[800] text-lg mt-[13px] max-xl:mb-[0px] max-w-[500px]" id="main_movie_genres">{afisha_movie_genres ? afisha_movie_genres : "Loading..."}</p>
                <button onClick={()=>{save_selected_movie_info(setSearchParams,now_playing_movies[afisha_movie_index].id,now_playing_movies[afisha_movie_index].genre_ids[0]);setRedirectToMoviePage(true)}} className="w-[155px] min-h-[50px] bg-[rgba(219,0,40,1)] text-lg text-[white] transition-[220ms] mt-[23px] rounded-[10px] border-[none] hover:cursor-pointer hover:scale-110  max-xl:mb-[170px]" id="main_movie_Watch_now_btn"><i className="fa-regular fa-circle-play"></i> Watch Now</button> 
            </div>
        </div>
    )
}
export default memo(NowPlayingMoviesContainer);