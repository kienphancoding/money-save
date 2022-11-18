import { useState } from "react";

const Wallets = () => {
  const storage = JSON.parse(localStorage.getItem("wallets")) ?? [];
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);

  return (
    <div>
      {/* form tao vi */}
      <div>
        <p style={{fontWeight:"600",fontSize:"30px"}}>Tao vi moi</p>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nhap ten cua vi"
          type="text"
        />
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Nhap so tien cua vi"
          type="number"
        />
        <button
          onClick={() => {
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
            setName("")
            setPrice(0)
          }}
        >
          Tao
        </button>
      </div>

      {/* render tat ca cac vi */}
      <div>
        {storage.map((x, index) => {
          return (
            <div style={{ display: "flex" }} key={index}>
              <h1>{x.name} : </h1>
              <h1>{x.price}VND</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Wallets;
