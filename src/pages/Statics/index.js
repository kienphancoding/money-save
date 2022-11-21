import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  ReferenceLine,
  ComposedChart,
  Line
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

  const storageData = JSON.parse(localStorage.getItem("product")) || [];


  const incomeMonth = () =>{
    let income
    storageData.map((x,index)=>{
      if(index===0){
        income = [{month:x.month,year:x.year,spend:x.spend*(-1),collect:x.collect,name:`${x.month}/${x.year}`}]
      }else if(x.month===storageData[index-1].month && x.year===storageData[index-1].year){
        income[income.length-1].collect += x.collect
        income[income.length-1].spend -= x.spend
      }else{
        income = [...income,{month:x.month,year:x.year,spend:x.spend*(-1),collect:x.collect,name:`${x.month}/${x.year}`}]
      }
    })
    return income
  }

  const monthData = incomeMonth()

  const incomeMonthData = monthData.map((x)=>{
    return{
      name:x.name,
      income: x.collect + x.spend
    }
  })

  return (
    <div style={{display:"flex",justifyContent:"center",marginTop:"50px",alignItems:"center",flexDirection:"column"}}>
      <h1 style={{textAlign:"center"}}>Total all times</h1>
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

      <h1 style={{textAlign:"center"}}>Collect and spend all months</h1>

      <ResponsiveContainer width={1000} height={600}>
        <BarChart
          width={1000}
          height={400}
          data={monthData}
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

      <h1 style={{textAlign:"center"}}>Income all months</h1>

      <ResponsiveContainer width={1000} height={600}>
        <ComposedChart
          width={1000}
          height={400}
          data={incomeMonthData}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name" scale="band" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="income" barSize={20} fill="#413ea0" />
          <Line type="monotone" dataKey="income" stroke="#ff7300" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Statics;
