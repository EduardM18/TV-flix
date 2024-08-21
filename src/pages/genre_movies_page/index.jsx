import { useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import request from "../../API/request";
import { get_genre_id, save_selected_movie_info } from "../../utils";
import NavBar from "../../components/navBar";
import { GenreMovieCard } from "../../components";

function GenreMoviesPage() {
    const [window_width ,setWindow_width] = useState(window.innerWidth);
    const [searchParams, setSearchParams] = useSearchParams();
    const [genre_id, setGenre_id] = useState(get_genre_id(searchParams));
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [current_genre_movies, setCurrent_genre_movies] = useState(null);
    const [redirectToMoviePage, setRedirectToMoviePage] = useState(false);
    const [genre_name, setGenre_name] = useState(null);

    useEffect(() =>{
        get_current_genre_movies();
        get_current_genre_name();
        setSearchParams(searchParams);
    },[])
    
    async function get_current_genre_name(gid){
        const data = await request("https://api.themoviedb.org/3/genre/movie/list?language=en");
        const genres = data.genres;
        let current_genre_id = gid ? gid : genre_id;
        genres.forEach(function(genre){
            if(genre.id === +current_genre_id){
                setGenre_name(genre.name);
            }
        })
    }
    
    window.addEventListener("resize",function(){
        setWindow_width(window.innerWidth);
    })

    async function get_current_genre_movies(gid,current_page){
        setLoading(true);
        const data = await request(`https://api.themoviedb.org/3/discover/movie?with_genres=${gid ? gid : genre_id}&page=${current_page ? current_page : page}`);
        const all_movies = await data.results;
        setCurrent_genre_movies(all_movies)
        setLoading(false);
    }
    
    if(redirectToMoviePage){
        return <Navigate to={`/movie_page?${searchParams}`} />;
    }

    if(genre_id !== searchParams.get("gid")){
        setGenre_id(searchParams.get("gid"));
        get_current_genre_movies(searchParams.get("gid"),1);
        get_current_genre_name(searchParams.get("gid"));
    }

    return (
        <main>
            <NavBar window_width = {window_width}/>
            <div className="flex items-center flex-col min-w-[83vw] h-[87vh] relative bg-[rgba(25,24,32,1)] overflow-auto pb-[6vh] rounded-tl-[40px]">
                <div className="w-full p-5">
                    <h1 className="text-[white] text-[50px] mt-[50px] pl-5">{genre_name ? `ALL ${genre_name} Movies` : "Loading..."}</h1>
                    <div className="flex flex-row flex-wrap justify-center items-center gap-y-7 gap-x-[22px] pt-10 pb-[27px]">
                        {current_genre_movies && !loading ? 
                        current_genre_movies.map((movie)=>{
                            return(
                                <GenreMovieCard key={movie.id} movie = {movie} save_selected_movie_info = {save_selected_movie_info} setSearchParams = {setSearchParams} setRedirectToMoviePage = {setRedirectToMoviePage}/>
                            )
                        }) : 
                            <div className="flex items-center justify-center min-w-[100%] min-h-[87vh] bg-[rgba(15,17,21,1)] z-[1] rounded-tl-[20px]">
                                <img className="w-[70px] h-[70px]" src="../media/gifs/loading.gif" alt="loading" />
                            </div>
                        }
                    </div>
                    <div onClick={()=>{setPage(page +1); get_current_genre_movies(searchParams.get("gid"),page +1)}} className="relative -translate-x-2/4 flex justify-center items-center bg-[rgba(219,0,40,1)] text-[white] w-[120px] h-[45px] text-[17px] transition-[250ms] mt-[15px] rounded-[10px] left-2/4 hover:cursor-pointer hover:w-[140px] hover:tracking-[2px]">Next page<i className="fa-solid fa-arrow-right ml-[5px]"></i></div>
                </div>
            </div>
        </main>
    )
}

export default GenreMoviesPage