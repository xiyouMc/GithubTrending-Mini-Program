from selenium import webdriver
# from selenium.webdriver.firefox.firefox_binary import FirefoxBinary
import threading,common,time,os
from PIL import Image
def capture(url, save_fn="capture.png"):
    print url
    browser = webdriver.PhantomJS('PhantomJS/phantomjs')
    browser.set_window_size(1200, 900)
    browser.get(url) 
    browser.save_screenshot(save_fn)
    browser.close()
    if not os.path.exists('webp_pic'):
        os.mkdir('webp_pic')
    im = Image.open(save_fn)
    pic_path = 'webp_pic/' + save_fn + '.webp'
    im.save(pic_path,'WEBP')
    return pic_path
class TrendingHtmlParser():
    html = ''
    rpo = []
    
    a = '<div class="d-inline-block col-9 mb-1">'
    def __init__(self,html):
        html = html.replace('\n','')
        _attr = html.split(self.a)
        temp = True
        num = 0
        for item in _attr:
            if temp:
                temp = False
                continue
            num = num + 1
            rpo_model = {}
            link_tmp = item[item.find('<a href="') + len('<a href="'):len(item)]
            link = link_tmp[0:link_tmp.find('">')]
            print link
            rpo_model['link'] = link
            if not os.path.exists(link.split('/')[-1] + '.png'):
                t = threading.Thread(target=capture,args=(common.API.replace('trending',link),link.split('/')[-1] + '.png'))
                t.setDaemon(True)
                t.start()
            desc_tmp = link_tmp[link_tmp.find('<p class="col-9 d-inline-block text-gray m-0 pr-4">') + len('<p class="col-9 d-inline-block text-gray m-0 pr-4">'):len(link_tmp)]
            desc = desc_tmp[0:desc_tmp.find('</p>')]
            if 'g-emoji' in desc:
                arr = desc.split('<g-emoji')
                c = arr[0]
                print desc
                for i in arr:
                    g = i.split('</g-emoji>')
                    emoji = g[0].split('>')[-1]
                    c += emoji + g[1] if len(g) == 2 else ''
                print c
                rpo_model['desc'] = c
            else:
                print desc
                rpo_model['desc'] = desc
            lang_tmp = desc_tmp[desc_tmp.find('programmingLanguage">') + len('programmingLanguage">'):len(desc_tmp)]
            if 'programmingLanguage' in lang_tmp:
                lang = lang_tmp[0:lang_tmp.find('</span>')]
                print lang
                rpo_model['lang'] = lang
            _ext_attr = lang_tmp.split('</svg>')
            if len(_ext_attr) == 3:
                stars = _ext_attr[2][0:_ext_attr[2].find('</a>')]
            else:
                stars = _ext_attr[3][0:_ext_attr[3].find('</a>')]
            stars = stars[0:stars.find('</span>')]
            print stars
            rpo_model['stars'] = stars
            self.rpo.append(rpo_model)
        print num
    def _get_json(self):
        return self.rpo