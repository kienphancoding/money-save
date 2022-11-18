import FormMoney from "./Form";
import Income from "./Income";
import cx from "clsx"
import style from "./Home.module.scss"
import StaticHome from "./Static";
import { useEffect } from "react";

const Home = () => {
  const d = new Date();
  //set du lieu lan dau vao
  useEffect(() => {
    if (!localStorage.getItem("product")) {
      const newJson = JSON.stringify([
        {
          collect: 0,
          spend: 0,
          date: d.getDate(),
          month: d.getMonth() + 1,
          year: d.getFullYear(),
        },
      ]);
      localStorage.setItem("product", newJson);
    }
  }, []);

  // set du lieu cho lan dau vao trong ngay
  useEffect(() => {
    const arrayStorage = JSON.parse(localStorage.getItem("product"));
    const lastItem = arrayStorage[arrayStorage.length - 1];
    if (!!localStorage.getItem("product")) {
      if (
        lastItem.date !== d.getDate() ||
        lastItem.month !== d.getMonth() + 1 ||
        lastItem.year !== d.getFullYear()
      ) {
        const newJson = JSON.stringify([
          ...arrayStorage,
          {
            collect: 0,
            spend: 0,
            date: d.getDate(),
            month: d.getMonth() + 1,
            year: d.getFullYear(),
          },
        ]);
        localStorage.setItem("product", newJson);
      }
    }
  }, []);
  return (
    <div>
      <Income />
      <div className={cx(style.wrapperForm)}>
        <StaticHome/>
        <FormMoney />
      </div>
      <div>
        
      </div>
    </div>
  );
};

export default Home;
