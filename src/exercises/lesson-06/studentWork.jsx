import { useState } from 'react';
import UserProfile from './components/UserProfile.jsx';
import FilterButton from './components/FilterButton.jsx';
import Task from './components/Task.jsx';
import { filterTask } from './utils/taskHelperFunctions.js';
import { useTaskData } from './hooks/useTaskData.js';

export default function StudentWork() {
  const [filter, setFilter] = useState('all');

  //  #1: Data fetching + state + UI logic all mixed together
  const { loading, tasks } = useTaskData();

  // #2: Filtering logic inside component
  let visibleTasks = filterTask(filter, tasks);

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  return (
    <div>
      {/* #3: Hardcoded UI, not reusable */}
      <UserProfile name={''} />

      {/* #4: Repeated button JSX */}
      <div>
        <FilterButton setFilter={setFilter} />
        <p>Current filter: {filter}</p>
      </div>

      {/* #5: Inline list rendering */}
      <ul>
        {visibleTasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
}
