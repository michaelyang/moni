import { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Boost from "highcharts/modules/boost";
Boost(Highcharts);

const colors = Highcharts.getOptions().colors.map((color) =>
  Highcharts.color(color).setOpacity(0.5).get()
);

const initialChartOptions = {
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
            return "$" + this.value;
          } else {
            return "-$" + this.value * -1;
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
            return "$" + this.value;
          } else {
            return "-$" + this.value * -1;
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
      color: "rgba(0,0,0,0.2)",
      data: null,
      marker: {
        radius: 2,
        symbol: "square",
      },
      tooltip: {
        followPointer: false,
        pointFormat: "[{point.x:.1f}, {point.y:.1f}]",
      },
    },
  ],
};

export default function Graph({ data }) {
  const [chartOptions, setChartOptions] = useState(initialChartOptions);
  useEffect(() => {
    setChartOptions({
      series: {
        data: data,
      },
    });
  }, [data]);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={chartOptions}
      constructorType="chart"
    />
  );
}
