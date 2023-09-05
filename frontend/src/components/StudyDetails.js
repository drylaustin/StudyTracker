import { useStudyContext } from "../hooks/useStudyContext";
import { useAuthContext } from "../hooks/useAuthContext";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const StudyDetails = ({ task }) => {
  const maxCharacters = 30;
  const { dispatch } = useStudyContext();
  const { user } = useAuthContext()

  const handleClick = async () => {

    if (!user) {
      return
    }
    const response = await fetch("/api/tasks/" + task._id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_TASK", payload: json });
    }
  };

  return (
    <div className="study-details">
      <h4>{task.topic}</h4>
      <p>
        <strong>Description:</strong>&nbsp;{task.description}
      </p>
      <p>
        <strong>Link:</strong>&nbsp;
        <a href={task.link}>
          {task.link.length > maxCharacters
            ? task.link.substring(0, maxCharacters) + "\u2026"
            : task.link}
        </a>
      </p>
      <p>
        {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}
      </p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

export default StudyDetails;
