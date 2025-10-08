// 化学计算工具 - Chemical Calculation Tools

// 单位换算数据
const conversionData = {
    mass: {
        name: '质量',
        units: {
            'kg': { name: '千克', factor: 1 },
            'g': { name: '克', factor: 1000 },
            'mg': { name: '毫克', factor: 1000000 },
            'μg': { name: '微克', factor: 1000000000 },
            'ng': { name: '纳克', factor: 1000000000000 },
            'lb': { name: '磅', factor: 2.20462 },
            'oz': { name: '盎司', factor: 35.274 },
            'ton': { name: '公吨', factor: 0.001 },
            'u': { name: '原子质量单位', factor: 6.022e26 }
        }
    },
    volume: {
        name: '体积',
        units: {
            'L': { name: '升', factor: 1 },
            'mL': { name: '毫升', factor: 1000 },
            'μL': { name: '微升', factor: 1000000 },
            'm³': { name: '立方米', factor: 0.001 },
            'cm³': { name: '立方厘米', factor: 1000 },
            'gal': { name: '加仑', factor: 0.264172 },
            'qt': { name: '夸脱', factor: 1.05669 },
            'pt': { name: '品脱', factor: 2.11338 },
            'fl oz': { name: '液体盎司', factor: 33.814 }
        }
    },
    temperature: {
        name: '温度',
        units: {
            'C': { name: '摄氏度', factor: 1, offset: 0 },
            'K': { name: '开尔文', factor: 1, offset: 273.15 },
            'F': { name: '华氏度', factor: 9/5, offset: 32 },
            'R': { name: '兰氏度', factor: 9/5, offset: 491.67 }
        }
    },
    pressure: {
        name: '压强',
        units: {
            'Pa': { name: '帕斯卡', factor: 1 },
            'kPa': { name: '千帕', factor: 0.001 },
            'MPa': { name: '兆帕', factor: 0.000001 },
            'bar': { name: '巴', factor: 0.00001 },
            'atm': { name: '大气压', factor: 9.8692e-6 },
            'mmHg': { name: '毫米汞柱', factor: 0.00750062 },
            'Torr': { name: '托', factor: 0.00750062 },
            'psi': { name: '磅/平方英寸', factor: 0.000145038 }
        }
    },
    energy: {
        name: '能量',
        units: {
            'J': { name: '焦耳', factor: 1 },
            'kJ': { name: '千焦', factor: 0.001 },
            'MJ': { name: '兆焦', factor: 0.000001 },
            'cal': { name: '卡路里', factor: 0.239006 },
            'kcal': { name: '千卡', factor: 0.000239006 },
            'eV': { name: '电子伏特', factor: 6.242e18 },
            'kWh': { name: '千瓦时', factor: 2.77778e-7 },
            'BTU': { name: '英热单位', factor: 0.000947817 }
        }
    }
};

// 常见化合物摩尔质量数据
const molecularWeights = {
    'H2O': 18.015,
    'NaCl': 58.443,
    'HCl': 36.458,
    'H2SO4': 98.079,
    'HNO3': 63.013,
    'NaOH': 39.997,
    'KOH': 56.106,
    'Ca(OH)2': 74.093,
    'CaCO3': 100.087,
    'Na2CO3': 105.988,
    'K2CO3': 138.205,
    'NH3': 17.031,
    'CO2': 44.010,
    'CH4': 16.043,
    'C2H6': 30.070,
    'C2H5OH': 46.068,
    'CH3OH': 32.042,
    'C6H12O6': 180.156,
    'C12H22O11': 342.297
};

// 初始化计算器
function initializeCalculators() {
    updateConversionOptions();
    initializeLatticeInputs();
    updatePHCalculatorInterface();
}

