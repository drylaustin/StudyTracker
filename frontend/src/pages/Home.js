import { useEffect } from "react";
import { useStudyContext } from "../hooks/useStudyContext";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import StudyDetails from "../components/StudyDetails";
import StudyForm from "../components/StudyForm";

const Home = () => {
  const { tasks, dispatch } = useStudyContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("/api/tasks", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_TASKS", payload: json });
      }
    };

    if (user) {
      fetchTasks();
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="tasks">
        {tasks &&
          tasks.map((task) => <StudyDetails key={task._id} task={task} />)}
      </div>
      <StudyForm />
    </div>
  );
};

export default Home;
