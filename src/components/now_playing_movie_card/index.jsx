import { memo } from "react";

function NowPlayingMovieCard(props){
    const movie = props.movie;
    const afisha_movie_index = props.afisha_movie_index;
    const index = props.index;
    const change_main_afisha = props.change_main_afisha;
    const render_genres = props.render_genres;
    const setLoading = props.setLoading;
    const audio = props.audio;
    
    return(
        <div key={`movie_${movie.id}`} className={`min-w-[100px] h-[150px] object-cover overflow-hidden ${afisha_movie_index === index? "brightness-[100%] shadow-[0_0_10px_0_white]" : "brightness-[50%]"} transition-[200ms] rounded-[10px] hover:cursor-pointer hover:brightness-[100%] hover:scale-110`} id="active_main_element">
            <img onClick={()=>{change_main_afisha(index); render_genres(movie.genre_ids); setLoading(true); audio.play()}} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="movie"/>
        </div>
    )
}

export default memo(NowPlayingMovieCard);