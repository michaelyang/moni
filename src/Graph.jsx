import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Boost from "highcharts/modules/boost";
Boost(Highcharts);

function createHCScatterData(
  number_of_trials,
  win_rate,
  capital,
  bet_percentage,
  bets_per_trial,
  is_compoudning
) {
  const total_length = number_of_trials * (bets_per_trial + 1);
  const points_array = new Array(total_length);
  for (let trial = 0; trial < number_of_trials; trial++) {
    const trial_data = createSingleTrial(
      win_rate,
      capital,
      bet_percentage,
      bets_per_trial,
      is_compoudning
    );
    trial_data.forEach((current_element, index) => {
      let point = [index, current_element];
      points_array[trial * (bets_per_trial + 1) + index] = point;
    });
  }
  return points_array;
}

function createSingleTrial(
  win_rate,
  capital,
  bet_percentage,
  bets_per_trial,
  is_compoudning
) {
  const flipped_coins = Array.from({ length: bets_per_trial }, () =>
    Math.random()
  );
  let current_money = capital;
  const cumulative_money = [current_money];
  flipped_coins.forEach((current_flip) => {
    if (current_money <= 0) {
      cumulative_money.push(0);
      return;
    }
    const bet_amount = is_compoudning
      ? current_money * bet_percentage
      : capital * bet_percentage;

    if (current_flip < win_rate) {
      // won
      current_money += bet_amount;
    } else {
      // lost
      current_money -= bet_amount;
    }
    cumulative_money.push(current_money);
  });
  return cumulative_money;
}

export default function Graph() {
  const number_of_trials = 1000;
  const win_rate = 0.5;
  const capital = 100;
  const bet_percentage = 0.1;
  const bets_per_trial = 100;
  const is_compoudning = false;
  const colors = Highcharts.getOptions().colors.map((color) =>
    Highcharts.color(color).setOpacity(0.5).get()
  );

  const data = createHCScatterData(
    number_of_trials,
    win_rate,
    capital,
    bet_percentage,
    bets_per_trial,
    is_compoudning
  );

  const options = {
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
      max: bets_per_trial,
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
        data: data,
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

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
