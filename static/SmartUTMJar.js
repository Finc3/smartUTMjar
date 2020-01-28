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

function extractCampaignParameters(params) {
    var result = {};
    Object.keys(params).forEach(function (key) {
        if (key === "utm_source" || key === "utm_medium" || key === "utm_campaign"
            || key === "utm_term" || key === "utm_content" || key === "gclid" || key === "utm_content" || key === "utm_term") {
            result[key] = params[key];
        }
    });
    if (Object.keys(result).length === 0) {

        if (document.referrer.includes("google.com")) {
            result = {"utm_source": "google", "utm_medium": "organic"};
        }
        else if (document.referrer.includes("bing.com")) {
            result = {"utm_source": "bing", "utm_medium": "organic"};
        }
    }
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
            var utmcontent = cookie[cookie.length - 1].utm_content;
            var utmterm = cookie[cookie.length - 1].utm_term;

            hf.value = (utms || '') + (("-"+utmm) || '') + (("-"+gclid) || '') + (("-"+utmc) || '') + (("-"+utmcontent) || '') + (("-"+utmterm) || '');

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


window.addEventListener("load", function(){
    if (isAdRelevantVisit() && trackEnabled()) {
        writeCookieWithUTMParams(extractCampaignParameters(extractParameters()));
    }

    if (trackEnabled()) {
    maintainLength();
    fillUTMJarField();
}
});


