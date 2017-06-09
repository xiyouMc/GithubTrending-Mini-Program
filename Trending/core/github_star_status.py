from util import getInput
import web
import requests
from github_utils import read_cookies,get_auth_token
import re
class GithubStarStatus:
    def GET(self):
        print 'Star'
        s = requests.Session()
        params = getInput(web.input())
        repo = params.get('github')
        username = params.get('username')
        s.cookies = read_cookies(username)
        repo_content = s.get('https://github.com/' + repo,verify=False)
        is_star = re.findall('starring-container on',repo_content.text)
        print is_star
        if not is_star:
            return 'not_star'
        else:
            return 'stared'