// 单位换算功能
function updateConversionOptions() {
    const conversionType = document.getElementById('conversion-type').value;
    const inputUnit = document.getElementById('input-unit');
    const outputUnit = document.getElementById('output-unit');
    
    // 清空选项
    inputUnit.innerHTML = '';
    outputUnit.innerHTML = '';
    
    // 添加新选项
    const units = conversionData[conversionType].units;
    Object.entries(units).forEach(([unit, data]) => {
        const option1 = new Option(data.name + ' (' + unit + ')', unit);
        const option2 = new Option(data.name + ' (' + unit + ')', unit);
        inputUnit.appendChild(option1);
        outputUnit.appendChild(option2);
    });
    
    // 设置默认选项
    if (inputUnit.options.length > 0) inputUnit.selectedIndex = 0;
    if (outputUnit.options.length > 1) outputUnit.selectedIndex = 1;
    
    // 监听输入变化
    document.getElementById('input-value').addEventListener('input', convertUnits);
    document.getElementById('input-unit').addEventListener('change', convertUnits);
    document.getElementById('output-unit').addEventListener('change', convertUnits);
}

function convertUnits() {
    const conversionType = document.getElementById('conversion-type').value;
    const inputValue = parseFloat(document.getElementById('input-value').value);
    const inputUnit = document.getElementById('input-unit').value;
    const outputUnit = document.getElementById('output-unit').value;
    const outputField = document.getElementById('output-value');
    
    if (isNaN(inputValue)) {
        outputField.value = '';
        return;
    }
    
    const units = conversionData[conversionType].units;
    
    if (conversionType === 'temperature') {
        // 温度转换需要特殊处理
        const result = convertTemperature(inputValue, inputUnit, outputUnit);
        outputField.value = result.toFixed(6);
    } else {
        // 其他单位转换
        const inputFactor = units[inputUnit].factor;
        const outputFactor = units[outputUnit].factor;
        const result = inputValue * outputFactor / inputFactor;
        outputField.value = result.toFixed(6);
    }
}

function convertTemperature(value, fromUnit, toUnit) {
    // 先转换为摄氏度
    let celsius;
    switch (fromUnit) {
        case 'C': celsius = value; break;
        case 'K': celsius = value - 273.15; break;
        case 'F': celsius = (value - 32) * 5/9; break;
        case 'R': celsius = (value - 491.67) * 5/9; break;
    }
    
    // 再转换为目标单位
    switch (toUnit) {
        case 'C': return celsius;
        case 'K': return celsius + 273.15;
        case 'F': return celsius * 9/5 + 32;
        case 'R': return celsius * 9/5 + 491.67;
    }
}

// 溶液配制计算
function calculateSolution() {
    const soluteFormula = document.getElementById('solute-formula').value.trim();
    const targetConcentration = parseFloat(document.getElementById('target-concentration').value);
    const targetVolume = parseFloat(document.getElementById('target-volume').value);
    const resultDiv = document.getElementById('solution-result');
    
    if (!soluteFormula || isNaN(targetConcentration) || isNaN(targetVolume)) {
        resultDiv.innerHTML = '<p class="error">请输入完整的参数</p>';
        resultDiv.className = 'calc-result error';
        return;
    }
    
    // 获取分子量
    let molecularWeight = molecularWeights[soluteFormula];
    
    if (!molecularWeight) {
        // 尝试计算分子量
        molecularWeight = calculateMolecularWeight(soluteFormula);
    }
    
    if (!molecularWeight) {
        resultDiv.innerHTML = '<p class="error">无法识别的化学式，请检查输入</p>';
        resultDiv.className = 'calc-result error';
        return;
    }
    
    // 计算所需质量 (g)
    const moles = targetConcentration * (targetVolume / 1000); // 转换为升
    const mass = moles * molecularWeight;
    
    resultDiv.innerHTML = `
        <h4>溶液配制结果</h4>
        <div class="result-grid">
            <div class="result-item">
                <div class="result-label">化学式:</div>
                <div class="result-value">${soluteFormula}</div>
            </div>
            <div class="result-item">
                <div class="result-label">相对分子质量:</div>
                <div class="result-value">${molecularWeight.toFixed(3)} <span class="result-unit">g/mol</span></div>
            </div>
            <div class="result-item">
                <div class="result-label">所需质量:</div>
                <div class="result-value">${mass.toFixed(4)} <span class="result-unit">g</span></div>
            </div>
            <div class="result-item">
                <div class="result-label">物质的量:</div>
                <div class="result-value">${moles.toFixed(6)} <span class="result-unit">mol</span></div>
            </div>
        </div>
        <div style="margin-top: 1rem; padding: 1rem; background: #f0f8ff; border-radius: 8px;">
            <p><strong>配制步骤:</strong></p>
            <ol>
                <li>称取 ${mass.toFixed(4)} g ${soluteFormula}</li>
                <li>用少量蒸馏水溶解</li>
                <li>转移至 ${targetVolume} mL 容量瓶中</li>
                <li>用蒸馏水定容至刻度线</li>
                <li>振荡混匀</li>
            </ol>
        </div>
    `;
    resultDiv.className = 'calc-result';
}

