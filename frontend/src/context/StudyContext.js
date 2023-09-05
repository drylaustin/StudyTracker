import { createContext, useReducer } from 'react'

export const StudyContext = createContext()

export const tasksReducer = (state, action) => {
    switch (action.type) {
        case 'SET_TASKS':
            return {
                tasks: action.payload
            }
        case 'CREATE_TASK':
            return {
                tasks: [action.payload, ...state.tasks]
            }   
        case 'DELETE_TASK':
            return {
                tasks: state.tasks.filter((t) => t._id !== action.payload._id)
            }    
        default:
            return state     

    }
}



export const StudyContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(tasksReducer, {
        tasks: null
    })

    return (
        <StudyContext.Provider value={{...state, dispatch}}>
            { children }
        </StudyContext.Provider>
    )

}
