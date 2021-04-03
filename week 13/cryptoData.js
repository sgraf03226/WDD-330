/********************************************
 * Author: Stephanie Graf
 * cryptoData
 * Displays the fetched cryptocurrency data
 * from Binance, Gemini, Bitstamp and CoinbasePro 
 ********************************************/

export default class Crypto {
    coins = [
      { symbol: "BTC", fullname: "Bitcoin" },
      { symbol: "ETH", fullname: "Ethereum" },
      { symbol: "BCH", fullname: "Bitcoin Cash" },
      { symbol: "LTC", fullname: "Litecoin" },
      { symbol: "ZEC", fullname: "Zcash" },
      { symbol: "BAT", fullname: "Basic Attention Token" },
      { symbol: "LINK", fullname: "Chainlink" },
      { symbol: "DAI", fullname: "Dai" },
      { symbol: "OXT", fullname: "Orchid" },
      { symbol: "FIL", fullname: "Filecoin" },
      { symbol: "AMP", fullname: "Ampleforth" },
      { symbol: "PAX", fullname: "Paxos Standard" },
      { symbol: "COMP", fullname: "Compound" },
      { symbol: "MKR", fullname: "Maker" },
      { symbol: "ZRX", fullname: "Ox" },
      { symbol: "KNC", fullname: "Kyber Network" },
      { symbol: "STORJ", fullname: "Storj" },
      { symbol: "MANA", fullname: "Decentraland" },
      { symbol: "AAVE", fullname: "Aave" },
      { symbol: "SNX", fullname: "Synthetix" },
      { symbol: "YFI", fullname: "yearn.finance" },
      { symbol: "UMA", fullname: "UMA" },
      { symbol: "BAL", fullname: "Balancer" },
      { symbol: "CRV", fullname: "Curve DAO Token" },
      { symbol: "REN", fullname: "Ren" },
      { symbol: "UNI", fullname: "Unibright" },
    ];
  
    constructor(parent) {
      this.parentElement = parent;
      this.bP = document.getElementById("binancePrice");
      this.cbpP = document.getElementById("coinbaseProPrice");
      this.gP = document.getElementById("geminiPrice");
      this.bitP = document.getElementById("bitstampPrice");
      this.coin;
    }
  
    /********************************************
     * getPriceAll
     * This gets the prices of all the crypto coins
     * and then will emphasize the highest priced one
     *******************************************/
    async getPriceAll(coin, coinName) {
      this.coin = coin;
      this.coinName = coinName;
      this.getPrices(highlight);
    }
  
    /********************************************
     * getPrices
     * This gets the prices of all the crypto coins
     * and then will emphasize the highest priced one
     *******************************************/
    async getPrices(callback) {
      this.bPrice = await this.fetchBinance(this.coin, this.bP);
      this.cPPrice = await this.fetchCoinBasePro(this.coin, this.cbpP);
      this.gPrice = await this.fetchGemini(this.coin, this.gP);
      this.bitPrice = await this.fetchBitstamp(this.coin, this.bitP);
  
      this.setPrice(this.bPrice, this.bP, "Binance");
      this.setPrice(this.cPPrice, this.cbpP, "CoinbasePro");
      this.setPrice(this.gPrice, this.gP, "Gemini");
      this.setPrice(this.bitPrice, this.bitP, "Bitstamp");
  
      callback();
    }


    /********************************************
     * fetchCoinBasePro
     * Fetches the crypto coin prices from CoinbasePro
     *******************************************/
    async fetchCoinBasePro(coin, element) {
      const URL = `https://api.pro.coinbase.com/products/${coin}-USD/ticker`;
      let price = await fetch(URL)
        .then((blob) => blob.json())
        .then((data) => {
          return data.price;
        })
        .catch((error) => {
          console.error("There is an error fetching CoinbasePro data", error);
          this.setPrice("", element, "CoinbasePro");
          return "";
        });
      return parseFloat(price);
    }
  
    /********************************************
     * fetchBinance
     * Fetches the crypto coin prices from Binance
     *******************************************/
    async fetchBinance(coin, element) {
        const URL = `https://api.binance.com/api/v3/ticker/price?symbol=${coin}USDT`;
        let price = await fetch(URL)
          .then((blob) => blob.json())
          .then((data) => {
            return data.price;
          })
          .catch((error) => {
            console.error("There is an error fetching Binance data", error);
            this.setPrice("", element, "Binance");
            return "";
          });
        return parseFloat(price);
      }
  
