import json

from flask import Flask, render_template,redirect,jsonify
from flask import request
import selenium
from flask import *  

import os
import PL_PA
import ast
import json
import requests
import socket

import pandas as pd
app = Flask(__name__)
LOCATED=''
app.secret_key = "abc"
@app.route('/launch',methods=['GET', 'POST'])
def launch():
    url=request.args.get('url', 0, type=str)
    PL_PA.initiate_driver(url)
    return jsonify(status='launched')

@app.route('/',methods=['GET', 'POST'])
def recorder():
    try:
        
        return render_template('recorder/recorder.html',myurl="url")
    except AttributeError:
        return "Driver is disconnected. Launch the browser again"
    except selenium.common.exceptions.WebDriverException:
         return "Driver is disconnected. Launch the browser again"
@app.route('/QRec',methods=['GET', 'POST'])
def QRec():
        data=[]
        try:
            data,data2=PL_PA.Q_recorder()
            print(type(data2))
            print(data2)
            return jsonify(data=data,status="PASS")
        except (selenium.common.exceptions.WebDriverException,AttributeError) as e:
            print(str(e))
            return jsonify(data=data,status="FAIL")
    
    
        
@app.route('/QRec_api_save',methods=['GET', 'POST'])
def QRec_api_save():
        liststring=request.get_json()
        print(liststring)
        d = liststring
        df=pd.DataFrame(d)
        import os
        dirname = os.path.dirname(__file__)
        filename = os.path.join(dirname, 'static\\api_data\\recordedapi.xlsx')
        df.to_excel(filename, index=False)
        return jsonify(data="saved")
@app.route('/QRec_api',methods=['GET', 'POST'])
def QRec_api():
    try:
        data=PL_PA.Q_recorder_api()
        return jsonify(data=data)
    except AttributeError:
        data="STOP"
        return jsonify(data=data)
    except selenium.common.exceptions.WebDriverException:
        data="STOP"
        return jsonify(data=data)

@app.route('/QRec_Stop',methods=['GET', 'POST'])
def QRec_Stop():
    try:
        PL_PA.stop()
        data="Stopped"
        return jsonify(data=data)
    except Exception as e:
        print(e)
        return jsonify(data="")

@app.route('/QRec_Stop_api',methods=['GET', 'POST'])
def QRec_Stop_api():
    PL_PA.stop_api()
    data="Stopped"
    return jsonify(data=data)
@app.route('/collect')
def collect():
        url=request.args.get('track', 0, type=str)
        try:
            L=PL_PA.main()
            if (L=="NOWINDOW"):
                return jsonify(result=L,status="NOWINDOW")
            return jsonify(data=L,status="PASS")
        except (selenium.common.exceptions.WebDriverException,AttributeError) as e:
            print(str(e))
            return jsonify(status="FAIL")
@app.route('/to_pageloc')
def to_pageloc():
    
    xpath=request.args.get('xpath', 0, type=str)
    name=request.args.get('name', 0, type=str)
    tag=request.args.get('tag', 0, type=str)
    xpath=ast.literal_eval(xpath)
    name=ast.literal_eval(name)
    tag=ast.literal_eval(tag)
    L=PL_PA.pageLocatorCreation(name,xpath)
    L2=PL_PA.pageActionCreation(tag,name,xpath)
    L3=PL_PA.pageClassCreation(name,xpath)
    return jsonify(result=L,result2=L2,result3=L3)   

@app.route('/locate')
def locate():
    global LOCATED
    xpath=request.args.get('xpath', 0, type=str)
    status=PL_PA.locate(xpath,LOCATED)
    if status=="PASS":
        LOCATED=xpath
    

    return jsonify(status=status) 
if __name__ == '__main__':
   app.run(debug = True,host="0.0.0.0",port=4100)
