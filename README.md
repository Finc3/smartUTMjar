## smartUTMjar

this is a script collection that stores utm parameters in cooke and offers a service to add them into a hidden field of a html form for submission into i.e. a CRM system.

## How to use it?

There is the scrip SmartUTMJar.js. This script should be added to every webpage where you want to catch UTM/gclid parameters or organic search parameters.
The script writes a cookie with your parameters or your google referrer. Your forms on your website should contain a hidden field with the id:**smartUTMJarHiddenField**. When a user opens the site with the form the script tries to fill every hidden field with the id: **smartUTMJarHiddenField**. On submit the data is transferred but the cookie will still remain in the users cookie jar.

## How to test it?

The repository contains a python webserver which can be started with: **python utmparams.py**. You will find the webserver on http://localhost:5003 and you can play around with utm prameters. An example URL: http://localhost:5003/?utm_source=google&utm_medium=email&utm_campaign=december_2018 . When you submit your form the webserver will output something like this on the command line: INFO in utmparams: Got UTM Parameter: ImmutableMultiDict([('firstname', 'Chris'), ('utmstuff', 'utm_source=google|utm_medium=email|utm_campaign=december_2018|visit=4-12-2018-12-16')])

## The format for BI/Analytics Tools?

The format is a list in one string. The seperator is |. Values are stored like: key=value. And the list is generated in the form: key=value|key=value. Each datapoint ends with: visit and a timestamp with the format: DAY-MONTH-YEAR-HOUR-MINUTE. An example: utm_source=google|utm_medium=email|utm_campaign=december_2018|visit=4-12-2018-12-16|utm_source=google|utm_medium=email|utm_campaign=december_2018|visit=4-12-2018-12-15
