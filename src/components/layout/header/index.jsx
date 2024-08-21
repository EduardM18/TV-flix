import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import request from "../../../API/request";
import { useNavigate } from "react-router-dom";
import { SearchContainer } from "../..";

function Header(){
    const [input_value, setInput_value] = useState(null);
    const [searched_movies, setSearched_movies] = useState(null);
    const [noMovies, setNoMovies] = useState(null);
    const [loading, setLoading] = useState(false);
    const [window_width, setWindow_width] = useState(window.innerWidth);
    const [input, setInput] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        search(input_value);
    },[input_value])
    
    const is_menu_opened =  useSelector(function(state){
        return state.is_menue_opened;
    });
    
    window.addEventListener("resize",function(){
        setWindow_width(window.innerWidth);
    })

    async function search(input_value){
        setLoading(true);
        const data = await request(`https://api.themoviedb.org/3/search/movie?query=${input_value}`);
        const searched_movies = await data.results;
        let movies = [];
        searched_movies.forEach((movie =>{
            if(movie.title && movie.poster_path && movie.id && movie.release_date && movie.vote_average != null){
                movies.push(movie);
                setNoMovies(null);
            }
        }));
        if(movies.length === 0){
            setNoMovies("No movies found");
        }
        setSearched_movies(movies);
        setLoading(false);
    }

    async function directToMoviePage(movie_id,genre_id){
        return navigate(`/movie_page?mid=${movie_id}&gid=${genre_id}`);
    }

    function clean_input(event,isSearched){
        if(isSearched){
            event.target.value = "";
        }
    }

    return(
        <header>
            <div className="relative flex items-center justify-center bg-[rgba(15,17,21,1)] h-[13vh] z-[5]">
                <div className="relative flex justify-between items-center w-[95%]">
                    <div className="w-40 object-cover tablet: max-w-[35%] max-h-[70px]">
                        <img className="w-full h-full" src="../media/logos/logo.svg" alt="logo"/>
                    </div>
                    <div className="h-[51px] tablet: w-[59%] max-w-[400px]">
                        <form onSubmit={(event)=>{event.preventDefault()}} className="flex items-center w-full h-full transition-[200ms]">
                            <i className="fa-solid fa-magnifying-glass absolute text-lg text-[rgba(152,152,155,1)] z-[1]"></i>
                            <input type="text" onInput={(event)=>{setInput(event);search(event.target.value);setInput_value(event.target.value)}} name="search_input" className="relative w-full h-full text-lg bg-[rgba(49,48,54,1)] text-[rgba(152,152,155,1)] transition-[300ms] pl-10 rounded-[10px] max-sm:text-[16px] border-[none] -left-2.5 hover:cursor-pointer hover:shadow-[0px_0px_0px_2px_gray] focus:z-[2] focus:pl-[15px]" placeholder= "Search any movies"/>
                            <img className={`${loading ? "absolute" : "hidden"} left-[100%] -translate-x-[230%] w-[30px] h-[30px] z-[3]`} src="../media/gifs/loading.gif" alt="loading"></img>
                            <i onClick={()=>{
                                dispatch({
                                    type: "is_menu_opened",
                                    payload: true
                                })
                            }} className={`fa-solid fa-bars  translate-x-[400%] max-md:translate-x-[0] ${is_menu_opened ? "text-white" : "text-[gray]"} max-md:text-[25px] transition-[200ms] hover:cursor-pointer hover:text-white`}></i>
                        </form>
                    </div>
                </div>
            </div>
            {input_value ?
                <SearchContainer searched_movies = {searched_movies} window_width = {window_width} noMovies = {noMovies} input_value = {input_value} directToMoviePage = {directToMoviePage} setInput_value = {setInput_value} clean_input = {clean_input} input = {input}/>
                :
                ""
            }
        </header>
    )
}

export default memo(Header);