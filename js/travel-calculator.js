function calculateTravel() {

    const distance = parseFloat(document.getElementById("distance").value);
    const consumption = parseFloat(document.getElementById("consumption").value);
    const fuelPrice = parseFloat(document.getElementById("fuelPrice").value);
    const currency = document.getElementById("currency").value;

    if (!distance || !consumption || !fuelPrice || distance <= 0 || consumption <= 0 || fuelPrice <= 0) {
        alert("فضلاً أدخل جميع البيانات بشكل صحيح.");
        return;
    }

    const neededFuel = distance / consumption;
    const totalCost = neededFuel * fuelPrice;
    const costPer100 = (100 / consumption) * fuelPrice;

    let advice = "";

    if (consumption >= 18) {
        advice = "استهلاك ممتاز واقتصادي جدًا.";
    } else if (consumption >= 14) {
        advice = "استهلاك جيد، التكلفة مناسبة.";
    } else if (consumption >= 10) {
        advice = "استهلاك متوسط، راقب ضغط الإطارات والصيانة.";
    } else {
        advice = "استهلاك مرتفع، يفضل فحص السيارة.";
    }

    document.getElementById("neededFuel").textContent =
        neededFuel.toFixed(2) + " لتر";

    document.getElementById("totalCost").textContent =
        totalCost.toFixed(2) + " " + currency;

    document.getElementById("costPer100").textContent =
        costPer100.toFixed(2) + " " + currency;

    document.getElementById("travelAdvice").textContent = advice;

    document.getElementById("result").style.display = "block";
}

function resetTravelCalc() {

    document.getElementById("distance").value = "";
    document.getElementById("consumption").value = "";
    document.getElementById("fuelPrice").value = "";
    document.getElementById("currency").selectedIndex = 0;

    document.getElementById("result").style.display = "none";
}

function copyTravelResult() {

    const text =
`نتائج حاسبة تكلفة السفر

⛽ الوقود المطلوب: ${document.getElementById("neededFuel").textContent}

💰 تكلفة الوقود: ${document.getElementById("totalCost").textContent}

📊 تكلفة كل 100 كم: ${document.getElementById("costPer100").textContent}

💡 التوصية: ${document.getElementById("travelAdvice").textContent}`;

    navigator.clipboard.writeText(text);

    alert("✅ تم نسخ النتائج.");
}