import sys
reload(sys)
sys.setdefaultencoding( "utf-8" )
import web
import json
from time import time
import requests
import common,logging,os,trending_html_parse
import util
from _header import header
import hashlib,urllib
from github_login import GithubLogin
from github_star import GithubStar
from urls import urls
from api import CODEHUB_API,CODEHUB_API_LAN,CODEHUB_API_LANGUAGES,SEARCH_API
from _repo_search import ReposSearch
from _trending import Trending
from github_star_status import GithubStarStatus
from github_follow import GithubFollow
from _repo_v2 import ReposV2
from _repo import Repos
app = web.application(urls,globals())

class Image:
    def GET(self,rep):
        png = rep.split('/')[-1]
        print png
        with open('Image/' + png,'r') as f:
            c = f.read()
        return c

class Languages:
    def GET(self):
        _lans_json = requests.get(CODEHUB_API_LANGUAGES,headers=header)

        return _lans_json.text

class Capture:
    def GET(self,rep):
            capture_png = rep.split('/')[-1] + '.png'
            print capture_png   
            png_path = common.PIC + '/' + capture_png
            # webp_path = common.WEBP +'/' + capture_png + '.webp'
            if not os.path.exists(png_path):
                png_path = trending_html_parse.capture(common.API.replace('trending',rep),png_path)
            # if not os.path.exists(webp_path):
            #     webp_path = trending_html_parse.convert_webp(png_path)
            return png_path
class AllLang:
    def GET(self):
            logging.warning("======= GET STARTED =======")
            filePath = _get_time() + 'all.json'
            if os.path.exists(filePath):
                f = open(filePath,'r')
                s = f.readline()
                f.close()
                return s
            # self.path = '/index.html'
            # SimpleHTTPServer.SimpleHTTPRequestHandler.do_GET(self)
            else:
                s = requests.get(common.API)
                t = trending_html_parse.TrendingHtmlParser(s.text.encode('utf-8'))
                _json = t._get_json()
                # self.wfile.write(json.dumps(_json))
                f = open(filePath,'w')
                f.write(json.dumps(_json))
                f.close()
                return json.dumps(_json)

if __name__ == '__main__':
    app.run()