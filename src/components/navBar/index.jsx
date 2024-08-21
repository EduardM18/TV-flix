import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useSearchParams } from "react-router-dom/dist";
import OutsideClickHandler from 'react-outside-click-handler';
import { memo, useEffect, useState } from "react";
import { get_genre_id } from "../../utils";

function NavBar(props) {
    const [searchParams] = useSearchParams();
    const [genre_id, setGenre_id] = useState(get_genre_id(searchParams));
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
       setGenre_id(get_genre_id(searchParams));
    },[searchParams]);
    
    let window_width = props.window_width;

    const is_menu_opened =  useSelector(function(state){
        return state.is_menu_opened;
    });

    return(
        <section className="h-[87vh] z-[3]">
            <OutsideClickHandler onOutsideClick={()=>{
                dispatch({
                    type: "is_menu_opened",
                    payload: false
                })
            }}>
                <div className={`flex flex-col w-[17vw] min-w-[200px] bg-[rgba(15,17,21,1)] text-[gray] text-[21px] h-[87vh] overflow-y-hidden pl-[3vw] py-10 border-t-[rgb(102,102,102)] border-t border-solid hover:overflow-y-auto overflow-y-scroll  ${window_width < 800 ? is_menu_opened ?  "flex absolute z-[9]" : "hidden" : "flex max-md:hidden"}`}>
                    <Link to={"/"}><h2 className={`${location.pathname === "/" ? "text-white" : "text-gray"} transition-[150ms] mb-5 hover:cursor-pointer hover:text-[white]`}>Home</h2></Link>
                    <p className="text-[red] text-lg">Genres</p>
                    <Link to={"/genre_movies?gid=12"}><p className={`transition-[200ms] ${genre_id === "12" ? "text-white" : "text-[gray]"} no-underline mt-2.5 hover:cursor-pointer hover:text-[white]`}>Adventure</p></Link>
                    <Link to={"/genre_movies?gid=14"}><p className={`transition-[200ms] ${genre_id === "14" ? "text-white" : "text-[gray]"} no-underline mt-2.5 hover:cursor-pointer hover:text-[white]`}>Fantasy</p></Link>
                    <Link to={"/genre_movies?gid=16"}><p className={`transition-[200ms] ${genre_id === "16" ? "text-white" : "text-[gray]"} no-underline mt-2.5 hover:cursor-pointer hover:text-[white]`}>Animation</p></Link>
                    <Link to={"/genre_movies?gid=18"}><p className={`transition-[200ms] ${genre_id === "18" ? "text-white" : "text-[gray]"} no-underline mt-2.5 hover:cursor-pointer hover:text-[white]`}>Drama</p></Link>
                    <Link to={"/genre_movies?gid=27"}><p className={`transition-[200ms] ${genre_id === "27" ? "text-white" : "text-[gray]"} no-underline mt-2.5 hover:cursor-pointer hover:text-[white]`}>Horror</p></Link>
                    <Link to={"/genre_movies?gid=28"}><p className={`transition-[200ms] ${genre_id === "28" ? "text-white" : "text-[gray]"} no-underline mt-2.5 hover:cursor-pointer hover:text-[white]`}>Action</p></Link>
                    <Link to={"/genre_movies?gid=35"}><p className={`transition-[200ms] ${genre_id === "35" ? "text-white" : "text-[gray]"} no-underline mt-2.5 hover:cursor-pointer hover:text-[white]`}>Comedy</p></Link>
                    <Link to={"/genre_movies?gid=36"}><p className={`transition-[200ms] ${genre_id === "36" ? "text-white" : "text-[gray]"} no-underline mt-2.5 hover:cursor-pointer hover:text-[white]`}>History</p></Link>
                    <Link to={"/genre_movies?gid=37"}><p className={`transition-[200ms] ${genre_id === "37" ? "text-white" : "text-[gray]"} no-underline mt-2.5 hover:cursor-pointer hover:text-[white]`}>Western</p></Link>
                    <Link to={"/genre_movies?gid=53"}><p className={`transition-[200ms] ${genre_id === "53" ? "text-white" : "text-[gray]"} no-underline mt-2.5 hover:cursor-pointer hover:text-[white]`}>Thriller</p></Link>
                    <Link to={"/genre_movies?gid=80"}><p className={`transition-[200ms] ${genre_id === "80" ? "text-white" : "text-[gray]"} no-underline mt-2.5 hover:cursor-pointer hover:text-[white]`}>Crime</p></Link>
                    <Link to={"/genre_movies?gid=99"}><p className={`transition-[200ms] ${genre_id === "99" ? "text-white" : "text-[gray]"} no-underline mt-2.5 hover:cursor-pointer hover:text-[white]`}>Documentary</p></Link>
                    <Link to={"/genre_movies?gid=878"}><p className={`transition-[200ms] ${genre_id === "878" ? "text-white" : "text-[gray]"} no-underline mt-2.5 hover:cursor-pointer hover:text-[white]`}>Science Fiction</p></Link>
                    <Link to={"/genre_movies?gid=9648"}><p className={`transition-[200ms] ${genre_id === "9648" ? "text-white" : "text-[gray]"} no-underline mt-2.5 hover:cursor-pointer hover:text-[white]`}>Mystery</p></Link>
                    <Link to={"/genre_movies?gid=10402"}><p className={`transition-[200ms] ${genre_id === "10402" ? "text-white" : "text-[gray]"} no-underline mt-2.5 hover:cursor-pointer hover:text-[white]`}>Music</p></Link>
                    <Link to={"/genre_movies?gid=10749"}><p className={`transition-[200ms] ${genre_id === "10749" ? "text-white" : "text-[gray]"} no-underline mt-2.5 hover:cursor-pointer hover:text-[white]`}>Romance</p></Link>
                    <Link to={"/genre_movies?gid=10751"}><p className={`transition-[200ms] ${genre_id === "10751" ? "text-white" : "text-[gray]"} no-underline mt-2.5 hover:cursor-pointer hover:text-[white]`}>Family</p></Link>
                    <Link to={"/genre_movies?gid=10752"}><p className={`transition-[200ms] ${genre_id === "10752" ? "text-white" : "text-[gray]"} no-underline mt-2.5 hover:cursor-pointer hover:text-[white]`}>War</p></Link>
                    <Link to={"/genre_movies?gid=10770"}><p className={`transition-[200ms] ${genre_id === "10770" ? "text-white" : "text-[gray]"} no-underline mt-2.5 hover:cursor-pointer hover:text-[white]`}>TV Movie</p></Link>
                </div>
            </OutsideClickHandler>
        </section>
    )
}

export default memo(NavBar);