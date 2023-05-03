function savings(nYears, roi, savingsIncrease, annualSavings, savingsGoal) {
  const fraction = Math.pow((1 + savingsIncrease) / (1 + roi), nYears);
  return (
    (annualSavings * Math.pow(1 + roi, nYears) * (1 - fraction)) /
    (roi - savingsIncrease)
  );
}

function savingsDerivative(nYears, roi, savingsIncrease, annualSavings) {
  return savings(nYears, roi, savingsIncrease, annualSavings);
}

function cumulativeSpending(nYears, roi, extraSpending) {
  return extraSpending * (1 + Math.pow(1 - roi, nYears + 1) / (1 - roi));
}

function totalRoot(
  nYears,
  roi,
  savingsIncrease,
  annualSavings,
  savingsGoal,
  extraSpending
) {
  return (
    savings(nYears, roi, savingsIncrease, annualSavings, savingsGoal) -
    cumulativeSpending(nYears, roi, extraSpending) -
    savingsGoal
  );
}

function totalDerivative(
  nYears,
  roi,
  savingsIncrease,
  annualSavings,
  extraSpending
) {
  return (
    savingsDerivative(nYears, roi, savingsIncrease, annualSavings) -
    cumulativeSpending(nYears, roi, extraSpending)
  );
}

function newtonRaphson(f, fDer, x0, nIter) {
  let x = x0;
  for (let i = 0; i < nIter; i++) {
    const y = f(x);
    const dy = fDer(x);
    console.log(y);
    console.log(dy);
    x = x - y / dy;
  }
  return x;
}

function readField(field_id) {
  return parseFloat(document.getElementById(field_id).value);
}

function readFields() {
  return {
    savingsGoal: readField("savings-goal"),
    roi: readField("roi"),
    annualSavings: readField("annual-savings"),
    savingsIncrease: readField("savings-increase"),
  };
}

function calculateYears() {
  const nIter = 100;
  fields = readFields();
  const f = (x) =>
    totalRoot(
      x,
      fields.roi,
      fields.savingsIncrease,
      fields.annualSavings,
      fields.savingsGoal,
      0
    );
  const fDer = (x) =>
    savingsDerivative(
      x,
      fields.roi,
      fields.savingsIncrease,
      fields.annualSavings
    );
  const x0 = fields.savingsGoal / fields.annualSavings;
  const result = newtonRaphson(f, fDer, x0, nIter);
  const resultTextDuration = `It would take approximately ${result.toFixed(
    2
  )} years to hit your savings goal.`;
  document.getElementById("result-duration").textContent = resultTextDuration;

  const fTotal = (x) =>
    totalRoot(
      x,
      fields.roi,
      fields.savingsIncrease,
      fields.annualSavings,
      fields.savingsGoal,
      100
    );
  const fTotalDer = (x) =>
    totalDerivative(
      x,
      fields.roi,
      fields.savingsIncrease,
      fields.annualSavings,
      100
    );

  const resultEpsilon = newtonRaphson(fTotal, fTotalDer, result, nIter);
  const resultDays = ((resultEpsilon - result) * 365).toFixed(2);
  const resultTextMoney = `Spending 100 of your monetary currency right now will cost you approximately ${resultDays} days.`;
  console.log(resultEpsilon);
  console.log(fTotal(8));
  document.getElementById("result-money").textContent = resultTextMoney;
}
