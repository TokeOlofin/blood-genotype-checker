// Blood group logic
function checkBlood() {
  const donor = document.getElementById("donor").value;
  const recipient = document.getElementById("recipient").value;
  const resultDiv = document.getElementById("bloodResult");

  if (!donor || !recipient) {
    resultDiv.innerHTML = "⚠️ Please select both donor and recipient.";
    resultDiv.className = "warning";
    return;
  }

    if (!donor || !recipient) {
    resultDiv.innerHTML = "⚠️ Please select both donor and recipient.";
    resultDiv.className = "warning";
    return;
  }

  // Compatibility table as an object
  const compatibility = {
    "O-":   ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"],
    "O+":   ["O+", "A+", "B+", "AB+"],
    "A-":   ["A-", "A+", "AB-", "AB+"],
    "A+":   ["A+", "AB+"],
    "B-":   ["B-", "B+", "AB-", "AB+"],
    "B+":   ["B+", "AB+"],
    "AB-":  ["AB-", "AB+"],
    "AB+":  ["AB+"]
  };

  if (compatibility[donor].includes(recipient)) {
    resultDiv.innerHTML = `✅ Compatible blood transfusion (${donor} → ${recipient})`;
    resultDiv.className = "success show";
  } else {
    resultDiv.innerHTML = `❌ Not compatible for transfusion (${donor} → ${recipient})`;
    resultDiv.className = "danger show";
  }
}


// Genotype logic
function checkGenotype() {
  const p1 = document.getElementById("partner1").value;
  const p2 = document.getElementById("partner2").value;
  const resultDiv = document.getElementById("genotypeResult");

  if (!p1 || !p2) {
    resultDiv.innerHTML = "⚠️ Please select both partner genotypes.";
    resultDiv.className = "warning";
    return;
  }

  const genotypeTable = {
    "AA": { "AA": "Safe", "AS": "Safe", "SS": "Low risk", "AC": "Safe", "SC": "Low risk", "CC": "Low risk" },
    "AS": { "AA": "Safe", "AS": "Risky", "SS": "High risk", "AC": "Risky", "SC": "High risk", "CC": "Risky" },
    "SS": { "AA": "Low risk", "AS": "High risk", "SS": "Not advised", "AC": "High risk", "SC": "High risk", "CC": "Not advised" },
    "AC": { "AA": "Safe", "AS": "Risky", "SS": "High risk", "AC": "Risky", "SC": "High risk", "CC": "Risky" },
    "SC": { "AA": "Low risk", "AS": "High risk", "SS": "High risk", "AC": "High risk", "SC": "Not advised", "CC": "High risk" },
    "CC": { "AA": "Low risk", "AS": "Risky", "SS": "High risk", "AC": "Risky", "SC": "High risk", "CC": "Not advised" }
  };
  const childrenProbabilities = {
    "AA": { "AA": "100% AA", "AS": "50% AA / 50% AS", "SS": "100% AS", "AC": "50% AA / 50% AC", "SC": "50% AS / 50% AC", "CC": "100% AC" },
    "AS": { "AA": "50% AA / 50% AS", "AS": "25% AA / 50% AS / 25% SS", "SS": "50% AS / 50% SS", "AC": "25% AA / 25% AS / 25% AC / 25% SC", "SC": "25% AS / 25% SC / 25% SS / 25% AC", "CC": "50% AC / 50% SC" },
    "SS": { "AA": "100% AS", "AS": "50% AS / 50% SS", "SS": "100% SS", "AC": "50% AC / 50% SC", "SC": "50% SC / 50% SS", "CC": "100% SC" },
    "AC": { "AA": "50% AA / 50% AC", "AS": "25% AA / 25% AS / 25% AC / 25% SC", "SS": "50% SC / 50% AS", "AC": "25% AA / 50% AC / 25% CC", "SC": "25% AC / 25% SC / 25% AS / 25% CC", "CC": "50% AC / 50% CC" },
    "SC": { "AA": "50% AC / 50% AS", "AS": "25% AS / 25% SC / 25% SS / 25% AC", "SS": "50% SS / 50% SC", "AC": "25% AC / 25% SC / 25% CC / 25% AS", "SC": "25% SS / 25% CC / 50% SC", "CC": "50% CC / 50% SC" },
    "CC": { "AA": "100% AC", "AS": "50% AC / 50% SC", "SS": "100% SC", "AC": "50% AC / 50% CC", "SC": "50% SC / 50% CC", "CC": "100% CC" }
  };

  let result = genotypeTable[p1][p2];

  // Add "Safe" in brackets for Low risk
  if (result === "Low risk") result += " (Safe)";

  let message = "";
  let status = "";

  switch(result) {
    case "Safe":
      message = "✅ Safe combination. Children unlikely to inherit sickle-cell disease.";
      status = "success";
      break;
    case "Low risk (Safe)":
      message = "⚠️ Low risk combination (Safe). Children may inherit minor traits.";
      status = "success";
      break;
    case "Risky":
      message = "⚠️ Risky: Chance of sickle-cell trait/disease in children.";
      status = "warning";
      break;
    case "High risk":
      message = "❌ High risk: Children likely to inherit sickle-cell disease.";
      status = "danger";
      break;
    case "Not advised":
      message = "❌ Not advised: Very high risk of children with sickle-cell disease.";
      status = "danger";
      break;
    default:
      message = "⚠️ Compatibility uncertain. Consult a medical professional.";
      status = "warning";
  }
 const possibleChildren = childrenProbabilities[p1]?.[p2] || "Varies";
  message += `<br>Possible children genotypes: ${possibleChildren}`;

  resultDiv.innerHTML = message;
  resultDiv.className = status + " show";
}

// Reset Button
document.getElementById("resetBtn").addEventListener("click", () => {
  document.getElementById("partner1").value = "";
  document.getElementById("partner2").value = "";
  document.getElementById("donor").value = "";
  document.getElementById("recipient").value = "";
  document.getElementById("genotypeResult").innerHTML = "";
  document.getElementById("bloodResult").innerHTML = "";
});
  