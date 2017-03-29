import requests
import time
if __name__ == '__main__':
    while True:
        s = requests.get('http://123.206.111.247/all/')
        print s.status_code
        time.sleep(1 *60 * 24)