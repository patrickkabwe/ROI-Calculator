const form = document.getElementById("form");
const gmb = document.getElementById("gbm");
const rent = document.getElementById("rent");
const gmbOutput = document.getElementById("gbm-output");
const gmbInput = document.getElementById("gmb-input");
const rentOutput = document.getElementById("rent-output");
const prsOutput = document.getElementById("prs-output");
const staffOutput = document.getElementById("staff-output");
const staff = document.getElementById("staff");
const rosterSize = document.getElementById("prs");
const msg = document.getElementById("msg");
const results = document.getElementById("results");
const clinicPremiums = [1.15, 1.05, 0.95, 0.7];
const totalClinicValuePremiums = [1.3, 1.2, 0.8];

// All Events
form.addEventListener("submit", calculate);

// Add Initial Values
document.addEventListener("DOMContentLoaded", () => {
  gmbOutput.textContent = `$${parseFloat(gmb.value).toLocaleString()}`;
  positionToolTip(gmbOutput.textContent);
  rentOutput.textContent = `$${parseFloat(rent.value).toLocaleString()}`;
  staffOutput.textContent = `${parseFloat(staff.value).toLocaleString()}`;
  prsOutput.textContent = `${parseFloat(rosterSize.value).toLocaleString()}`;
});

gmb.addEventListener("input", (e) => {
  calculate();
  gmbOutput.textContent = `$${parseFloat(e.target.value).toLocaleString()}`;
  // gmbOutput.style.left = `${e.target.value/1}%`;
  console.log(gmbOutput.style.left);
});

rent.addEventListener("input", (e) => {
  calculate();
  rentOutput.textContent = `$${parseFloat(e.target.value).toLocaleString()}`;
});

staff.addEventListener("input", (e) => {
  calculate();
  staffOutput.textContent = parseFloat(e.target.value);
});

rosterSize.addEventListener("input", (e) => {
  calculate();
  prsOutput.textContent = parseFloat(e.target.value);
});

function positionToolTip(value) {
  let cleanedVal = value?.replace("$", "").replace(",", "");
  console.log(cleanedVal / 2 + "%");
  return cleanedVal / 2 + "%";
}

// Functions

function displayResults(clinicValueT) {
  let totalValueResult = document.getElementById("totalValueResult");
  totalValueResult.textContent = `$${clinicValueT.toLocaleString()}`;
}

function calculate(e) {
  e?.preventDefault();
  const GMB = parseInt(gmb.value);
  const RENT = parseInt(rent.value);
  const STAFF = parseInt(staff.value);
  const ROSTER_SIZE = parseInt(rosterSize.value);

  const clinicValue = calculateClinicValue(GMB, RENT, STAFF, ROSTER_SIZE);
  const clinicValueT = calculateTotalClinicValue(GMB, RENT, STAFF, ROSTER_SIZE);

  // clearFields();
  // displayMailSentMsg();
  results.classList.remove("scale-100");
  results.classList.remove("scale-0");
  results.classList.add("scale-100");
  displayResults(clinicValueT);
  return clinicValue;
}

function calculateStaffCost(staff) {
  const HOURS = 140;
  const DOLLAR = 20;
  const staffCost = staff * HOURS * DOLLAR;
  return staffCost;
}

function calculateClinic(gmb, premium) {
  const BVA = 2;
  const clinic = premium * BVA * gmb;
  return clinic;
}

function calculateClinicValue(gmb, rent, staff, rosterSize) {
  let clinic = 0;
  const X_MULTIPLE = 0.25;
  const staffCost = calculateStaffCost(staff);
  const VALUE_OF_CLINIC = X_MULTIPLE * gmb - rent - staffCost;

  if (VALUE_OF_CLINIC > 2 * rosterSize) {
    clinic = calculateClinic(gmb, clinicPremiums[0]);
    console.log("clinic1: ", clinic);
    return clinic;
  }
  if (VALUE_OF_CLINIC > rosterSize) {
    clinic = calculateClinic(gmb, clinicPremiums[1]);
    console.log("clinic2: ", clinic);
    return clinic;
  }
  if (VALUE_OF_CLINIC < 0) {
    clinic = calculateClinic(gmb, clinicPremiums[3]);
    console.log("clinic3: ", clinic);
    return clinic;
  }

  if (VALUE_OF_CLINIC < rosterSize) {
    clinic = calculateClinic(gmb, clinicPremiums[2]);
    console.log("clinic4: ", clinic);
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
  if (rosterSize > 800) {
    totalClinicValue = clinicValue + totalClinicValuePremiums[1] * rosterSize;
    console.log("totalClinicValue2: ", totalClinicValue);

    return totalClinicValue;
  }

  if (rosterSize < 800) {
    totalClinicValue = clinicValue + totalClinicValuePremiums[2] * rosterSize;
    console.log("totalClinicValue2: ", totalClinicValue);

    return totalClinicValue;
  }

  console.log("totalClinicValue: ", totalClinicValue);

  return totalClinicValue;
}

function sendReportMail() {}

function displayMailSentMsg() {
  msg.classList.remove("hidden");
  msg.innerHTML = "<span>The Report Sent Has To Your Email !!</span>";
  setTimeout(() => {
    msg.classList.add("hidden");
  }, 3000);
}

function clearFields() {
  gmb.value = 30000;
  rent.value = 2000;
  staff.value = 1;
  rosterSize.value = 10;
  gmbOutput.textContent = "";
  rentOutput.textContent = "";
}
