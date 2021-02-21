export function storeToDo(data)
{
    localStorage.myToDoListLS = JSON.stringify(data);
}

export function readToDo()
{
  const copyData = localStorage.getItem('myToDoListLS');
  if(copyData === null) 
  {
    const myToDoListLS = [];
    storeToDo(myToDoListLS);
    copyData = localStorage.getItem('myToDoListLS');
  }
  return copyData;
}