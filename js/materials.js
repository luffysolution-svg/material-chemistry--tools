// 材料查询功能 - Materials Search Functions

// 常见材料数据库 (简化版本，实际应用中应该连接到PubChem和Materials Project)
const materialsDatabase = {
    // 半导体材料
    'Si': {
        name: '硅',
        englishName: 'Silicon',
        formula: 'Si',
        cas: '7440-21-3',
        molecularWeight: 28.085,
        density: 2.329,
        bandgap: 1.12,
        bandgapType: 'indirect',
        crystalStructure: 'diamond cubic',
        latticeConstant: 5.431,
        meltingPoint: 1414,
        boilingPoint: 3265,
        thermalConductivity: 149,
        electricalConductivity: 0.001,
        toxicity: '低毒',
        applications: ['太阳能电池', '集成电路', '半导体器件'],
        properties: {
            refractive_index: 3.42,
            dielectric_constant: 11.68,
            electron_mobility: 1450,
            hole_mobility: 450
        }
    },
    'GaAs': {
        name: '砷化镓',
        englishName: 'Gallium Arsenide',
        formula: 'GaAs',
        cas: '1303-00-0',
        molecularWeight: 144.645,
        density: 5.316,
        bandgap: 1.42,
        bandgapType: 'direct',
        crystalStructure: 'zinc blende',
        latticeConstant: 5.653,
        meltingPoint: 1238,
        boilingPoint: null,
        thermalConductivity: 55,
        electricalConductivity: 0.0001,
        toxicity: '有毒',
        applications: ['LED', '激光二极管', '微波器件', '太阳能电池'],
        properties: {
            refractive_index: 3.3,
            dielectric_constant: 12.9,
            electron_mobility: 8500,
            hole_mobility: 400
        }
    },
    'GaN': {
        name: '氮化镓',
        englishName: 'Gallium Nitride',
        formula: 'GaN',
        cas: '25617-97-4',
        molecularWeight: 83.730,
        density: 6.15,
        bandgap: 3.4,
        bandgapType: 'direct',
        crystalStructure: 'wurtzite',
        latticeConstant: { a: 3.189, c: 5.185 },
        meltingPoint: 2500,
        boilingPoint: null,
        thermalConductivity: 130,
        electricalConductivity: 0.001,
        toxicity: '低毒',
        applications: ['蓝光LED', '功率器件', '射频器件'],
        properties: {
            refractive_index: 2.3,
            dielectric_constant: 8.9,
            electron_mobility: 2000,
            hole_mobility: 200
        }
    },
    'TiO2': {
        name: '二氧化钛',
        englishName: 'Titanium Dioxide',
        formula: 'TiO2',
        cas: '13463-67-7',
        molecularWeight: 79.866,
        density: 4.23,
        bandgap: 3.2,
        bandgapType: 'indirect',
        crystalStructure: 'rutile/anatase',
        latticeConstant: { a: 4.593, c: 2.959 },
        meltingPoint: 1843,
        boilingPoint: 2972,
        thermalConductivity: 11.8,
        electricalConductivity: 1e-12,
        toxicity: '无毒',
        applications: ['光催化', '涂料', '防晒霜', '太阳能电池'],
        properties: {
            refractive_index: 2.5,
            dielectric_constant: 86,
            photocatalytic_activity: '高'
        }
    },
    'CdTe': {
        name: '碲化镉',
        englishName: 'Cadmium Telluride',
        formula: 'CdTe',
        cas: '1306-25-8',
        molecularWeight: 240.01,
        density: 6.2,
        bandgap: 1.5,
        bandgapType: 'direct',
        crystalStructure: 'zinc blende',
        latticeConstant: 6.482,
        meltingPoint: 1041,
        boilingPoint: null,
        thermalConductivity: 7.2,
        electricalConductivity: 0.0001,
        toxicity: '有毒',
        applications: ['薄膜太阳能电池', '红外探测器'],
        properties: {
            refractive_index: 2.84,
            dielectric_constant: 10.2,
            electron_mobility: 1050,
            hole_mobility: 100
        }
    },
    // 金属材料
    'Cu': {
        name: '铜',
        englishName: 'Copper',
        formula: 'Cu',
        cas: '7440-50-8',
        molecularWeight: 63.546,
        density: 8.96,
        crystalStructure: 'face-centered cubic',
        latticeConstant: 3.615,
        meltingPoint: 1085,
        boilingPoint: 2562,
        thermalConductivity: 401,
        electricalConductivity: 59600000,
        toxicity: '低毒',
        applications: ['电线', '管道', '散热器', '电子器件'],
        properties: {
            elastic_modulus: 130,
            tensile_strength: 220,
            corrosion_resistance: '中等'
        }
    },
    'Al': {
        name: '铝',
        englishName: 'Aluminum',
        formula: 'Al',
        cas: '7429-90-5',
        molecularWeight: 26.982,
        density: 2.70,
        crystalStructure: 'face-centered cubic',
        latticeConstant: 4.050,
        meltingPoint: 660,
        boilingPoint: 2519,
        thermalConductivity: 237,
        electricalConductivity: 37700000,
        toxicity: '无毒',
        applications: ['航空材料', '包装', '建筑', '汽车'],
        properties: {
            elastic_modulus: 70,
            tensile_strength: 90,
            corrosion_resistance: '良好'
        }
    },
    // 化合物
    'H2O': {
        name: '水',
        englishName: 'Water',
        formula: 'H2O',
        cas: '7732-18-5',
        molecularWeight: 18.015,
        density: 1.0,
        meltingPoint: 0,
        boilingPoint: 100,
        thermalConductivity: 0.606,
        electricalConductivity: 5.5e-6,
        toxicity: '无毒',
        applications: ['溶剂', '冷却剂', '生物体组成'],
        properties: {
            dielectric_constant: 80.1,
            surface_tension: 72.8,
            viscosity: 1.0
        }
    },
    'NaCl': {
        name: '氯化钠',
        englishName: 'Sodium Chloride',
        formula: 'NaCl',
        cas: '7647-14-5',
        molecularWeight: 58.443,
        density: 2.165,
        crystalStructure: 'rock salt',
        latticeConstant: 5.640,
        meltingPoint: 801,
        boilingPoint: 1465,
        thermalConductivity: 6.5,
        electricalConductivity: 1e-16,
        toxicity: '无毒',
        applications: ['食品添加剂', '化工原料', '除冰剂'],
        properties: {
            solubility_water: 360,
            refractive_index: 1.544,
            dielectric_constant: 5.9
        }
    }
};

