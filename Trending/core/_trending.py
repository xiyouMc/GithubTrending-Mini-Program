import os
import web
from util import getInput,_get_time,dirs
from api import CODEHUB_API_LAN,CODEHUB_API
import requests
import urllib
class Trending:
    def GET(self):
        if not os.path.exists(dirs):
            os.mkdir(dirs)
        
        print web.input()
        params = getInput(web.input())
        print params
        since = params.get('since')
        language = params.get('language')
        if not language == None:
            language = urllib.quote(language)
            print language
        if not language == None:
            filename = _get_time() + since + language + '.json'
        else:
            filename = _get_time() + since + '.json'
        if os.path.exists(dirs + '/' + filename):
            with open(dirs + '/' + filename,'r') as f:
                content = f.readline()
            if not content == '':
                return content
        if not language == None:
            trending_api = CODEHUB_API_LAN % (since,language)           
        else:
            trending_api = CODEHUB_API % since     
        print trending_api      
        _trending_json = requests.get(trending_api)
        with open('CodeJsonData/' + filename,'w') as f:
            f.write(_trending_json.text.encode('utf-8'))
        return _trending_json.text