document.addEventListener('copy', function(e) {
    // 获取选中的文本
    let selectedText = window.getSelection().toString();
    
    // 如果有选中文本
    if(selectedText) {
        // 添加版权信息
        let copyrightInfo = "\n\n" + 
            "------------------------\n" +
            "作者: AcoFork \n" +
            "源地址: " + document.location.href + "\n" +
            "Github仓库: https://github.com/afoim/myblog \n" +
            "------------------------\n";

        // 将版权信息添加到复制的文本中
        e.clipboardData.setData('text/plain', selectedText + copyrightInfo);
        
        // 阻止默认复制行为
        e.preventDefault();
    }
});
