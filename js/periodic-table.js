// 元素周期表交互功能 - Periodic Table Interactive Functions

// 周期表布局配置
const periodicTableLayout = {
    1: { row: 1, col: 1 },   // H
    2: { row: 1, col: 18 },  // He
    3: { row: 2, col: 1 },   // Li
    4: { row: 2, col: 2 },   // Be
    5: { row: 2, col: 13 },  // B
    6: { row: 2, col: 14 },  // C
    7: { row: 2, col: 15 },  // N
    8: { row: 2, col: 16 },  // O
    9: { row: 2, col: 17 },  // F
    10: { row: 2, col: 18 }, // Ne
    11: { row: 3, col: 1 },  // Na
    12: { row: 3, col: 2 },  // Mg
    13: { row: 3, col: 13 }, // Al
    14: { row: 3, col: 14 }, // Si
    15: { row: 3, col: 15 }, // P
    16: { row: 3, col: 16 }, // S
    17: { row: 3, col: 17 }, // Cl
    18: { row: 3, col: 18 }, // Ar
    19: { row: 4, col: 1 },  // K
    20: { row: 4, col: 2 },  // Ca
    21: { row: 4, col: 3 },  // Sc
    22: { row: 4, col: 4 },  // Ti
    23: { row: 4, col: 5 },  // V
    24: { row: 4, col: 6 },  // Cr
    25: { row: 4, col: 7 },  // Mn
    26: { row: 4, col: 8 },  // Fe
    27: { row: 4, col: 9 },  // Co
    28: { row: 4, col: 10 }, // Ni
    29: { row: 4, col: 11 }, // Cu
    30: { row: 4, col: 12 }, // Zn
    31: { row: 4, col: 13 }, // Ga
    32: { row: 4, col: 14 }, // Ge
    33: { row: 4, col: 15 }, // As
    34: { row: 4, col: 16 }, // Se
    35: { row: 4, col: 17 }, // Br
    36: { row: 4, col: 18 }, // Kr
    37: { row: 5, col: 1 },  // Rb
    38: { row: 5, col: 2 },  // Sr
    39: { row: 5, col: 3 },  // Y
    40: { row: 5, col: 4 },  // Zr
    41: { row: 5, col: 5 },  // Nb
    42: { row: 5, col: 6 },  // Mo
    43: { row: 5, col: 7 },  // Tc
    44: { row: 5, col: 8 },  // Ru
    45: { row: 5, col: 9 },  // Rh
    46: { row: 5, col: 10 }, // Pd
    47: { row: 5, col: 11 }, // Ag
    48: { row: 5, col: 12 }, // Cd
    49: { row: 5, col: 13 }, // In
    50: { row: 5, col: 14 }, // Sn
    51: { row: 5, col: 15 }, // Sb
    52: { row: 5, col: 16 }, // Te
    53: { row: 5, col: 17 }, // I
    54: { row: 5, col: 18 }, // Xe
    55: { row: 6, col: 1 },  // Cs
    56: { row: 6, col: 2 },  // Ba
    57: { row: 6, col: 3 },  // La
    72: { row: 6, col: 4 },  // Hf
    73: { row: 6, col: 5 },  // Ta
    74: { row: 6, col: 6 },  // W
    75: { row: 6, col: 7 },  // Re
    76: { row: 6, col: 8 },  // Os
    77: { row: 6, col: 9 },  // Ir
    78: { row: 6, col: 10 }, // Pt
    79: { row: 6, col: 11 }, // Au
    80: { row: 6, col: 12 }, // Hg
    81: { row: 6, col: 13 }, // Tl
    82: { row: 6, col: 14 }, // Pb
    83: { row: 6, col: 15 }, // Bi
    84: { row: 6, col: 16 }, // Po
    85: { row: 6, col: 17 }, // At
    86: { row: 6, col: 18 }, // Rn
    87: { row: 7, col: 1 },  // Fr
    88: { row: 7, col: 2 },  // Ra
    89: { row: 7, col: 3 },  // Ac
    104: { row: 7, col: 4 }, // Rf
    105: { row: 7, col: 5 }, // Db
    106: { row: 7, col: 6 }, // Sg
    107: { row: 7, col: 7 }, // Bh
    108: { row: 7, col: 8 }, // Hs
    109: { row: 7, col: 9 }, // Mt
    110: { row: 7, col: 10 }, // Ds
    111: { row: 7, col: 11 }, // Rg
    112: { row: 7, col: 12 }, // Cn
    113: { row: 7, col: 13 }, // Nh
    114: { row: 7, col: 14 }, // Fl
    115: { row: 7, col: 15 }, // Mc
    116: { row: 7, col: 16 }, // Lv
    117: { row: 7, col: 17 }, // Ts
    118: { row: 7, col: 18 }  // Og
};

