// 定义响应式 HTML 页面的常量字符串
// 这个字符串包含了 HTML, CSS 和 JavaScript，设计风格偏向科技感动效
const htmlContent = `
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>短链接节点 - 数据接口</title>
    <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap" rel="stylesheet"> <style>
        /* CSS 变量，方便管理颜色 */
        :root {
            --bg-color: #0a0a2b;
            --container-bg: rgba(15, 15, 35, 0.95);
            --primary-color: #00eaff; /* 亮青色 */
            --secondary-color: #9b59b6; /* 紫色 */
            --text-color: #e0e0e0;
            --input-bg: #1a1a3a;
            --result-bg: #2a2a4a;
            --border-color: #00eaff;
            --error-color: #ff6b6b; /* 红色 */
            --success-color: #6bff6b; /* 绿色 */
            --footer-color: #808080;
        }

        /* 全局和基本样式 */
        body {
            font-family: 'Roboto Mono', monospace; /* 默认使用等宽字体 */
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: linear-gradient(135deg, var(--bg-color), #1a1a4b); /* 渐变背景 */
            color: var(--text-color);
            margin: 0;
            padding: 20px;
            box-sizing: border-box;
            overflow-y: auto;
            line-height: 1.6; /* 增加行高 */
        }

        .container {
            background-color: var(--container-bg);
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.7); /* 更明显的阴影 */
            text-align: center;
            max-width: 600px; /* 增加最大宽度 */
            width: 100%;
            box-sizing: border-box;
            border: 2px solid var(--border-color); /* 亮色边框 */
            position: relative; /* 用于定位加载动画 */
            overflow: hidden; /* 隐藏溢出的内容 */
            margin-bottom: 30px;
            animation: fadeInContainer 1s ease-out; /* 容器淡入动画 */
        }

        @keyframes fadeInContainer {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }


        h1 {
            font-family: 'Orbitron', sans-serif; /* 标题使用特殊的科技感字体 */
            color: var(--primary-color);
            margin-bottom: 30px;
            font-size: 2.5em; /* 增加字体大小 */
            text-shadow: 0 0 15px rgba(0, 234, 255, 0.8); /* 更明显的光晕 */
            letter-spacing: 2px; /* 增加字母间距 */
        }

        .input-area {
            display: flex; /* 使用 Flexbox 布局输入框和按钮 */
            gap: 15px; /* 间距 */
            margin-bottom: 20px;
            flex-wrap: wrap; /* 小屏幕时换行 */
            align-items: center;
        }

        .input-area input[type="url"] {
            flex-grow: 1; /* 输入框占据剩余空间 */
            padding: 14px; /* 增加内边距 */
            border: 1px solid var(--border-color);
            border-radius: 5px;
            font-size: 1em;
            background-color: var(--input-bg);
            color: var(--text-color);
            box-sizing: border-box;
            outline: none;
            transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .input-area input[type="url"]:focus {
            border-color: var(--secondary-color);
            box-shadow: 0 0 12px rgba(155, 89, 182, 0.7); /* 聚焦时紫色光晕 */
        }

        .input-area button {
            padding: 14px 25px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1em;
            background: linear-gradient(45deg, var(--primary-color), #00aaff); /* 按钮渐变 */
            color: var(--bg-color); /* 按钮文字深色 */
            font-weight: bold;
            text-transform: uppercase;
            transition: opacity 0.3s ease, transform 0.1s ease, box-shadow 0.3s ease;
            flex-shrink: 0; /* 不压缩按钮 */
        }

        .input-area button:hover {
            opacity: 0.95;
            box-shadow: 0 0 10px rgba(0, 234, 255, 0.5); /* 悬停发光 */
        }
         .input-area button:active {
            transform: scale(0.98);
        }

        /* 加载动画 */
        .loading {
            border: 4px solid rgba(255, 255, 255, 0.3);
            border-top: 4px solid var(--secondary-color); /* 紫色旋转部分 */
            border-radius: 50%;
            width: 20px;
            height: 20px;
            animation: spin 1s linear infinite;
            margin: 20px auto; /* 居中显示 */
            display: none; /* 默认隐藏 */
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }


        #result {
            margin-top: 20px;
            padding: 20px; /* 增加内边距 */
            background-color: var(--result-bg);
            border-radius: 5px;
            word-break: break-all;
            text-align: left;
            border: 1px solid var(--secondary-color); /* 紫色边框 */
            color: var(--success-color); /* 成功信息绿色 */
            opacity: 0; /* 初始透明 */
            max-height: 0; /* 初始高度为 0 */
            overflow: hidden; /* 隐藏溢出 */
            transition: opacity 0.5s ease-out, max-height 0.5s ease-out, padding 0.5s ease-out; /* 过渡效果 */
        }

        #result.visible { /* 显示时 */
             opacity: 1;
             max-height: 300px; /* 设置一个足够大的最大高度，让内容自然撑开 */
             padding: 20px;
        }

        #result a {
            color: var(--primary-color); /* 短链接颜色 */
            text-decoration: none;
            transition: color 0.3s ease;
        }

        #result a:hover {
            color: #00aaff; /* 悬停变蓝 */
            text-decoration: underline;
        }

        #result.error { /* 错误信息样式 */
             color: var(--error-color); /* 红色 */
             border-color: var(--error-color);
        }

        /* Footer 样式 */
        .footer {
            margin-top: 30px;
            color: var(--footer-color);
            font-size: 0.9em;
            text-align: center;
        }

        .footer a {
            color: var(--secondary-color); /* 紫色链接 */
            text-decoration: none;
            transition: color 0.3s ease;
        }

        .footer a:hover {
            color: var(--primary-color); /* 悬停变青色 */
            text-decoration: underline;
        }


        /* 响应式调整 */
        @media (max-width: 600px) {
            .container {
                padding: 25px;
                border-radius: 8px;
            }
            h1 {
                font-size: 2em;
                margin-bottom: 20px;
            }
            .input-area {
                 flex-direction: column; /* 小屏幕下垂直排列 */
                 gap: 10px;
            }
             .input-area input[type="url"],
             .input-area button {
                 width: 100%; /* 小屏幕下占满宽度 */
                 flex-grow: initial; /* 禁用 grow */
             }
            #result {
                 padding: 15px;
            }
            .footer {
                 margin-top: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>短链接节点</h1>
        <div class="input-area">
            <input type="url" id="longUrl" placeholder="输入需要缩短的链接..." required>
            <button id="shortenBtn">生成短链</button>
        </div>
        <div class="loading" id="loadingSpinner"></div> <div id="result"></div> </div>

    <script>
        // 前端 JavaScript 逻辑
        const longUrlInput = document.getElementById('longUrl');
        const shortenBtn = document.getElementById('shortenBtn');
        const resultDiv = document.getElementById('result');
        const loadingSpinner = document.getElementById('loadingSpinner');

        shortenBtn.addEventListener('click', async () => {
            const longUrl = longUrlInput.value.trim(); // 获取并清理输入的 URL

            // 清空、隐藏结果，并移除错误样式
            resultDiv.classList.remove('visible', 'error');
            resultDiv.innerHTML = '';
            resultDiv.style.maxHeight = '0';
            resultDiv.style.padding = '0 20px'; // 过渡到 0 高度时保持水平内边距，显示时恢复

            // 简单的 URL 格式验证
            if (!longUrl) {
                resultDiv.classList.add('visible', 'error'); // 显示错误样式
                resultDiv.innerHTML = '错误: 请输入有效的 URL';
                resultDiv.style.maxHeight = '100px'; // 给错误信息一个最大高度
                resultDiv.style.padding = '20px'; // 恢复内边距
                return;
            }

            // 检查 URL 是否以 http:// 或 https:// 开头
            if (!longUrl.startsWith('http://') && !longUrl.startsWith('https://')) {
                 resultDiv.classList.add('visible', 'error'); // 显示错误样式
                 resultDiv.innerHTML = '错误: 请输入以 http:// 或 https:// 开头的完整 URL';
                 resultDiv.style.maxHeight = '100px';
                 resultDiv.style.padding = '20px';
                 return;
            }

            // 显示加载动画
            loadingSpinner.style.display = 'block';


            try {
                // 发送 POST 请求到 Worker 的 /api/shorten 路径
                const response = await fetch('/api/shorten', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ url: longUrl }), // 将长链接放在请求体中
                });

                const data = await response.json(); // 解析 JSON 响应

                // 隐藏加载动画
                loadingSpinner.style.display = 'none';

                // 清理之前的状态
                resultDiv.classList.remove('error');
                 resultDiv.style.maxHeight = '300px'; // 设置一个足够大的最大高度，让内容自然撑开
                 resultDiv.style.padding = '20px'; // 恢复内边距

                if (response.ok) {
                    // 请求成功，显示生成的短链接并添加可见类
                    resultDiv.classList.add('visible');
                    resultDiv.innerHTML = \`生成成功: <a href="\${data.shortUrl}" target="_blank">\${data.shortUrl}</a>\`;
                } else {
                    // 请求失败，显示错误信息并添加可见和错误类
                    resultDiv.classList.add('visible', 'error');
                    resultDiv.innerHTML = \`错误: \${data.error || '未知错误'}\`;
                }
            } catch (error) {
                // 发生网络或其他错误
                 // 隐藏加载动画
                loadingSpinner.style.display = 'none';

                resultDiv.classList.add('visible', 'error'); // 显示错误样式
                resultDiv.innerHTML = \`发生网络错误: \${error.message}\`;
                 resultDiv.style.maxHeight = '100px'; // 给错误信息一个最大高度
                 resultDiv.style.padding = '20px'; // 恢复内边距
            }
        });
    </script>
</body>
</html>
`;

