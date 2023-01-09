from flask import Flask, render_template, session, redirect, flash, url_for
import logging
from functools import wraps
import pymongo

app = Flask(__name__, template_folder = 'templates')
app.secret_key = '2346TWG34R6Q43623456724B4'
# Database

client = pymongo.MongoClient("mongodb+srv://Ipavon:Gym2022@cluster0.zq1dzzj.mongodb.net/?retryWrites=true&w=majority")
db = client.Gym
db_users = db["users"]
db_workouts = db["workouts"]

# Decorators
def login_required(f):
  @wraps(f)
  def wrap(*args, **kwargs):
    if 'logged_in' in session:
      return f(*args, **kwargs)
    else:
      return redirect('/')
  
  return wrap

def login_not_required(f):
  @wraps(f)
  def wrap(*args, **kwargs):
    if 'logged_in' in session:
      return redirect('/')
    else:
      return f(*args, **kwargs)
      
  
  return wrap

def admin_required(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if session['user']['role'] == "admin":
            return f(*args, **kwargs)
        else:
            flash("You need to be an admin to view this page.")
            return redirect(url_for('home'))

    return wrap

# Routes
from user import routes

@app.route('/')
def home():
  return render_template('home.html')


@app.route('/AboutUs/')
def AboutUs():
  return render_template('AboutUs.html')


@app.route('/Contact/')
def Contact():
  return render_template('Contact.html')


@app.route('/Gallery/')
def Gallery():
  return render_template('ourgallery.html')

@app.route('/trainer/')
def Trainer():
  return render_template('trainer.html')

@app.route('/Info/')
def Info():
  return render_template('Info.html')

@app.route('/Login/')
@login_not_required
def Login():
  return render_template('Login.html')


@app.route('/Register/')
@login_not_required
def Register():
  return render_template('Register.html')

@app.route('/Result/')
@login_required
def Result():
  return render_template('result.html')

@app.route('/Form/')
@login_required
def Form():
  return render_template('Form.html')

@app.route('/Scan/')
@login_required
def Scan():
  return render_template('Scan.html')

@app.route('/User/')
@login_required
def User():
  return render_template('User.html')

@app.route('/UserList/')
@admin_required
def UserList():
  return render_template('Admin/UserList.html')
