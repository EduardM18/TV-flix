import { memo } from "react";
import Header from "./header";

function Layout(props){
    return(
        <>
            <Header/>
            {props.children}
        </>
    )
}

export default memo(Layout);