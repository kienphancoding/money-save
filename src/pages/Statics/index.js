import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Statics = () => {
  const storage = JSON.parse(localStorage.getItem("walletsStart")) ?? [];

  const total = storage.reduce((arr, curr) => {
    return arr + curr.price;
  }, 0);

  const timeStorage = JSON.parse(localStorage.getItem("product")) ?? [];

  let totalTemp = total;

  const data = timeStorage.map((x) => {
    return {
      money: (totalTemp = totalTemp + x.collect - x.spend),
      time: x.date + "/" + x.month + "/" + x.year,
    };
  });
  return (
    <div>
      <ResponsiveContainer width={1000} height={600}>
        <AreaChart
          width={1000}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="money" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Statics;
