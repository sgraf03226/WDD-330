import Crypto from "./cryptoData.js";
import SavedCoins from "./cryptoCoins.js";

/********************************************
 * Author: Stephanie Graf
 * CryptoBuild
 * This builds the page 
 ********************************************/

export default class CryptoBuild {

  constructor(elementId) {
    this.parentElement = document.getElementById(elementId);
    this.buildPage();
    this.myInterval;
  }

  /***********************************************************
   * buildPage
   * This Builds and displays the search, timestamp, 
   * exchange, suggestions and the saved crypto coins table
   ***********************************************************/
  buildPage() {
    this.parentElement.innerHTML = "";

    // Exchanges
    const exchangeContainer = document.createElement("div");
    exchangeContainer.id = "exchangeContainer";
    this.parentElement.appendChild(exchangeContainer);
    this.buildExchangeDiv("coinbasePro", exchangeContainer);
    this.buildExchangeDiv("binance", exchangeContainer);
    this.buildExchangeDiv("gemini", exchangeContainer);
    this.buildExchangeDiv("bitstamp", exchangeContainer);

    // Timestamp
    this.timestamp = document.createElement("h5");
    this.timestamp.id = "timestamp";
    this.parentElement.appendChild(this.timestamp);

    // Search
    this.search = document.createElement("input");
    this.search.type = "text";
    this.search.placeholder = "search coins";
    this.search.id = "search";
    this.search.autocomplete = "off";
    this.search.addEventListener("change", this.displayMatches);
    this.search.addEventListener("keyup", this.displayMatches);
    this.parentElement.appendChild(this.search);

    // Suggestions
    this.suggestions = document.createElement("ul");
    this.suggestions.id = "suggestions";
    this.parentElement.appendChild(this.suggestions);

    // Saved Coins Table
    const savedCoins = new SavedCoins(this.parentElement.id);
  }

  /***********************************************************
   * buildExchangeDiv
   * This Builds the names and prices for the exchange
   ***********************************************************/
  buildExchangeDiv(id, exchangeContainer) {
    const exchangeDiv = document.createElement("div");
    exchangeDiv.id = id;
    exchangeDiv.className = "exchange";

    // Exchange names
    const exchangeName = document.createElement("h3");
    exchangeName.id = id + "Name";
    exchangeName.innerHTML = id.charAt(0).toUpperCase() + id.slice(1);
    exchangeDiv.appendChild(exchangeName);

    // Exchange prices
    const price = document.createElement("h3");
    price.id = id + "Price";
    price.className = "price";
    exchangeDiv.appendChild(price);

    exchangeContainer.appendChild(exchangeDiv);
  }

  /***********************************************************
   * dispalyMatches
   * This will display the search results
   ***********************************************************/
  displayMatches() {

    // during the search this will hide the add coins items
    document.getElementById("suggestions").innerHTML = "";
    document.getElementById("addCoinInput").style.visibility = "hidden";
    document.getElementById("addCoinButton").style.visibility = "hidden";
    document.getElementById("addExchange").style.visibility = "hidden";

    // crypto coins filter
    const myCrypto = new Crypto(this.parentElement);
    const matchArray = myCrypto.coins.filter((coin) => {
      const regex = new RegExp(this.value, "gi");
      return coin.symbol.match(regex) || coin.fullname.match(regex);
    });

    // list of the search results
    matchArray.forEach((coin) => {
      const regex = new RegExp(this.value, "gi");

      const li = document.createElement("li");
      li.className = "coinList";
      li.innerHTML = `<span class="coin">${coin.symbol} - ${coin.fullname}</span>`;
      document.getElementById("suggestions").appendChild(li);

      // creates a placeholder for clicked on search items but clears the suggestions
      li.addEventListener("mousedown", () => {
        document.getElementById("suggestions").innerHTML = '';
        document.getElementById("search").value = '';
        document.getElementById("search").placeholder = `${coin.symbol} - ${coin.fullname}`;

        // Shows coins that can be added to the table and the ls
        document.getElementById("addCoinInput").style.visibility = "visible";
        document.getElementById("addCoinButton").style.visibility = "visible";
        document.getElementById("addExchange").style.visibility = "visible";

        // display the time the crypto coin was priced that way
        myCrypto.getPriceAll(coin.symbol, `${coin.symbol} - ${coin.fullname}`);
        displayTime();

        // clear previous interval if this is not the user's first search
        if (this.myInterval) {
          window.clearInterval(this.myInterval);
        }

        // check the crypto coin price every 5000 ms
        this.myInterval = window.setInterval(function () {
          const myCrypto = new Crypto(this.parentElement);
          myCrypto.getPriceAll(coin.symbol, `${coin.symbol} - ${coin.fullname}`);
          displayTime();
        }, 5000);
      });
    });
  }
}

/***********************************************************
* displayTime
* Displays a timestamp of the current time to help track
* crypto coin trends
***********************************************************/
function displayTime() {

  let timestamp = document.getElementById("timestamp");

  let date = new Date();
  let hours24 = date.getHours();
  let hours = ((hours24 + 11) % 12) + 1;
  let amPM = hours24 > 11 ? "PM" : "AM";
  let minutes =
    date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes();
  let seconds =
    date.getSeconds() > 9 ? date.getSeconds() : "0" + date.getSeconds();

  timestamp.innerHTML = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} -- ${hours}:${minutes}:${seconds} ${amPM}`;
}