// 简单的分子量计算器
function calculateMolecularWeight(formula) {
    const atomicWeights = {
        'H': 1.008, 'He': 4.003, 'Li': 6.941, 'Be': 9.012, 'B': 10.811,
        'C': 12.011, 'N': 14.007, 'O': 15.999, 'F': 18.998, 'Ne': 20.180,
        'Na': 22.990, 'Mg': 24.305, 'Al': 26.982, 'Si': 28.085, 'P': 30.974,
        'S': 32.065, 'Cl': 35.453, 'Ar': 39.948, 'K': 39.098, 'Ca': 40.078,
        'Fe': 55.845, 'Cu': 63.546, 'Zn': 65.380, 'Br': 79.904, 'I': 126.904
    };
    
    let totalWeight = 0;
    const regex = /([A-Z][a-z]?)(\d*)/g;
    let match;
    
    while ((match = regex.exec(formula)) !== null) {
        const element = match[1];
        const count = parseInt(match[2]) || 1;
        
        if (atomicWeights[element]) {
            totalWeight += atomicWeights[element] * count;
        } else {
            return null; // 未知元素
        }
    }
    
    return totalWeight > 0 ? totalWeight : null;
}

// pH计算功能
function showPHCalc(type) {
    document.querySelectorAll('.ph-calc-type').forEach(calc => calc.classList.remove('active'));
    document.getElementById(type).classList.add('active');
    
    document.querySelectorAll('.calc-tab-sub').forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');
}

function updatePHCalculatorInterface() {
    const strongAcidDiv = document.getElementById('strong-acid');
    if (strongAcidDiv) {
        // 添加弱酸弱碱和缓冲溶液的界面
        strongAcidDiv.parentNode.innerHTML += `
            <div id="weak-acid" class="ph-calc-type">
                <div class="form-group">
                    <label for="weak-acid-concentration">酸/碱浓度 (mol/L):</label>
                    <input type="number" id="weak-acid-concentration" step="0.001" placeholder="0.1">
                </div>
                <div class="form-group">
                    <label for="ka-value">Ka/Kb值:</label>
                    <input type="number" id="ka-value" step="0.0001" placeholder="1.8e-5">
                </div>
                <div class="form-group">
                    <label for="weak-solution-type">溶液类型:</label>
                    <select id="weak-solution-type">
                        <option value="weak-acid">弱酸</option>
                        <option value="weak-base">弱碱</option>
                    </select>
                </div>
                <button onclick="calculateWeakPH()">计算pH值</button>
            </div>

            <div id="buffer" class="ph-calc-type">
                <div class="form-group">
                    <label for="buffer-acid-conc">共轭酸浓度 (mol/L):</label>
                    <input type="number" id="buffer-acid-conc" step="0.001" placeholder="0.1">
                </div>
                <div class="form-group">
                    <label for="buffer-base-conc">共轭碱浓度 (mol/L):</label>
                    <input type="number" id="buffer-base-conc" step="0.001" placeholder="0.1">
                </div>
                <div class="form-group">
                    <label for="buffer-ka">Ka值:</label>
                    <input type="number" id="buffer-ka" step="0.0001" placeholder="1.8e-5">
                </div>
                <button onclick="calculateBufferPH()">计算缓冲溶液pH</button>
            </div>
        `;
    }
}