    /********************************************
     * fetchGemini
     * Fetches the crypto coin prices from Gemini
     *******************************************/
    async fetchGemini(coin, element) {
      const URL = `https://api.gemini.com/v1/pubticker/${coin}usd`;
      let price = await fetch(URL)
        .then((blob) => blob.json())
        .then((data) => {
          return data.last;
        })
        .catch((error) => {
          console.error("There is an error fetching Gemini data", error);
          this.setPrice("", element, "Gemini");
          return "";
        });
      return parseFloat(price);
    }

    /********************************************
     * fetchBitstamp
     * Fetches the crypto coin prices from Bitstamp
     *******************************************/
    async fetchBitstamp(coin, element) {
        const URL = `https://www.bitstamp.net/api/ticker/${coin}usd`;
        let price = await fetch(URL)
          .then((blob) => blob.json())
          .then((data) => {
            return data.last;
          })
          .catch((error) => {
            console.error("There is an error fetching Bitstamp data", error);
            this.setPrice("", element, "Bitstamp");
            return "";
          });
        return parseFloat(price);
      }
  
    /********************************************
     * setPrice
     * This sets and prints the crypto coin price 
     * as well as the crypto coins the user has
     * saved.
     *******************************************/
    setPrice(price, element, exchange) {
      let fixedPrice = parseFloat(price);
      let array = [];
      let total = 0.0;
  
      // local storage
      if (localStorage.getItem("coins")) {
        array = JSON.parse(localStorage.getItem("coins"));
      }
  
      // check ls for saved crypto coins and display price
      array.forEach((c) => {
        if (c.name == this.coinName && c.exchange == exchange) {
          total = c.amount * price;
        }
      });
  
      // make sure the currency is set to USD
      var formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });
  
      total = formatter.format(total);
      fixedPrice = formatter.format(fixedPrice);
  
      // display the crypto coin price as well as the user's total price of the crypto coins
      if (price != undefined && !isNaN(price) && price != "") {
        element.innerHTML = `${fixedPrice} <br> <span class="total">${total}</span>`;
      } else {
        element.innerHTML = ``;
      }
    }
  }
  
  /********************************************
   * highlight
   * The crypto coin that is priced the highest
   * will be larger than the others and highlighted
   *******************************************/
  function highlight() {
    let b = document.getElementById("binancePrice");
    let cbp = document.getElementById("coinbaseProPrice");
    let g = document.getElementById("geminiPrice");
    let bit = document.getElementById("bitstampPrice");
  
    // remove the commas and dollar signs to properly compare prices
    let bPrice = parseFloat(b.innerHTML.substring(1).replace(/,/g, ""));
    let cbpPrice = parseFloat(cbp.innerHTML.substring(1).replace(/,/g, ""));
    let gPrice = parseFloat(g.innerHTML.substring(1).replace(/,/g, ""));
    let bitPrice = parseFloat(bit.innerHTML.substring(1).replace(/,/g, ""));
  
    // set all non-numbers to 0
    bPrice = isNaN(bPrice) ? 0 : bPrice;
    cbpPrice = isNaN(cbpPrice) ? 0 : cbpPrice;
    gPrice = isNaN(gPrice) ? 0 : gPrice;
    bitPrice = isNaN(bitPrice) ? 0 : bitPrice;
  
    // removes the highlight in case after the comparison it is no longer the highest priced
    b.parentElement.classList.remove("highest");
    cbp.parentElement.classList.remove("highest");
    g.parentElement.classList.remove("highest");
    bit.parentElement.classList.remove("highest");
  
    // after the new comparison this adds the highlight back to whichever is priced the highest
    if (bPrice > cbpPrice && bPrice > gPrice && bPrice > bitPrice) {
      b.parentElement.classList.add("highest");
    } else if (cbpPrice > bPrice && cbpPrice > gPrice && cbpPrice > bitPrice) {
      cbp.parentElement.classList.add("highest");
    } else if (gPrice > bPrice && gPrice > cbpPrice && gPrice > bitPrice) {
      g.parentElement.classList.add("highest");
    }else if (bitPrice > gPrice && bitPrice > cbpPrice && bitPrice > bPrice) {
        g.parentElement.classList.add("highest");
      }
  }