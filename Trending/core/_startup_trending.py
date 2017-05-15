import web
import json
from time import time
import requests
import common,logging,datetime,os,trending_html_parse
import util
CODEHUB_API = 'http://trending.codehub-app.com/v2/trending?since=%s'
CODEHUB_API_LAN = 'http://trending.codehub-app.com/v2/trending?since=%s&language=%s'
CODEHUB_API_LANGUAGES = 'http://trending.codehub-app.com/v2/languages'
urls = (
    '/all/','AllLang',
    '/capture/(.*)','Capture',
    '/v1/trending','Trending',
    '/v1/languages','Languages',
    '/v1/repos','Repos'
)
app = web.application(urls,globals())

class Trending:
    def GET(self):
        print web.input()
        params = util.getInput(web.input())
        print params
        since = params['since']
        language = params.get('language')
        print language
        if not language == None:
            trending_api = CODEHUB_API_LAN % (since,language)
        else:
            trending_api = CODEHUB_API % since
        _trending_json = requests.get(trending_api)
        return _trending_json.text
class Languages:
    def GET(self):
        _lans_json = requests.get(CODEHUB_API_LANGUAGES)
        return _lans_json.text
class Repos:
    def GET(self):
        params = util.getInput(web.input())
        github_url = params['github']
        _json = requests.get(github_url,verify=False)
        return _json.text

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
def _get_time():
        return datetime.datetime.now().strftime('%Y-%m-%d')

if __name__ == '__main__':
    app.run()