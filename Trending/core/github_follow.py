from util import getInput
import web
import requests
from github_utils import read_cookies,get_auth_token
import re
class GithubFollow:
    def GET(self):
        print 'Star'
        params = getInput(web.input())
        return GithubFollow.follow(params.get('to_user'),params.get('username'))

    @staticmethod
    def follow(to_user,username):
        s = requests.Session()
        to_user = to_user
        username = username
        s.cookies = read_cookies(username)
        star = s.get('https://github.com/' + to_user,verify=False)
        # return star.text
        auto_token_content = re.findall('users/follow(.*?)</div>',star.text)
        print auto_token_content
        data = {
            'utf8':'%E2%9C%93',
            'authenticity_token':get_auth_token(auto_token_content[0])
        }
        s.headers.update({'X-Requested-With':'XMLHttpRequest'})
        follow_result = s.post('https://github.com/users/follow?target=' + to_user,data=data,verify=False)
        return follow_result.text