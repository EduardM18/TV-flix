import { Link } from "react-router-dom";

function Page404(){
    return(
        <div className="flex items-center flex-col min-w-[83vw] h-[87vh] relative bg-[rgba(25,24,32,1)] overflow-auto pb-[6vh] rounded-tl-[40px]">
            <div className="w-full p-5">
                <h1 className="text-[white] text-[50px] mt-[50px] pl-5">Page is not found</h1>
                <div className="flex flex-row flex-wrap justify-center items-center gap-y-7 gap-x-[22px] pt-10 pb-[27px]">
                  
                </div>
            </div>
            <Link to="/"><div className="relative -translate-x-2/4 flex justify-center items-center bg-[rgba(219,0,40,1)] text-[white] w-[200px] h-[45px] text-[17px] transition-[250ms] mt-[15px] rounded-[10px] left-2/4 hover:cursor-pointer hover:w-[250px] hover:tracking-[2px]"><i class="fa-solid fa-arrow-left mr-[10px]"></i>Go to home page</div></Link>
        </div>
    )
}

export default Page404;