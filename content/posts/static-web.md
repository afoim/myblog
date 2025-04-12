---
title: N款静态网站服务商的优缺点比较
published: 2024-11-28
summary: "Serverless服务有很多，静态托管就是重中之重，来看看谁最稳定快速"
cover:
  image: "https://r2.072103.xyz/fuwari-blog/img/2024-11-28-08-37-49-image.png"
tags: [Vercel, Cloudflare Page, Netlify, Surge, Render, Github Page]
categories: '记录'
draft: false 
lang: ''

---

在构建个人博客、项目展示或者静态网站时，选择合适的托管服务商非常重要。不同的服务商提供不同的功能和特性
#### 1. [Vercel](https://vercel.app/)

**优点**：
- 支持PHP，你可以部署Typecho
- 支持 Git 集成
- 访问速度非常快。最低50ms
- 注册简单
- 可绑定自定义域名，支持 HTTPS

**缺点**：

- 免费版有一定限制，如带宽和构建时间。很容易被刷爆
- 目前不支持IPv6回源

#### 2. [Render](https://render.com/)

路边一条

#### 3. [Cloudflare Pages](https://dash.cloudflare.com/)

**优点**：

- 支持与 Git 集成
- 注册简单
- 支持自定义域名绑定
- 刷不爆。静态资源全免费访问，不限次数不限带宽
- 支持全栈，对接Worker D1 KV R2

**缺点**：

- 太jb慢了。200ms朝上


#### 4. [TencentCloud EdgeOne](https://edgeone.ai/)

 别用，会吞Github提交，导致你的网站卡在旧版，我已经跑路了

#### 5. [Github Pages](https://github.com/)

**优点**：
- 与 Git 集成，直接通过 GitHub 仓库进行部署
- 可以通过 GitHub Actions 实现 CI/CD 自动化
- 支持自定义域名绑定

**缺点**：

- 国内访问可能会遇到 GitHub 阻断问题。如果你能连上，延迟很低

#### 6. [Fleek](https://fleek.xyz/)

**优点**：

- 基于 IPFS，支持去中心化存储。其他功能中规中矩

**缺点**：

- 访问速度相对适中

#### 7. [Surge](https://surge.sh/)

**优点**：

- 我觉得没有
- 示例Github Action进行CI/CD自动化（将gh-pages发布到Surge）：

- ```yaml
  name: Deploy to Surge
  
  on:
    repository_dispatch:
      types: [deploy_surge]  # 监听来自 build.yml 的自定义事件
  
  jobs:
    deploy:
      runs-on: ubuntu-latest
      steps:
        - name: Checkout code
          uses: actions/checkout@v3
          with:
            ref: gh-pages  # 检出 gh-pages 分支
  
        - name: Deploy to Surge
          run: |
            npm install -g surge
            surge ./ https://acofork-blog.surge.sh --token ${{ secrets.SURGE_TOKEN }}
          env:
            SURGE_TOKEN: ${{ secrets.SURGE_TOKEN }}
  ```

**缺点**：
- 要用命令行操作（你可以对接Github Action）
- 无法直接与 Git 集成
- 无法绑定自定义域名

#### 8. [Netlify](https://netlify.com/)

**优点**：
- 我正在用的，比CF快，比Vercel慢
- 支持IPv6回源

**缺点**：
- 注册门槛高到埃菲尔铁塔，需要使用纯净IP和谷歌邮箱
- 想钱想疯了，免费计划WAF一条规则不给配

### 总结

- **Vercel**：快，方便好用，大部分项目都可以部署
- **Netlify**：要不是你支持IPv6回源我就去用Vercel了
- **Render**：我不知道
- **Cloudflare Pages**：刷不爆，方便对接Worker
- **Github Pages**：如果你能稳定连上，那延迟不错
- **Fleek**：披着IPFS的皮的Amazon CDN
- **Surge**：你用这个？
- **Edge One**：路边



# （旧）智能网关测速HTML代码：

> 使用了这么多的节点，肯定想要选择最快的或者在用户那边装逼，所以这边给一个智能网关测速HTML代码，它去请求了`https://acofork.us.kg/data.json`并且挨个给里面的`博客`节点测速，然后自动选择最快的那个。如果你只是小项目使用，可以使用硬编码，这里就给出Git仓库

https://github.com/afoim/Smart_Gateway

# （旧）简易导航页HTML代码：

> 刚才说了“它去请求了`https://acofork.us.kg/data.json`并且挨个给里面的`博客`节点测速，然后自动选择最快的那个。”这就是`data.json`所在的地方

https://github.com/afoim/Web_test
