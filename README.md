#### 来自公众号 : DeveloperPython
![](http://upload-images.jianshu.io/upload_images/4653472-b61ffc02ee6e4db5?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![](http://upload-images.jianshu.io/upload_images/4653472-92c6e0096c11c841.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


## 01、初衷 

大概上上周我花了周末两天的时间编写了一款小程序并顺利提交审核。

也就在前两天我的小程序 「Github开源社区」 历经了两周的审核，终于。。。。。。成功发布了，并且绑定到了公众号。 

以下是这两天时间的数据分析报表。


![](http://upload-images.jianshu.io/upload_images/4653472-5db25e9b492954ec.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

（实时访问次数 pv）

粗略的分析下：实时访问次数波动很明显，当然这也是正常的。高流量基本保持在早上十点到中午。晚上还会出现个别熬夜的程序员在看代码。总体呈下降趋势。


![](http://upload-images.jianshu.io/upload_images/4653472-4bab8d746061c759.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

(访问来源、访问时长、访问深度)

粗略的分析下：

访问来源主要来自会话，其次来自扫小程序码。

访问时长最高点在 11-20 秒，当然还有大量用户超过1分多钟在使用小程序。

其次，访问深度（访问了多少个页面），大部分只访问了一个页面，最深页面在5个页面的深度。

------------------划重点-----------

那么，为什么我会选择去编写一个关于 **程序员 **的小程序呢？

首先，我是程序员。其次，也是因为前段时间我一直在更新关于Github的教程。因此，为了方便自己，同时方便读者和开发者，我选择开发了一款关于Github的小程序。 

## 02、小程序的功能

「Github开源社区」目前的功能很简单，包括每日开源趋势、模糊搜索想要的代码、查看具体的代码文档以及仓库的信息。

用微信扫一扫下方，可体验小程序。

![](http://upload-images.jianshu.io/upload_images/4653472-90ad79d09f150843.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

效果图
![](https://github.com/xiyouMc/GithubTrending/blob/master/img/start.gif?raw=true)
(启动小程序，默认展示当天最热开源项目,并支持查看文档)

![](https://github.com/xiyouMc/GithubTrending/blob/master/img/WebHubGif.gif?raw=true)
(支持搜索代码)

**后续将支持的功能**

代码查看
登录Github账号，实现点赞等
社区
。。。

## 03、开发过程

虽说这是一款工具性的小程序，但确切的说是一款C/S的软件。C端也就是集成进微信的小程序，S端的话就是我编写并部署在阿里云的服务端。

C端包含了wxml、wxss、json、js还有其他配置属性。

S端的话我就直接用Python + web.py构建的，同时基于Github Api开发。

开发流程看似简单，但对于我这个前端半调子来讲，确实在开发C端遇到很多问题。当然，解决方法也就是Google + 大神。

## 04、如何开发一款自己的小程序

**一个idea**

这个idea很重要，因为自己的想法将会推动自己去实践并完成。如果没有一个自己的idea，那么与其说学技术，倒不如说你是在说服自己拥有多一点的技能。

所以，idea很重要。

如果一开始我并没有想好要去做什么小程序，然后就上手去学习如何开发，我猜可能在后面的学习过程中我将会很难坚持。因为那样是枯燥无味的，我并不知道自己用这个技术能做点什么。

其次，Github开源社区的idea我在开发前一个礼拜都有了。外加晚上熬夜到一两点，加上周末，大概花了两三天时间就出来了。

所以，在学习开发小程序之前，先想好自己要做什么。接下来，再动手去了解、学习这个技术，并运用起来。

**需要了解的技术点**

虽说小程序有一套自己的开发语言，但是，框架中主要的还是Page的生命周期和App的管理。其次，就是css的一些知识点。

所以，一开始你可以去小程序的官网着重了解Page生命周期和App的管理。其次，熟悉下小程序的那几个重要的组件，其中包括View、button等等的。

官网：
https://mp.weixin.qq.com/debug/wxadoc/dev/component/

接下来，你需要学习css的东西，这个其实不复杂，去w3c上面将css的关键知识点过一遍。了解前端的页面是如何布局的。

**上手**

- IDE搭建
微信团队针对小程序专门出了一款开发工具。这里我直接上链接:
https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html
- 项目结构

```
js ---------- JavaScript文件

json -------- 项目配置文件，负责窗口颜色等等

wxml ------- 类似HTML文件

wxss ------- 类似CSS文件

```

在根目录通过App来命名这四种文件，也就是程序的入口。
App.js

这个文件是必须要有的。其中主要写的内容也就是上面提到过管理App生命周期的。
App.json

这个也是必须要有的。其中包含了整个小程序的全局配置。
App.wxss

有点类似于css的，进行布局用的。当然，这也是全局的。
App.wxml

这个可选，是用来布局小程序的界面的。有点类似于html。
关于具体的文档，链接在这。
https://mp.weixin.qq.com/debug/wxadoc/dev/component/
如果有需要详细的讲解，那么可以留言，我考虑后续更新一系列的小程序开发教程。

## 05、个人开发经验

虽说在不早之前，微信开放了个人小程序的开发资格。不过，你还是不能随心所欲的开发小程序。

你能随心所欲开发的功能也大概只有工具类的。假设，你要是想开发一个社区类的小程序，那么你得要有诸多的证件。所以，在上手小程序之前，你需要看看小程序的开发规约，确保自己的idea是否需要各种证件。

其次，小程序的兼容性，目前Github开源社区在 iOS 9.3.2 上出现 SDK Exception 。还没找到合理的解决方案。

审核时间较长。你能做的就是等待。

开发工具有时候响应很慢，同样的你只有等待，毕竟目前开发工具并没有到1.0版本。

等等的坑。。。

目前动态化的开发模式越来越火了，包括JSBridge、Weex、React等等的。所以，作为非前端的你是否也需要学习下前端的知识点呢？

-----
行为艺术要持之以恒，iOS专用赞赏通道。
![](http://upload-images.jianshu.io/upload_images/4653472-2fa6f51658dee088?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
