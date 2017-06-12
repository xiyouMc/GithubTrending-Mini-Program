from util import getInput,_get_time,dirs
import web,hashlib,requests,json
from _header import header
import os
class ReposV2:
    def GET(self):
        params = getInput(web.input())
        github_url = params['github']
        print github_url
        m2 = hashlib.md5()   
        m2.update(github_url)   
        url_md5 =  m2.hexdigest()   
        if os.path.exists(dirs + '/' + _get_time() + url_md5):
            with open(dirs + '/' + _get_time() + url_md5,'r') as f:
                c = f.readline()
            # if not c == None:
            #     return c
        _json = requests.get(github_url,verify=False)
        print _json.text
        if(_json):
            _json_data = json.loads(_json.text)
            for j in _json_data:
                print j
                n = j['name'].lower()
                print n
                if n == 'readme.md':
                    github_url += j['path']
                    _json = requests.get(github_url,verify=False)
                    break
        with open(dirs + '/' + _get_time() + url_md5,'w') as f:
            f.write(_json.text.encode('utf-8'))
        return _json.text
