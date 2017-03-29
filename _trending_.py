import requests,trending_html_parse
from selenium import webdriver
import time
import socket
import SimpleHTTPServer
import SocketServer
import logging
import cgi
import subprocess
import json,urllib,os,common
import datetime
class AutoReleaseRequestHandler(SimpleHTTPServer.SimpleHTTPRequestHandler):
    def do_GET(self):
        logging.warning("======= GET STARTED =======")
        logging.warning(self.headers)
        if 'capture' in self.path:
            print self.path
            capture_url = self.path.split('capture')[-1]  
            capture_png = capture_url.split('/')[-1] + '.png'
            print capture_png
            if not os.path.exists(capture_png):
                trending_html_parse.capture(common.API.replace('trending',capture_url),capture_png)
            f = open(capture_png,'rb')
            b = f.read()
            f.close()
            self.wfile.write(b)
        elif 'all' in self.path:
            filePath = self._get_time() + 'all.json'
            if os.path.exists(self._get_time() + 'all.json'):
                f = open(filePath,'r')
                s = f.readline()
                f.close()
                self.wfile.write(s)
            # self.path = '/index.html'
            # SimpleHTTPServer.SimpleHTTPRequestHandler.do_GET(self)
            else:
                s = requests.get(common.API)
                t = trending_html_parse.TrendingHtmlParser(s.text.encode('utf-8'))
                _json = t._get_json()
                self.wfile.write(json.dumps(_json))
                f = open(filePath,'w')
                f.write(json.dumps(_json))
                f.close()
    def _get_time(self):
        return datetime.datetime.now().strftime('%Y-%m-%d')
    def do_POST(self):
        logging.warning("======= POST STARTED =======")
        logging.warning(self.headers)
        form = cgi.FieldStorage(
            fp=self.rfile,
            headers=self.headers,
            environ={'REQUEST_METHOD': 'POST',
                     'CONTENT_TYPE': self.headers['Content-Type'],
            })
        logging.warning("======= POST VALUES =======")
        self.wfile.write('{"status":"OK"')
        for item in form.list:
            logging.warning(item)
            self.wfile.write(',"%s":"%s"\n' % (item.name, item.value))
        command = 'cd /home/www/%s/; git stash;git pull --rebase  origin %s ' % (
            form['environ'].value, form['branch'].value)
        self.wfile.write(',"command":"%s"' % command)
        self.wfile.write('}')
        subprocess.Popen(command, stdout=subprocess.PIPE,
                         stderr=subprocess.STDOUT, shell=True)


logging.warning("\n")
 
if __name__ == '__main__':
    # s = socket.socket(socket.AF_INET,socket.SOCK_DGRAM)
    # s.bind('127.0.0.1',port)
    # while True:
        # s = requests.get(DEFAULT)
    #     # s = requests.get(DEFAULT + '/html')
        # t = trending_html_parse.TrendingHtmlParser(s.text.encode('utf-8'))
    #     # capture('https://github.com/atlassian/localstack')
        # _json = t._get_json()
    print 'Starting server, use <Ctrl-C> to stop'
    server = SocketServer.TCPServer(('0.0.0.0', common.PORT), AutoReleaseRequestHandler)
    server.serve_forever()