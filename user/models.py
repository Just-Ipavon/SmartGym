from flask import Flask, jsonify, request, session, redirect, flash
from passlib.hash import pbkdf2_sha256
from app import db
import uuid

class User:

    def start_session(self, user):
        del user['password']
        session['logged_in'] = True
        session['user'] = user
        redirect('/User/')
        return jsonify(user), 200
    
    def signup(self):

        user = {
            "_id": uuid.uuid4().hex,
            "first_name": request.form.get('first_name'),
            "last_name": request.form.get('last_name'),
            "phone": request.form.get('phone'),
            "email": request.form.get('email'),
            "birthday": request.form.get('birthday'),
            "gender": request.form.get('gender'),
            "password": request.form.get('password'),
            "role": "user"
        }

        #Encrypt the password
        user['password'] = pbkdf2_sha256.encrypt(user['password'])

        #Email check
        if db.users.find_one({"email": user['email']}):
            return jsonify({"error": "Email already present"}), 400
        if db.users.insert_one(user):
            return self.start_session(user)

        return jsonify({"error":"Signup failed"}), 400

    def signout(self):
        session.clear()
        return redirect('/')



    def login(self):

        user = db.users.find_one({
            "email": request.form.get('email')
        })

        if user and pbkdf2_sha256.verify(request.form.get('password'), user['password']):
            return self.start_session(user)
        else:
            return jsonify({ "error": "Invalid login credentials" }), 401
