from util import getInput
import web
import requests
from github_utils import read_cookies,get_auth_token
import re
import json
import time
import threading
class ResponseStar:
    def __init__(self):
        self.repo = ''
        self.stared = ''

class GithubStarStatus:
    def GET(self):
        print 'Star'
        time1 = time.time()
        self.s = requests.Session()
        params = getInput(web.input())
        repos = params.get('githubs')
        repos = repos.replace('&quot;','"')
        print repos
        _json_repos = json.loads(repos)
        username = params.get('username')
        self.s.cookies = read_cookies(username)
        self._repos = []
        threads = []
        self.repo_size = len(_json_repos)
        for repo in _json_repos:
            t = threading.Thread(target=self.status,args=(repo,))
            threads.append(t)
        for t in threads:
            t.setDaemon(True)
            t.start()
        while not self.repo_size == 0:
            pass
        
        _json_resp = json.dumps(self._repos)
        print _json_resp,time.time() - time1
        return _json_resp
    def status(self,repo):
        repo_content = self.s.get('https://github.com/' + repo,verify=False)
        is_star = re.findall('starring-container on',repo_content.text)
        print is_star
        if not is_star:
            stared = 'not_star'
        else:
            stared = 'stared'
        responseStared =  ResponseStar()
        responseStared.repo = repo
        responseStared.stared =stared
        self._repos.append(responseStared.__dict__)
        self.repo_size = self.repo_size-1