// 镧系和锕系布局
const lanthanideLayout = {
    58: { row: 9, col: 4 },  // Ce
    59: { row: 9, col: 5 },  // Pr
    60: { row: 9, col: 6 },  // Nd
    61: { row: 9, col: 7 },  // Pm
    62: { row: 9, col: 8 },  // Sm
    63: { row: 9, col: 9 },  // Eu
    64: { row: 9, col: 10 }, // Gd
    65: { row: 9, col: 11 }, // Tb
    66: { row: 9, col: 12 }, // Dy
    67: { row: 9, col: 13 }, // Ho
    68: { row: 9, col: 14 }, // Er
    69: { row: 9, col: 15 }, // Tm
    70: { row: 9, col: 16 }, // Yb
    71: { row: 9, col: 17 }  // Lu
};

const actinideLayout = {
    90: { row: 10, col: 4 }, // Th
    91: { row: 10, col: 5 }, // Pa
    92: { row: 10, col: 6 }, // U
    93: { row: 10, col: 7 }, // Np
    94: { row: 10, col: 8 }, // Pu
    95: { row: 10, col: 9 }, // Am
    96: { row: 10, col: 10 }, // Cm
    97: { row: 10, col: 11 }, // Bk
    98: { row: 10, col: 12 }, // Cf
    99: { row: 10, col: 13 }, // Es
    100: { row: 10, col: 14 }, // Fm
    101: { row: 10, col: 15 }, // Md
    102: { row: 10, col: 16 }, // No
    103: { row: 10, col: 17 }  // Lr
};

// 初始化周期表
function initializePeriodicTable() {
    const container = document.getElementById('periodic-table-grid');
    container.innerHTML = '';

    // 创建周期表网格
    for (let atomicNumber = 1; atomicNumber <= 118; atomicNumber++) {
        const element = elementsData[atomicNumber];
        if (!element) continue;

        const elementDiv = createElementDiv(element);
        container.appendChild(elementDiv);
    }

    // 添加图例
    createPeriodicTableLegend();
    
    // 设置元素点击事件
    setupElementClickEvents();
}

// 创建元素div
function createElementDiv(element) {
    const div = document.createElement('div');
    div.className = `element ${element.category}`;
    div.dataset.atomicNumber = element.atomicNumber;
    
    // 获取布局位置
    let layout = periodicTableLayout[element.atomicNumber] ||
                 lanthanideLayout[element.atomicNumber] ||
                 actinideLayout[element.atomicNumber];
    
    if (layout) {
        div.style.gridRow = layout.row;
        div.style.gridColumn = layout.col;
    }

    // 设置元素内容
    div.innerHTML = `
        <div class="element-number">${element.atomicNumber}</div>
        <div class="element-symbol">${element.symbol}</div>
        <div class="element-name">${element.name}</div>
        <div class="element-mass">${element.atomicMass || '?'}</div>
    `;

    return div;
}

// 创建周期表图例
function createPeriodicTableLegend() {
    const container = document.querySelector('.periodic-table-container');
    
    // 检查是否已存在图例
    if (container.querySelector('.element-legend')) {
        return;
    }

    const legend = document.createElement('div');
    legend.className = 'element-legend';

    Object.entries(elementCategories).forEach(([category, info]) => {
        const legendItem = document.createElement('div');
        legendItem.className = 'legend-item';
        legendItem.innerHTML = `
            <div class="legend-color ${category}" style="background: ${info.color}"></div>
            <span>${info.name}</span>
        `;
        legend.appendChild(legendItem);
    });

    container.appendChild(legend);
}

// 设置元素点击事件
function setupElementClickEvents() {
    document.querySelectorAll('.element').forEach(elementDiv => {
        elementDiv.addEventListener('click', () => {
            const atomicNumber = parseInt(elementDiv.dataset.atomicNumber);
            showElementModal(atomicNumber);
        });
    });
}

