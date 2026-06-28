function calculateOil() {
    const currentKm = parseFloat(document.getElementById("currentKm").value);
    const lastOilKm = parseFloat(document.getElementById("lastOilKm").value);
    let oilInterval = parseInt(document.getElementById("oilType").value);
    const usage = document.getElementById("usage").value;

    if (!currentKm || !lastOilKm || currentKm <= 0 || lastOilKm <= 0) {
        alert("يرجى إدخال جميع البيانات بشكل صحيح.");
        return;
    }

    if (usage === "hard") {
        oilInterval -= 1000;
    }

    const nextChange = lastOilKm + oilInterval;
    const remaining = nextChange - currentKm;

    let status = "";
    let advice = "";
    let remainingText = "";

    if (remaining > 2000) {
        status = "🟢 الزيت بحالة ممتازة";
        advice = "استمر في القيادة وافحص مستوى الزيت دوريًا.";
        remainingText = remaining.toLocaleString() + " كم";
    } else if (remaining > 500) {
        status = "🟡 اقترب موعد التغيير";
        advice = "جهز لتغيير الزيت خلال الفترة القادمة.";
        remainingText = remaining.toLocaleString() + " كم";
    } else if (remaining >= 0) {
        status = "🟠 يجب تغيير الزيت قريبًا";
        advice = "لا تؤجل تغيير الزيت للحفاظ على المحرك.";
        remainingText = remaining.toLocaleString() + " كم";
    } else {
        status = "🔴 متأخر عن تغيير الزيت";
        advice = "يجب تغيير الزيت فورًا لتجنب أضرار للمحرك.";
        remainingText = "متأخر بـ " + Math.abs(remaining).toLocaleString() + " كم";
    }

    document.getElementById("nextChange").textContent = nextChange.toLocaleString() + " كم";
    document.getElementById("remainingKm").textContent = remainingText;
    document.getElementById("oilStatus").textContent = status;
    document.getElementById("oilAdvice").textContent = advice;

    document.getElementById("result").style.display = "block";
}

function resetOilCalc() {
    document.getElementById("currentKm").value = "";
    document.getElementById("lastOilKm").value = "";
    document.getElementById("oilType").value = "5000";
    document.getElementById("usage").value = "normal";
    document.getElementById("result").style.display = "none";
}

function copyOilResult() {
    const text =
`نتائج حاسبة تغيير الزيت:
موعد التغيير القادم: ${document.getElementById("nextChange").textContent}
المتبقي: ${document.getElementById("remainingKm").textContent}
الحالة: ${document.getElementById("oilStatus").textContent}
التوصية: ${document.getElementById("oilAdvice").textContent}`;

    navigator.clipboard.writeText(text);
    alert("تم نسخ النتائج");
}