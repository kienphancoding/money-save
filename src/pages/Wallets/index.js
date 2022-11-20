import { useState } from "react";
import clsx from "clsx";
import style from "./Wallets.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightLong } from "@fortawesome/free-solid-svg-icons";

const Wallets = () => {
  const storage = JSON.parse(localStorage.getItem("wallets")) ?? [];
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);

  const [send, setSend] = useState(0);
  const [receive, setReceive] = useState(0);
  const [priceSend, setPriceSend] = useState(0);

  const handleChange = () => {
    if (priceSend > 0) {
      const storage = JSON.parse(localStorage.getItem("wallets"));

      storage[send].price -= Number(priceSend);

      storage[receive].price += Number(priceSend);

      setPriceSend(0);

      localStorage.setItem("wallets", JSON.stringify(storage));
    }
  };

  const handleCreate = () => {
    if (name.trim() !== "") {
      if (!!localStorage.getItem("wallets")) {
        localStorage.setItem(
          "wallets",
          JSON.stringify([
            ...JSON.parse(localStorage.getItem("wallets")),
            {
              name: name,
              price: Number(price),
            },
          ])
        );
        localStorage.setItem(
          "walletsStart",
          JSON.stringify([
            ...JSON.parse(localStorage.getItem("walletsStart")),
            {
              name: name,
              price: Number(price),
            },
          ])
        );
      } else {
        localStorage.setItem(
          "wallets",
          JSON.stringify([{ name: name, price: Number(price) }])
        );
        localStorage.setItem(
          "walletsStart",
          JSON.stringify([{ name: name, price: Number(price) }])
        );
      }
      setName("");
      setPrice(0);
    }
  };

  return (
    <div className={clsx(style.wrapper)}>
      {/* form tao vi */}
      <div className={clsx(style.form)}>
        <p className={clsx(style.title)}>Tạo ví mới</p>
        <input
          className={clsx(style.input)}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nhập tên của ví"
          type="text"
          spellCheck="false"
        />
        <input
          className={clsx(style.input)}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Nhập số tiền của ví"
          type="number"
          spellCheck="false"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleCreate();
            }
          }}
        />
        <button className={clsx(style.btn)} onClick={handleCreate}>
          Tạo
        </button>
      </div>

      {/* render tat ca cac vi */}
      <div className={style.wrapperItem}>
        {storage.map((x, index) => {
          return (
            <ul className={clsx(style.list)} key={index}>
              <li className={clsx(style.item)}>
                {x.name} : {x.price}VND
              </li>
            </ul>
          );
        })}
      </div>

      <h1 className={clsx(style.title)}>Chuyển tiền qua lại các ví</h1>

      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <div>
          <p
            className={clsx(style.title)}
            style={{
              backgroundColor: "black",
              color: "white",
              marginBottom: "20px",
            }}
          >
            Chọn ví gửi
          </p>
          {storage.map((x, index) => {
            return (
              <p
                className={
                  send === index
                    ? clsx(style.title, style.itemChange, style.active)
                    : clsx(style.title, style.itemChange)
                }
                onClick={() => setSend(index)}
                key={index}
              >
                {x.name}
              </p>
            );
          })}
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <FontAwesomeIcon className={clsx(style.icon)} icon={faRightLong} />
        </div>
        <div>
          <p
            className={clsx(style.title)}
            style={{
              backgroundColor: "black",
              color: "white",
              marginBottom: "20px",
            }}
          >
            Chọn ví nhận
          </p>
          {storage.map((x, index) => {
            return (
              <p
                className={
                  receive === index
                    ? clsx(style.title, style.itemChange, style.active)
                    : clsx(style.title, style.itemChange)
                }
                onClick={() => setReceive(index)}
                key={index}
              >
                {x.name}
              </p>
            );
          })}
        </div>
      </div>
      <h1 className={clsx(style.title)}>Số tiền</h1>
      <input
        type="number"
        value={priceSend}
        onChange={(e) => setPriceSend(e.target.value)}
        className={clsx(style.input)}
      />

      <button className={clsx(style.btn)} onClick={handleChange}>
        Chuyển tiền
      </button>
    </div>
  );
};

export default Wallets;