// 显示元素详情模态框
function showElementModal(atomicNumber) {
    const element = elementsData[atomicNumber];
    if (!element) return;

    const modal = document.getElementById('element-modal');
    const elementInfo = document.getElementById('element-info');

    elementInfo.innerHTML = `
        <div class="element-header">
            <div class="element-symbol-large">${element.symbol}</div>
            <div class="element-name-large">${element.name} (${element.englishName})</div>
            <div class="element-number-large">原子序数: ${element.atomicNumber}</div>
        </div>
        
        <div class="element-details">
            <div class="property-group">
                <h4>基本信息 - Basic Information</h4>
                <div class="property-item">
                    <span class="property-label">相对原子质量:</span>
                    <span class="property-value">${element.atomicMass || 'Unknown'}</span>
                </div>
                <div class="property-item">
                    <span class="property-label">族:</span>
                    <span class="property-value">${element.group || 'Unknown'}</span>
                </div>
                <div class="property-item">
                    <span class="property-label">周期:</span>
                    <span class="property-value">${element.period}</span>
                </div>
                <div class="property-item">
                    <span class="property-label">元素类型:</span>
                    <span class="property-value">${elementCategories[element.category]?.name || element.category}</span>
                </div>
                <div class="property-item">
                    <span class="property-label">电子构型:</span>
                    <span class="property-value">${element.electronConfiguration}</span>
                </div>
            </div>

            <div class="property-group">
                <h4>物理性质 - Physical Properties</h4>
                <div class="property-item">
                    <span class="property-label">原子半径:</span>
                    <span class="property-value ${!element.atomicRadius ? 'unknown' : ''}">${element.atomicRadius ? element.atomicRadius + ' pm' : 'Unknown'}</span>
                </div>
                <div class="property-item">
                    <span class="property-label">密度:</span>
                    <span class="property-value ${!element.density ? 'unknown' : ''}">${element.density ? element.density + ' g/cm³' : 'Unknown'}</span>
                </div>
                <div class="property-item">
                    <span class="property-label">熔点:</span>
                    <span class="property-value ${!element.meltingPoint ? 'unknown' : ''}">${element.meltingPoint ? element.meltingPoint + ' °C' : 'Unknown'}</span>
                </div>
                <div class="property-item">
                    <span class="property-label">沸点:</span>
                    <span class="property-value ${!element.boilingPoint ? 'unknown' : ''}">${element.boilingPoint ? element.boilingPoint + ' °C' : 'Unknown'}</span>
                </div>
                <div class="property-item">
                    <span class="property-label">常温状态:</span>
                    <span class="property-value">${getStateText(element.state)}</span>
                </div>
            </div>

            <div class="property-group">
                <h4>化学性质 - Chemical Properties</h4>
                <div class="property-item">
                    <span class="property-label">电负性:</span>
                    <span class="property-value ${!element.electronegativity ? 'unknown' : ''}">${element.electronegativity || 'Unknown'}</span>
                </div>
                <div class="property-item">
                    <span class="property-label">第一电离能:</span>
                    <span class="property-value ${!element.ionizationEnergy ? 'unknown' : ''}">${element.ionizationEnergy ? element.ionizationEnergy + ' kJ/mol' : 'Unknown'}</span>
                </div>
                <div class="property-item">
                    <span class="property-label">氧化态:</span>
                    <span class="property-value">${element.oxidationStates?.length ? element.oxidationStates.join(', ') : 'Unknown'}</span>
                </div>
                <div class="property-item">
                    <span class="property-label">化学键类型:</span>
                    <span class="property-value">${getBondingTypeText(element.bondingType)}</span>
                </div>
            </div>

            <div class="property-group">
                <h4>晶体结构 - Crystal Structure</h4>
                <div class="property-item">
                    <span class="property-label">晶体结构:</span>
                    <span class="property-value">${getCrystalStructureText(element.crystalStructure)}</span>
                </div>
                <div class="property-item">
                    <span class="property-label">热导率:</span>
                    <span class="property-value ${!element.thermalConductivity ? 'unknown' : ''}">${element.thermalConductivity ? element.thermalConductivity + ' W/m·K' : 'Unknown'}</span>
                </div>
                <div class="property-item">
                    <span class="property-label">电阻率:</span>
                    <span class="property-value ${!element.electricalResistivity ? 'unknown' : ''}">${element.electricalResistivity ? element.electricalResistivity + ' Ω·m' : 'Unknown'}</span>
                </div>
                <div class="property-item">
                    <span class="property-label">磁性:</span>
                    <span class="property-value">${getMagneticOrderingText(element.magneticOrdering)}</span>
                </div>
            </div>

            <div class="property-group">
                <h4>丰度 - Abundance</h4>
                <div class="property-item">
                    <span class="property-label">地壳丰度:</span>
                    <span class="property-value ${!element.abundance?.earth ? 'unknown' : ''}">${element.abundance?.earth ? element.abundance.earth + '%' : 'Unknown'}</span>
                </div>
                <div class="property-item">
                    <span class="property-label">宇宙丰度:</span>
                    <span class="property-value ${!element.abundance?.universe ? 'unknown' : ''}">${element.abundance?.universe ? element.abundance.universe + '%' : 'Unknown'}</span>
                </div>
            </div>
        </div>
    `;

    modal.style.display = 'block';

    // 添加关闭事件
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.onclick = () => modal.style.display = 'none';

    // 点击模态框外部关闭
    modal.onclick = (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    };
}

