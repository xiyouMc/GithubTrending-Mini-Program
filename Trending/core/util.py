import web,datetime

dirs = 'CodeJsonData'
search = 'Search'

def getInput(input):
    return htmlquote(dict(input))

def htmlquote(inputData):
    if isinstance(inputData,dict) == False:
        return web.net.htmlquote(inputData)
    else:
       for k,v in inputData.items():
            inputData[k] = htmlquote(v)
    return inputData
def _get_time():
    return datetime.datetime.now().strftime('%Y-%m-%d')
