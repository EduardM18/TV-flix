import { memo } from "react"

function SearchContainer(props){
    const searched_movies = props.searched_movies;
    const window_width = props.window_width;
    const noMovies = props.noMovies;
    const input_value = props.input_value;
    const directToMoviePage = props.directToMoviePage;
    const setInput_value = props.setInput_value;
    const clean_input = props.clean_input;
    const input = props.input;

    return(
        <div className="absolute flex flex-col items-center bg-[rgba(25,24,32,1)] z-[4] w-[100%] h-screen overflow-x-hidden left-0 top-0">
            <div className="w-full h-[100px] mt-[20vh]" id="search_info_container">
                <p className="text-[rgb(221,6,45)] text-[19px] ml-[50px]" id="results_for">Results for</p>
                <h2 className={`text-[white] ${window_width < 800 ? "text-[30px]" : "text-[45px]"} ml-[50px] mt-5" id="searching_name`}>{noMovies ? noMovies : input_value}</h2>
            </div>
            <div className="relative flex flex-row flex-wrap justify-center w-full pt-[50px]" id="searching_movies_container_wrapper">
                <div className="relative flex flex-row justify-center flex-wrap gap-x-[25px] gap-y-[25px] w-[90%] pb-[50px]" id="searching_movies_container">
                    {searched_movies ? 
                        searched_movies.map((movie)=>{
                            return(
                                <div key={movie.id} onClick={()=>{directToMoviePage(movie.id,movie.genre_ids[0]);setInput_value(null);clean_input(input,true)}} className={`flex flex-col items-center ${window_width < 800 ? "h-[400px] w-[150px] mb-[50px]" : "h-[450px] w-[200px]"} text-[white] transition-[250ms] rounded-[20px] hover:cursor-pointer hover:scale-[1.08]`}>
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
                        })
                        :
                        ""
                    }
                </div>
            </div>
        </div>
    )
}

export default memo(SearchContainer);