import { useRef, useState , useEffect} from "react";
import clsx from "clsx";
import style from "./Plan.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faTrash } from "@fortawesome/free-solid-svg-icons";

const Plan = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const ref = useRef()

  const handleSend = () => {
    if (name !== "" && Number(price) > 0) {
      if (!localStorage.getItem("plan")) {
        localStorage.setItem(
          "plan",
          JSON.stringify([{ name: name, price: Number(price) }])
        );
      } else {
        localStorage.setItem(
          "plan",
          JSON.stringify([
            ...JSON.parse(localStorage.getItem("plan")),
            { name: name, price: Number(price) },
          ])
        );
      }
      setName("");
      setPrice(0);
    }
  };

  const [item, setItem] = useState(() => {
    return JSON.parse(localStorage.getItem("plan")) ?? [];
  });

  const storage = JSON.parse(localStorage.getItem("wallets")) ?? [];

  const total = storage.reduce((arr, curr) => {
    return arr + curr.price;
  }, 0);

  const handleDelete = (index) => {
    const storage = JSON.parse(localStorage.getItem("plan"));
    const a1 = storage.slice(0, index);
    const a2 = storage.slice(index + 1, storage.length);
    const new_arr = a1.concat(a2);
    setItem(new_arr);

    const storageJson = JSON.stringify(new_arr);
    localStorage.setItem("plan", storageJson);
    if (item.length === 1) {
      localStorage.removeItem("plan");
    }
  };

  useEffect(() => {
    ref.current.focus()
  }, [name]);

  return (
    <div className={clsx(style.wrapper)}>
      <input
      ref={ref}
        className={clsx(style.input)}
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nhập mục tiêu bạn mong muốn"
        spellCheck="false"
      />
      <input
        className={clsx(style.input)}
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Số tiền dự kiến"
        spellCheck="false"
        onKeyDown={(e)=>{
            if(e.key==="Enter"){
                handleSend()
            }
        }}
      />
      <button className={clsx(style.btn)} onClick={handleSend}>
        Send
      </button>

      {!!localStorage.getItem("plan") && (
        <div>
          <h1 style={{ textAlign: "center" }}>Danh sách mục tiêu</h1>
          {JSON.parse(localStorage.getItem("plan")).map((x, index) => {
            return (
              <div key={index} style={{ margin: "10px 50px" }}>
                <div style={{ display: "flex" }}>
                  <h1>
                    {x.name}: {total}/{x.price}
                  </h1>
                  {total > x.price && (
                    <FontAwesomeIcon
                      style={{ margin: "auto 10px", fontSize: "30px" }}
                      icon={faCircleCheck}
                    />
                  )}
                  <FontAwesomeIcon
                    style={{
                      margin: "auto 10px",
                      fontSize: "30px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleDelete(index)}
                    icon={faTrash}
                  />
                </div>
                <div className={clsx(style.target)}>
                  <div
                    className={clsx(style.duration)}
                    style={
                      total < x.price
                        ? { width: `${(total / x.price) * 100}%` }
                        : { width: "100%" }
                    }
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Plan;
