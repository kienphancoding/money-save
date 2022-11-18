import c from "clsx";
import s from "./Income.module.scss";
// import { useEffect } from "react";

const Income = () => {
  const d = new Date()

  const arrayStorage = JSON.parse(localStorage.getItem("product")) ?? [{
    collect: 0,
    spend: 0,
    date: d.getDate(),
    month: d.getMonth() + 1,
    year: d.getFullYear(),
  },]
  const lastItem = arrayStorage[arrayStorage.length - 1];

  const storage = JSON.parse(localStorage.getItem("wallets")) ?? []

  const total = storage.reduce((arr,curr)=>{
    return arr + curr.price
  },0)

  return (
    <div className={c(s.wrapper)}>
      <div
        className={c(s.item)}
        style={{ backgroundColor: "#aedfeb", color: "#122270" }}
      >
        <p className={c(s.name)}>Total</p>
        <p className={c(s.number)}>{total}VND</p>
      </div>
      <div
        className={c(s.item)}
        style={{ backgroundColor: "#e4e152", color: "#2d3109" }}
      >
        <p className={c(s.name)}>Collect</p>
        <p className={c(s.number)}>{lastItem.collect}VND</p>
      </div>
      <div
        className={c(s.item)}
        style={{ backgroundColor: "#ffa1c1", color: "#562f52" }}
      >
        <p className={c(s.name)}>Spend</p>
        <p className={c(s.number)}>{lastItem.spend*(-1)}VND</p>
      </div>
      <div
        className={c(s.item)}
        style={{ backgroundColor: "#ff9e72", color: "#61254f" }}
      >
        <p className={c(s.name)}>Income/d</p>
        <p className={c(s.number)}>{lastItem.collect - lastItem.spend}VND</p>
      </div>
      <div
        className={c(s.item)}
        style={{ backgroundColor: "#ff9e72", color: "#61254f" }}
      >
        <p className={c(s.name)}>Income/h</p>
        <p className={c(s.number)}>{Math.round((lastItem.collect - lastItem.spend)/(24))}VND</p>
      </div>
      <div
        className={c(s.item)}
        style={{ backgroundColor: "#ff9e72", color: "#61254f" }}
      >
        <p className={c(s.name)}>Income/m</p>
        <p className={c(s.number)}>{Math.round((lastItem.collect - lastItem.spend)/(24*60))}VND</p>
      </div>
    </div>
  );
};

export default Income;
