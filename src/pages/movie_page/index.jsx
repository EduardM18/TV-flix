import { useEffect, useState } from "react";
import "../../utils/play_btn_animation/style.css";
import { useSearchParams } from "react-router-dom";
import request from "../../API/request";
import { get_genre_id, get_movie_id, save_selected_movie_info } from "../../utils";
import { MovieCard, NavBar } from "../../components";


function MoviePage(){
    const [window_width ,setWindow_width] = useState(window.innerWidth);
    const [searchParams, setSearchParams] = useSearchParams();
    const [bg_path, setBg_path] = useState(null);
    const [title, setTitle] = useState(null);
    const [release_date, setRelease_date] = useState(null);
    const [vote_average, setVote_average] = useState(null);
    const [genres, setGenres] = useState(null);
    const [overview, setOverview] = useState(null);
    const [starring, setStarring] = useState(null);
    const [director, setDirector] = useState(null);
    const [show_video, setShow_video] = useState(false);
    const [trailer, setTrailer] = useState(null);
    const [may_like_movies, setMay_like_movies] = useState(null);

    useEffect(() => {
        find_movie_by_id(get_movie_id(searchParams));
        setSearchParams(searchParams);
    },[searchParams]);

    window.addEventListener("resize",function(){
        setWindow_width(window.innerWidth);
    })
    
    get_movie_id(searchParams);

    get_genre_id(searchParams);

    async function find_movie_by_id(movie_id,may_like_genre){
        setBg_path(null);
        const movie = await request(`https://api.themoviedb.org/3/movie/${movie_id}?language=en-US`);
        setBg_path(movie.backdrop_path);
        setTitle(movie.title);
        setRelease_date(movie.release_date);
        setVote_average(movie.vote_average);
        get_genres(movie.genres);
        setOverview(movie.overview);
        setStarring(await get_starring(movie_id));
        setDirector(await get_director(movie_id));
        get_may_like_movies(may_like_genre ? may_like_genre : get_genre_id(searchParams));
    }
    
    async function get_starring(movie_id){
        const data_credits = await request(`https://api.themoviedb.org/3/movie/${movie_id}/credits?language=en-US`);
        const credits = data_credits.cast;
        let movie_starring = [];
        let i = 0;
        let is_ended = false;
        credits.forEach(function(actor){
            if(i < 10){
                movie_starring.push(actor.name);
                if(credits.length > 1 && i !== credits.length-1){
                    movie_starring.push(", ");
                }
                i++
            }
            is_ended = true;
        });
        if(is_ended){
            movie_starring.push("and others...");
        }
        return movie_starring;
    }

    async function get_director(movie_id){
        const data = await request(`https://api.themoviedb.org/3/movie/${movie_id}/credits?language=en-US`);
        const crew = data.crew;
        let is_founded = false;
        let director;
        // console.log(crew);
        crew.forEach(function(people){
            if(people.known_for_department === "Directing"){
                if(is_founded === false){
                    director = people.name;
                    is_founded = true;
                }
            }
        });
        return director;
    }

    async function get_genres(genre_ids){
        let genres = [];
        for(let i = 0; i < genre_ids.length; i++){
            genres.push(genre_ids[i].name);
            if(i !== genre_ids.length-1){
                genres.push(",");
                genres.push(" ");
            }
        }
        setGenres(genres);
    }

    async function get_movie_video(movie_id){
        const data = await request(`https://api.themoviedb.org/3/movie/${movie_id}/videos?language=en-US`);
        const videos = data.results;
        setTrailer(await videos[videos.length - 1]);
        setShow_video(!show_video)
    }

    async function get_may_like_movies(genre_id){
        if(genre_id == null){
            genre_id = 28;
        }
        const data = await request(`https://api.themoviedb.org/3/discover/movie?with_genres=${genre_id}&page=1`);
        setMay_like_movies(data.results);
    }

    

    return(
        <main>
            {bg_path ? 
                <NavBar window_width = {window_width}/>
                :
                ""
            }
            <section  className="h-[85vh] pb-[2vh] overflow-y-auto">
                <div className="rounded-tl-[40px] overflow-hidden">
                    <div className="pl-[50px] pt-[50px]">
                        {show_video?
                            <div className="flex absolute justify-center items-center w-full h-screen z-10 bg-[rgba(15,17,21,0.8)] left-0 top-0">
                               <i  className="fa-solid fa-xmark absolute text-[gray] text-[40px] z-[6] transition-[200ms] left-[90%] top-[5%] hover:cursor-pointer hover:brightness-[40%]" onClick={()=>{setShow_video(false);}}></i>
                               {trailer !== undefined ? 
                                <iframe 
                                    className="w-4/5 h-4/5 min-h-[400px] min-w-[350px] rounded-[20px]"
                                    title="YouTube video player" 
                                    rameborder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                    allowFullScreen={true}
                                    src={`https://www.youtube.com/embed/${trailer.key}`}>
                                </iframe>
                                :
                                <h1 className="text-[35px] text-white">Video is not founded</h1>
                                }
                            </div>
                            :
                            <div onClick={()=>{ get_movie_video(get_movie_id(searchParams))}} id="movie_watch_btn">
                                <i className="fa-solid fa-play"></i>
                            </div>
                        }
                        {bg_path ? 
                            <img src={`https://image.tmdb.org/t/p/original/${bg_path}`} className="absolute left-0 top-0 w-[100%] h-[87vh] mt-[13vh] bg-gradient-to-r from-[#000000] to-[#0000004d] object-cover" alt="movie" />
                        :
                            <div className="absolute flex justify-center items-center w-full h-full min-h-[87vh] mt-[13vh] bg-[rgba(25,24,32,1)] z-[8] left-0 top-0">
                                <img className="w-[70px] h-[70px]" src="../media/gifs/loading.gif" alt="loading"/>
                            </div>
                        }
                        <div onClick={()=>{get_movie_video(get_movie_id(searchParams))}} id="movie_watch_btn">
                            <i className="fa-solid fa-play"></i>
                        </div>
                        <div className="relative min-h-[45%] w-[90%] left-0 top-[60px]">
                            <h2 className="text-[white] text-[40px] mb-5">{title ? title : "Loading..."}</h2>
                            <div className="flex items-center flex-row text-[white] text-xl mt-2.5 mb-[50px]">
                                <p id="main_movie_release_date">{release_date ? release_date.slice(0,4) : "Loading..."}</p>
                                <i className="fa-solid fa-star text-[gold] ml-[7px]"></i>
                                <div className="flex items-center justify-center bg-[rgba(49,48,54,1)] rounded text-[white] text-[15px] w-[35px] h-[18px] pt-px">{vote_average ? vote_average.toFixed(1) : "0.0"}</div>
                            </div>
                            <div className="flex flex-row items-center flex mb-5">
                                <p className="text-[white] text-xl mr-5">Directed By:</p>
                                <div>
                                    <p className="text-[gray] text-lg">{director ? director : "No director yet"}</p>
                                </div>
                            </div>
                            <div className="flex mb-5">
                                <p className="text-[white] text-xl mr-5">Starring:</p>
                                <div>
                                    <p className="text-[gray] text-lg">{starring ? starring : "Loading..."}</p>
                                </div>
                            </div>
                           
                            <p className="text-[white] text-xl mt-[13px] mb-[50px]">Genres: <span className="text-[20px] text-[gray]">{genres ? genres : "Loading..."}</span></p>
                            <p className="mb-[50px] text-[20px] text-white">{overview ? overview : "No overview yet"}</p>
                        </div>
                    </div> 
                  
                    <div className={`relative flex flex-row gap-[50px]  overflow-y-hidden overflow-x-auto items-center min-h-[200px] pt-[70px] pb-[30px] ${window_width > 600 ? "mt-[350px]" : "mt-[180px]"} pl-[20px] pr-[20px]`}>
                        <h1 className="absolute top-[0px] left-[50px] z-[2] text-[30px] text-white">You May Also Like</h1>
                        {may_like_movies && bg_path ? may_like_movies.map((movie)=>{
                            return(
                                <div key={`movie_${movie.id}`} onClick={()=>{save_selected_movie_info(setSearchParams,movie.id,movie.genre_ids[0]);find_movie_by_id(movie.id,movie.genre_ids[0]);setBg_path(null)}} className="flex flex-col items-center w-[17%] h-[370px] min-w-[215px] text-[white] transition-[250ms] rounded-[20px] hover:cursor-pointer hover:scale-[1.08]">
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
            </section>
        </main>
    );
}

export default MoviePage;