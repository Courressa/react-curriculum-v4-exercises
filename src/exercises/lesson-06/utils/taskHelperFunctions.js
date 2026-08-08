export const filterTask = (filter, tasks) => {
  let visibleTasks = tasks;

  if (filter === 'completed') {
    visibleTasks = tasks.filter((task) => task.completed);
  }

  if (filter === 'pending') {
    visibleTasks = tasks.filter((task) => !task.completed);
  }

  return visibleTasks;
};
