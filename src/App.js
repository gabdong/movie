import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [coin, setCoin] = useState(0);
  const [money, setMoney] = useState(0);
  const [coinSymbol, setCoinSymbol] = useState(null);
  const [result, setResult] = useState(null);
  const [resultLoading, setResultLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((res) => res.json())
      .then((json) => {
        setCoins(json);
        setCoin(json[0].quotes.USD.price);
        setLoading(false);
      });
  }, []);

  const moneyToCoin = (e) => {
    e.preventDefault();

    setResult(money / coin);
    setResultLoading(false);
  };

  const changeMoney = (e) => setMoney(e.target.value);
  const changeCoin = (e) => {
    const option = document.getElementById(e.target.value);
    setCoin(option.dataset.price);
    setCoinSymbol(option.dataset.name);
    setResultLoading(true);
  };
  const changeCoinSymbol = (e) => {
    setCoinSymbol(e.target.dataset.symbol);
  };

  return (
    <div>
      {loading ? null : (
        <form onSubmit={moneyToCoin}>
          <input
            type="number"
            placeholder="Insert your money"
            name="money"
            onChange={changeMoney}
            value={money}
          />
          <select name="coin" onChange={changeCoin}>
            <option value="none">select option</option>
            {coins.map((item, idx) => {
              return (
                <option
                  key={item.id}
                  value={item.id}
                  data-price={item.quotes.USD.price}
                  data-name={item.symbol}
                  onClick={changeCoinSymbol}
                  id={item.id}
                >
                  {item.name} ({item.symbol})
                </option>
              );
            })}
          </select>
          <button>Change</button>
        </form>
      )}
      {resultLoading ? null : (
        <p>
          Result is {result}
          {coinSymbol}
        </p>
      )}
    </div>
  );
}

export default App;
