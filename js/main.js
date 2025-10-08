// 主JavaScript文件 - Main Application Logic

// 全局状态管理
const appState = {
    currentSection: 'periodic-table',
    offlineMode: true,
    lastUpdated: new Date().toISOString(),
    version: '1.0.0'
};

// 应用程序初始化
function initializeApp() {
    setupNavigation();
    checkOfflineStatus();
    initializeKeyboardShortcuts();
    setupThemeToggle();
    loadUserPreferences();
    
    // 显示欢迎信息
    showWelcomeMessage();
    
    console.log('材料化学工具箱已初始化完成');
}

// 导航功能
function setupNavigation() {
    // 设置默认显示的部分
    showSection('periodic-table');
    
    // 监听浏览器后退/前进
    window.addEventListener('popstate', (e) => {
        if (e.state && e.state.section) {
            showSection(e.state.section, false);
        }
    });
    
    // 设置初始历史状态
    history.replaceState({ section: 'periodic-table' }, '', '#periodic-table');
}

// 显示指定部分
function showSection(sectionId, addToHistory = true) {
    // 隐藏所有部分
    document.querySelectorAll('.main-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // 显示指定部分
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        appState.currentSection = sectionId;
        
        // 更新导航高亮
        updateNavigationHighlight(sectionId);
        
        // 添加到浏览器历史
        if (addToHistory) {
            history.pushState({ section: sectionId }, '', `#${sectionId}`);
        }
        
        // 触发部分特定的初始化
        onSectionShow(sectionId);
    }
}

// 更新导航高亮
function updateNavigationHighlight(sectionId) {
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
        }
    });
}

// 部分显示时的回调
function onSectionShow(sectionId) {
    switch (sectionId) {
        case 'periodic-table':
            // 周期表相关初始化已在periodic-table.js中完成
            break;
        case 'calculations':
            // 计算器相关初始化已在calculations.js中完成
            break;
        case 'materials':
            // 材料查询相关初始化已在materials.js中完成
            break;
        case 'database':
            updateDatabaseStatus();
            break;
    }
}

// 检查离线状态
function checkOfflineStatus() {
    const updateOfflineStatus = () => {
        const isOnline = navigator.onLine;
        appState.offlineMode = !isOnline;
        
        const statusIndicator = document.getElementById('offline-indicator');
        const statusText = document.getElementById('status-text');
        
        if (statusIndicator && statusText) {
            const statusDot = statusIndicator.querySelector('.status-dot');
            
            if (isOnline) {
                statusDot.style.background = '#27ae60';
                statusText.textContent = '在线模式 - 可访问外部数据库';
            } else {
                statusDot.style.background = '#f39c12';
                statusText.textContent = '离线模式 - 使用本地数据';
            }
        }
    };
    
    // 初始检查
    updateOfflineStatus();
    
    // 监听网络状态变化
    window.addEventListener('online', updateOfflineStatus);
    window.addEventListener('offline', updateOfflineStatus);
}

// 更新数据库状态
function updateDatabaseStatus() {
    const statusElement = document.querySelector('.offline-status');
    if (!statusElement) return;
    
    const dataInfo = `
        <h3>数据状态 - Data Status</h3>
        <div class="status-grid">
            <div class="status-item">
                <span class="status-label">本地元素数据:</span>
                <span class="status-value">${Object.keys(elementsData).length} 个元素</span>
            </div>
            <div class="status-item">
                <span class="status-label">材料数据库:</span>
                <span class="status-value">${Object.keys(materialsDatabase).length} 种材料</span>
            </div>
            <div class="status-item">
                <span class="status-label">计算工具:</span>
                <span class="status-value">5 个计算器</span>
            </div>
            <div class="status-item">
                <span class="status-label">最后更新:</span>
                <span class="status-value">${new Date().toLocaleDateString()}</span>
            </div>
        </div>
        
        <div class="api-status">
            <h4>API状态 - API Status</h4>
            <div class="api-item">
                <span class="api-label">PubChem API:</span>
                <span class="api-status ${appState.offlineMode ? 'offline' : 'online'}">
                    ${appState.offlineMode ? '离线' : '在线'}
                </span>
            </div>
            <div class="api-item">
                <span class="api-label">Materials Project API:</span>
                <span class="api-status ${appState.offlineMode ? 'offline' : 'online'}">
                    ${appState.offlineMode ? '离线' : '在线'}
                </span>
            </div>
        </div>
    `;
    
    statusElement.innerHTML = dataInfo;
}