// CAS号数据库
const casDatabase = {
    '7440-21-3': 'Si',
    '1303-00-0': 'GaAs',
    '25617-97-4': 'GaN',
    '13463-67-7': 'TiO2',
    '1306-25-8': 'CdTe',
    '7440-50-8': 'Cu',
    '7429-90-5': 'Al',
    '7732-18-5': 'H2O',
    '7647-14-5': 'NaCl'
};

// 英文名称数据库
const englishNameDatabase = {
    'silicon': 'Si',
    'gallium arsenide': 'GaAs',
    'gallium nitride': 'GaN',
    'titanium dioxide': 'TiO2',
    'cadmium telluride': 'CdTe',
    'copper': 'Cu',
    'aluminum': 'Al',
    'aluminium': 'Al',
    'water': 'H2O',
    'sodium chloride': 'NaCl'
};

// 中文名称数据库
const chineseNameDatabase = {
    '硅': 'Si',
    '砷化镓': 'GaAs',
    '氮化镓': 'GaN',
    '二氧化钛': 'TiO2',
    '碲化镉': 'CdTe',
    '铜': 'Cu',
    '铝': 'Al',
    '水': 'H2O',
    '氯化钠': 'NaCl'
};

// 材料搜索主函数
function searchMaterial() {
    const searchInput = document.getElementById('material-search-input');
    const query = searchInput.value.trim();
    
    if (!query) {
        showSearchError('请输入搜索内容');
        return;
    }
    
    // 清除之前的结果
    clearSearchResults();
    
    // 显示加载状态
    showLoadingState();
    
    // 模拟异步搜索
    setTimeout(() => {
        const result = findMaterial(query);
        if (result) {
            displayMaterialInfo(result);
        } else {
            showSearchError('未找到匹配的材料，请检查输入');
        }
    }, 500);
}

