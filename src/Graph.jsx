import { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Boost from "highcharts/modules/boost";
Boost(Highcharts);

const colors = Highcharts.getOptions().colors.map((color) =>
  Highcharts.color(color).setOpacity(0.5).get()
);
const numberWithCommas = (x) =>
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const initialChartOptions = {
  lang: {
    thousandsSep: ",",
  },
  chart: {
    zoomType: "xy",
    height: "100%",
  },
  boost: {
    useGPUTranslations: true,
    usePreAllocated: true,
  },
  xAxis: {
    min: 0,
    gridLineWidth: 1,
    title: {
      text: "Number of Bets",
    },
  },
  yAxis: [
    {
      min: 0,
      labels: {
        formatter: function () {
          if (this.value >= 0) {
            return "$" + numberWithCommas(this.value);
          } else {
            return "-$" + numberWithCommas(this.value * -1);
          }
        },
      },
      minPadding: 0,
      maxPadding: 0.05,
      title: {
        text: "Payout ($)",
      },
    },
    {
      labels: {
        formatter: function () {
          if (this.value >= 0) {
            return "$" + numberWithCommas(this.value);
          } else {
            return "-$" + numberWithCommas(this.value * -1);
          }
        },
      },
      linkedTo: 0,
      opposite: true,
      title: {
        text: null,
      },
    },
  ],
  title: {
    text: null,
  },
  legend: {
    enabled: false,
  },
  exporting: {
    enabled: false,
  },
  credits: {
    enabled: false,
  },
  colors,
  series: [
    {
      type: "scatter",
      name: "Trial",
      color: "rgba(0,0,0,0.2)",
      data: null,
      marker: {
        radius: 1,
        symbol: "square",
      },
      tooltip: {
        followPointer: false,
        pointFormat: "[{point.x:,.1f}, {point.y:,.1f}]",
      },
      enableMouseTracking: false,
      zIndex: 1,
    },
    {
      type: "spline",
      name: "Average Line",
      data: null,
      color: "blue",
      lineWidth: 3,
      states: {
        hover: {
          lineWidth: 0,
        },
      },
      tooltip: {
        pointFormat: "<b>${point.y:,.2f}</b>",
      },
      zIndex: 2,
    },
  ],
};

export default function Graph({ points_array, average_array }) {
  const [chartOptions, setChartOptions] = useState(initialChartOptions);
  useEffect(() => {
    setChartOptions({
      series: [
        {
          data: points_array,
        },
        { data: average_array },
      ],
    });
  }, [points_array]);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={chartOptions}
      constructorType="chart"
    />
  );
}
