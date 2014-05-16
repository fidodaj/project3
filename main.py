""" main.py is the top level script.

Return "Hello World" at the root URL.
"""

import os
import sys

# sys.path includes 'server/lib' due to appengine_config.py
from flask import Flask
from flask import render_template
app = Flask(__name__.split('.')[0])


@app.route('/')
def menu(name=None):
  """ Return hello template at application root URL."""
  return render_template('menu.html', name=name)

@app.route('/cards')
def oneplayer(name=None):
  """ Return hello template at application root URL."""
  return render_template('cards.html', name=name)

@app.route('/multi')
def multiplayer(name=None):
  """ Return hello template at application root URL."""
  return render_template('multi.html', name=name)

@app.route('/playernames')
def names(name=None):
  """ Return hello template at application root URL."""
  return render_template('playernames.html', name=name)

