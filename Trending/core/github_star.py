from util import getInput
import web
import requests
from github_utils import read_cookies,get_auth_token
import re
class GithubStar:
    def GET(self):
        print 'Star'
        s = requests.Session()
        params = getInput(web.input())
        repo = params.get('github')
        username = params.get('username')
        s.cookies = read_cookies(username)
        star = s.get('https://github.com/' + repo,verify=False)
        auto_token_content = re.findall(repo + '/star"(.*?)</div>',star.text)
        print auto_token_content
        data = {
            'utf8':'%E2%9C%93',
            'authenticity_token':get_auth_token(auto_token_content[0])
        }
        s.headers.update({'X-Requested-With':'XMLHttpRequest'})
        star_re = s.post('https://github.com/' + repo + '/star',data=data,verify=False)
        return star_re.text