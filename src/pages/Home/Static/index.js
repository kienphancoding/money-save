import {
  AreaChart, Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

const StaticHome = () => {
  const storageData = JSON.parse(localStorage.getItem("product")) || [];

  const filterMonth = storageData.filter((x) => {
    return (
      x.month === new Date().getMonth() + 1 &&
      x.year === new Date().getFullYear()
    );
  });
  const data = filterMonth.map((x) => {
    return {
      name: x.date,
      income: x.collect - x.spend,
      spend : x.spend*(-1),
      collect:x.collect
    };
  });
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1 style={{textAlign:"center",margin:"20px 0"}}>Số liệu phân tích tháng {new Date().getMonth() + 1}/{new Date().getFullYear()}</h1>
      <ResponsiveContainer width={800} height={500}>
      <BarChart
          width={500}
          height={300}
          data={data}
          stackOffset="sign"
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <ReferenceLine y={0} stroke="#000" />
          <Bar dataKey="collect" fill="#8884d8" stackId="stack" />
          <Bar dataKey="spend" fill="#82ca9d" stackId="stack" />
        </BarChart>
      </ResponsiveContainer>
          <h1 style={{textAlign:"center"}}>Số tiền thu nhập tháng này</h1>
      <ResponsiveContainer width={800} height={500}>
        <AreaChart
          width={500}
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
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="income" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StaticHome;
