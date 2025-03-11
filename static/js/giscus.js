// 查找预先创建的容器
const giscusContainer = document.querySelector('.giscus-container');

// 只在找到容器的情况下进行处理
if (giscusContainer) {
    // 检查是否有consent cookie且允许giscus
    const consentSettings = document.cookie
        .split('; ')
        .find(row => row.startsWith('consent-settings='));
    
    // 获取用户语言设置
    const userLang = document.cookie
        .split('; ')
        .find(row => row.startsWith('consent-language='))
        ?.split('=')[1] || 'zh';

    // 如果没有同意使用giscus，显示提示信息
    if (!consentSettings || consentSettings.split('=')[1][0] === '0') {
        const messageDiv = document.createElement('div');
        messageDiv.style.textAlign = 'center';
        messageDiv.style.padding = '2rem';
        messageDiv.style.border = '1px solid #eee';
        messageDiv.style.borderRadius = '8px';
        messageDiv.style.margin = '2rem 0';

        // 多语言提示信息
        const messages = {
            'zh': '由于您在GDPR中的设置，评论功能不可用。',
            'en': 'Comments are disabled due to your GDPR settings.',
            'ja': 'GDPRの設定により、コメント機能は無効になっています。',
            'ko': 'GDPR 설정으로 인해 댓글 기능을 사용할 수 없습니다.'
        };

        messageDiv.innerHTML = `
            <p style="margin: 0.5rem 0;">${messages['zh']}</p>
            <p style="margin: 0.5rem 0;">${messages['en']}</p>
            <p style="margin: 0.5rem 0;">${messages['ja']}</p>
            <p style="margin: 0.5rem 0;">${messages['ko']}</p>
            <button onclick="document.querySelector('.manage-consent').click()" 
                    style="margin-top: 1rem; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer;">
                ${
                    {
                        'zh': '管理隐私设置',
                        'en': 'Manage Privacy Settings',
                        'ja': 'プライバシー設定を管理',
                        'ko': '개인정보 설정 관리'
                    }[userLang]
                }
            </button>
        `;
        giscusContainer.appendChild(messageDiv);
    } else {
        // 用户已同意，加载giscus
        // 清除默认的错误消息
        giscusContainer.innerHTML = '';

        const giscusScript = document.createElement('script');
        giscusScript.src = 'https://giscus.app/client.js';
        giscusScript.setAttribute('data-repo', 'afoim/myblog');
        giscusScript.setAttribute('data-repo-id', 'R_kgDOOB-WEw');
        giscusScript.setAttribute('data-category', 'Announcements');
        giscusScript.setAttribute('data-category-id', 'DIC_kwDOOB-WE84CnfcQ');
        giscusScript.setAttribute('data-mapping', 'pathname');
        giscusScript.setAttribute('data-strict', '0');
        giscusScript.setAttribute('data-reactions-enabled', '1');
        giscusScript.setAttribute('data-emit-metadata', '0');
        giscusScript.setAttribute('data-input-position', 'bottom');
        giscusScript.setAttribute('data-theme', 'preferred_color_scheme');
        giscusScript.setAttribute('data-lang', 'zh-CN');
        giscusScript.setAttribute('crossorigin', 'anonymous');
        giscusScript.async = true;

        // 直接将脚本添加到giscus容器后面
        giscusContainer.after(giscusScript);
        
        // 创建评论区容器
        const giscusWrapper = document.createElement('div');
        giscusWrapper.className = 'giscus';
        giscusContainer.appendChild(giscusWrapper);
    }
}
