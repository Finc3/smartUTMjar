## smartUTMjar

This is a script collection that stores utm parameters in cookie and offers a service to add them into a hidden field of a html form for submission into i.e. a CRM system.
All visits are recorded (if properly integrated with cookie consent). The top 6 search engines are explicitly marked as organic traffic. All other visits are recorded as "referrer" with the host from which the user visited your website. 
Besides utm parameters, the script also records the google click id, facebook click id and linkedin click id. This might be helpful for offline conversions (For example you have a dedicated sales process after signup).
This tool helps you to track your ad revelant and analytics relevant traffic throughout your whole tool stack and not only on your website.

## How to use it?

There is the scrip SmartUTMJar.js. This script should be added to every webpage where you want to catch UTM/gclid parameters or organic search parameters.
The script writes a cookie with your parameters or your google referrer. Your forms on your website should contain three hidden fields with the ids or names (e.g `** <input name="smujarHistory"> **`):
* **smujarHistory** -> the full history of visits in handy json format
* **smujarFirstVisit** -> the campagne/clickid for the first visit
* **smujarFirstVisitTime** -> the timestamp for the first visit

There are more parameters that can be used. Those parameters split into current and first parameters. Current fields are filled with LastTouch values and First fields are filled with the first recorded parameters from a visit.

 Field name   | Desctiption   |
 :-----------: | :------------|
 **smujarCurrentUTMSource** | UTM Source |
 **smujarCurrentUTMMedium** | UTM Medium |
 **smujarCurrentUTMCampaign** | UTM Campaign |
 **smujarCurrentUTMContent** | UTM Content |
 **smujarCurrentUTMTerm** | UTM Term |
 **smujarCurrentLandingPage** | Landingpage in: Current URL in the location |
 **smujarCurrentReferrer** | Current referrer |
 **smujarCurrentGclid** | Current google click id |
 **smujarCurrentLiFatId** | Current linkedin click id |
 **smujarCurrentFBclid** | Current facebook click id |
 **smujarFirstUTMSource** | First recorded UTM Source |
 **smujarFirstUTMMedium** | First recorded UTM Medium |
 **smujarFirstUTMCampaign** | First recorded UTM Campaign |
 **smujarFirstUTMContent** | First recorded UTM Content |
 **smujarFirstUTMTerm** | First recorded UTM Term |
 **smujarFirstLandingPage** | First recorded Landingpage in: Current URL in the location |
 **smujarFirstReferrer** | First recorded referrer |


When a user opens the site with the form the script tries to fill every hidden field with the ids: **smujarFirstVisitTime**, **smujarFirstVisit**, **smujarHistory**. On submit the data is transferred but the cookie will still remain in the users cookie jar.

## How to test it?

The repository contains a python webserver which can be started with: **python utmparams.py**.
You will find the webserver on http://localhost:5003 and you can play around with utm prameters.
* An example URL: http://127.0.0.1:5003/?utm_source=testing_zapier2&utm_medium=computa2&utm_campaign=testing_zapier2&utm_id=testing_zapier2&utm_term=wild_games2&utm_content=ads2 .
When you submit your form the webserver will output something like this on the command line:
`** Got UTM Parameter: Got UTM Parameter: ImmutableMultiDict([('firstname', 'Mickey'), ('utmstuff', '[{"utm_source":"testing_zapier2","utm_medium":"computa2","utm_campaign":"testing_zapier2","utm_term":"wild_games2","utm_content":"ads2","visit":"2022-1-13T16:4:00Z","referrer":"","landingPage":"http://127.0.0.1:5003/"}]'), ('firstVisit', 'testing_zapier2-computa2-undefined-testing_zapier2-ads2-wild_games2'), ('smujarFirstVisitTime', '2022-1-13T16:4:00Z'), ('smujarCurrentUTMSource', 'testing_zapier2'), ('smujarCurrentUTMMedium', 'computa2'), ('smujarCurrentUTMCampaign', 'testing_zapier2'), ('smujarCurrentUTMContent', 'ads2'), ('smujarCurrentUTMTerm', 'wild_games2'), ('smujarCurrentUTMTerm', 'NoPrevVisit'), ('smujarCurrentLandingPage', 'http://127.0.0.1:5003/'), ('smujarCurrentReferrer', ''), ('smujarFirstUTMSource', 'testing_zapier2'), ('smujarFirstUTMMedium', 'computa2'), ('smujarFirstUTMCampaign', 'testing_zapier2'), ('smujarFirstUTMContent', 'ads2'), ('smujarFirstUTMTerm', 'wild_games2'), ('smujarFirstLandingPage', 'http://127.0.0.1:5003/'), ('smujarFirstReferrer', '')])`

## The format for BI/Analytics Tools?

* The format is JSON. The history will be transmitted as a ordered json list. The first visit is the last element in the list.
* **smujarFirstVisit** -> is a string with the campaing/clickId. The format is: utm_source-utm_medium-utm_campaign-gclid
* **smujarFirstVisitTime** -> timestring in the format: YYYY-MM-DTHH:MM:00Z. Timezone is always in UTC
* **ALL OTHER PARAMETERS** -> all other parameters contain the values exactly as given in the URL. (UTMTerm send as: HelloWorld, "HelloWorld" would be put into the corresponding field)

## Disable Cookies

If a user does not allow tracking cookies the cookie needs to be disabled. There is a function which provides this
kind of functionality. Add: `disableSmujarCookie()` anywhere to disable the tracking.

## TAG MANAGER

The script should be deployed in its own tag and be called with specific datalayer pushes (For example cookie consent)
This script is meant to be used with the Google Tag Manager. The reason is: Cookie consent can easily be managed with the tag manager. 
Everytime a successful consent was given a dataLayer is pushed and therefore the script executed.

## Help with your actionable analytics?

We at Finc3 are happy to help you with Actionable Analytics. Just visit our website and get in touch with us.
[Get in touch with Finc3](https://www.finc3.com/#contact?utm_source=github&utm_campaign=smartutmjar "Finc3 Contact!")