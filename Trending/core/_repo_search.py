import web
import util
import os
import urllib
from api import SEARCH_API
import requests
from util import getInput,_get_time,dirs
from _header import header
search = 'Search'
class ReposSearch:
    def GET(self):
        print web.input()
        params = util.getInput(web.input())
        q = params['q']
        if not os.path.exists(search):
            os.mkdir(search)
        with open(search+'/q.txt','a') as f:
            f.write( _get_time()  + '----'+ q + '\n')
        q = urllib.quote(str(q))
        print q
        api = SEARCH_API % q
        print api,header
        r = requests.get(api, verify=False,headers=header)
        return r.text