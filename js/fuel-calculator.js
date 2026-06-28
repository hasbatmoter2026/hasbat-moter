function calculateFuel() {
    const distance = parseFloat(document.getElementById("distance").value);
    const fuel = parseFloat(document.getElementById("fuel").value);
    const price = parseFloat(document.getElementById("price").value);
    const currency = document.getElementById("currency").value;

    if (!distance || !fuel || !price || distance <= 0 || fuel <= 0 || price <= 0) {
        alert("فضلاً أدخل جميع القيم بشكل صحيح");
        return;
    }

    const kmPerLiter = distance / fuel;
    const literPer100 = (fuel / distance) * 100;
    const tripCost = fuel * price;
    const cost100 = literPer100 * price;

    document.getElementById("kmPerLiter").textContent = kmPerLiter.toFixed(2);
    document.getElementById("liter100").textContent = literPer100.toFixed(2);
    document.getElementById("tripCost").textContent = tripCost.toFixed(2) + " " + currency;
    document.getElementById("cost100").textContent = cost100.toFixed(2) + " " + currency;

    let ratingTitle = "";
    let ratingText = "";
    let ratingWidth = 0;
    let ratingColor = "";

    if (kmPerLiter >= 18) {
        ratingTitle = "استهلاك ممتاز 🟢";
        ratingText = "سيارتك اقتصادية جدًا في استهلاك الوقود.";
        ratingWidth = 100;
        ratingColor = "#16a34a";
    } else if (kmPerLiter >= 14) {
        ratingTitle = "استهلاك جيد جدًا 🔵";
        ratingText = "استهلاك السيارة جيد ومناسب لمعظم الاستخدامات.";
        ratingWidth = 75;
        ratingColor = "#0d6efd";
    } else if (kmPerLiter >= 10) {
        ratingTitle = "استهلاك متوسط 🟠";
        ratingText = "الاستهلاك متوسط، وقد تحتاج لفحص ضغط الإطارات أو طريقة القيادة.";
        ratingWidth = 50;
        ratingColor = "#f59e0b";
    } else {
        ratingTitle = "استهلاك مرتفع 🔴";
        ratingText = "استهلاك الوقود مرتفع، يفضل فحص السيارة أو تغيير أسلوب القيادة.";
        ratingWidth = 25;
        ratingColor = "#ef4444";
    }

    document.getElementById("ratingTitle").textContent = ratingTitle;
    document.getElementById("ratingText").textContent = ratingText;
    document.getElementById("ratingFill").style.width = ratingWidth + "%";
    document.getElementById("ratingFill").style.background = ratingColor;
    document.getElementById("fuelRating").style.display = "block";
let analysis = "";

if (kmPerLiter >= 18) {
    analysis = "أداء ممتاز جدًا. سيارتك اقتصادية في استهلاك الوقود.";
} else if (kmPerLiter >= 14) {
    analysis = "أداء جيد جدًا. استهلاك الوقود مناسب للاستخدام اليومي.";
} else if (kmPerLiter >= 10) {
    analysis = "الاستهلاك متوسط. حاول فحص ضغط الإطارات وتجنب التسارع المفاجئ.";
} else {
    analysis = "الاستهلاك مرتفع. يُفضل فحص البواجي، فلتر الهواء، وضغط الإطارات.";
}

document.getElementById("ratingText").textContent = analysis;
    document.getElementById("result").style.display = "block";
}

function resetCalc() {
    document.getElementById("distance").value = "";
    document.getElementById("fuel").value = "";
    document.getElementById("price").value = "";
    document.getElementById("result").style.display = "none";
    document.getElementById("fuelRating").style.display = "none";
}

function copyResult() {
    const text =
`نتائج حاسبة استهلاك الوقود:
كم لكل لتر: ${document.getElementById("kmPerLiter").textContent}
لتر لكل 100 كم: ${document.getElementById("liter100").textContent}
تكلفة الرحلة: ${document.getElementById("tripCost").textContent}
تكلفة كل 100 كم: ${document.getElementById("cost100").textContent}
التقييم: ${document.getElementById("ratingTitle").textContent}`;

    navigator.clipboard.writeText(text);
    alert("تم نسخ النتائج");
}