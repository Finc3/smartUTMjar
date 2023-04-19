import random

from flask import Flask, render_template, request, redirect, make_response

app = Flask(__name__)


@app.route('/', methods=["POST", "GET"])
def print_form_results():
    if request.method == "POST":
        app.logger.info("Got UTM Parameter: "+str(request.form))
        for key, value in request.form.items():
            print(key, "=", value)
        return redirect("/")
    else:
        template_response = make_response(render_template('test_utm_params.html'))
        if random.randint(0, 1) == 0:
            template_response.set_cookie('__hstc', 'HubSpotCookieTest1')
        return template_response


if __name__ == '__main__':
    app.run(port=5003, debug=True)