function calculatePH() {
    const concentration = parseFloat(document.getElementById('acid-concentration').value);
    const solutionType = document.getElementById('solution-type').value;
    const resultDiv = document.getElementById('ph-result');
    
    if (isNaN(concentration) || concentration <= 0) {
        resultDiv.innerHTML = '<p class="error">请输入有效的浓度值</p>';
        resultDiv.className = 'calc-result error';
        return;
    }
    
    let pH, pOH;
    
    if (solutionType === 'acid') {
        pH = -Math.log10(concentration);
        pOH = 14 - pH;
    } else {
        pOH = -Math.log10(concentration);
        pH = 14 - pOH;
    }
    
    const hConcentration = Math.pow(10, -pH);
    const ohConcentration = Math.pow(10, -pOH);
    
    resultDiv.innerHTML = `
        <h4>强酸强碱pH计算结果</h4>
        <div class="result-grid">
            <div class="result-item">
                <div class="result-label">pH值:</div>
                <div class="result-value">${pH.toFixed(3)}</div>
            </div>
            <div class="result-item">
                <div class="result-label">pOH值:</div>
                <div class="result-value">${pOH.toFixed(3)}</div>
            </div>
            <div class="result-item">
                <div class="result-label">[H⁺]:</div>
                <div class="result-value">${hConcentration.toExponential(2)} <span class="result-unit">mol/L</span></div>
            </div>
            <div class="result-item">
                <div class="result-label">[OH⁻]:</div>
                <div class="result-value">${ohConcentration.toExponential(2)} <span class="result-unit">mol/L</span></div>
            </div>
        </div>
        <div class="ph-scale-display">
            <div style="margin: 1rem 0;">
                <strong>酸碱性:</strong> ${pH < 7 ? '酸性' : pH > 7 ? '碱性' : '中性'}
            </div>
        </div>
    `;
    resultDiv.className = 'calc-result';
    
    // 更新pH指示器位置
    updatePHIndicator(pH);
}

function calculateWeakPH() {
    const concentration = parseFloat(document.getElementById('weak-acid-concentration').value);
    const ka = parseFloat(document.getElementById('ka-value').value);
    const solutionType = document.getElementById('weak-solution-type').value;
    const resultDiv = document.getElementById('ph-result');
    
    if (isNaN(concentration) || isNaN(ka) || concentration <= 0 || ka <= 0) {
        resultDiv.innerHTML = '<p class="error">请输入有效的浓度值和Ka/Kb值</p>';
        resultDiv.className = 'calc-result error';
        return;
    }
    
    let pH;
    
    if (solutionType === 'weak-acid') {
        // 弱酸pH计算：pH = 0.5 * (pKa - log C)
        const pKa = -Math.log10(ka);
        pH = 0.5 * (pKa - Math.log10(concentration));
    } else {
        // 弱碱pH计算：pOH = 0.5 * (pKb - log C)
        const pKb = -Math.log10(ka); // 这里ka实际是Kb
        const pOH = 0.5 * (pKb - Math.log10(concentration));
        pH = 14 - pOH;
    }
    
    resultDiv.innerHTML = `
        <h4>弱酸弱碱pH计算结果</h4>
        <div class="result-grid">
            <div class="result-item">
                <div class="result-label">pH值:</div>
                <div class="result-value">${pH.toFixed(3)}</div>
            </div>
            <div class="result-item">
                <div class="result-label">Ka/Kb值:</div>
                <div class="result-value">${ka.toExponential(2)}</div>
            </div>
            <div class="result-item">
                <div class="result-label">电离度:</div>
                <div class="result-value">${(Math.sqrt(ka/concentration) * 100).toFixed(2)} <span class="result-unit">%</span></div>
            </div>
        </div>
    `;
    resultDiv.className = 'calc-result';
    
    updatePHIndicator(pH);
}

