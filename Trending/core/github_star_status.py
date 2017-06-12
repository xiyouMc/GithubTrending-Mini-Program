from util import getInput
import web
import requests
from github_utils import read_cookies,get_auth_token
import re
import json
import time
import threading
import multiprocessing

def status(repo,s):
        repo_content = s.get('https://github.com/' + repo,verify=False)
        is_star = re.findall('starring-container on',repo_content.text)
        print is_star
        if not is_star:
            stared = 'not_star'
        else:
            stared = 'stared'
        print stared
        responseStared =  ResponseStar()
        responseStared.repo = repo
        responseStared.stared =stared
        # return 
        # _repos.append(responseStared.__dict__)
        return responseStared.__dict__

class ResponseStar:
    def __init__(self):
        self.repo = ''
        self.stared = ''

class GithubStarStatus:
    def GET(self):
        print 'Star'
        time1 = time.time()
        s = requests.Session()
        params = getInput(web.input())
        repos = params.get('githubs')
        repos = repos.replace('&quot;','"')
        print repos
        _json_repos = json.loads(repos)
        username = params.get('username')
        s.cookies = read_cookies(username)
        _repos = []
        pool = multiprocessing.Pool(processes=10)

        for repo in _json_repos:
            _repos.append(pool.apply_async(status,(repo,s,)).get())
            # t = threading.Thread(target=self.status,args=(repo,))
            # threads.append(t)
        # for t in threads:
        #     t.setDaemon(True)
        #     t.start()
        # time.sleep(2)
        pool.close()
        _json_resp = json.dumps(_repos)
        pool.join()
        
        print _json_resp,time.time() - time1
        return _json_resp