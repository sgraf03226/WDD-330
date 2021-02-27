const peopleButton = document.getElementById('people');
const shipsButton = document.getElementById('ships');
const outputDiv1 = document.getElementById('output1');
const outputDiv2 = document.getElementById('output2');
const outputDiv3 = document.getElementById('output3');
const outputDiv4 = document.getElementById('output4');

const swPeopleURL = 'https://swapi.dev/api/people/';
const swShipsURL = 'https://swapi.dev/api/starships/';

let peopleList = [];
let shipsList = [];

let currentURL = "", nextURL = "", prevURL = "";
let totalPeople = 0, totalShips=0;
let peopleStart=1, shipsStart=1, peopleEnd=10, shipsEnd=10;
let direction = ""; 

peopleButton.addEventListener('click', renderPeople, false);
shipsButton.addEventListener('click', renderShips, false);

function renderShips(URL)
{    
  if(URL === event)
  {
    URL = 'https://swapi.dev/api/starships/';
    currentURL = 'https://swapi.dev/api/starships/';
    shipsStart = 1;
    direction = "none";
  }
  else
  {
      currentURL = URL;
  }


  fetch(URL)
  .then(response =>
  {
    outputDiv1.innerHTML = 'Waiting for Response ...';
    if(response.ok)
    {
      return response;
    }
    throw Error(response.statusText);
  })
  .then(response => response.text())
  .then(text =>
  {
    shipsList = JSON.parse(text);
    totalShips = shipsList.count;

    if(direction==='next' && (shipsStart+10)<=totalShips)
    {
      shipsStart+=10;
    }
    else if(direction==='prev' && (shipsStart-10)>0)
    {
          shipsStart-=10;
    }

    let outputString1 ="", outputString2="", outputString3="";
    let listCounter = 0;
    let alinkID = "name";
    shipsList.results.forEach((item, i) =>
    {
        listCounter++;
        alinkID+=i;
        if(listCounter<=5)
        {
          outputString1+=`<ul><li class="listTitle"><a href="#" id="${alinkID}" class="nameLink"><strong>Name: </strong>${item.name}</a></li><li><strong>Starship Class: </strong>${item.starship_class}</li><li><strong>Crew: </strong>${item.crew}</li><li><strong>Passengers: </strong>${item.passengers}</li></ul>`;
          alinkID="name";
        }
        else
        {
          outputString3+=`<ul><li class="listTitle"><a href="#" id="${alinkID}" class="nameLink"><strong>Name: </strong>${item.name}</a></li><li><strong>Starship Class: </strong>${item.starship_class}</li><li><strong>Crew: </strong>${item.crew}</li><li><strong>Passengers: </strong>${item.passengers}</li></ul>`;
          alinkID="name";
        }
    });

    calcRangeEnd('ships');
    outputString2 += `<button id="prevShipsButton" class="prevButton"><-Previous</button><button id="nextShipsButton" class="nextButton">Next-></button><p class="shipCount">Total Starships = ${totalShips}</p><p class="shipRange">(Starship ${shipsStart} - Starship ${shipsEnd})</p><br>`;

    let i=0;
    let rangeCount=Math.floor(totalShips/10);
    let outputStringRangeLinks="";
    let range="rangeS";
    let pageStart=1, rangeEnd=1;
    for(i=0; i<=rangeCount; i++, pageStart+=10)
    {
      range+=(i+1);
      rangeEnd = (pageStart+9)>totalShips ? totalShips : pageStart+9;
      outputStringRangeLinks+=`<p class="rangeLink"><a href="#" id="${range}">Page ${i+1} (${pageStart}-${rangeEnd})</a></p>`;
      range="rangeS";
    }

    outputString2+= outputStringRangeLinks;

    outputDiv1.innerHTML = outputString1;
    outputDiv2.innerHTML = outputString2;
    outputDiv3.innerHTML = outputString3;
    outputDiv4.innerHTML = "";

    alinkID = "name";
    let nameLinkID = "";
    shipsList.results.forEach((item, i) =>
    {
      alinkID+=i;
      nameLinkID = document.getElementById(alinkID);
      nameLinkID.addEventListener('click', displayShipDetails);
      alinkID="name";
    });

    i=0;
    rangeCount=Math.floor(totalShips/10);
    range="rangeS";
    pageStart=1;
    for(i=0; i<=rangeCount; i++)
    {
      range+=(i+1);
      let pagesLinkID = document.getElementById(range);
      pagesLinkID.addEventListener('click', displayPage);
      range="rangeS";
    }

    const nextButtonID = document.getElementById('nextShipsButton');
    const prevButtonID = document.getElementById('prevShipsButton');
    nextButtonID.addEventListener('click', displayNext);
    prevButtonID.addEventListener('click', displayPrev);
  })
  .catch(error => console.log('There was an error: ', error))
};