// 键盘快捷键
function initializeKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // 检查是否在输入框中
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }
        
        // Ctrl/Cmd + 数字键切换部分
        if ((e.ctrlKey || e.metaKey) && e.key >= '1' && e.key <= '4') {
            e.preventDefault();
            const sections = ['periodic-table', 'calculations', 'materials', 'database'];
            const sectionIndex = parseInt(e.key) - 1;
            if (sections[sectionIndex]) {
                showSection(sections[sectionIndex]);
            }
        }
        
        // ESC键关闭模态框
        if (e.key === 'Escape') {
            const modals = document.querySelectorAll('.element-modal');
            modals.forEach(modal => {
                if (modal.style.display === 'block') {
                    modal.style.display = 'none';
                }
            });
        }
        
        // F键聚焦搜索框
        if (e.key === 'f' || e.key === 'F') {
            e.preventDefault();
            const searchInputs = [
                document.querySelector('.element-search-input'),
                document.getElementById('material-search-input')
            ];
            
            for (let input of searchInputs) {
                if (input && input.offsetParent !== null) { // 检查是否可见
                    input.focus();
                    break;
                }
            }
        }
    });
}

// 主题切换功能
function setupThemeToggle() {
    // 创建主题切换按钮
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '🌙';
    themeToggle.title = '切换深色模式';
    
    // 添加到导航栏
    const navContainer = document.querySelector('.nav-container');
    if (navContainer) {
        themeToggle.style.position = 'absolute';
        themeToggle.style.right = '2rem';
        themeToggle.style.top = '50%';
        themeToggle.style.transform = 'translateY(-50%)';
        themeToggle.style.background = 'none';
        themeToggle.style.border = 'none';
        themeToggle.style.fontSize = '1.5rem';
        themeToggle.style.cursor = 'pointer';
        themeToggle.style.borderRadius = '50%';
        themeToggle.style.width = '40px';
        themeToggle.style.height = '40px';
        themeToggle.style.display = 'flex';
        themeToggle.style.alignItems = 'center';
        themeToggle.style.justifyContent = 'center';
        
        navContainer.appendChild(themeToggle);
    }
    
    // 切换主题
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        themeToggle.innerHTML = isDark ? '☀️' : '🌙';
        themeToggle.title = isDark ? '切换浅色模式' : '切换深色模式';
        
        // 保存主题设置
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}

// 加载用户偏好设置
function loadUserPreferences() {
    // 加载主题设置
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.innerHTML = '☀️';
            themeToggle.title = '切换浅色模式';
        }
    }
    
    // 加载其他设置
    const lastSection = localStorage.getItem('lastSection');
    if (lastSection && document.getElementById(lastSection)) {
        showSection(lastSection);
    }
}

// 保存用户偏好设置
function saveUserPreferences() {
    localStorage.setItem('lastSection', appState.currentSection);
    localStorage.setItem('lastVisit', new Date().toISOString());
}

// 显示欢迎信息
function showWelcomeMessage() {
    const lastVisit = localStorage.getItem('lastVisit');
    if (!lastVisit) {
        // 首次访问显示帮助信息
        setTimeout(() => {
            showHelpDialog();
        }, 1000);
    }
}

