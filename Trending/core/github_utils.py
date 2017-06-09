#coding:utf-8
import requests
import cookielib
import re
def get_auth_token(text):
    return re.findall('<input name="authenticity_token" type="hidden" value="(.*?)"',text)
def read_cookies(username):
    #实例化一个LWPCookieJar对象
    load_cookiejar = cookielib.LWPCookieJar()
    #从文件中加载cookies(LWP格式)
    load_cookiejar.load('cookies/' + username + '.txt', ignore_discard=True, ignore_expires=True)
    #工具方法转换成字典
    load_cookies = requests.utils.dict_from_cookiejar(load_cookiejar)
    #工具方法将字典转换成RequestsCookieJar，赋值给session的cookies.
    # print session.text
    return requests.utils.cookiejar_from_dict(load_cookies)