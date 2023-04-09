export function createHCScatterData(
  number_of_trials,
  win_rate,
  starting_capital,
  bet_percentage,
  bets_per_trial,
  is_compoudning,
  take_profit,
  stop_loss
) {
  if (!number_of_trials || number_of_trials <= 0) {
    return [];
  }
  if (!bets_per_trial || bets_per_trial <= 0) {
    bets_per_trial = 0;
  }
  if (!starting_capital || starting_capital <= 0) {
    starting_capital = 0;
  }
  let total_length = number_of_trials * (bets_per_trial + 1);
  const points_array = new Array(total_length);
  for (let trial = 0; trial < number_of_trials; trial++) {
    const trial_data = createSingleTrial(
      win_rate,
      starting_capital,
      bet_percentage,
      bets_per_trial,
      is_compoudning,
      take_profit,
      stop_loss
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
  starting_capital,
  bet_percentage,
  bets_per_trial,
  is_compoudning,
  take_profit,
  stop_loss
) {
  const flipped_coins = Array.from({ length: bets_per_trial }, () =>
    Math.random()
  );
  let current_money = starting_capital;
  const cumulative_money = [current_money];
  flipped_coins.forEach((current_flip) => {
    if (current_money <= 0) {
      cumulative_money.push(0);
      return;
    }
    const bet_amount = is_compoudning
      ? current_money * bet_percentage
      : starting_capital * bet_percentage;

    if (current_flip < win_rate) {
      // won
      const win_amount = bet_amount * take_profit;
      current_money += win_amount;
    } else {
      // lost
      const lose_amount = bet_amount * stop_loss;
      current_money -= lose_amount;
    }
    cumulative_money.push(current_money);
  });
  return cumulative_money;
}
