from flask import Flask, render_template, request, redirect

app = Flask(__name__)


@app.route('/', methods=["POST", "GET"])
def hello_world():
    if request.method == "POST":
        app.logger.info("Got UTM Parameter: "+str(request.form))
        return redirect("/")
    else:
        return render_template('test_utm_params.html')


if __name__ == '__main__':
    app.run(port=5003, debug=True)