// ... (Worker 后端逻辑代码保持不变，与上一条回复中的代码相同) ...

// 短链接字符集
const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
// 短链接长度
const shortCodeLength = 7;
// 生成短链接时的重试次数
const maxRetries = 5;

/**
 * 生成指定长度的随机短码
 * @param {number} length - 短码的长度
 * @returns {string} - 生成的随机短码
 */
function generateShortCode(length) {
    let result = '';
    for (let i = 0; i < length; i++) {
        // 从字符集中随机选择一个字符
        result += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    }
    return result;
}

// KV 命名空间的绑定名称，请确保与你的 wrangler.toml 或控制台配置一致
// Cloudflare 会在运行时提供名为 LINKS_KV 的全局变量
// 你直接使用这个全局变量即可
// const LINKS_KV = "LINKS_KV"; // <-- 确保这一行被删除或注释掉了！

/**
 * 处理请求的异步函数
 * @param {Request} request - 传入的请求对象
 * @returns {Promise<Response>} - 返回一个 Promise，解析为 Response 对象
 */
async function handleRequest(request) {
    const url = new URL(request.url);
    const pathname = url.pathname;
    const method = request.method;

    // 处理根路径 "/" 的 GET 请求，返回前端页面
    if (pathname === '/' && method === 'GET') {
        return new Response(htmlContent, {
            headers: {
                'Content-Type': 'text/html; charset=utf-8'
            },
        });
    }

    // 处理短链接生成 API "/api/shorten" 的 POST 请求
    if (pathname === '/api/shorten' && method === 'POST') {
        let longUrl;
        try {
            // 尝试解析请求体为 JSON
            const body = await request.json();
            longUrl = body.url;

            // 验证 URL 是否有效
            // 增加一个简单的长度限制，防止滥用存储空间
            if (!longUrl || typeof longUrl !== 'string' || (!longUrl.startsWith('http://') && !longUrl.startsWith('https://')) || longUrl.length > 2000) { // 限制长链接长度
                 return new Response(JSON.stringify({ error: '无效或过长的 URL 格式，请输入以 http:// 或 https:// 开头且不超过2000字符的完整 URL' }), {
                    status: 400, // Bad Request
                    headers: { 'Content-Type': 'application/json' },
                });
            }

        } catch (e) {
            // JSON 解析失败或 URL 缺失
            return new Response(JSON.stringify({ error: '无效的请求体，请提供包含 "url" 字段的 JSON' }), {
                status: 400, // Bad Request
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // 检查 LINKS_KV 是否可用（确保绑定已正确配置）
        // 如果绑定未配置，直接使用 LINKS_KV 会抛 ReferenceError，这里增加一个显式检查
        if (typeof LINKS_KV === 'undefined') {
             console.error("KV binding 'LINKS_KV' is not configured!");
             return new Response(JSON.stringify({ error: '服务器配置错误：KV 存储未绑定，请检查Worker设置' }), { // 错误信息更具体
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }


        let shortCode;
        let retries = 0;

        // 循环生成短码并检查 KV 中是否存在，防止冲突
        while (retries < maxRetries) {
            shortCode = generateShortCode(shortCodeLength);
            // 从 KV 中尝试获取该短码对应的值
            // 直接使用全局变量 LINKS_KV
            const existing = await LINKS_KV.get(shortCode);
            // 如果不存在，则可以使用这个短码
            if (existing === null) {
                break;
            }
            // 如果存在，则重试生成
            retries++;
            console.log(`Short code collision: ${shortCode}, retrying... Attempt ${retries}/${maxRetries}`);
        }

        // 如果重试次数达到上限仍未找到唯一短码
        if (retries === maxRetries) {
             return new Response(JSON.stringify({ error: '无法生成唯一的短码，请稍后再试或联系管理员' }), { // 错误信息更友好
                status: 500, // Internal Server Error
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // 将短码和长链接存储到 KV 中
        // 直接使用全局变量 LINKS_KV
        // 可以设置一个过期时间，例如 30 天 (单位秒)
        // await LINKS_KV.put(shortCode, longUrl, { expirationTtl: 60 * 60 * 24 * 30 }); // 可选：设置过期时间
        await LINKS_KV.put(shortCode, longUrl); // 默认不过期

        // 构建完整的短链接
        const shortUrl = `${url.origin}/${shortCode}`;

        // 返回成功的 JSON 响应，包含生成的短链接
        return new Response(JSON.stringify({ shortUrl: shortUrl }), {
            headers: { 'Content-Type': 'application/json' },
        });
    }

    // 处理短链接重定向请求
    // 路径名应该匹配 KV 中的短码
    // 例如：访问 /abcde 将查找 KV 中键为 "abcde" 的值
    if (pathname.length > 1 && pathname.startsWith('/')) {
        // 提取路径中的短码 (去掉开头的 "/")
        const shortCode = pathname.substring(1);

        // 检查 LINKS_KV 是否可用
         if (typeof LINKS_KV === 'undefined') {
             console.error("KV binding 'LINKS_KV' is not configured!");
             return new Response('服务器配置错误，无法查找短链接', { status: 500 }); // 错误信息更具体
        }


        // 从 KV 中获取短码对应的长链接
        // 直接使用全局变量 LINKS_KV
        const longUrl = await LINKS_KV.get(shortCode);

        // 如果在 KV 中找到了对应的长链接
        if (longUrl !== null) {
            // 执行 302 重定向到长链接
            return Response.redirect(longUrl, 302);
        } else {
            // 如果短码不存在，返回 404 Not Found
            // 返回一个简单的 HTML 页面，而不是纯文本
            const notFoundHtml = `
            <!DOCTYPE html>
            <html lang="zh">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>404 - 短链接未找到</title>
                <style>
                     body { font-family: 'Roboto Mono', monospace; text-align: center; padding-top: 50px; background-color: var(--bg-color); color: var(--text-color); }
                    h1 { color: var(--error-color); }
                    a { color: var(--primary-color); text-decoration: none; }
                    a:hover { text-decoration: underline; }
                </style>
            </head>
            <body>
                <h1>404 - 短链接未找到</h1>
                <p>您访问的短链接不存在或已过期。</p>
                <p><a href="/">返回首页</a></p>
            </body>
            </html>
            `;
            return new Response(notFoundHtml, {
                 status: 404,
                 headers: { 'Content-Type': 'text/html; charset=utf-8' }
            });
        }
    }

    // 处理其他未匹配的请求，返回 404 Not Found 页面
     const notFoundHtml = `
        <!DOCTYPE html>
        <html lang="zh">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>404 - 页面未找到</title>
            <style>
                 body { font-family: 'Roboto Mono', monospace; text-align: center; padding-top: 50px; background-color: var(--bg-color); color: var(--text-color); }
                h1 { color: var(--error-color); }
                a { color: var(--primary-color); text-decoration: none; }
                a:hover { text-decoration: underline; }
            </style>
        </head>
        <body>
            <h1>404 - 页面未找到</h1>
            <p>您访问的页面地址不正确。</p>
            <p><a href="/">返回首页</a></p>
        </body>
        </html>
        `;
    return new Response(notFoundHtml, {
         status: 404,
         headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
}


// 监听 fetch 事件，当有 HTTP 请求到达 Worker 时触发
addEventListener('fetch', event => {
    // 使用 event.respondWith 来响应请求，调用 handleRequest 函数处理逻辑
    event.respondWith(handleRequest(event.request));
});
