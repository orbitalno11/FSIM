from flask import Flask, render_template, jsonify, request


app = Flask('FSIM')


@app.route('/')
def index():
    return "INDEX"


if __name__ == '__main__':
    app.run(debug=True)
