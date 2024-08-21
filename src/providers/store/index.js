import { createStore } from "redux";

const store = createStore(
    (state, action)=>{
        switch (action.type){
            case true:
                return{
                    is_menu_opened: action.payload
                };

            case false:
                return{
                    is_menu_opened: action.payload
                };

            default:
                return{
                    ...state,
                    is_menu_opened: action.payload
                };
        }
    }
)

export default store;