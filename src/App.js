import { useState } from "react";
import { Switch } from "@headlessui/react";
import { NumericFormat } from "react-number-format";
import Graph from "./Graph";
import Navbar from "./Navbar";
import { createHCScatterData } from "./getGraphData";

export default function App() {
  const [graphInput, setGraphInput] = useState({
    bets_per_trial: 100,
    number_of_trials: 100,
    starting_capital: 100,
    is_compounding: false,
    win_rate: 0.5,
    bet_percentage: 0.1,
    take_profit: 0.1,
    stop_loss: 0.1,
  });

  const handleChange = (values, sourceInfo) => {
    const { name } = sourceInfo.event.target;
    setGraphInput({
      ...graphInput,
      [name]: values.floatValue,
    });
  };

  const { points_array, average_array } = createHCScatterData(
    graphInput.number_of_trials,
    graphInput.win_rate,
    graphInput.starting_capital,
    graphInput.bet_percentage,
    graphInput.bets_per_trial,
    graphInput.is_compounding,
    graphInput.take_profit,
    graphInput.stop_loss
  );

  return (
    <div className="min-h-full">
      <Navbar />
      <header className="mx-auto container px-4 sm:px-6 lg:px-8 py-2 pb-4">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          WR & PF Simulator
        </h1>
        <h3 className="text-sm font-light tracking-tight text-gray-600">
          Win Ratio & Profit Factor Simulator
        </h3>
      </header>
      <main className="container mx-auto flex flex-col lg:flex-row justify-center mb-4">
        <div className="w-full min-w-[380px] max-w-[720px] mx-auto px-4">
          <Graph points_array={points_array} average_array={average_array} />
        </div>
        <form className="px-4 sm:pl-0 sm:pr-2">
          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-900 border-b border-gray-900/10">
              The Game
            </h2>
            <div className="mt-2 grid gap-x-6 gap-y-2 grid-cols-6">
              <div className="col-span-6 sm:col-span-2 lg:col-span-6 xl:col-span-2">
                <label
                  htmlFor="starting_capital"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Starting Capital
                </label>
                <NumericFormat
                  id="starting_capital"
                  name="starting_capital"
                  allowNegative={false}
                  thousandSeparator={true}
                  prefix={"$"}
                  value={graphInput.starting_capital}
                  onValueChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="col-span-3 sm:col-span-2 lg:col-span-3 xl:col-span-2">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Bets per Trial
                </label>
                <NumericFormat
                  id="bets_per_trial"
                  name="bets_per_trial"
                  allowNegative={false}
                  thousandSeparator={true}
                  value={graphInput.bets_per_trial}
                  onValueChange={handleChange}
                  decimalScale={0}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="col-span-3 sm:col-span-2 lg:col-span-3 xl:col-span-2">
                <label
                  htmlFor="number-of-trials"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  # of Trials
                </label>
                <NumericFormat
                  id="number_of_trials"
                  name="number_of_trials"
                  allowNegative={false}
                  thousandSeparator={true}
                  value={graphInput.number_of_trials}
                  onValueChange={handleChange}
                  decimalScale={0}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="pt-6">
              <h2 className="text-base font-semibold leading-7 text-gray-900 border-b border-gray-900/10">
                The Strategy
              </h2>
              <div className="mt-2 grid gap-x-6 gap-y-2 grid-cols-6 sm:grid-cols-6 lg:grid-cols-6">
                <div className="col-span-2 lg:col-span-2">
                  <label
                    htmlFor="win_rate"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Win Rate
                  </label>
                  <NumericFormat
                    id="win_rate"
                    name="win_rate"
                    allowNegative={false}
                    thousandSeparator={false}
                    value={graphInput.win_rate}
                    onValueChange={handleChange}
                    decimalScale={3}
                    isAllowed={(values) => {
                      const { floatValue } = values;
                      return floatValue >= 0;
                    }}
                    fixedDecimalScale
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="col-span-2 lg:col-span-2">
                  <label
                    htmlFor="take_profit"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Take-Profit
                  </label>
                  <NumericFormat
                    id="take_profit"
                    name="take_profit"
                    allowNegative={false}
                    thousandSeparator={false}
                    value={graphInput.take_profit}
                    onValueChange={handleChange}
                    decimalScale={3}
                    isAllowed={(values) => {
                      const { floatValue } = values;
                      return floatValue >= 0;
                    }}
                    fixedDecimalScale
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="col-span-2 lg:col-span-2">
                  <label
                    htmlFor="stop_loss"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Stop-Loss
                  </label>
                  <NumericFormat
                    id="stop_loss"
                    name="stop_loss"
                    allowNegative={false}
                    thousandSeparator={false}
                    value={graphInput.stop_loss}
                    onValueChange={handleChange}
                    decimalScale={3}
                    isAllowed={(values) => {
                      const { floatValue } = values;
                      return floatValue >= 0;
                    }}
                    fixedDecimalScale
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="col-span-3 lg:col-span-2">
                  <label
                    htmlFor="bet_percentage"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Bet Percentage
                  </label>
                  <NumericFormat
                    id="bet_percentage"
                    name="bet_percentage"
                    allowNegative={false}
                    thousandSeparator={false}
                    value={graphInput.bet_percentage}
                    onValueChange={handleChange}
                    decimalScale={3}
                    isAllowed={(values) => {
                      const { floatValue } = values;
                      return floatValue >= 0;
                    }}
                    fixedDecimalScale
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="col-span-3 flex flex-col">
                  <label
                    htmlFor="is_compounding"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Compounding?
                  </label>
                  <Switch
                    name="is_compounding"
                    id="is_compounding"
                    checked={graphInput.is_compounding}
                    onChange={(value) =>
                      setGraphInput({ ...graphInput, is_compounding: value })
                    }
                    className={`${
                      graphInput.is_compounding ? "bg-blue-600" : "bg-gray-200"
                    } relative inline-flex h-6 w-11 items-center rounded-full my-auto`}
                  >
                    <span className="sr-only">Is Compounding</span>
                    <span
                      className={`${
                        graphInput.is_compounding
                          ? "translate-x-6"
                          : "translate-x-1"
                      } inline-block h-4 w-4 py-1.5 transform rounded-full bg-white transition`}
                    />
                  </Switch>
                </div>
              </div>
            </div>
          </div>
          {/*
          <div className="w-full mt-4">
            <button
              type="submit"
              className="rounded-md bg-indigo-600 w-full px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Graph
            </button>
          </div>
           */}
        </form>
      </main>
    </div>
  );
}
