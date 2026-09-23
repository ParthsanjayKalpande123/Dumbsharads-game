from flask import Flask, render_template

app = Flask(__name__)

WORDS = [
    "planet",
    "rocket",
    "pirate",
    "dragon",
    "wizard",
    "banana",
    "forest",
    "comet",
    "castle",
    "galaxy",
    "treasure",
    "knight",
    "jungle",
    "volcano",
    "puzzle",
]


@app.route("/")
def index():
    return render_template("index.html")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