// 材料查找算法
function findMaterial(query) {
    const lowerQuery = query.toLowerCase().trim();
    
    // 1. 直接通过化学式匹配
    if (materialsDatabase[query]) {
        return materialsDatabase[query];
    }
    
    // 2. 通过CAS号匹配
    if (casDatabase[query]) {
        const formula = casDatabase[query];
        return materialsDatabase[formula];
    }
    
    // 3. 通过英文名匹配
    if (englishNameDatabase[lowerQuery]) {
        const formula = englishNameDatabase[lowerQuery];
        return materialsDatabase[formula];
    }
    
    // 4. 通过中文名匹配
    if (chineseNameDatabase[query]) {
        const formula = chineseNameDatabase[query];
        return materialsDatabase[formula];
    }
    
    // 5. 模糊匹配
    for (const [formula, material] of Object.entries(materialsDatabase)) {
        if (
            material.name.includes(query) ||
            material.englishName.toLowerCase().includes(lowerQuery) ||
            formula.toLowerCase().includes(lowerQuery)
        ) {
            return material;
        }
    }
    
    return null;
}

// 显示材料信息
function displayMaterialInfo(material) {
    const materialInfo = document.getElementById('material-info');
    const materialProperties = document.getElementById('material-properties');
    
    // 基本信息
    materialInfo.innerHTML = `
        <h3>基本信息 - Basic Information</h3>
        <div class="info-grid">
            <div class="info-item">
                <span class="info-label">化学式:</span>
                <span class="info-value">${material.formula}</span>
            </div>
            <div class="info-item">
                <span class="info-label">中文名:</span>
                <span class="info-value">${material.name}</span>
            </div>
            <div class="info-item">
                <span class="info-label">英文名:</span>
                <span class="info-value">${material.englishName}</span>
            </div>
            <div class="info-item">
                <span class="info-label">CAS号:</span>
                <span class="info-value">${material.cas || 'Unknown'}</span>
            </div>
            <div class="info-item">
                <span class="info-label">相对分子质量:</span>
                <span class="info-value">${material.molecularWeight} g/mol</span>
            </div>
            <div class="info-item">
                <span class="info-label">密度:</span>
                <span class="info-value">${material.density} g/cm³</span>
            </div>
            <div class="info-item">
                <span class="info-label">毒害性:</span>
                <span class="info-value ${getToxicityClass(material.toxicity)}">${material.toxicity}</span>
            </div>
        </div>
        
        <div class="applications-section">
            <h4>主要应用 - Applications</h4>
            <div class="applications-list">
                ${material.applications.map(app => `<span class="application-tag">${app}</span>`).join('')}
            </div>
        </div>
    `;
    
    // 详细性质
    materialProperties.innerHTML = `
        <h3>材料性质 - Material Properties</h3>
        
        ${material.bandgap ? `
        <div class="property-section">
            <h4>电子性质 - Electronic Properties</h4>
            <div class="info-grid">
                <div class="info-item">
                    <span class="info-label">带隙:</span>
                    <span class="info-value">${material.bandgap} eV</span>
                </div>
                <div class="info-item">
                    <span class="info-label">带隙类型:</span>
                    <span class="info-value">${material.bandgapType === 'direct' ? '直接带隙' : '间接带隙'}</span>
                </div>
                ${material.properties?.electron_mobility ? `
                <div class="info-item">
                    <span class="info-label">电子迁移率:</span>
                    <span class="info-value">${material.properties.electron_mobility} cm²/V·s</span>
                </div>
                ` : ''}
                ${material.properties?.hole_mobility ? `
                <div class="info-item">
                    <span class="info-label">空穴迁移率:</span>
                    <span class="info-value">${material.properties.hole_mobility} cm²/V·s</span>
                </div>
                ` : ''}
            </div>
        </div>
        ` : ''}
        
        <div class="property-section">
            <h4>热力学性质 - Thermodynamic Properties</h4>
            <div class="info-grid">
                <div class="info-item">
                    <span class="info-label">熔点:</span>
                    <span class="info-value">${material.meltingPoint} °C</span>
                </div>
                ${material.boilingPoint ? `
                <div class="info-item">
                    <span class="info-label">沸点:</span>
                    <span class="info-value">${material.boilingPoint} °C</span>
                </div>
                ` : ''}
                <div class="info-item">
                    <span class="info-label">热导率:</span>
                    <span class="info-value">${material.thermalConductivity} W/m·K</span>
                </div>
            </div>
        </div>
        
        <div class="property-section">
            <h4>晶体结构 - Crystal Structure</h4>
            <div class="info-grid">
                <div class="info-item">
                    <span class="info-label">晶体结构:</span>
                    <span class="info-value">${getCrystalStructureName(material.crystalStructure)}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">晶格常数:</span>
                    <span class="info-value">${formatLatticeConstant(material.latticeConstant)}</span>
                </div>
            </div>
        </div>
        
        ${material.properties ? `
        <div class="property-section">
            <h4>其他性质 - Additional Properties</h4>
            <div class="info-grid">
                ${Object.entries(material.properties).map(([key, value]) => `
                    <div class="info-item">
                        <span class="info-label">${getPropertyName(key)}:</span>
                        <span class="info-value">${formatPropertyValue(key, value)}</span>
                    </div>
                `).join('')}
            </div>
        </div>
        ` : ''}
        
        <div class="data-source">
            <p><em>数据来源: 内置数据库 (PubChem, Materials Project)</em></p>
            <p><em>最后更新: ${new Date().toLocaleDateString()}</em></p>
        </div>
    `;
}

