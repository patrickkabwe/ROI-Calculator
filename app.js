const gmb = document.getElementById("gbm");
const rent = document.getElementById("rent");
const rosterSize = document.getElementById("prs");
const staff = document.getElementById("staff");
const rosterOutput = document.getElementById("prs-output");
const gmbOutput = document.getElementById("gbm-output");
const rentOutput = document.getElementById("rent-output");
const staffOutput = document.getElementById("staff-output");
const clinicPremiums = [1.15, 1.05, 0.95, 0.7];
const totalClinicValuePremiums = [1.3, 1.2, 0.8];

const setValue = () => {
  calcuRangeValue(
    rosterSize.value,
    rosterSize.min,
    rosterSize.max,
    rosterOutput,
    rosterSize
  );
  calcuRangeValue(gmb.value, gmb.min, gmb.max, gmbOutput, gmb);
  calcuRangeValue(rent.value, rent.min, rent.max, rentOutput, rent);
  calcuRangeValue(staff.value, staff.min, staff.max, staffOutput, staff);
  calculate();
};

// Events
document.addEventListener("DOMContentLoaded", setValue);
rosterSize.addEventListener("input", setValue);
gmb.addEventListener("input", setValue);
rent.addEventListener("input", setValue);
staff.addEventListener("input", setValue);

// Calculates The range percentage and sets appropriate styles

function calcuRangeValue(value, minValue, maxValue, outputEl, El) {
  const newValue = Number(((value - minValue) * 100) / (maxValue - minValue)),
    newPosition = 10 - newValue * 0.2;
  addSign(El, outputEl);

  outputEl.style.left = `calc(${newValue}% + (${newPosition}px))`;
}

// Functions

function displayResults(clinicValueT) {
  let totalValueResult = document.getElementById("totalValueResult");
  totalValueResult.textContent = `$${clinicValueT.toLocaleString()}`;
}

function addSign(El, outputEl) {
  if ((El.id === "gbm") | (El.id === "rent")) {
    if (El.value <= parseInt(El.min)) {
      outputEl.innerHTML = `<span><$${parseFloat(
        El.value
      ).toLocaleString()}</span>`;
    } else {
      outputEl.innerHTML = `<span>$${parseFloat(El.value).toLocaleString()}${
        El.value >= parseInt(El.max) ? "+" : ""
      }</span>`;
    }
  } else {
    if (El.value <= parseInt(El.min)) {
      outputEl.innerHTML = `<span><${parseFloat(
        El.value
      ).toLocaleString()}</span>`;
    } else {
      outputEl.innerHTML = `<span>${parseFloat(El.value).toLocaleString()}${
        El.value >= parseInt(El.max) ? "+" : ""
      }</span>`;
    }
  }
}

function calculate() {
  const GMB = parseInt(gmb.value);
  const RENT = parseInt(rent.value);
  const STAFF = parseInt(staff.value);
  const ROSTER_SIZE = parseInt(rosterSize.value);

  // const clinicValue = calculateClinicValue(GMB, RENT, STAFF, ROSTER_SIZE);
  const clinicValueT = calculateTotalClinicValue(GMB, RENT, STAFF, ROSTER_SIZE);
  displayResults(clinicValueT);

  return clinicValueT;
}

function calculateStaffCost(staff) {
  const HOURS = 140;
  const DOLLAR = 20;
  const staffCost = staff * HOURS * DOLLAR;
  console.log("Staffcost: ", staffCost);
  return staffCost;
}

function calculateClinic(gmb, premium) {
  const BVA = 2;
  const clinic = premium * BVA * gmb;
  console.log("ClinicTotsasd: ", clinic);
  return clinic;
}

function calculateClinicValue(gmb, rent, staff, rosterSize) {
  let clinic = 0;
  const X_MULTIPLE = 0.25;
  const staffCost = calculateStaffCost(staff);
  const PROFITABILITY = (X_MULTIPLE * gmb) - rent - staffCost;
  // console.log("Rent: ", rent);
  // console.log("Staff: ", staff);
  console.log("PROFITABILITY: ", PROFITABILITY);

  if (PROFITABILITY < 0) {
    clinic = calculateClinic(gmb, clinicPremiums[3]);
    console.log("clinic3: ", clinic);
    return clinic;
  }

  if (PROFITABILITY > 2 * rosterSize) {
    clinic = calculateClinic(gmb, clinicPremiums[0]);
    // console.log("clinic1: ", clinic);
    return clinic;
  }
  if (PROFITABILITY > rosterSize) {
    clinic = calculateClinic(gmb, clinicPremiums[1]);
    // console.log("clinic2: ", clinic);
    return clinic;
  }


  if (PROFITABILITY < rosterSize) {
    clinic = calculateClinic(gmb, clinicPremiums[2]);
    // console.log("clinic4: ", clinic);
    return clinic;
  }
}

function calculateTotalClinicValue(gmb, rent, staff, rosterSize) {
  let totalClinicValue = 0;
  const clinicValue = calculateClinicValue(gmb, rent, staff, rosterSize);
  if (rosterSize > 1400) {
    totalClinicValue = clinicValue + totalClinicValuePremiums[0] * rosterSize;
    console.log("totalClinicValue1: ", totalClinicValue);

    return totalClinicValue;
  }
  if (rosterSize >= 800) {
    totalClinicValue = clinicValue + totalClinicValuePremiums[1] * rosterSize;
    console.log("totalClinicValue2: ", totalClinicValue);

    return totalClinicValue;
  }

  if (rosterSize < 800) {
    totalClinicValue = clinicValue + totalClinicValuePremiums[2] * rosterSize;
    console.log("totalClinicValue2: ", totalClinicValue);

    return totalClinicValue;
  }

  return totalClinicValue;
}
