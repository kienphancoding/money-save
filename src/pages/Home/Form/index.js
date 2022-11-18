import { useState } from "react";
import clsx from "clsx";
import style from "./FormMoney.module.scss";
import { Link } from "react-router-dom";

const FormMoney = () => {
  // function compareValues(key, order = "asc") {
  //   return function (a, b) {
  //     if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
  //       // nếu không tồn tại
  //       return 0;
  //     }

  //     const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
  //     const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

  //     let comparison = 0;
  //     if (varA > varB) {
  //       comparison = 1;
  //     } else if (varA < varB) {
  //       comparison = -1;
  //     }
  //     return order === "desc" ? comparison * -1 : comparison;
  //   };
  // }

  const d = new Date();
  const [collect, setCollect] = useState(false); // false la chi , true la thu
  const [price, setPrice] = useState(0);
  const [value, setValue] = useState(0);

  const arrayStorage = JSON.parse(localStorage.getItem("product")) ?? [
    {
      collect: 0,
      spend: 0,
      date: d.getDate(),
      month: d.getMonth() + 1,
      year: d.getFullYear(),
    },
  ];

  const arrayWallets = JSON.parse(localStorage.getItem("wallets")) ?? [
    {
      name:"Money",
      price:0
    },
  ];

  const lastItem = arrayStorage[arrayStorage.length - 1];

  const handleSubmit = () => {
    if (!collect) {
      lastItem.collect += Number(price);
    } else {
      lastItem.spend += Number(price);
    }
    if(!!localStorage.getItem("wallets")){
      if (!collect) {
        arrayWallets[value].price += Number(price)
      } else {
        arrayWallets[value].price -= Number(price)
      }
    }
    localStorage.setItem("product", JSON.stringify(arrayStorage));
    localStorage.setItem("wallets", JSON.stringify(arrayWallets));
  };

  const storageWallets = JSON.parse(localStorage.getItem("wallets")) ?? [];

  return (
    <div className={clsx(style.wrapper)}>
      {!!localStorage.getItem("wallets") && (
        <>
          <div className={clsx(style.header)}>
            <div
              onClick={() => setCollect(true)}
              style={collect ? { backgroundColor: "red" } : {}}
              className={clsx(style.toggle)}
            >
              Chi
            </div>
            <div
              onClick={() => setCollect(false)}
              style={collect ? {} : { backgroundColor: "green" }}
              className={clsx(style.toggle)}
            >
              Thu
            </div>
          </div>

          <input
            style={collect ? { color: "red" } : { color: "green" }}
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className={clsx(style.price)}
          />

          <h1>CHON VI</h1>
          {storageWallets.map((x, index) => {
            return (
              <div key={index} style={{ display: "flex" }}>
                <input onChange={()=>{
                  setValue(index)
                }} type="checkbox" checked={value===index}/>
                <p>{x.name}</p>
              </div>
            );
          })}
          <button
            onClick={() => handleSubmit()}
            className={clsx(style.toggle)}
            style={{ width: "230px", marginTop: "10px" }}
          >
            Submit
          </button>
        </>
      )}
      {!localStorage.getItem("wallets") && (
        <div>
          <h1 className={clsx(style.toggle)}>Hay tao vi</h1>
          <Link className={clsx(style.toggle)} to="/wallets">Create</Link>
        </div>
      )}
    </div>
  );
};

export default FormMoney;
