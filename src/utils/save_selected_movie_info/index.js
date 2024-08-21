async function save_selected_movie_info(setSearchParams,movie_id,genre_id){
    setSearchParams({mid: await movie_id , gid: await genre_id});
}

export default save_selected_movie_info;