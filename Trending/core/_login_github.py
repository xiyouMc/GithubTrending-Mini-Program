#coding:utf-8
import requests
import re,os
import cookielib
INDEX_API = 'https://github.com/'
LOGIN_API = 'https://github.com/login'
SESSION_API = 'https://github.com/session'
s = requests.Session()
def get_auth_token(text):
    return re.findall('<input name="authenticity_token" type="hidden" value="(.*?)"',text)
def default(username,password):
    if not os.path.exists('cookies/' + username + '.txt'):
        r = s.get(INDEX_API,verify=False)
        l = s.get(LOGIN_API,verify=False)
        print l.cookies['_gh_sess']
        data = {
            'commit':'Sign in',
            'utf8':'%E2%9C%93',
            'authenticity_token':get_auth_token(l.text),
            'login':username,
            'password':password
        }
        session = s.post(SESSION_API,data=data)
        print session.history
        if len(session.history) == 0 or not session.history[0].status_code == 302 :
            print 'Login Fail'
            return
        save_cookies(username,session)
        user = re.findall('<meta name="user-login" content="(.*?)"',session.text)
        print 'user:1111111',user
    else:
        read_cookies(username)
    star()
def save_cookies(username,session):
    new_cookie_jar = cookielib.LWPCookieJar(username+'.txt')
    #将转换成字典格式的RequestsCookieJar（这里我用字典推导手动转的）保存到LWPcookiejar中
    requests.utils.cookiejar_from_dict({c.name: c.value for c in session.cookies}, new_cookie_jar)
    #保存到本地文件
    if not os.path.exists('cookies'):
        os.mkdir('cookies')
    new_cookie_jar.save('cookies/'+username+'.txt', ignore_discard=True, ignore_expires=True)
def read_cookies(username):
    #实例化一个LWPCookieJar对象
    load_cookiejar = cookielib.LWPCookieJar()
    #从文件中加载cookies(LWP格式)
    load_cookiejar.load('cookies/' + username + '.txt', ignore_discard=True, ignore_expires=True)
    #工具方法转换成字典
    load_cookies = requests.utils.dict_from_cookiejar(load_cookiejar)
    #工具方法将字典转换成RequestsCookieJar，赋值给session的cookies.
    s.cookies = requests.utils.cookiejar_from_dict(load_cookies)
    # print session.text
def star():
    repo = 'https://github.com/AlloyTeam/AlloyLever/'
    star = s.get(repo,verify=False)
    auto_token_content = re.findall('AlloyTeam/AlloyLever/star"(.*?)</div>',star.text)
    print auto_token_content
    data = {
        'utf8':'%E2%9C%93',
        'authenticity_token':get_auth_token(auto_token_content[0])
    }
    s.headers.update({'X-Requested-With':'XMLHttpRequest'})
    star_re = s.post(repo + 'star',data=data,verify=False)
    print star_re.text
