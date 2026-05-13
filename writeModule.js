const WriteModule = {
    mode: null,
    domains: rawPerformanceDomains,
    knowledgeItems: knowledgeAreasData,
    currentDomainIndex: 0,
    currentKnowledgeIndex: 0,
    init(mode) {
        this.mode = mode;
        document.getElementById('root').innerHTML = `
            <div>
                <div class="top-bar"><button id="backHomeBtnWrite" class="back-btn">← 返回首页</button><span class="module-title">${mode === 'performance' ? '📝 绩效域默写' : '📝 知识域过程默写'}</span></div>
                <div id="writeSelectors"></div>
                <div id="writeInputArea"></div>
            </div>
        `;
        document.getElementById('backHomeBtnWrite').onclick = () => GuideModule.render();
        this.renderSelectors();
    },
    renderSelectors() {
        if (this.mode === 'performance') {
            const selectHtml = `
                <div class="selector-group">
                    <label>选择绩效域：</label>
                    <select id="perfDomainSelect">
                        ${this.domains.map((d, idx) => `<option value="${idx}">${d.name}</option>`).join('')}
                    </select>
                </div>
            `;
            document.getElementById('writeSelectors').innerHTML = selectHtml;
            document.getElementById('perfDomainSelect').onchange = (e) => {
                this.currentDomainIndex = parseInt(e.target.value);
                this.renderWriteArea();
            };
        } else {
            const areas = [...new Map(this.knowledgeItems.map(item => [item.area, item.area])).values()];
            let areaHtml = `<div class="selector-group"><label>选择知识域：</label><select id="knowledgeAreaSelect">${areas.map(a => `<option value="${a}">${a}</option>`).join('')}</select></div>`;
            areaHtml += `<div class="selector-group"><label>选择过程：</label><select id="knowledgeProcessSelect"></select></div>`;
            document.getElementById('writeSelectors').innerHTML = areaHtml;
            const areaSelect = document.getElementById('knowledgeAreaSelect');
            const processSelect = document.getElementById('knowledgeProcessSelect');
            const populateProcesses = (area) => {
                const processes = this.knowledgeItems.filter(item => item.area === area);
                processSelect.innerHTML = processes.map((p, idx) => `<option value="${idx}">${p.process}</option>`).join('');
                this.currentKnowledgeIndex = 0;
            };
            areaSelect.onchange = () => {
                populateProcesses(areaSelect.value);
                this.renderWriteArea();
            };
            populateProcesses(areaSelect.value);
            processSelect.onchange = () => {
                this.currentKnowledgeIndex = parseInt(processSelect.value);
                this.renderWriteArea();
            };
        }
        this.renderWriteArea();
    },
    renderWriteArea() {
        const container = document.getElementById('writeInputArea');
        if (this.mode === 'performance') {
            const domain = this.domains[this.currentDomainIndex];
            const objectiveStandard = domain.objectiveRaw;
            const keyPointsStandard = domain.keyPoints.join("；");
            container.innerHTML = `
                <div><strong>🎯 预期目标</strong></div>
                <textarea id="objInput" class="write-textarea" placeholder="请默写预期目标（多个分句请用分号分隔）"></textarea>
                <div><strong>📌 绩效要点</strong></div>
                <textarea id="kpInput" class="write-textarea" placeholder="请默写绩效要点（多个要点用分号分隔）"></textarea>
                <button id="checkWriteBtn" class="check-btn">🔍 检查默写</button>
                <div id="writeResultArea" class="result-area" style="display:none;"></div>
            `;
            document.getElementById('checkWriteBtn').onclick = () => {
                const userObj = document.getElementById('objInput').value;
                const userKp = document.getElementById('kpInput').value;
                const objResult = getWriteResult(userObj, objectiveStandard, "预期目标");
                const kpResult = getWriteResult(userKp, keyPointsStandard, "绩效要点");
                const resultDiv = document.getElementById('writeResultArea');
                resultDiv.innerHTML = `<div>${objResult}</div><hr><div>${kpResult}</div>`;
                resultDiv.style.display = 'block';
            };
        } else {
            const item = this.knowledgeItems[this.currentKnowledgeIndex];
            if (!item) return;
            const descStandard = item.desc;
            const effectStandard = item.effect;
            container.innerHTML = `
                <div><strong>📝 描述</strong></div>
                <textarea id="descInput" class="write-textarea" placeholder="请默写该过程的描述"></textarea>
                <div><strong>🎯 作用</strong></div>
                <textarea id="effectInput" class="write-textarea" placeholder="请默写该过程的作用"></textarea>
                <button id="checkWriteBtn" class="check-btn">🔍 检查默写</button>
                <div id="writeResultArea" class="result-area" style="display:none;"></div>
            `;
            document.getElementById('checkWriteBtn').onclick = () => {
                const userDesc = document.getElementById('descInput').value;
                const userEffect = document.getElementById('effectInput').value;
                const descResult = getWriteResult(userDesc, descStandard, "描述");
                const effectResult = getWriteResult(userEffect, effectStandard, "作用");
                const resultDiv = document.getElementById('writeResultArea');
                resultDiv.innerHTML = `<div>${descResult}</div><hr><div>${effectResult}</div>`;
                resultDiv.style.display = 'block';
            };
        }
    }
};