// 显示帮助对话框
function showHelpDialog() {
    const helpModal = document.createElement('div');
    helpModal.className = 'help-modal';
    helpModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 3000;
    `;
    
    helpModal.innerHTML = `
        <div style="background: white; border-radius: 16px; padding: 2rem; max-width: 600px; max-height: 80vh; overflow-y: auto;">
            <h2 style="color: #2c3e50; margin-bottom: 1rem;">欢迎使用材料化学工具箱</h2>
            <p style="margin-bottom: 1rem;">这是一个专为材料化学研究人员设计的综合工具平台。</p>
            
            <h3 style="color: #3498db; margin: 1.5rem 0 0.5rem 0;">主要功能:</h3>
            <ul style="margin-bottom: 1.5rem; line-height: 1.6;">
                <li><strong>元素周期表:</strong> 118个元素的详细信息查询</li>
                <li><strong>化学计算:</strong> 单位换算、溶液配制、pH计算、晶体计算</li>
                <li><strong>物质查询:</strong> 材料性质、半导体参数、热力学数据</li>
                <li><strong>离线使用:</strong> 大部分功能可离线访问</li>
            </ul>
            
            <h3 style="color: #3498db; margin: 1.5rem 0 0.5rem 0;">快捷键:</h3>
            <ul style="margin-bottom: 1.5rem; line-height: 1.6;">
                <li><strong>Ctrl+1-4:</strong> 快速切换功能模块</li>
                <li><strong>F键:</strong> 聚焦搜索框</li>
                <li><strong>ESC:</strong> 关闭弹窗</li>
            </ul>
            
            <div style="text-align: center; margin-top: 2rem;">
                <button onclick="this.parentElement.parentElement.parentElement.remove()" 
                        style="background: #3498db; color: white; border: none; padding: 0.75rem 2rem; border-radius: 8px; cursor: pointer; font-size: 1rem;">
                    开始使用
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(helpModal);
    
    // 点击外部关闭
    helpModal.addEventListener('click', (e) => {
        if (e.target === helpModal) {
            helpModal.remove();
        }
    });
}

// 错误处理
function handleError(error, context = '') {
    console.error(`应用错误 ${context}:`, error);
    
    // 显示用户友好的错误信息
    const errorNotification = document.createElement('div');
    errorNotification.className = 'error-notification';
    errorNotification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #e74c3c;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 2000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    errorNotification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span>⚠️</span>
            <div>
                <strong>操作失败</strong>
                <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem;">${error.message || '发生未知错误，请重试'}</p>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" 
                    style="background: none; border: none; color: white; font-size: 1.2rem; cursor: pointer; margin-left: auto;">×</button>
        </div>
    `;
    
    document.body.appendChild(errorNotification);
    
    // 3秒后自动消失
    setTimeout(() => {
        if (errorNotification.parentElement) {
            errorNotification.remove();
        }
    }, 3000);
}

// 成功通知
function showSuccessNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 2000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span>✅</span>
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" 
                    style="background: none; border: none; color: white; font-size: 1.2rem; cursor: pointer; margin-left: auto;">×</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 2000);
}

// 工具函数
function formatNumber(num, decimals = 2) {
    if (num === null || num === undefined) return 'N/A';
    return Number(num).toFixed(decimals);
}

function formatLargeNumber(num) {
    if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
    return num.toString();
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 数据导出功能
function exportData(data, filename, format = 'json') {
    let content, mimeType;
    
    switch (format) {
        case 'json':
            content = JSON.stringify(data, null, 2);
            mimeType = 'application/json';
            break;
        case 'csv':
            content = convertToCSV(data);
            mimeType = 'text/csv';
            break;
        default:
            throw new Error('不支持的格式');
    }
    
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function convertToCSV(data) {
    if (!Array.isArray(data)) {
        data = [data];
    }
    
    const headers = Object.keys(data[0]);
    const csvContent = [
        headers.join(','),
        ...data.map(row => headers.map(header => 
            JSON.stringify(row[header] || '')
        ).join(','))
    ].join('\n');
    
    return csvContent;
}

// 全局错误处理
window.addEventListener('error', (e) => {
    handleError(e.error, '全局错误');
});

window.addEventListener('unhandledrejection', (e) => {
    handleError(e.reason, 'Promise拒绝');
});

// 页面离开前保存状态
window.addEventListener('beforeunload', () => {
    saveUserPreferences();
});

// 页面加载完成后初始化应用
document.addEventListener('DOMContentLoaded', () => {
    try {
        initializeApp();
    } catch (error) {
        handleError(error, '应用初始化');
    }
});

// 导出全局函数以供其他模块使用
window.appState = appState;
window.showSection = showSection;
window.handleError = handleError;
window.showSuccessNotification = showSuccessNotification;
window.formatNumber = formatNumber;
window.formatLargeNumber = formatLargeNumber;
window.exportData = exportData;