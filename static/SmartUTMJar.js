window.getCookie = function (name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
};

function isAdRelevantVisit() {
    return document.referrer.includes("google.com") || document.referrer.includes("bing.com") || location.search.includes("utm_source") || location.search.includes("gclid")
}

function visitedDate() {
    var d = new Date();
    return d.getUTCDate() + "-" + (d.getUTCMonth() + 1) + "-" + d.getUTCFullYear() + "-" + d.getUTCHours() + "-" + d.getUTCMinutes();

}

function extractParameters() {
    var result = {};
    var tmp = null;
    location.search.substr(1).split("&").forEach(function (item) {
        tmp = item.split("=");
        result[tmp[0]] = decodeURIComponent(tmp[1]);
    });
    return result;
}

function parametersToString(params) {
    var result = "";
    Object.keys(params).forEach(function (key) {
        if (key === "utm_source" || key === "utm_medium" || key === "utm_campaign" || key === "gclid") {
            result += key + "=" + params[key] + "|";
        }
        else if (document.referrer.includes("google.com") || document.referrer.includes("bing.com")) {
            result = "utm_source=organic|";
        }
    });
    result += "visit=" + visitedDate();
    return result;
}

function writeCookieWithUTMParams(params) {
    var cookieValue = params;
    if (document.cookie.indexOf("smartUTMJar=") >= 0) {
        lastCookieValue = getCookie("smartUTMJar");
        cookieValue = params + "|" + lastCookieValue;
    }
    document.cookie = "smartUTMJar=".concat(cookieValue)
}

function fillUTMJarField() {
    hf = document.getElementById("smartUTMJarHiddenField");
    if (hf) {
        hf.value = getCookie("smartUTMJar");
    }
}

if (isAdRelevantVisit()) {
    params = extractParameters();
    writeCookieWithUTMParams(parametersToString(params));
}

fillUTMJarField();
