import web
import json
from time import time
import common,logging,datetime,os,trending_html_parse
urls = (
    '/all/','AllLang',
    '/capture/(.*)','Capture'
)
app = web.application(urls,globals())
class Capture:
    def GET(self,rep):
            capture_png = rep.split('/')[-1] + '.png'
            print capture_png
            if not os.path.exists(capture_png):
                trending_html_parse.capture(common.API.replace('trending',rep),capture_png)
            f = open(capture_png,'rb')
            b = f.read()
            f.close()
            # self.wfile.write(b)
            print 'Send Response!!!!'
            return b
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
                # f = open(filePath,'w')
                # f.write(json.dumps(_json))
                # f.close()
                return json.dumps(_json)
def _get_time():
        return datetime.datetime.now().strftime('%Y-%m-%d')

if __name__ == '__main__':
    app.run()