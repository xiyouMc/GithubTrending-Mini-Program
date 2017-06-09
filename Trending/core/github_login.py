#coding:utf-8
from util import getInput
import web
import requests
from github_utils import get_auth_token
import os
INDEX_API = 'https://github.com/'
LOGIN_API = 'https://github.com/login'
SESSION_API = 'https://github.com/session'
import re
import cookielib
import json
import github_token
import hashlib
class GithubLogin:
    def GET(self):
        self.s = requests.Session()
        print 'aaaa'
        params = getInput(web.input())
        print params
        self.username = params.get('username')
        self.password = params.get('password')
        print self.username,self.password
        user,avatar,secret_username = self.login()
        js ={
            'user':user,
            'avatar':avatar.replace('40','200'),
            'fuck_username':secret_username
        }
        return json.dumps(js)
    def login(self):
        # if not os.path.exists('cookies/' + self.username + '.txt'):
        r = self.s.get(INDEX_API,verify=False)
        l = self.s.get(LOGIN_API,verify=False)
        print l.cookies['_gh_sess']
        data = {
            'commit':'Sign in',
            'utf8':'%E2%9C%93',
            'authenticity_token':get_auth_token(l.text),
            'login':self.username,
            'password':self.password
        }
        session = self.s.post(SESSION_API,data=data)
        print session.history
        if len(session.history) == 0 or not session.history[0].status_code == 302 :
            print 'Login Fail'
            return 'login_error','',''
        self.user = re.findall('<meta name="user-login" content="(.*?)"',session.text)
        print self.user[0]
        avatar = re.findall(' <img alt="@xiyouMc" class="avatar" src="(.*?)"',session.text)
        # else:
        #     read_cookies()
        print 'return:' + self.user[0]
        m2 = hashlib.md5()   
        m2.update(self.user[0] + github_token.token)   
        self.secret_username = m2.hexdigest()  
        self.save_cookies(session)
        return self.user[0],avatar[0],self.secret_username 
    def save_cookies(self,session):
        new_cookie_jar = cookielib.LWPCookieJar(self.secret_username+'.txt')
        #将转换成字典格式的RequestsCookieJar（这里我用字典推导手动转的）保存到LWPcookiejar中
        requests.utils.cookiejar_from_dict({c.name: c.value for c in session.cookies}, new_cookie_jar)
        #保存到本地文件
        if not os.path.exists('cookies'):
            os.mkdir('cookies')
        new_cookie_jar.save('cookies/'+self.secret_username+'.txt', ignore_discard=True, ignore_expires=True)