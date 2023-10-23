window.getCookie = function (name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
};

function isAdRelevantVisit() {
    var domainMatch = location.host.match(/[\w-]*\.\w*$/);
    if (domainMatch && domainMatch.length > 0) {
        return !document.referrer.includes(domainMatch[0])
    }
    return true;
    
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
            || key === "utm_term" || key === "utm_content" || key === "gclid" || key === "utm_content" || key === "utm_term" || key === "li_fat_id" || key === "fbclid") {
            result[key] = params[key];
        }
    });
    if (Object.keys(result).length === 0) {
        var searchEngineDomains = ["google.", "bing.", "baidu.", "yahoo.", "ask.", "duckduckgo."]
        var cleanedReferrer = "";
        if (document.referrer && document.referrer.length > 0) {
            cleanedReferrer = new URL(document.referrer).hostname;
        }
        var searchEngineFound = false;
        var i = 0;
        while (!searchEngineFound && i < searchEngineDomains.length) {
            searchEngineFound = cleanedReferrer.includes(searchEngineDomains[i]);
            i++;
        }
        if (searchEngineFound) {
            result = {"utm_source": cleanedReferrer, "utm_medium": "organic"};
        }
        else if (cleanedReferrer.length > 0 && !searchEngineFound) {
            result = {"utm_source": cleanedReferrer, "utm_medium": "referral"};
        }
        else {
            result = {"utm_source": "(direct)", "utm_medium": "(none)"};
        }
    }
    result.visit = visitedDate();
    result.referrer = document.referrer;
    result.landingPage = location.href.substr(0).split("?")[0];
    return result;
}

function writeCookieWithUTMParams(params) {
    var cookieValue = [params];
    if (document.cookie.indexOf("smartUTMJar=") >= 0) {
        lastCookieValue = JSON.parse(getCookie("smartUTMJar"));
        cookieValue = cookieValue.concat(lastCookieValue);
    }
    document.cookie = "smartUTMJar=".concat(JSON.stringify(cookieValue)).concat("; path=/; max-age=15552000; secure=true")
}

function fillFieldWithValue(fieldName, fieldValue) {
    try {
        var hf = document.getElementById(fieldName);
        if (hf) {
            hf.value = fieldValue || '';
        }

        hf = document.getElementsByName(fieldName);
        if (hf.length > 0) {
            for (var i = 0; i < hf.length; i++) {
                hf[i].value = fieldValue || '';
            }
        }

    }
    catch (e) {
        console.log("Did not find field " + fieldName + ". skipping...")
    }
}

function fillUTMJarField() {
    if (document.cookie.indexOf("smartUTMJar=") >= 0) {

        fillFieldWithValue("smujarHistory", getCookie("smartUTMJar"));
        var cookie = JSON.parse(getCookie("smartUTMJar"));



        var utms = cookie[0].utm_source;
        var utmm = cookie[0].utm_medium;
        var gclid = cookie[0].gclid;
        var li_fat_id = cookie[0].li_fat_id;
        var fbclid = cookie[0].fbclid;

        var utmc = cookie[0].utm_campaign;
        var utmcontent = cookie[0].utm_content;
        var utmterm = cookie[0].utm_term;
        var referrer = cookie[0].referrer;
        var landingPage = cookie[0].landingPage;

        fillFieldWithValue("smujarCurrentUTMSource", utms);
        fillFieldWithValue("smujarCurrentUTMMedium", utmm);
        fillFieldWithValue("smujarCurrentUTMCampaign", utmc);
        fillFieldWithValue("smujarCurrentUTMContent", utmcontent);
        fillFieldWithValue("smujarCurrentUTMTerm", utmterm);

        fillFieldWithValue("smujarCurrentLandingPage", landingPage);
        fillFieldWithValue("smujarCurrentReferrer", referrer);

        fillFieldWithValue("smujarCurrentGclid", gclid);
        fillFieldWithValue("smujarCurrentLiFatId", li_fat_id);
        fillFieldWithValue("smujarCurrentFBclid", fbclid);

        var firstVisitTime = cookie[cookie.length - 1].visit; 
        var first_gclid = cookie[cookie.length - 1].gclid;
        var first_li_fat_id = cookie[cookie.length - 1].li_fat_id;
        var first_fbclid = cookie[cookie.length - 1].fbclid;
        var first_utms = cookie[cookie.length - 1].utm_source;
        var first_utmm = cookie[cookie.length - 1].utm_medium;
        var first_utmc = cookie[cookie.length - 1].utm_campaign;
        var first_utmcontent = cookie[cookie.length - 1].utm_content;
        var first_utmterm = cookie[cookie.length - 1].utm_term;
        var first_landingpage = cookie[cookie.length - 1].landingPage;
        var first_referrer = cookie[cookie.length - 1].referrer;

        fillFieldWithValue("smujarFirstVisit", (first_utms || '') + (("-"+first_utmm) || '') + (("-"+first_gclid) || '') + (("-"+first_utmc) || '') + (("-"+first_utmcontent) || '') + (("-"+first_utmterm) || '')) + (("-"+first_li_fat_id) || '')
        fillFieldWithValue("smujarFirstVisitTime", firstVisitTime);
        fillFieldWithValue("smujarFirstUTMSource", first_utms);
        fillFieldWithValue("smujarFirstUTMMedium", first_utmm);
        fillFieldWithValue("smujarFirstUTMCampaign", first_utmc);
        fillFieldWithValue("smujarFirstUTMContent", first_utmcontent);
        fillFieldWithValue("smujarFirstUTMTerm", first_utmterm);

        fillFieldWithValue("smujarFirstLandingPage", first_landingpage);
        fillFieldWithValue("smujarFirstReferrer", first_referrer);


    }
    if (document.cookie.indexOf("__hstc=") >= 0) {
        fillFieldWithValue("smujarHubspotCookie", getCookie("__hstc"));
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
    fillFieldWithValue("smujarHistory", "");
    fillFieldWithValue("smujarFirstVisit", "");
    fillFieldWithValue("smujarFirstVisitTime", "");

    fillFieldWithValue("smujarCurrentUTMSource", "");
    fillFieldWithValue("smujarCurrentUTMMedium", "");
    fillFieldWithValue("smujarCurrentUTMCampaing", "");
    fillFieldWithValue("smujarCurrentUTMContent", "");
    fillFieldWithValue("smujarCurrentUTMTerm", "");
}

function trackEnabled() {
    return getCookie("smartUTMJar") != "DoNotTrack";
}

function runSmartUTMJar() {
    if (isAdRelevantVisit() && trackEnabled()) {
        writeCookieWithUTMParams(extractCampaignParameters(extractParameters()));
    }
    if (trackEnabled()) {
    maintainLength();
    fillUTMJarField();
}
}

runSmartUTMJar();



