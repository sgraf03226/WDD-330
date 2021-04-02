/********************************************
 * Author: Stephanie Graf
 * SavedCoins
 * This will save the crypto coins and their data
 * to the ls as well as display in a table what 
 * has been saved
 ********************************************/

export default class SavedCoins {
    constructor(elementId) {
      this.parentElement = document.getElementById(elementId);
      this.displayInput();
      displayCoins();
    }
  
    /********************************************
     * displayInput
     * This builds and displays the exchange option,
     * input, and button that adds crypto coin to ls
     *******************************************/
    displayInput() {
      // the number of coins inputed
      this.addCoinInput = document.createElement("input");
      this.addCoinInput.id = "addCoinInput";
      this.addCoinInput.placeholder = "# of coins";
      this.addCoinInput.style.visibility = "hidden";
      this.parentElement.appendChild(this.addCoinInput);
  
      // Exchange selected input from Binance, CoinbasePro, Bittrex and Gemini
      this.addExchange = document.createElement("select");
      this.addExchange.id = "addExchange";
      this.addExchange.style.visibility = "hidden";
  
      let eOption = document.createElement("option");
      eOption.value = "";
      eOption.innerHTML = "Exchange";
      eOption.selected = true;
      eOption.disabled = true;
      let cbpOption = document.createElement("option");
      cbpOption.value = "CoinbasePro";
      cbpOption.innerHTML = cbpOption.value;
      let bOption = document.createElement("option");
      bOption.value = "Binance";
      bOption.innerHTML = bOption.value;
      let gOption = document.createElement("option");
      gOption.value = "Gemini";
      gOption.innerHTML = gOption.value;
      let bitOption = document.createElement("option");
      bitOption.value = "Bittrex";
      bitOption.innerHTML = bitOption.value;
  
      this.addExchange.appendChild(eOption);
      this.addExchange.appendChild(cbpOption);
      this.addExchange.appendChild(bOption);
      this.addExchange.appendChild(gOption);
      this.addExchange.appendChild(bitOption);
      this.parentElement.appendChild(this.addExchange);
  
      // add crypto coin button
      this.addCoinButton = document.createElement("button");
      this.addCoinButton.id = "addCoinButton";
      this.addCoinButton.innerHTML = "Add Coins";
      this.addCoinButton.style.visibility = "hidden";
      this.parentElement.appendChild(this.addCoinButton);
  
      // invalid input error
      this.error = document.createElement("div");
      this.error.id = "error";
      this.error.style.visibility = "hidden";
      this.parentElement.appendChild(this.error);
  
      // crypto coins table
      let tableHead = document.createElement("h2");
      tableHead.innerHTML = "My Coins";
      this.parentElement.appendChild(tableHead);
  
      this.coinsTable = document.createElement("table");
      this.coinsTable.id = "coinsTable";
      this.parentElement.appendChild(this.coinsTable);
  
      // add coin button
      this.addCoinButton.addEventListener("click", addCoin);
    }
  }
  
  /********************************************
   * saveLocalStorage
   * Saves the crypto coin data to ls using an array
   *******************************************/
  function saveLocalStorage(coinsArray) {
    localStorage.setItem("coins", JSON.stringify(coinsArray));
  }
  
  /********************************************
   * loadLocalStorage
   * Loads the crypto coin data from the ls,
   * if there is no data then an empty array is
   * returned
   *******************************************/
  function loadLocalStorage() {
    if (localStorage.getItem("coins")) {
      return JSON.parse(localStorage.getItem("coins"));
    } else {
      return [];
    }
  }
  
  /********************************************
   * displayCoins
   * Builds and then displays the crypto coins and their 
   * data (amounts and exchange)
   *******************************************/
  function displayCoins(i = -1) {
    let array = loadLocalStorage();
    let coinsTable = document.getElementById("coinsTable");
    coinsTable.innerHTML = "";
  
    const tr = document.createElement("tr");
  
    const thCoin = document.createElement("th");
    thCoin.innerHTML = "Coin";
    tr.appendChild(thCoin);
    thCoin.addEventListener('click', sortByCoin);
  
    const thAmount = document.createElement("th");
    thAmount.innerHTML = "Amount";
    tr.appendChild(thAmount);
    thAmount.addEventListener('click', sortByAmount);
  
    const thExchange = document.createElement("th");
    thExchange.innerHTML = "Exchange";
    tr.appendChild(thExchange);
    thExchange.addEventListener('click', sortByExchange);
  
    coinsTable.appendChild(tr);
  
    // creates a row for each crypto coin to be displayed
    array.forEach((coin) => {
      const tr = document.createElement("tr");
  
      const tdCoin = document.createElement("td");
      tdCoin.innerHTML = coin.name;
      tr.appendChild(tdCoin);
  
      const tdAmount = document.createElement("td");
      tdAmount.innerHTML = coin.amount;
      tr.appendChild(tdAmount);
  
      const tdExchange = document.createElement("td");
      tdExchange.innerHTML = coin.exchange;
      tr.appendChild(tdExchange);
  
      // When the user clicks this, it will remove the crypto coin and it's data
      tr.addEventListener("mousedown", removeCoin);
      coinsTable.appendChild(tr);
    });
  
    if(i > -1) {
      coinsTable.rows[i+1].cells[1].classList.add('added');
      let add = setTimeout(() => {coinsTable.rows[i+1].cells[1].classList.remove('added')}, 1500);
    }
  
     
  }
  
  /********************************************
   * addCoin
   * this will add a crypto coin to the ls
   *******************************************/
  function addCoin() {
    let array = loadLocalStorage();
    let coin = document.getElementById("search").placeholder;
    let amount = parseFloat(document.getElementById("addCoinInput").value);
    let exchange = document.getElementById("addExchange").value; 
    let i = -1;
  
    // If the user input is invalid an error message will be displayed
    if(!exchange && !amount) {
      document.getElementById("error").innerHTML = "***Input invalid, Please enter a valid number and then choose an exchange***";
      document.getElementById("error").style.visibility = "visible";
    } else if (!amount) {
      document.getElementById("error").innerHTML = "***Input invalid, please enter a valid number***";
      document.getElementById("error").style.visibility = "visible";
    } else if (!exchange) {
      document.getElementById("error").innerHTML = "***Please choose an exchange***";
      document.getElementById("error").style.visibility = "visible";
    } else {
      let exists = false;
      document.getElementById("error").style.visibility = "hidden";
      array.forEach((c, index) => {
        if (c.name == coin && c.exchange == exchange) {
          c.amount += amount;
          exists = true;
          i = index;
        }
      });
  
      // once valid, this will add the crypto coins to the ls using an array
      if (!exists) {
        array.push({ name: coin, amount: amount, exchange: exchange });
      }
      saveLocalStorage(array);
      displayCoins(i);
    }
  }
  
  /********************************************
   * removeCoin
   * This will remove a crypto coin and it's data
   *******************************************/
  function removeCoin() {
    // removes the entire crypto coin row from the table
    this.classList.add('deleted');
    this.style.opacity = 0;
    setTimeout(() => this.parentNode.removeChild(this), 900);
  
   
    let name = this.getElementsByTagName("td")[0].innerHTML;
    let amount = parseFloat(this.getElementsByTagName("td")[1].innerHTML);
    let exchange = this.getElementsByTagName("td")[2].innerHTML;
  
    // searches the ls array for the crypto coin to be removed
    let array = loadLocalStorage();
    let index = -1;
    for(let i = 0; i < array.length; i++) {
      if (array[i].name == name && array[i].exchange == exchange && array[i].amount == amount) {
        index = i;
      }
    }
  
    // this will splice the crypto coin out of the array
    if(index != -1) {
      array.splice(index, 1);
    }
  
    // saves the new array to ls
    saveLocalStorage(array);
  }
  
  
  /********************************************
   * sortByCoin
   * An alphabetical sort for the crypto coins
   * in the table
   *******************************************/
  function sortByCoin() {
    let array = loadLocalStorage();
    array.sort((a,b)=>{
      let aname = a.name;
      let bname = b.name;
      if(aname < bname) {return -1;}
      if(aname > bname) {return 1;}
      return 0;
    });
    saveLocalStorage(array);
    displayCoins();
  }
  
  /********************************************
   * sortByAmount
   * An numerical sort (highest to lowest) for 
   * the crypto coins in the table
   *******************************************/
  function sortByAmount() {
    let array = loadLocalStorage();
  
    array.sort((a,b)=>{
      return b.amount - a.amount;
    });
  
    saveLocalStorage(array);
    displayCoins();
  }
  
  /********************************************
   * sortByExchange
   * An alphabetical exchange sort for the crypto
   * coins in the table
   *******************************************/
  function sortByExchange() {
    let array = loadLocalStorage();
    array.sort((a,b)=>{
      let aname = a.name;
      let bname = b.name;
      if(aname < bname) {return -1;}
      if(aname > bname) {return 1;}
      return 0;
    });
  
    array.sort((a,b)=>{
      let aexchange = a.exchange;
      let bexchange = b.exchange;
      if(aexchange < bexchange) {return -1;}
      if(aexchange > bexchange) {return 1;}
      return 0;
    })
    saveLocalStorage(array);
    displayCoins();
  }