function renderPeople(URL)
{
  if(URL === event)
  {
    URL = 'https://swapi.dev/api/people/';
    currentURL = 'https://swapi.dev/api/people/';
    peopleStart = 1;
    direction = "none";
  }
  else
  {
      currentURL = URL;
  }

  fetch(URL)
  .then(response =>
  {
    outputDiv1.innerHTML = 'Waiting for Response ...';
    if(response.ok)
    {
      return response;
    }
    throw Error(response.statusText);
  })
  .then(response => response.text())
  .then(text =>
  {
    if(direction==='next' && (peopleStart+10)<=(totalPeople))
    {
      peopleStart+=10;
    }
    else if(direction==='prev' && (peopleStart-10)>0)
    {
          peopleStart-=10;
    }
    peopleList = JSON.parse(text);
    totalPeople = peopleList.count;
    let outputString1 ="", outputString2="", outputString3="";
    let listCounter = 0;
    let alinkID = "name";
    peopleList.results.forEach((item, i) =>
    {
        listCounter++;
        alinkID+=i;
        if(listCounter<=5)
        {
          outputString1+=`<ul><li class="listTitle"><a href="#" id="${alinkID}" class="nameLink"><strong>Name: </strong>${item.name}</a></li><li><strong>Birth Year: </strong>${item.birth_year}</li><li><strong>Eye Color: </strong>${item.eye_color}</li><li><strong>Gender: </strong>${item.gender}</li></ul>`;
          alinkID="name";
        }
        else
        {
          outputString3+=`<ul><li class="listTitle"><a href="#" id="${alinkID}" class="nameLink"><strong>Name: </strong>${item.name}</a></li><li><strong>Birth Year: </strong>${item.birth_year}</li><li><strong>Eye Color: </strong>${item.eye_color}</li><li><strong>Gender: </strong>${item.gender}</li></ul>`;
          alinkID="name";
        }
    });

    calcRangeEnd('people');
    outputString2 += `<button id="prevPeopleButton" class="prevButton"><-Previous</button><button id="nextPeopleButton" class="nextButton">Next-></button><p class="peopleCount">Total People = ${totalPeople}</p><p class="peopleRange">(Person ${peopleStart} - Person ${peopleEnd})</p><br>`;

    let i=0;
    let rangeCount=Math.floor(totalPeople/10);
    let outputStringRangeLinks="";
    let range="rangeP";
    let pageStart=1, rangeEnd=1;
    for(i=0; i<=rangeCount; i++, pageStart+=10)
    {
      range+=(i+1);
      rangeEnd = (pageStart+9)>totalPeople ? totalPeople : pageStart+9;
      outputStringRangeLinks+=`<p class="rangeLink"><a href="#" id="${range}">Page ${i+1} (${pageStart}-${rangeEnd})</a></p>`;
      range="rangeP";
    }

    outputString2+= outputStringRangeLinks;

    outputDiv1.innerHTML = outputString1;
    outputDiv2.innerHTML = outputString2;
    outputDiv3.innerHTML = outputString3;
    outputDiv4.innerHTML = "";

    alinkID = "name";
    let nameLinkID = "";
    peopleList.results.forEach((item, i) =>
    {
      alinkID+=i;
      nameLinkID = document.getElementById(alinkID);
      nameLinkID.addEventListener('click', displayPersonDetails);
      alinkID="name";
    });

    i=0;
    rangeCount=Math.floor(totalPeople/10);
    range="rangeP";
    pageStart=1;
    for(i=0; i<=rangeCount; i++)
    {
      range+=(i+1);
      let pagesLinkID = document.getElementById(range);
      pagesLinkID.addEventListener('click', displayPage);
      range="rangeP";
    }

    const nextButtonID = document.getElementById('nextPeopleButton');
    const prevButtonID = document.getElementById('prevPeopleButton');
    nextButtonID.addEventListener('click', displayNext);
    prevButtonID.addEventListener('click', displayPrev);
  })
  .catch(error => console.log('There was an error: ', error))
};