// 状态文本转换
function getStateText(state) {
    const stateMap = {
        'solid': '固体',
        'liquid': '液体',
        'gas': '气体',
        'unknown': '未知'
    };
    return stateMap[state] || state;
}

// 化学键类型文本转换
function getBondingTypeText(bondingType) {
    const bondingMap = {
        'metallic': '金属键',
        'covalent': '共价键',
        'ionic': '离子键',
        'covalent network': '共价网络',
        'van der waals': '范德华力',
        'unknown': '未知'
    };
    return bondingMap[bondingType] || bondingType;
}

// 晶体结构文本转换
function getCrystalStructureText(crystalStructure) {
    const crystalMap = {
        'cubic': '立方',
        'body-centered cubic': '体心立方',
        'face-centered cubic': '面心立方',
        'hexagonal': '六方',
        'hexagonal close-packed': '六方密堆积',
        'rhombohedral': '菱面体',
        'tetragonal': '四方',
        'orthorhombic': '正交',
        'monoclinic': '单斜',
        'triclinic': '三斜',
        'unknown': '未知'
    };
    return crystalMap[crystalStructure] || crystalStructure;
}

// 磁性文本转换
function getMagneticOrderingText(magneticOrdering) {
    const magneticMap = {
        'diamagnetic': '抗磁性',
        'paramagnetic': '顺磁性',
        'ferromagnetic': '铁磁性',
        'antiferromagnetic': '反铁磁性',
        'ferrimagnetic': '亚铁磁性',
        'unknown': '未知'
    };
    return magneticMap[magneticOrdering] || magneticOrdering;
}

// 搜索元素功能
function searchElement(query) {
    const results = [];
    const lowerQuery = query.toLowerCase();

    Object.values(elementsData).forEach(element => {
        if (
            element.symbol.toLowerCase().includes(lowerQuery) ||
            element.name.includes(query) ||
            element.englishName.toLowerCase().includes(lowerQuery) ||
            element.atomicNumber.toString() === query
        ) {
            results.push(element);
        }
    });

    return results;
}

// 高亮显示搜索结果
function highlightElements(searchResults) {
    // 清除之前的高亮
    document.querySelectorAll('.element').forEach(el => {
        el.classList.remove('search-highlighted');
    });

    // 高亮搜索结果
    searchResults.forEach(element => {
        const elementDiv = document.querySelector(`[data-atomic-number="${element.atomicNumber}"]`);
        if (elementDiv) {
            elementDiv.classList.add('search-highlighted');
        }
    });
}

// 初始化周期表搜索功能
function initializePeriodicTableSearch() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = '搜索元素 (符号、名称、原子序数)';
    searchInput.className = 'element-search-input';
    
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        if (query.length > 0) {
            const results = searchElement(query);
            highlightElements(results);
        } else {
            // 清除所有高亮
            document.querySelectorAll('.element').forEach(el => {
                el.classList.remove('search-highlighted');
            });
        }
    });

    // 将搜索框添加到周期表容器前
    const periodicSection = document.getElementById('periodic-table');
    const tableContainer = periodicSection.querySelector('.periodic-table-container');
    tableContainer.insertBefore(searchInput, tableContainer.firstChild);
}

// 文档加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    initializePeriodicTable();
    initializePeriodicTableSearch();
});