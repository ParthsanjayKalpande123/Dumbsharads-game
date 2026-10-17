# ===============================================================
# Dumbsharads Game - Flask Web Application
# Assignment No. 6: Jenkins CI Integration & Automated SCM Retrieval
# Author: Parth Kalpande (ParthsanjayKalpande123)
# Live CI Change: Updated with descriptive comments for Jenkins build
# ===============================================================
#code

from flask import Flask, render_template

app = Flask(__name__)

# Predefined vocabulary list used for the Dumbsharads guessing game
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


# Main index route to render the game web page
@app.route("/")
def index():
    return render_template("index.html")


# Application entry point - runs local development server
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
