import {useEffect, useState } from "react";
import request from "../../API/request";
import {useDispatch, useSelector } from "react-redux";
import { Navigate, useSearchParams } from "react-router-dom";
import { save_selected_movie_info } from "../../utils";
import { MovieCard, NavBar, NowPlayingMovieCard, NowPlayingMoviesContainer } from "../../components";


//url`s//
const upcoming_url = 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1';
const top_rated_url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
const now_playing_url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';
const weekly_popular_url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte={min_date}&release_date.lte={max_date}';
const genres_url = "https://api.themoviedb.org/3/genre/movie/list?language=en";

function Home(){
    const [afisha_movie_index, setAfisha_movie_index] = useState(null);
    const [afisha_movie_genres, setAfisha_movie_genres] = useState(null);
    const [now_playing_movies, setNow_playing_movies] = useState(null);
    const [upcoming_movies, setUpcoming_movies] = useState(null);
    const [weekly_trending_movies, setWeekly_trending_movies] = useState(null);
    const [top_rated_movies, setTop_rated_movies] = useState(null);
    const [window_width ,setWindow_width] = useState(window.innerWidth);
    const [searchParams, setSearchParams] = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [redirectToMoviePage, setRedirectToMoviePage] = useState(false);
    const [show_greet_window, setShow_greet_window] = useState(true);
    const [page_first_opening, setPage_first_opening] = useState(false);

    const dispatch = useDispatch();

    let audio = new Audio("../media/sounds/change_poster.mp3");

    const is_menu_opened =  useSelector(function(state){
        return state.is_menue_opened;
    });

    const timeout = setTimeout(() =>{
        setShow_greet_window(false);
    },3000)

    if(show_greet_window === false){
        clearTimeout(timeout);
    }

    window.addEventListener("resize",function(){
        setWindow_width(window.innerWidth);
    });

    useEffect(() => {
        change_main_afisha(0);
        setSearchParams(searchParams);
        get_first_now_playing_movie_genres();
        getMovies(now_playing_url, setNow_playing_movies);
        getMovies(upcoming_url, setUpcoming_movies);
        getMovies(weekly_popular_url, setWeekly_trending_movies);
        getMovies(top_rated_url, setTop_rated_movies);
        if(!is_menu_opened && window_width < 800){
            setPage_first_opening(true);
        }
        dispatch({
            type: "is_menu_opened",
            payload: false
        })
    },[]);

    async function change_main_afisha(movie_index = 0){
        setAfisha_movie_index(null);
        setAfisha_movie_index(movie_index);
    }

    async function getMovies(url,setFunction){
        let data = await request(url);
        const movies = data.results;
        setFunction(movies)
    }

    async function get_genre_by_id(genre_id){
        const data = await request(genres_url);
        const genres = data.genres;
        let genre_name = "";
        genres.forEach(function(genre){
            if(genre.id === genre_id){
                genre_name = genre.name
            }
        });
        return genre_name;
    }

    async function render_genres(genre_ids){
        let genres = [];
        for(let i = 0; i < genre_ids.length; i++){
            genres.push(await get_genre_by_id(genre_ids[i]));
            if(i !== genre_ids.length-1){
                genres.push(",");
                genres.push(" ");
            }
        }
        setAfisha_movie_genres(genres);
        setLoading(false);
    }

    async function get_first_now_playing_movie_genres(){
        const now_playing_movies = await request('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1');
        const first_now_playing_movie = now_playing_movies.results[0]
        render_genres(first_now_playing_movie.genre_ids)
    }
    
    if(redirectToMoviePage){
        return <Navigate to={`/movie_page?${searchParams}`} />;
    }

    return(
        <main>
            <div className={`${show_greet_window && page_first_opening ? "absolute" : "hidden"} flex justify-center items-center w-full h-[87vh] z-[10] bg-[rgba(15,17,21,1)] left-0 top-0" id="greet_window`}>
                <img className="w-[300px] h-[300px] animate-bounce" src="../media/logos/logo.svg" alt="logo"/>
            </div>
            <NavBar window_width = {window_width}/>
            <section id="movies_section">
                <div className="w-[83vw] h-[87vh] pb-[50px] p-[25px] max-lg:p-[0px] max-lg:pb-[5vh]  relative bg-[rgba(25,24,32,1)] overflow-auto rounded-tl-[40px] max-lg:w-screen  max-[1285px]:overflow-x-hidden  max-[1285px]:rounded-[0px]">
                    <div className="flex flex-row  max-xl:flex max-xl:justify-center max-xl:mb-[70px] max-xl:h-[87vh] max-xl:flex-row max-xl:w-full">
                        {now_playing_movies && ! loading? 
                            <NowPlayingMoviesContainer now_playing_movies = {now_playing_movies} afisha_movie_index = {afisha_movie_index} setSearchParams = {setSearchParams} afisha_movie_genres = {afisha_movie_genres} setRedirectToMoviePage = {setRedirectToMoviePage} save_selected_movie_info = {save_selected_movie_info}/>
                            :
                            <div style={{background: "linear-gradient(to right, rgb(0, 0, 0), rgba(0, 0, 0, 0.3)) 0% 0% /cover no-repeat",objectFit: "cover", backgroundSize: "cover"}} className="relative flex items-center w-full min-h-[500px] object-cover bg-cover pb-[30px] rounded-[20px] max-[1285px]:relative max-[1285px]:flex max-[1285px]:items-center max-[1285px]:w-full max-[1285px]:h-[770px] max-[1285px]:rounded-[20px] max-[800px]:relative max-[800px]:flex max-[800px]:items-center max-[800px]:min-w-[100vw] max-[800px]:min-h-[650px] max-[800px]:min-h-[800px] max-[800px]:mt-[-50px] max-[800px]:pb-[30px] max-[800px]:rounded-bl-[50px] max-[800px]:rounded-none">
                                <div  className="absolute flex justify-center items-center w-full h-full bg-[rgba(15,17,21,1)] z-[1] rounded-[20px] top-0">
                                    <img className="w-[70px] h-[70px]" src="../media/gifs/loading.gif" alt="loading"/>
                                </div>
                            </div>
                        }
                        <div className={`${window_width < 1000 ? "top-[83vh]" : "top-[500px]"} mt-1 min-h-[190px] min-w-[315px] absolute flex justify-center items-center -translate-y-full -translate-x-full w-[32%] h-[150px] overflow-y-hidden overflow-x-auto pl-[5px] pr-5 pt-5 pb-[17px] left-[95.5%] top-[500px]" id="main_movies_list`}>
                            <div className="mb-[20px] flex flex-row gap-x-3 w-[97%] h-full p-[3%]"  id="main_movies_list_slider">
                                {now_playing_movies ? now_playing_movies.map((movie,index)=>{
                                    return(
                                        <NowPlayingMovieCard key={index} movie = {movie} afisha_movie_index = {afisha_movie_index} index = {index} change_main_afisha = {change_main_afisha} render_genres = {render_genres} setLoading = {setLoading} audio = {audio}/>
                                    );
                                }) 
                                : 
                                <div className="flex justify-center items-center w-[100px] h-[150px] object-cover overflow-hidden brightness-[100%] shadow-[0_0_10px_0_white] transition-[200ms] rounded-[10px] hover:cursor-pointer hover:brightness-[100%] hover:scale-110" id="active_main_element">
                                    <img className="w-[70px] h-[70px]" src="../media/gifs/loading.gif" alt="movie"/>
                                </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="relative mt-[17px]">
                        <h1 className="text-[white] text-[26px] ml-[25px]" id="movie_elements_general_heading">Upcoming Movies</h1>
                        <div className="relative flex flex-row gap-x-[22px] h-[460px] pt-10 pb-[27px] px-[25px] overflow-x-auto" id="movie_elements_slider">
                            {upcoming_movies ? upcoming_movies.map((movie)=>{
                                return(
                                    <div key={`movie_${movie.id}`} onClick={()=>{save_selected_movie_info(setSearchParams,movie.id,movie.genre_ids[0]);setRedirectToMoviePage(true)}} className="flex flex-col items-center w-[17%] h-[370px] min-w-[215px] text-[white] transition-[250ms] rounded-[20px] hover:cursor-pointer hover:scale-[1.08]">
                                       <MovieCard movie={movie}/>
                                    </div>
                                );
                            }) :
                                <div className="absolute flex items-center justify-center w-full h-[370px] bg-[rgba(15,17,21,1)] overflow-hidden rounded-tl-[20px] rounded-bl-[20px]">
                                    <img className="w-[50px] h-[50px]" src="../media/gifs/loading.gif" alt="loading"/>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="relative mt-[17px]">
                        <h1 className="text-[white] text-[26px] ml-[25px]" id="movie_elements_general_heading">Weekly Trending Movies</h1>
                        <div className="relative flex flex-row gap-x-[22px] h-[460px] pt-10 pb-[27px] px-[25px] overflow-x-auto" id="movie_elements_slider">
                            {weekly_trending_movies ? weekly_trending_movies.map((movie)=>{
                                return(
                                    <div key={`movie_${movie.id}`} onClick={()=>{save_selected_movie_info(setSearchParams,movie.id,movie.genre_ids[0]);setRedirectToMoviePage(true)}} className="flex flex-col items-center w-[17%] h-[370px] min-w-[215px] text-[white] transition-[250ms] rounded-[20px] hover:cursor-pointer hover:scale-[1.08]">
                                        <MovieCard movie={movie}/>
                                    </div>
                                );
                            }) :
                                <div className="absolute flex items-center justify-center w-full h-[370px] bg-[rgba(15,17,21,1)] overflow-hidden rounded-tl-[20px] rounded-bl-[20px]">
                                    <img className="w-[50px] h-[50px]" src="../media/gifs/loading.gif" alt="loading"/>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="relative mt-[17px]">
                        <h1 className="text-[white] text-[26px] ml-[25px]" id="movie_elements_general_heading">Top Rated Movies</h1>
                        <div className="relative flex flex-row gap-x-[22px] h-[460px] pt-10 pb-[27px] px-[25px] overflow-x-auto" id="movie_elements_slider">
                            {top_rated_movies ? top_rated_movies.map((movie)=>{
                                return(
                                    <div key={`movie_${movie.id}`} onClick={()=>{save_selected_movie_info(setSearchParams,movie.id,movie.genre_ids[0]);setRedirectToMoviePage(true)}} className="flex flex-col items-center w-[17%] h-[370px] min-w-[215px] text-[white] transition-[250ms] rounded-[20px] hover:cursor-pointer hover:scale-[1.08]">
                                       <MovieCard movie={movie}/>
                                    </div>
                                );
                            }) :
                                <div className="absolute flex items-center justify-center w-full h-[370px] bg-[rgba(15,17,21,1)] overflow-hidden rounded-tl-[20px] rounded-bl-[20px]">
                                    <img className="w-[50px] h-[50px]" src="../media/gifs/loading.gif" alt="loading"/>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Home;