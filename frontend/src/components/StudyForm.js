import { useState } from "react"
import { useStudyContext } from "../hooks/useStudyContext"
import { useAuthContext } from "../hooks/useAuthContext"

const StudyForm = () => {
    const { dispatch } = useStudyContext()
    const { user } = useAuthContext()

    const [topic, setTopic] = useState('')
    const [description, setDescription] = useState('')
    const [link, setLink] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
        }

        const task = {topic, description, link}

        const response = await fetch('/api/tasks', {
            method: 'POST',
            body: JSON.stringify(task),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setTopic('') 
            setDescription('')
            setLink('')
            setError(null)
            setEmptyFields([])
            console.log('New task added')
            dispatch({type: 'CREATE_TASK', payload: json})
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add New Task</h3>

            <label>Study Topic: </label>
            <input 
                type="text"
                onChange={(e) => setTopic(e.target.value)}
                value={topic}
                className={emptyFields.includes('topic') ? 'error' : ''}
            />

            <label>Description: </label>
            <input 
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className={emptyFields.includes('description') ? 'error' : ''}

            />

            <label>Link: </label>
            <input 
                type="text"
                onChange={(e) => setLink(e.target.value)}
                value={link}
                className={emptyFields.includes('link') ? 'error' : ''}

            />

            <button>Add Task</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default StudyForm