function displayPage(e)
{
  let pageID = e.target.id.substring(6);
  const pageType = e.target.id.substring(0, 6);
  if(pageType === "rangeP")
  {
    let pageURL = swPeopleURL;
    pageURL+="?page=" + pageID;
    peopleStart = 10*pageID - 9;
    direction = "none";
    renderPeople(pageURL);
  }
  else 
  {
    let pageURL = swShipsURL;
    pageURL+="?page=" + pageID;
    shipsStart = 10*pageID - 9;
    direction = "none";
    renderShips(pageURL);
  }
}

function calcRangeEnd(type)
{
  if(type==="ships")
  {
    if((shipsStart+10) > totalShips)
    {
      shipsEnd = shipsStart +(totalShips-shipsStart);
    }
    else
    {
        shipsEnd = shipsStart+9;
    }
  }
  else if(type==="people")
  {
    if((peopleStart+10) > totalPeople)
    {
      peopleEnd = peopleStart +(totalPeople-peopleStart);
    }
    else
    {
        peopleEnd = peopleStart+9;
    }
  }
}

function displayShipDetails(e)
{
  let nameID = e.currentTarget.id;
  nameID = nameID.substring(4);
  renderOneShip(nameID);
}

function displayPersonDetails(e)
{
  let nameID = e.currentTarget.id;
  nameID = nameID.substring(4);
  renderPerson(nameID);
}

function renderPerson(ID)
{
  let URL = peopleList.results[ID].homeworld;
  let testURL = URL.substring(0, 5);
  if(testURL === "http:")
  {
    testURL=URL.substring(5);
    URL="https:" + testURL;
  }

  let homeWorld = [];
  let homePlanet = "";
  fetch(URL)
  .then(response =>
  {
    if(response.ok)
    {
      return response;
    }
    throw Error(response.statusText);
  })
  .then(response => response.text())
  .then(text =>
  {
    homeWorld = JSON.parse(text);

    if(homeWorld.name === null)
    {
      homePlanet = "Unknown";
    }
    else
    {
        homePlanet = homeWorld.name;
    }

    const outputString1 =`<h1 class="detailsTitle">${peopleList.results[ID].name}</h1><ul><li><strong>Birth Year: </strong>${peopleList.results[ID].birth_year}</li><li><strong>Eye Color: </strong>${peopleList.results[ID].eye_color}</li><li><strong>Gender: </strong>${peopleList.results[ID].gender}</li><li><strong>Hair Color: </strong>${peopleList.results[ID].hair_color}</li></ul>`;

    const outputString3 = `<h1 class="detailsTitle">${peopleList.results[ID].name}</h1><ul><li><strong>Home World: </strong>${homePlanet}</li><li><strong>Height: </strong>${peopleList.results[ID].height} cm</li><li><strong>Mass: </strong>${peopleList.results[ID].mass} kg</li><li><strong>Skin Color: </strong>${peopleList.results[ID].skin_color}</li></ul>`;

    const outputString4 = `<h1 class="definitionsTitle"><strong>Definitions</strong></h1><p class="definitions"><strong>BIRTH YEAR: </strong>The birth year of the person, using the in-universe standard of BBY or ABY - Before the Battle of Yavin or After the Battle of Yavin. The Battle of Yavin is a battle that occurs at the end of Star Wars episode IV: A New Hope.</p><p class="definitions"><strong>EYE COLOR: </strong>The eye color of this person. Will be "unknown" if not known or "n/a" if the person does not have an eye.</p><p class="definitions"><strong>GENDER: </strong>The gender of this person. Either "Male", "Female" or "unknown", "n/a" if the person does not have a gender.</p><p class="definitions"><strong>HAIR COLOR: </strong>The hair color of this person. Will be "unknown" if not known or "n/a" if the person does not have hair.</P><p class="definitions"><strong>HOME WORLD: </strong>A planet that this person was born on or inhabits.</p><p class="definitions"><strong>HEIGHT: </strong>The height of the person in centimeters.</p><p class="definitions"><strong>MASS: </strong>The mass of the person in kilograms.</p><p class="definitions"><strong>SKIN COLOR: </strong>The skin color of this person.</p>`;

    const outputString2=`<button id='backToPeople' class="swpButton">Back to People</button>`

    outputDiv1.innerHTML = "";
    outputDiv2.innerHTML = outputString2;
    outputDiv3.innerHTML = outputString3;
    outputDiv1.innerHTML = outputString1;
    outputDiv4.innerHTML = outputString4;

    const backToPeopleID = document.getElementById('backToPeople');

    backToPeopleID.addEventListener('click', displayNext);

  })
  .catch(error => console.log('There was an error: ', error))
}


