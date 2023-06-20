/**
 * Chart component
 * file: Chart.jsx
 */
import "./Chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { DATA_CHART } from "../../../constants";
import PropsType from "prop-types";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";

const Chart = ({ aspect, title }) => {
  const [dataChart, setDataChart] = useState([]);
  const sales_last_six_months = useSelector(
    (state) => state.shop.sales_last_six_months
  );
  useEffect(() => {
    if (sales_last_six_months) {
      const chartData = Object.entries(sales_last_six_months).map(
        ([name, total]) => ({ name, total })
      );
      setDataChart(chartData);
      // console.log("chart data: ", chartData);
    }
  }, [sales_last_six_months]);

  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={dataChart}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
Chart.propsType = {
  aspect: PropsType.number,
  title: PropsType.string,
};

Chart.defaultProps = {
  aspect: 1 / 2,
  title: "",
};
export default Chart;
