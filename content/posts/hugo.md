---
title: Hugo博客搭建教程以及配置调优
published: 2025-03-03T15:56:57+08:00
summary: "Hugo是一个基于Golang的静态博客，相比于Nodejs的Hexo构建效率提升600%，同时也支持低JavaScript特性，SEO更加优化，爬虫更易获取"
cover:
  image: "https://oss.onani.cn/fuwari-blog/img/3d1b097d-7e31-4312-b3e5-d213e2903f4d.webp"
tags: [Hugo]
categories: '教程'
draft: false 
lang: ''

---

 

# 引言

曾经我写过一篇文章叫做：[Fuwari静态博客搭建教程](/posts/fuwari/)。文中的[Fuwari](https://github.com/saicaca/fuwari)是基于Astro的，并且使用了服务器+客户端的混合渲染，尽管UI确实好看，但因为本人不会写Astro导致日后维护特别困难（比如手动添加Giscus评论后和上游分支发生冲突需要手动解决冲突才能合并上游）。最后我放弃了，既然我就是菜我为什么不找一个原生使用HTML+JS+CSS的框架呢？于是我便询问AI，Claude推荐我使用Hugo。其实我早就曾听闻Hugo的大名，但是并没有深入研究，但是Claude又告诉我Hugo采用Go语言进行编译，速度快，而且想要二次开发也只需要改改我最熟悉的HTML+JS+CSS。于是我便花了2小时深入研究、部署、调优。发现Hugo确实很强大：迁移方便，二改简单，构建迅速

# 正式开始

> 请全程在Windows上操作

我们首先需要安装Scoop，这是一个适用于Windows的包管理器，个人认为非常好用

Scoop默认会安装到C盘，如果你想要换盘请按需更改

```powershell
$env:SCOOP='D:\Scoop'
$env:SCOOP_GLOBAL='D:\ScoopApps'
[Environment]::SetEnvironmentVariable('SCOOP', $env:SCOOP, 'User')
[Environment]::SetEnvironmentVariable('SCOOP_GLOBAL', $env:SCOOP_GLOBAL, 'Machine')
```

安装Scoop：

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
Invoke-RestMethod -Uri https://get.scoop.sh | Invoke-Expression
```

如果你以管理员的身份会安装失败，请切换为普通用户。若想强制以管理员身份安装Scoop请使用

[github原帖](https://github.com/ScoopInstaller/Install#for-admin)

出于安全考虑，默认情况下已禁用管理员控制台下的安装。如果您知道自己在做什么并希望以管理员身份安装Scoop，请下载安装程序并在提升的控制台中手动执行它，使用 `-RunAsAdmin` 参数。以下是示例：

```powershell
irm get.scoop.sh -outfile 'install.ps1'
.\install.ps1 -RunAsAdmin [-OtherParameters ...]
# 如果你想要一行解决：
iex "& {$(irm get.scoop.sh)} -RunAsAdmin"
```

安装Hugo框架：

```powershell
scoop install hugo
```

然后选择一个你喜欢的文件夹创建你的站点。 `myblog` 即你的站点文件夹名称

```shell
hugo new site myblog
cd myblog
```

安装PaperMod主题：

```shell
git clone https://github.com/adityatelange/hugo-PaperMod.git themes/PaperMod
```

站点根目录会有一个 `hugo.toml`。我推荐使用YAML。将文件重命名为 `hugo.yaml`。粘贴并更改以下内容

```yaml
baseURL: "https://站点url"
title: "网站标题"
LanguageCode: "zh-CN"
theme: "PaperMod"

# 启用首页个人简介展示
params:
  # 是否启用评论。你需要自己配置，或者直接引入Giscus等评论系统
  comments: false
  # 是否显示代码复制按钮
  ShowCodeCopyButtons: true
  # 是否显示面包屑导航
  ShowBreadCrumbs: false
  # 是否显示阅读时间  
  ShowReadingTime: true
  # 是否显示分享按钮
  ShowShareButtons: true
  # 分享按钮配置
  # ShareButtons: ["linkedin", "twitter"]
  # 是否禁用主题切换按钮
  disableThemeToggle: false
  assets:
    favicon: "/你的/网站图标.jpg" # 需要在static文件夹放置对应的图片
    iconHeight: 35
  # 首页信息配置
  homeInfoParams:
    Title: "首页展示的标题"
    Content: >
      首页展示的文本

  # 设置网站头像和首页头像
  profileMode:
    enabled: false # 设为 true 将完全替换 homeInfoParams

  # 网站头像设置 (显示在导航栏)
  label:
    text: "左上角显示的文本"
    icon: "/你的/左上角显示的图片.jpg" # 这将显示在导航栏标题旁边。需要在static文件夹放置对应的图片
    iconHeight: 35

  # 社交图标 (显示在简介下方)
  socialIcons:
    - name: bilibili
      url: ""
    - name: github
      url: ""
    - name: telegram
      url: ""
    # 可以添加更多社交图标 https://github.com/adityatelange/hugo-PaperMod/wiki/Icons

# 顶部导航栏的快捷链接
menu:
  main:
    - identifier: categories
      name: 分类
      url: /categories/
      weight: 10
    - identifier: tags
      name: 标签
      url: /tags/
      weight: 20
    - identifier: archives
      name: 归档
      url: /archives/
      weight: 30
    - identifier: search
      name: 搜索
      url: /search/
      weight: 40
    # 可以添加更多导航链接。weight的值越高排序越靠后

# 如果要启用搜索功能，需要添加这个
outputs:
  home:
    - HTML
    - RSS
    - JSON # 必须，用于搜索功能
```

然后我们需要分别配置分类、标签、归档和搜索页

创建 `content\categories\_index.md` 写入：

```markdown
---
title: 分类
layout: categories
---
```

创建 `content\tags\_index.md` 写入：

```markdown
---
title: 标签
layout: tags
---
```

创建 `content\archives.md` 写入：

```markdown
---
title: 归档
layout: archives
---
```

创建 `content\search.md` 写入：

```markdown
---
title: "搜索"
layout: "search"
---
```

然后我们要更改默认的文章创建模板

在 `archetypes\default.md` 写入：

```markdown
---
title: {{ replace .File.ContentBaseName "-" " " | title }}
published: {{ .Date }}
summary: "文章简介"
cover:
  image: "文章封面图。也支持HTTPS"
tags: [标签1, 标签2]
categories: '文章所处的分类'
draft: false 
lang: ''
---
```

接下来我们就可以通过命令来创建文章，并开始写作了。注意，最终构建的文章URL是你的文章的文件名。比如：`https://你的网站.com/posts/first` 所以文章文件名尽量简短，这并不会影响你的文章标题

```shell
hugo new posts/first.md
```

当我们写完一篇文章想要预览网站，可以使用

```powershell
hugo server
```

当我们想要将站点发布到Vercel、Cloudflare Pages等静态网站托管平台可以将我们的 `myblog` 作为一个Git存储库提交到Github

根目录：`./`

输出目录：`public`

构建命令：`hugo --gc`

环境变量（适用于Vercel）： Key：`HUGO_VERSION` Value：`0.145.0`