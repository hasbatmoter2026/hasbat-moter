function getTyreDiameter(width, ratio, rim) {
    const sidewall = width * (ratio / 100);
    const rimMm = rim * 25.4;
    return rimMm + (sidewall * 2);
}
function formatSigned(value, unit) {
    const sign = value > 0 ? "+" : value < 0 ? "-" : "";
    return sign + Math.abs(value).toFixed(2) + " " + unit;
}
function compareTyres() {
    const oldWidth = Number(document.getElementById("oldWidth").value);
    const oldRatio = Number(document.getElementById("oldRatio").value);
    const oldRim = Number(document.getElementById("oldRim").value);

    const newWidth = Number(document.getElementById("newWidth").value);
    const newRatio = Number(document.getElementById("newRatio").value);
    const newRim = Number(document.getElementById("newRim").value);

    if (
        oldWidth <= 0 ||
        oldRatio <= 0 ||
        oldRim <= 0 ||
        newWidth <= 0 ||
        newRatio <= 0 ||
        newRim <= 0
    ) {
        alert("فضلاً أدخل جميع مقاسات الإطار الحالي والجديد.");
        return;
    }

    const oldDiameter = getTyreDiameter(oldWidth, oldRatio, oldRim);
    const newDiameter = getTyreDiameter(newWidth, newRatio, newRim);

    const oldCircumference = oldDiameter * Math.PI;
    const newCircumference = newDiameter * Math.PI;

    const diameterDifference = newDiameter - oldDiameter;
    const circumferenceDifference = newCircumference - oldCircumference;
    const heightDifference = diameterDifference / 2;
    const percentageDifference = (diameterDifference / oldDiameter) * 100;

    let speedText = "";
    let advice = "";

    if (percentageDifference > 0) {
        speedText = "السرعة الفعلية أعلى من قراءة العداد بحوالي " + Math.abs(percentageDifference).toFixed(2) + "%";
    } else if (percentageDifference < 0) {
        speedText = "السرعة الفعلية أقل من قراءة العداد بحوالي " + Math.abs(percentageDifference).toFixed(2) + "%";
    } else {
        speedText = "لا يوجد تأثير واضح على العداد.";
    }

    if (Math.abs(percentageDifference) <= 3) {
        advice = "✅ المقاس مناسب وآمن غالبًا.";
    } else {
        advice = "⚠️ الفرق يتجاوز 3%، يفضل مراجعة مختص قبل التركيب.";
    }

    document.getElementById("diameterDiff").textContent = formatSigned(diameterDifference, "مم");
    document.getElementById("circumferenceDiff").textContent = formatSigned(circumferenceDifference, "مم");
    document.getElementById("heightDiff").textContent = formatSigned(heightDifference, "مم");
    document.getElementById("speedEffect").textContent = speedText;
    document.getElementById("percentDiff").textContent = formatSigned(percentageDifference, "%");
    document.getElementById("tyreAdvice").textContent = advice;

    document.getElementById("result").style.display = "block";
}

function resetTyreCalc() {
    document.getElementById("oldWidth").value = "";
    document.getElementById("oldRatio").value = "";
    document.getElementById("oldRim").value = "";

    document.getElementById("newWidth").value = "";
    document.getElementById("newRatio").value = "";
    document.getElementById("newRim").value = "";

    document.getElementById("result").style.display = "none";
}

function copyTyreResult() {
    const text =
`نتائج مقارنة مقاسات الإطارات

فرق القطر: ${document.getElementById("diameterDiff").textContent}
فرق المحيط: ${document.getElementById("circumferenceDiff").textContent}
فرق ارتفاع السيارة: ${document.getElementById("heightDiff").textContent}
تأثير العداد: ${document.getElementById("speedEffect").textContent}
نسبة الفرق: ${document.getElementById("percentDiff").textContent}
التوصية: ${document.getElementById("tyreAdvice").textContent}`;

    navigator.clipboard.writeText(text);
    alert("✅ تم نسخ النتائج.");
}