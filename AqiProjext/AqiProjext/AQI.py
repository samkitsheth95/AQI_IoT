# -*- coding: utf-8 -*-
import time
from sds011 import *
import datetime
import pymysql.cursors
import aqi
import os

sensor = SDS011("/dev/ttyUSB0")

def get_data(n=3):
        sensor.sleep(sleep=False)
        pmt_2_5 = 0
        pmt_10 = 0
        time.sleep(10)
        for i in range (n):
            x = sensor.query()
            pmt_2_5 = pmt_2_5 + x[0]
            pmt_10 = pmt_10 + x[1]
            time.sleep(2)
        pmt_2_5 = round(pmt_2_5/n, 1)
        pmt_10 = round(pmt_10/n, 1)
        sensor.sleep(sleep=True)
        time.sleep(2)
        return pmt_2_5, pmt_10

def conv_aqi(pmt_2_5, pmt_10):
    aqi_2_5 = aqi.to_iaqi(aqi.POLLUTANT_PM25, str(pmt_2_5))
    aqi_10 = aqi.to_iaqi(aqi.POLLUTANT_PM10, str(pmt_10))
    return aqi_2_5, aqi_10

connection = pymysql.connect(host=os.getenv("HOST"),
                             user=os.getenv("USER"),
                             password=os.getenv("PASSWORD"),
                             db=os.getenv("DB"))

while True:
    pmt_2_5, pmt_10 = get_data()
    aqi_2_5, aqi_10 = conv_aqi(pmt_2_5, pmt_10)
    with connection.cursor() as cursor:
        sql = "INSERT INTO `aqiData` (`date`,`pmt_2_5`, `aqi_2_5`, `pmt_10`, `aqi_10`) VALUES (%s, %s, %s, %s, %s)"
        cursor.execute(sql, ( datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"), pmt_2_5, aqi_2_5, pmt_10, aqi_10))
    connection.commit()
    time.sleep(30)

