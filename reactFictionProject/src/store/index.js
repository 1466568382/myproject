import { createStore, combineReducers } from "redux";


export const defaultValue = {
    // collectDatas: [
    // ],
}


function collect(state=[],action){
    switch(action.type){
        case "ADD_COLLECT":
            return [...state,action.collectData]
        case "REMOVE_COLLECT":
            return state.filter(t => t._id !== action.id)
        default:
            return state
    }   
}

const reducer=combineReducers({
    collect
})

export const store=createStore(reducer,defaultValue)