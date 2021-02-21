export function getTimeStamp()
{
  let now = new Date();
  let dateTimeOpt =
  {
    weekday: "long",
    month: "long",
    year: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZoneName: "short"
  }
  let formattedTime = Intl.DateTimeFormat("en-US", dateTimeOpt).format(now)
  return formattedTime;
}

export function updateToDoCountLabel(myToDo)
{
  const showToDoListTitleID = document.getElementById('showToDoListTitle');
  switch(myToDo.taskDisplay)
  {
    case 'all':
      showToDoListTitleID.innerHTML = `All To Do's (Count=${myToDo.taskCount})<hr style="width:100%; text-align:left; margin-left:0">`;
    break;
    case 'active':
      showToDoListTitleID.innerHTML = `Active To Do's (Count=${myToDo.taskCount})<hr style="width:100%; text-align:left; margin-left:0">`;
    break;
    case 'completed':
      showToDoListTitleID.innerHTML = `Completed To Do's (Count=${myToDo.taskCount})<hr style="width:100%; text-align:left; margin-left:0">`;
    break;
  }
}

export function updateStatusWindow(myToDoList)
{
  let remainingCount=0, completedCount=0;
  myToDoList.forEach(value=>
  {
      if(value.completed === false)
      {
        remainingCount++;
      }
      else
      {
        completedCount++;
      }
  });

  const remainingTasksID = document.getElementById('remainingTasks');
  remainingTasksID.innerHTML = `<strong>Remaining Tasks = ${remainingCount}</strong>`;
  const completedTasksID = document.getElementById('completedTasks');
  completedTasksID.innerHTML = `<strong>Completed Tasks = ${completedCount}</strong></br>`;
}