function calculateBufferPH() {
    const acidConc = parseFloat(document.getElementById('buffer-acid-conc').value);
    const baseConc = parseFloat(document.getElementById('buffer-base-conc').value);
    const ka = parseFloat(document.getElementById('buffer-ka').value);
    const resultDiv = document.getElementById('ph-result');
    
    if (isNaN(acidConc) || isNaN(baseConc) || isNaN(ka) || acidConc <= 0 || baseConc <= 0 || ka <= 0) {
        resultDiv.innerHTML = '<p class="error">请输入有效的浓度值和Ka值</p>';
        resultDiv.className = 'calc-result error';
        return;
    }
    
    // Henderson-Hasselbalch方程：pH = pKa + log([A⁻]/[HA])
    const pKa = -Math.log10(ka);
    const pH = pKa + Math.log10(baseConc / acidConc);
    
    resultDiv.innerHTML = `
        <h4>缓冲溶液pH计算结果</h4>
        <div class="result-grid">
            <div class="result-item">
                <div class="result-label">pH值:</div>
                <div class="result-value">${pH.toFixed(3)}</div>
            </div>
            <div class="result-item">
                <div class="result-label">pKa值:</div>
                <div class="result-value">${pKa.toFixed(3)}</div>
            </div>
            <div class="result-item">
                <div class="result-label">缓冲比:</div>
                <div class="result-value">${(baseConc/acidConc).toFixed(3)}</div>
            </div>
        </div>
        <p style="margin-top: 1rem; font-style: italic;">
            使用Henderson-Hasselbalch方程计算
        </p>
    `;
    resultDiv.className = 'calc-result';
    
    updatePHIndicator(pH);
}

function updatePHIndicator(pH) {
    // 创建pH刻度指示器
    const resultDiv = document.getElementById('ph-result');
    const indicatorHTML = `
        <div style="margin-top: 1rem;">
            <div class="ph-scale" style="position: relative; height: 30px; background: linear-gradient(90deg, #ff0000 0%, #ff4500 14%, #ffa500 28%, #ffff00 42%, #9acd32 57%, #00ff00 71%, #00ffff 85%, #0000ff 100%); border-radius: 15px;">
                <div style="position: absolute; left: ${Math.min(Math.max(pH / 14 * 100, 0), 100)}%; top: -10px; width: 4px; height: 50px; background: white; border-radius: 2px; box-shadow: 0 2px 8px rgba(0,0,0,0.3); transform: translateX(-50%);"></div>
            </div>
            <div style="display: flex; justify-content: space-between; margin-top: 0.5rem; font-size: 0.9rem; font-weight: bold;">
                <span>0</span><span>7</span><span>14</span>
            </div>
        </div>
    `;
    
    if (resultDiv.querySelector('.ph-scale')) {
        resultDiv.querySelector('.ph-scale').parentNode.remove();
    }
    resultDiv.insertAdjacentHTML('beforeend', indicatorHTML);
}

// 晶体计算功能
function showCrystalCalc(type) {
    document.querySelectorAll('.crystal-calc-type').forEach(calc => calc.classList.remove('active'));
    document.getElementById(type).classList.add('active');
    
    document.querySelectorAll('.calc-tab-sub').forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');
}

function initializeLatticeInputs() {
    const crystalSystem = document.getElementById('crystal-system');
    const latticeInputs = document.getElementById('lattice-inputs');
    
    if (!crystalSystem || !latticeInputs) return;
    
    crystalSystem.addEventListener('change', updateLatticeInputs);
    updateLatticeInputs(); // 初始化
}

function updateLatticeInputs() {
    const crystalSystem = document.getElementById('crystal-system').value;
    const latticeInputs = document.getElementById('lattice-inputs');
    
    const systems = {
        'cubic': ['a'],
        'tetragonal': ['a', 'c'],
        'orthorhombic': ['a', 'b', 'c'],
        'hexagonal': ['a', 'c'],
        'trigonal': ['a', 'c'],
        'monoclinic': ['a', 'b', 'c', 'β'],
        'triclinic': ['a', 'b', 'c', 'α', 'β', 'γ']
    };
    
    const parameters = systems[crystalSystem] || ['a'];
    
    latticeInputs.innerHTML = parameters.map(param => `
        <div class="form-group">
            <label for="lattice-${param}">${param} ${param.match(/[αβγ]/) ? '(度)' : '(Å)'}:</label>
            <input type="number" id="lattice-${param}" step="0.001" placeholder="${param.match(/[αβγ]/) ? '90' : '3.0'}">
        </div>
    `).join('');
}

