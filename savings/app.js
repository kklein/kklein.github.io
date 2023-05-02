function savings(nYears, roi, savingsIncrease, annualSavings, savingsGoal) {
  const fraction = Math.pow((1 + savingsIncrease) / (1 + roi), nYears);
  return (
    (annualSavings * Math.pow(1 + roi, nYears) * (1 - fraction)) /
    (roi - savingsIncrease)
  );
}

function savingsRoot(nYears, roi, savingsIncrease, annualSavings, savingsGoal) {
  return savings(nYears, roi, savingsIncrease, annualSavings) - savingsGoal;
}

function savingsDerivative(nYears, roi, savingsIncrease, annualSavings) {
  return savings(nYears, roi, savingsIncrease, annualSavings);
}

function newtonRaphson(f, fDer, x0, nIter) {
  let x = x0;
  for (let i = 0; i < nIter; i++) {
    const y = f(x);
    const dy = fDer(x);
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
  fields = readFields();
  const f = (x) =>
    savingsRoot(
      x,
      fields.roi,
      fields.savingsIncrease,
      fields.annualSavings,
      fields.savingsGoal
    );
  const fDer = (x) =>
    savingsDerivative(
      x,
      fields.roi,
      fields.savingsIncrease,
      fields.annualSavings
    );
  const x0 = fields.savingsGoal / fields.annualSavings;
  const result = newtonRaphson(f, fDer, x0, 100);
  const resultTextDuration = `It would take approximately ${result.toFixed(
    2
  )} years to hit your savings goal.`;
  document.getElementById("result-duration").textContent = resultTextDuration;

  const fEpsilon = (x) =>
    savingsRoot(
      x,
      fields.roi,
      fields.savingsIncrease,
      fields.annualSavings,
      fields.savingsGoal + 100
    );
  const resultEpsilon = newtonRaphson(fEpsilon, fDer, result, 100);
  const resultDays = ((resultEpsilon - result) * 365).toFixed(2);
  const resultTextMoney = `Spending 100 USD right now will cost you approximately ${resultDays} days.`;
  document.getElementById("result-money").textContent = resultTextMoney;
}