// 辅助函数
function getToxicityClass(toxicity) {
    const toxicityMap = {
        '无毒': 'safe',
        '低毒': 'low-toxicity',
        '有毒': 'toxic',
        '高毒': 'high-toxicity'
    };
    return toxicityMap[toxicity] || '';
}

function getCrystalStructureName(structure) {
    const structureMap = {
        'diamond cubic': '金刚石立方',
        'zinc blende': '闪锌矿型',
        'wurtzite': '纤锌矿型',
        'rutile': '金红石型',
        'anatase': '锐钛矿型',
        'face-centered cubic': '面心立方',
        'rock salt': '岩盐型'
    };
    return structureMap[structure] || structure;
}

function formatLatticeConstant(constant) {
    if (typeof constant === 'number') {
        return `${constant} Å`;
    } else if (typeof constant === 'object') {
        return Object.entries(constant)
            .map(([key, value]) => `${key} = ${value} Å`)
            .join(', ');
    }
    return 'Unknown';
}

function getPropertyName(key) {
    const nameMap = {
        'refractive_index': '折射率',
        'dielectric_constant': '介电常数',
        'electron_mobility': '电子迁移率',
        'hole_mobility': '空穴迁移率',
        'elastic_modulus': '弹性模量',
        'tensile_strength': '抗拉强度',
        'corrosion_resistance': '耐腐蚀性',
        'surface_tension': '表面张力',
        'viscosity': '粘度',
        'solubility_water': '水中溶解度',
        'photocatalytic_activity': '光催化活性'
    };
    return nameMap[key] || key;
}

