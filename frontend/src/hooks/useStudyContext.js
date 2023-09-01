import { StudyContext } from "../context/StudyContext";
import { useContext } from "react";

export const useStudyContext = () => {
    const context = useContext(StudyContext)

    if (!context) {
        throw Error('useStudyContext must be used insde StudyContextProvider')
    }

    return context
}
