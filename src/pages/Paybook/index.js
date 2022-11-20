import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { useState } from "react";
import style from "./Paybook.module.scss";

const Paybook = () => {
  const [isReceive, setIsReceive] = useState(true); // true la cho vay , false la vay
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);

  const [item, setItem] = useState(() => {
    return JSON.parse(localStorage.getItem("paybook")) ?? [];
  });

  const handleSend = () => {
    if (name !== "" && Number(price) > 0) {
      if (!localStorage.getItem("paybook")) {
        localStorage.setItem(
          "paybook",
          JSON.stringify([{ name: name, price: Number(price) }])
        );
      } else {
        if (isReceive) {
          localStorage.setItem(
            "paybook",
            JSON.stringify([
              ...JSON.parse(localStorage.getItem("paybook")),
              { name: name, price: Number(price), isReceive: isReceive },
            ])
          );
        } else {
          localStorage.setItem(
            "paybook",
            JSON.stringify([
              ...JSON.parse(localStorage.getItem("paybook")),
              { name: name, price: Number(price), isReceive: isReceive },
            ])
          );
        }
      }
      setName("");
      setPrice(0);
    }
  };

  const handleDelete = (index) => {
    const storage = JSON.parse(localStorage.getItem("paybook"));
    const a1 = storage.slice(0, index);
    const a2 = storage.slice(index + 1, storage.length);
    const new_arr = a1.concat(a2);

    setItem(new_arr);

    const storageJson = JSON.stringify(new_arr);
    localStorage.setItem("paybook", storageJson);
    if (item.length === 1) {
      localStorage.removeItem("paybook");
    }
  };

  return (
    <div className={clsx(style.wrapper)}>
      <div className={clsx(style.form)}>
        <input
          className={clsx(style.input)}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nhập tên người cho vay hoặc vay nợ"
          spellCheck="false"
        />
        <div className={clsx(style.menu)}>
          <p
            onClick={() => setIsReceive(true)}
            style={
              isReceive ? { backgroundColor: "black", color: "white" } : {}
            }
          >
            Cho vay
          </p>
          <p
            onClick={() => setIsReceive(false)}
            style={
              !isReceive ? { backgroundColor: "black", color: "white" } : {}
            }
          >
            Vay nợ
          </p>
        </div>
        <input
          className={clsx(style.input)}
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Nhap so tien vay muon"
          spellCheck="false"
        />
        <button className={clsx(style.btn)} onClick={handleSend}>
          Send
        </button>
      </div>

      <div className={clsx(style.history)}>
        <div>
          {!!localStorage.getItem("paybook") && <h1>Cho vay</h1>}
          <ul className={clsx(style.increase)}>
            {!!localStorage.getItem("paybook") &&
              JSON.parse(localStorage.getItem("paybook")).map((x, index) => {
                if (x.isReceive) {
                  return (
                    <div className={clsx(style.wrapperItem)}>
                      <li key={index}>
                        {x.name} : {x.price}VND
                      </li>
                      <FontAwesomeIcon
                        className={clsx(style.icon)}
                        onClick={() => handleDelete(index)}
                        icon={faTrash}
                      />
                    </div>
                  );
                }
              })}
          </ul>
        </div>

        <div>
          {!!localStorage.getItem("paybook") && <h1>Vay nợ</h1>}
          <ul className={clsx(style.decrease)}>
            {!!localStorage.getItem("paybook") &&
              JSON.parse(localStorage.getItem("paybook")).map((x, index) => {
                if (!x.isReceive) {
                  return (
                    <div className={clsx(style.wrapperItem)}>
                      <li key={index}>
                        {x.name} : {x.price}VND
                      </li>
                      <FontAwesomeIcon
                        className={clsx(style.icon)}
                        onClick={() => handleDelete(index)}
                        icon={faTrash}
                      />
                    </div>
                  );
                }
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Paybook;
