import {storeToDo, readToDo} from './ls.js';
import {getTimeStamp, updateToDoCountLabel, updateStatusWindow} from './script.js';


class toDoList
{
  constructor(elementID)
  {
    this.parentElement = document.getElementById(elementID);
    this.taskDisplay = "all";
    this.taskCount = 0;  
  }

  showToDoList()
  {
    this.parentElement.innerHTML="";
    renderToDoList(this.parentElement, myToDoList);
    updateStatusWindow(myToDoList);
    updateToDoCountLabel(myToDo);
  }

  displayContentWindow()
  {
    const divToDoListID = document.getElementById('divToDoList');


    let divNewContentID = document.getElementById('divNewContent');
    divNewContentID.innerHTML = '<h1>Enter To Do Description</h1><textarea class="toDoDescription" id="toDoDescription"></textarea><button class="toDoButton" id="saveToDoButton">Save To Do Item</button><button class="cancelToDoButton" id="cancelToDoButton">Cancel</button>'

    const textBoxID = document.getElementById('toDoDescription').focus();

    const saveToDoID = document.getElementById('saveToDoButton');
    saveToDoID.addEventListener('click', addToDoItem);
    const cancelToDoID = document.getElementById('cancelToDoButton');
    cancelToDoID.addEventListener('click', cancelToDoContent);
  }
} 

const myToDo = new toDoList("toDoList");
window.addEventListener('load', ()=>
{
  myToDo.showToDoList();
});

let readData = readToDo();
let myToDoList = JSON.parse(readData);

updateToDoCountLabel(myToDo);
updateStatusWindow(myToDoList);

function renderToDoList(parent, list)
{
  myToDo.taskCount = 0; 
  list.forEach(function(v, i)
  {
    if(myToDo.taskDisplay === "all")
    {
      myToDo.taskCount++;
      parent.appendChild(renderOneToDo(v, i));

      let boxID = "cb"+i;
      const checkBoxId = document.getElementById(boxID);
      checkBoxId.addEventListener('click', updateCompletion)

      let buttonID = "del"+i;
      const delButtonId = document.getElementById(buttonID);
      delButtonId.addEventListener('click', deleteItem)
    }
    else if(myToDo.taskDisplay==="active" && v.completed===false)
    {
      myToDo.taskCount++;
      parent.appendChild(renderOneToDo(v, i));

      let boxID = "cb"+i;
      const checkBoxId = document.getElementById(boxID);
      checkBoxId.addEventListener('click', updateCompletion)

      let buttonID = "del"+i;
      const delButtonId = document.getElementById(buttonID);
      delButtonId.addEventListener('click', deleteItem)
    }
    else if(myToDo.taskDisplay==="completed" && v.completed===true)
    {
      myToDo.taskCount++;
      parent.appendChild(renderOneToDo(v, i));

      let boxID = "cb"+i;
      const checkBoxId = document.getElementById(boxID);
      checkBoxId.addEventListener('click', updateCompletion)

      let buttonID = "del"+i;
      const delButtonId = document.getElementById(buttonID);
      delButtonId.addEventListener('click', deleteItem)
    }
  });

  
}

function renderOneToDo(toDo, i)
{
  const item = document.createElement("li");
  item.setAttribute('data-name', toDo.name);
  let cbUniqueID = "cb"+i; 
  let delUniqueID = "del"+i; 
  if(toDo.completed === true)
  {
    item.setAttribute("class", "toDoChecked");
    item.innerHTML =`<form class="itemForm" name="itemCompleted" action="#"><input type="checkbox" id="${cbUniqueID}" name="completed" value="done" checked="checked"/></form><h2 class="toDoItemChecked">${toDo.content}</h2>`;
  }
  else
  {
    item.innerHTML =`<form class="itemForm" name="itemCompleted" action="#"><input type="checkbox" id="${cbUniqueID}" name="completed" value="done"/></form><h2 class="toDoItem">${toDo.content}</h2>`;
  }
  item.innerHTML+=` <div class="toDoItem">
    <p><strong>Created: </strong>${toDo.created}</p>
    <button class="deleteButton" id="${delUniqueID}">Delete To Do</button>
    <hr style="width:100%; text-align:left; margin:7px 0 0 0"></div>`;

  return item;
}


function addToDoItem()
{
  const textID = document.getElementById('toDoDescription');

  let newID = myToDoList.length+1;
  let arrayID = myToDoList.length;

  let formatNow = getTimeStamp();

  myToDoList[myToDoList.length]=
  {
    created: formatNow,
    id: newID,
    content: textID.value,
    completed: false
  }

  const listID = document.getElementById('toDoList');
  listID.appendChild(renderOneToDo(myToDoList[myToDoList.length-1], arrayID));

  let boxID = "cb"+arrayID;
  const checkBoxId = document.getElementById(boxID);
  checkBoxId.addEventListener('click', updateCompletion)

  let buttonID = "del"+arrayID;
  const delButtonId = document.getElementById(buttonID);
  delButtonId.addEventListener('click', deleteItem)

  myToDo.taskCount++; 
  updateToDoCountLabel(myToDo); 
  updateStatusWindow(myToDoList); 

  localStorage.removeItem('myToDoList');
  storeToDo(myToDoList);

  let divNewContentID = document.getElementById('divNewContent');
  divNewContentID.innerHTML ="";
}

function cancelToDoContent()
{
  let divNewContentID = document.getElementById('divNewContent');
  divNewContentID.innerHTML ="";

  return;
}


function deleteItem(event)
{
  let index = event.currentTarget.id;
  index = index.substring(3);
  myToDoList.splice(index,1);
  myToDoList.forEach(function(_v, i, a)
  {
    a[i].id = i+1;
  });

  updateToDoCountLabel(myToDo);
  myToDo.showToDoList();

  localStorage.removeItem('myToDoList');
  storeToDo(myToDoList);
}

function updateCompletion(event)
{
  let index = event.currentTarget.id;
  index = index.substring(2);
  myToDoList[index].completed = event.currentTarget.checked;
  myToDo.showToDoList();

  localStorage.removeItem('myToDoList');
  storeToDo(myToDoList);
}

function showAll()
{
  myToDo.taskDisplay = "all";
  myToDo.showToDoList();
}

function showActive()
{
  myToDo.taskDisplay = "active";
  myToDo.showToDoList();
}

function showCompleted()
{
  myToDo.taskDisplay = "completed";
  myToDo.showToDoList();
}


const addToDo = document.getElementById('addToDo');
addToDo.addEventListener('click', myToDo.displayContentWindow);
const showAllButtonID = document.getElementById('showAllButton');
showAllButtonID.addEventListener('click', showAll);
const showActiveButtonID = document.getElementById('showActiveButton');
showActiveButtonID.addEventListener('click', showActive);
const showCompletedButtonID = document.getElementById('showCompletedButton');
showCompletedButtonID.addEventListener('click', showCompleted);