function renderOneShip(ID)
{
  const outputString1 =`<h1 class="detailsTitle">${shipsList.results[ID].name}</h1><ul><li><strong>Startship Class: </strong>${shipsList.results[ID].starship_class}</li><li><strong>Created: </strong>${shipsList.results[ID].created}</li><li><strong>Crew: </strong>${shipsList.results[ID].crew}</li><li><strong>Passengers: </strong>${shipsList.results[ID].passengers}</li><li><strong>Cargo Capacity: </strong>${shipsList.results[ID].cargo_capacity} kg</li></ul>`;

  const outputString3 = `<h1 class="detailsTitle">${shipsList.results[ID].name}</h1><ul><li><strong>Cost In Credits: </strong>${shipsList.results[ID].cost_in_credits}</li><li><strong>Hyperdrive Rating: </strong>${shipsList.results[ID].hyperdrive_rating}</li><li><strong>Length: </strong>${shipsList.results[ID].lenth} meters</li><li><strong>Manufacturer: </strong>${shipsList.results[ID].manufacturer}</li><li><strong>Maximum Atmosphering Speed: </strong>${shipsList.results[ID].max_atmosphering_speed}</li></ul>`;

  const outputString4 = `<h1 class="definitionsTitle"><strong>Definitions</strong></h1><p class="definitions"><strong>STARSHIP CLASS: </strong>The class of this starship, such as "Starfighter" or "Deep Space Mobile Battlestation"</p><p class="definitions"><strong>CREATED: </strong>The ISO 8601 date format of the time that this resource was created.</p><p class="definitions"><strong>CREW: </strong>The number of personnel needed to run or pilot this starship.</p><p class="definitions"><strong>PASSENGERS: </strong>The number of non-essential people this starship can transport.</P><p class="definitions"><strong>CARGO CAPACITY: </strong>The maximum number of kilograms that this starship can transport.</p><p class="definitions"><strong>COST IN CREDITS: </strong>The cost of this starship new, in galactic credits.</p><p class="definitions"><strong>HYPERDRIVE RATING: </strong>The class of this starships hyperdrive.</p><p class="definitions"><strong>LENGTH: </strong>The length of this starship in meters.</p><p class="definitions"><strong>MANUFACTURER: </strong>The manufacturer of this starship. Comma separated if more than one.</p><p class="definitions"><strong>MAXIMUM ATMOSPHERING SPEED: </strong>The maximum speed of this starship in the atmosphere. "N/A" if this starship is incapable of atmospheric flight.</p>`;

  const outputString2=`<button id='backToShips' class="swsButton">Back to Starships</button>`

  outputDiv1.innerHTML = "";
  outputDiv2.innerHTML = outputString2;
  outputDiv3.innerHTML = outputString3;
  outputDiv1.innerHTML = outputString1;
  outputDiv4.innerHTML = outputString4;

  const backToShipsID = document.getElementById('backToShips');
  backToShipsID.addEventListener('click', displayNext);
}



function displayNext(e)
{
  if(e.target.id==="nextPeopleButton")
  {
    if(peopleList.next === null)
    {
      alert("No additional people in list!");
      return;
    }
    direction = 'next';
    renderPeople(peopleList.next);
  } 
  else if(e.target.id==='backToPeople')
  {
    direction="none"; 
    renderPeople(currentURL);
  }
  else if(e.target.id==='backToShips')
  {
    direction="none"; 
    renderShips(currentURL);
  }
  else 
  {
    if(shipsList.next === null)
    {
      alert("No additional Starships in list!");
      return;
    }
    direction = "next";
    renderShips(shipsList.next);
  }
}

function displayPrev(e)
{
  if(e.target.id==="prevPeopleButton")
  {
      if(peopleList.previous === null)
      {
        alert("No previous people in list!");
        return;
      }
      direction = 'prev';
      renderPeople(peopleList.previous);
  }
  else 
  {
    if(shipsList.previous === null)
    {
      alert("No previous Starships in list!");
      return;
    }
    direction = 'prev';
    renderShips(shipsList.previous);
  }
}