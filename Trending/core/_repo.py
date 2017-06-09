from util import getInput,_get_time,dirs
import web,hashlib,requests,json
from _header import header
import os
class Repos:
    def GET(self):
        params = getInput(web.input())
        github_url = params['github']
        m2 = hashlib.md5()   
        m2.update(github_url)   
        url_md5 =  m2.hexdigest()   
        if os.path.exists(dirs + '/' + _get_time() + url_md5):
            with open(dirs + '/' + _get_time() + url_md5,'r') as f:
                c = f.readline()
            if not c == None:
                return c
        _json = requests.get(github_url,verify=False,headers=header)
        if 'README.md' in github_url:
            _j = json.loads(_json.text)
            if _j.get('message') == 'Not Found':
                github_url = github_url.replace('README.md','ReadMe.md')
                _json = requests.get(github_url,verify=False,headers=header)
                _j = json.loads(_json.text)
                if _j.get('message') == 'Not Found':
                     github_url = github_url.replace('ReadMe.md','README.rst')
                     _json = requests.get(github_url,verify=False,headers=header)
        with open(dirs + '/' + _get_time() + url_md5,'w') as f:
            f.write(_json.text.encode('utf-8'))
        return _json.text