function calculateLattice() {
    const crystalSystem = document.getElementById('crystal-system').value;
    const resultDiv = document.getElementById('crystal-result');
    
    // 获取晶格参数
    const params = {};
    const inputs = document.querySelectorAll('#lattice-inputs input');
    
    for (let input of inputs) {
        const paramName = input.id.replace('lattice-', '');
        const value = parseFloat(input.value);
        
        if (isNaN(value) || value <= 0) {
            resultDiv.innerHTML = '<p class="error">请输入有效的晶格参数</p>';
            resultDiv.className = 'calc-result error';
            return;
        }
        
        params[paramName] = value;
    }
    
    // 计算晶胞体积
    let volume;
    
    switch (crystalSystem) {
        case 'cubic':
            volume = Math.pow(params.a, 3);
            break;
        case 'tetragonal':
            volume = Math.pow(params.a, 2) * params.c;
            break;
        case 'orthorhombic':
            volume = params.a * params.b * params.c;
            break;
        case 'hexagonal':
        case 'trigonal':
            volume = Math.sqrt(3) / 2 * Math.pow(params.a, 2) * params.c;
            break;
        case 'monoclinic':
            const betaRad = params.β * Math.PI / 180;
            volume = params.a * params.b * params.c * Math.sin(betaRad);
            break;
        case 'triclinic':
            const alphaRad = params.α * Math.PI / 180;
            const betaRad2 = params.β * Math.PI / 180;
            const gammaRad = params.γ * Math.PI / 180;
            const cosAlpha = Math.cos(alphaRad);
            const cosBeta = Math.cos(betaRad2);
            const cosGamma = Math.cos(gammaRad);
            volume = params.a * params.b * params.c * Math.sqrt(1 + 2*cosAlpha*cosBeta*cosGamma - cosAlpha*cosAlpha - cosBeta*cosBeta - cosGamma*cosGamma);
            break;
        default:
            volume = 0;
    }
    
    resultDiv.innerHTML = `
        <h4>晶格计算结果</h4>
        <div class="result-grid">
            <div class="result-item">
                <div class="result-label">晶系:</div>
                <div class="result-value">${getCrystalSystemName(crystalSystem)}</div>
            </div>
            <div class="result-item">
                <div class="result-label">晶胞体积:</div>
                <div class="result-value">${volume.toFixed(6)} <span class="result-unit">Ų</span></div>
            </div>
            <div class="result-item">
                <div class="result-label">晶胞体积:</div>
                <div class="result-value">${(volume * 1e-30).toExponential(3)} <span class="result-unit">m³</span></div>
            </div>
        </div>
        <div style="margin-top: 1rem;">
            <h5>晶格参数:</h5>
            ${Object.entries(params).map(([key, value]) => 
                `<p>${key} = ${value} ${key.match(/[αβγ]/) ? '°' : 'Å'}</p>`
            ).join('')}
        </div>
    `;
    resultDiv.className = 'calc-result';
}

function getCrystalSystemName(system) {
    const names = {
        'cubic': '立方晶系',
        'tetragonal': '四方晶系',
        'orthorhombic': '正交晶系',
        'hexagonal': '六方晶系',
        'trigonal': '三方晶系',
        'monoclinic': '单斜晶系',
        'triclinic': '三斜晶系'
    };
    return names[system] || system;
}

// 显示计算器
function showCalculator(calcType) {
    // 隐藏所有计算器
    document.querySelectorAll('.calculator').forEach(calc => {
        calc.classList.remove('active');
    });
    
    // 显示选中的计算器
    document.getElementById(calcType).classList.add('active');
    
    // 更新标签页状态
    document.querySelectorAll('.calc-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    event.target.classList.add('active');
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    initializeCalculators();
});