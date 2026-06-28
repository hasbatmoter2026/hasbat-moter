function calculateOil() {
    const currentKm = parseFloat(document.getElementById("currentKm").value);
    const lastOilKm = parseFloat(document.getElementById("lastOilKm").value);
    let oilInterval = parseInt(document.getElementById("oilType").value);
    const usageType = document.getElementById("usage").value;

    if (!currentKm || !lastOilKm || currentKm <= 0 || lastOilKm <= 0) {
        alert("فضلاً أدخل جميع البيانات بشكل صحيح.");
        return;
    }

    if (currentKm < lastOilKm) {
        alert("الممشى الحالي يجب أن يكون أكبر من ممشى آخر تغيير زيت.");
        return;
    }

    if (usageType === "hard") {
        oilInterval -= 1000;
    }

    const nextChange = lastOilKm + oilInterval;
    const remaining = nextChange - currentKm;

    let remainingText = "";
    let status = "";
    let advice = "";

    if (remaining > 2000) {
        remainingText = "متبقي " + remaining.toLocaleString() + " كم";
        status = "🟢 الزيت بحالة جيدة";
        advice = "استمر في القيادة وافحص مستوى الزيت دوريًا.";
    } else if (remaining > 500) {
        remainingText = "متبقي " + remaining.toLocaleString() + " كم";
        status = "🟡 اقترب موعد التغيير";
        advice = "جهز لتغيير الزيت قريبًا.";
    } else if (remaining >= 0) {
        remainingText = "متبقي " + remaining.toLocaleString() + " كم";
        status = "🟠 غيّر الزيت قريبًا";
        advice = "يفضل عدم تأخير تغيير الزيت.";
    } else {
        remainingText = "متأخر بـ " + Math.abs(remaining).toLocaleString() + " كم";
        status = "🔴 متأخر عن تغيير الزيت";
        advice = "غيّر الزيت في أقرب وقت لتجنب ضرر المحرك.";
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
الحالة الحالية: ${document.getElementById("remainingKm").textContent}
تقييم الحالة: ${document.getElementById("oilStatus").textContent}
التوصية: ${document.getElementById("oilAdvice").textContent}`;

    navigator.clipboard.writeText(text);
    alert("تم نسخ النتائج");
}