function formatPropertyValue(key, value) {
    const unitMap = {
        'elastic_modulus': 'GPa',
        'tensile_strength': 'MPa',
        'surface_tension': 'mN/m',
        'viscosity': 'mPa·s',
        'solubility_water': 'g/L'
    };
    
    if (typeof value === 'number') {
        const unit = unitMap[key] || '';
        return `${value} ${unit}`.trim();
    }
    return value;
}

// 显示搜索错误
function showSearchError(message) {
    const materialInfo = document.getElementById('material-info');
    const materialProperties = document.getElementById('material-properties');
    
    materialInfo.innerHTML = `
        <div class="search-error">
            <h3>搜索失败</h3>
            <p>${message}</p>
            <div class="search-suggestions">
                <h4>搜索建议:</h4>
                <ul>
                    <li>使用化学式搜索 (如: Si, GaAs, TiO2)</li>
                    <li>使用CAS号搜索 (如: 7440-21-3)</li>
                    <li>使用中文名搜索 (如: 硅, 二氧化钛)</li>
                    <li>使用英文名搜索 (如: Silicon, Titanium Dioxide)</li>
                </ul>
            </div>
        </div>
    `;
    
    materialProperties.innerHTML = `
        <div class="available-materials">
            <h3>可查询材料示例</h3>
            <div class="material-examples">
                ${Object.entries(materialsDatabase).slice(0, 6).map(([formula, material]) => `
                    <div class="material-example" onclick="searchMaterialExample('${formula}')">
                        <strong>${formula}</strong><br>
                        <span>${material.name}</span><br>
                        <small>${material.englishName}</small>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// 搜索示例材料
function searchMaterialExample(formula) {
    document.getElementById('material-search-input').value = formula;
    searchMaterial();
}

// 显示加载状态
function showLoadingState() {
    const materialInfo = document.getElementById('material-info');
    const materialProperties = document.getElementById('material-properties');
    
    materialInfo.innerHTML = `
        <div class="loading-state">
            <div class="loading-spinner"></div>
            <p>正在搜索材料数据...</p>
        </div>
    `;
    
    materialProperties.innerHTML = `
        <div class="loading-state">
            <div class="loading-spinner"></div>
            <p>正在加载材料性质...</p>
        </div>
    `;
}

// 清除搜索结果
function clearSearchResults() {
    const materialInfo = document.getElementById('material-info');
    const materialProperties = document.getElementById('material-properties');
    
    materialInfo.innerHTML = '';
    materialProperties.innerHTML = '';
}

// 模拟API调用 (实际应用中应该调用真实的PubChem和Materials Project API)
async function fetchFromPubChem(query) {
    // 这里应该调用PubChem API
    // 目前返回模拟数据
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(null);
        }, 200);
    });
}

async function fetchFromMaterialsProject(query) {
    // 这里应该调用Materials Project API
    // 目前返回模拟数据
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(null);
        }, 200);
    });
}

// 高级搜索功能
function initializeAdvancedSearch() {
    const searchInput = document.getElementById('material-search-input');
    
    // 添加搜索历史
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchMaterial();
        }
    });
    
    // 添加自动完成功能
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            showSearchSuggestions(e.target.value);
        }, 300);
    });
}

// 显示搜索建议
function showSearchSuggestions(query) {
    if (query.length < 2) return;
    
    const suggestions = [];
    const lowerQuery = query.toLowerCase();
    
    // 搜索匹配的材料
    Object.entries(materialsDatabase).forEach(([formula, material]) => {
        if (
            formula.toLowerCase().includes(lowerQuery) ||
            material.name.includes(query) ||
            material.englishName.toLowerCase().includes(lowerQuery)
        ) {
            suggestions.push({
                text: `${formula} - ${material.name} (${material.englishName})`,
                value: formula
            });
        }
    });
    
    // 显示建议（这里可以创建一个下拉菜单）
    if (suggestions.length > 0) {
        console.log('搜索建议:', suggestions);
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    initializeAdvancedSearch();
});