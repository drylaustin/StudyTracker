import { useAuthContext } from "./useAuthContext"
import { useStudyContext } from "./useStudyContext"

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: taskDispatch } = useStudyContext()


    const logout = () => {
        // remove user from storage
        localStorage.removeItem('user')

        // dispatch logout action
        dispatch({type: 'LOGOUT'})
        taskDispatch({ type: 'SET_TASKS', payload: null})
    }

    return {logout}
}