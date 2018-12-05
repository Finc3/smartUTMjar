## smartUTMjar

this is a script collection that stores utm parameters in cooke and offers a service to add them into a hidden field of a html form for submission into i.e. a CRM system.

## How to use it?

There is the scrip SmartUTMJar.js. This script should be added to every webpage where you want to catch UTM/gclid parameters or organic search parameters.
The script writes a cookie with your parameters or your google referrer. Your forms on your website should contain three hidden fields with the ids:
* **smujarHistory** -> the full history of visits in handy json format
* **smujarFirstVisit** -> the campagne/clickid for the first visit
* **smujarFirstVisitTime** -> the timestamp for the first visit
When a user opens the site with the form the script tries to fill every hidden field with the ids: **smujarFirstVisitTime**, **smujarFirstVisit**, **smujarHistory**. On submit the data is transferred but the cookie will still remain in the users cookie jar.

## How to test it?

The repository contains a python webserver which can be started with: **python utmparams.py**.
You will find the webserver on http://localhost:5003 and you can play around with utm prameters.
An example URL: http://localhost:5003/?utm_source=google&utm_medium=email&utm_campaign=december_2018 . When you submit your form the webserver will output something like this on the command line:
** INFO in utmparams: Got UTM Parameter: ImmutableMultiDict([('firstname', 'Chris'), ('utmstuff', 'utm_source=google|utm_medium=email|utm_campaign=december_2018|visit=4-12-2018-12-16')])**

## The format for BI/Analytics Tools?

The format is JSON. The history will be transmitted as a ordered json list. The first visit is the last element in the list.
**smujarFirstVisit** -> is a string with the campaing/clickId
**smujarFirstVisitTime** -> timestring in the format: YYYY-MM-DDTHH:MM:00Z. Timezone is always in UTC