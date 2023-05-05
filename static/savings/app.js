function savings(nYears, roi, savingsIncrease, annualSavings) {
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
    return extraSpending * Math.pow((1 + roi), nYears)
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
    savings(nYears, roi, savingsIncrease, annualSavings) -
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
      annualSpending: readField("annual-spending")
  };
}

function savingsBreak(
  nYears,
  roi,
  savingsIncrease,
    annualSavings,
    annualSpending,
    durationBreak,
    timeOfBreak,
) {
    const hFirst = timeOfBreak;
    const hSecond = nYears - timeOfBreak - durationBreak;
    const preBreakSavings = savings(hFirst, roi, savingsIncrease, annualSavings);
    const costOfLiving = cumulativeSpending(hSecond, roi, annualSpending * durationBreak);
    const passiveIncome = cumulativeSpending(hSecond + durationBreak, roi, preBreakSavings) - preBreakSavings;
    const newAnnualSavings = cumulativeSpending(hFirst, savingsIncrease, annualSavings);
    const postBreakSavings = savings(hSecond, roi, savingsIncrease, newAnnualSavings);
    return preBreakSavings + passiveIncome - costOfLiving + postBreakSavings;
}

function savingsBreakDer(
  nYears,
  roi,
  savingsIncrease,
    annualSavings,
    annualSpending,
    durationBreak,
    timeOfBreak,
) {
    const hFirst = timeOfBreak;
    const hSecond = nYears - timeOfBreak - durationBreak;
    const newAnnualSavings = cumulativeSpending(hFirst, savingsIncrease, annualSavings);
    const costOfLivingDer = cumulativeSpending(hSecond, roi, annualSpending);
    const postBreakSavingsDer = - savings(hSecond, roi, savingsIncrease, newAnnualSavings);
    return costOfLivingDer + postBreakSavingsDer
}

function findBreakDuration(nYears, timeOfBreak, nIter) {
    fields = readFields();
    const f = (x) =>
	  savings(nYears, fields.roi, fields.savingsIncrease, fields.annualSavings)
	  - savingsBreak(
	      nYears,
	      fields.roi,
	      fields.savingsIncrease,
	      fields.annualSavings,
	      fields.annualSpending,
	      x,
	      timeOfBreak,
	  )
	  - cumulativeSpending(nYears, fields.roi, 100)
    const fDer = (x) =>
	  - savingsBreakDer(
	      nYears,
	      fields.roi,
	      fields.savingsIncrease,
	      fields.annualSavings,
	      fields.annualSpending,
	      x,
	      timeOfBreak,
	  )
    const x0 = 1/365;
    const result = newtonRaphson(f, fDer, x0, nIter);
    return result
}

function setupSlider(nYears) {
    const timeSlider = document.getElementById("time-slider");
    timeSlider.min = 0;
    timeSlider.max = nYears;
    timeSlider.value = nYears / 2;
    const update = function() {
	const timeSlider = document.getElementById("time-slider");
	const timeOfBreak = parseInt(timeSlider.value)
	const breakDuration = findBreakDuration(nYears, timeOfBreak, 100)
	const breakDurationText = (breakDuration * 365).toFixed(2);
	const resultString = `You may take a break of ${breakDurationText} days after ${timeSlider.value} years while still hitting your savings goal.`;
	document.getElementById("result-break").textContent = `${resultString}`;
    }
    update()
    timeSlider.oninput = update
}

function findSavingsDuration(nIter) {
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
  return newtonRaphson(f, fDer, x0, nIter);
}

function findSavingsExtraDuration(nYears, extraSpending, nIter) {
  const fTotal = (x) =>
    totalRoot(
      x,
      fields.roi,
      fields.savingsIncrease,
      fields.annualSavings,
      fields.savingsGoal,
      extraSpending
    );
  const fTotalDer = (x) =>
    totalDerivative(
      x,
      fields.roi,
      fields.savingsIncrease,
      fields.annualSavings,
      extraSpending
    );
  return newtonRaphson(fTotal, fTotalDer, nYears, nIter);
}

function calculate() {
    const nIter = 100;

    const nYears = findSavingsDuration(nIter)
    const nYearsText = `It will take approximately ${nYears.toFixed(
      2
    )} years to hit your savings goal.`;
    document.getElementById("result-duration").textContent = nYearsText;

    const nYearsExtra = findSavingsExtraDuration(nYears, 100, nIter)
    const nDaysExtra = ((nYearsExtra - nYears) * 365).toFixed(2);
    const nDaysExtraText = `Spending an extra 100 of your monetary currency right now will delay reaching your savings goal, i.e. 'cost you', approximately ${nDaysExtra} days.`;
    document.getElementById("result-money").textContent = nDaysExtraText;

    setupSlider(nYears)

    document.getElementById("results").hidden = false;
}
