window.getCookie = function (name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
};

function isAdRelevantVisit() {
    return document.referrer.includes("google.com") || document.referrer.includes("bing.com") || location.search.includes("utm_source") || location.search.includes("gclid")
}

function visitedDate() {
    var d = new Date();
    return d.getUTCFullYear() + "-" + (d.getUTCMonth() + 1) + "-" + d.getUTCDate() + "T" + d.getUTCHours() + ":" + d.getUTCMinutes() + ":00Z";

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
    var result = {};
    Object.keys(params).forEach(function (key) {
        if (key === "utm_source" || key === "utm_medium" || key === "utm_campaign"
            || key === "utm_term" || key === "utm_content" || key === "gclid") {
            result[key] = params[key];
        }
        else if (document.referrer.includes("google.com") || document.referrer.includes("bing.com")) {
            result = {"utm_source": "organic"};
        }
    });
    result.visit = visitedDate();
    return result;
}

function writeCookieWithUTMParams(params) {
    var cookieValue = [params];
    if (document.cookie.indexOf("smartUTMJar=") >= 0) {
        lastCookieValue = JSON.parse(getCookie("smartUTMJar"));
        cookieValue = cookieValue.concat(lastCookieValue);
    }
    document.cookie = "smartUTMJar=".concat(JSON.stringify(cookieValue))
}

function fillUTMJarField() {
    if (document.cookie.indexOf("smartUTMJar=") >= 0) {
        hf = document.getElementById("smujarHistory");
        if (!hf) {
            hf = document.getElementsByName("smujarHistory")[0];
        }
        if (hf) {
            hf.value = getCookie("smartUTMJar");
        }
        hf = document.getElementById("smujarFirstVisit");
        if (!hf) {
            hf = document.getElementsByName("smujarFirstVisit")[0];
        }
        if (hf) {
            var cookie = JSON.parse(getCookie("smartUTMJar"));
            var utms = cookie[cookie.length - 1].utm_source;
            var utmm = cookie[cookie.length - 1].utm_medium;
            var gclid = cookie[cookie.length - 1].gclid;
            var utmc = cookie[cookie.length - 1].utm_campaign;
            var fieldval = "";
            if (utms) {
                fieldval += utms
            }
            if (utmm) {
                if (utms) fieldval += "-";
                fieldval += utmm
            }
            if (utmc) {
                if (utms || utmm) fieldval += "-";
                fieldval += gclid
            }
            if (gclid) {
                if (utms || utmm || utmc) fieldval += "-";
                fieldval += utmc
            }
            hf.value = fieldval;
        }
        hf = document.getElementById("smujarFirstVisitTime");
        if (!hf) {
            hf = document.getElementsByName("smujarFirstVisitTime")[0];
        }
        if (hf) {
            var cookie = JSON.parse(getCookie("smartUTMJar"));
            hf.value = cookie[cookie.length - 1].visit;
        }
    }
}

function maintainLength() {

    if (document.cookie.indexOf("smartUTMJar=") >= 0) {
        lastCookieValue = JSON.parse(getCookie("smartUTMJar"));
        if (lastCookieValue.length > 20) {
            cookieValue= lastCookieValue.slice(lastCookieValue.length-1, lastCookieValue.length);
            document.cookie = "smartUTMJar=".concat(JSON.stringify(cookieValue))
        }
    }

}

function disableSmujarCookie() {
    document.cookie = "smartUTMJar=DoNotTrack";
    hf = document.getElementById("smujarFirstVisit");
    if (hf) hf.value = "";
    hf = document.getElementById("smujarHistory");
    if (hf) hf.value = "";
    hf = document.getElementById("smujarFirstVisitTime");
    if (hf) hf.value = "";

    hf = document.getElementsByName("smujarFirstVisit");
    if (hf.length > 0) hf[0].value = "";
    hf = document.getElementsByName("smujarHistory");
    if (hf.length > 0) hf[0].value = "";
    hf = document.getElementsByName("smujarFirstVisitTime");
    if (hf.length > 0) hf[0].value = "";
}

function trackEnabled() {
    return getCookie("smartUTMJar") != "DoNotTrack";
}

if (isAdRelevantVisit() && trackEnabled()) {
    params = extractParameters();
    writeCookieWithUTMParams(parametersToString(params));
}

if (trackEnabled()) {
    maintainLength();
    fillUTMJarField();
}

