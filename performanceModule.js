
// ---- 八大绩效域模块 ----
const PerformanceModule = {
    currentIndex: 0,
    init() {
        this.currentIndex = 0;
        document.getElementById('root').innerHTML = `
            <div>
                <div class="top-bar"><button id="backHomeBtnPerf" class="back-btn">← 返回首页</button><span class="module-title">八大绩效域 · 预期目标/要点/检查</span></div>
                <div class="progress-random"><span class="progress-badge" id="perfProgress">1/8</span><button id="randomPerfBtn" class="random-btn">🎲</button></div>
                <div class="flashcard"><div class="card-badge"><span class="area-tag" id="perfName">干系人绩效域</span></div>
                <div id="performanceDetailSection" class="detail-section hidden-detail"><div class="detail-item"><div class="detail-label">🎯 预期目标</div><div class="detail-content" id="perfObjective"></div></div>
                <div class="detail-item"><div class="detail-label">📌 绩效要点</div><div class="detail-content"><ul id="perfKeyPoints"></ul></div></div>
                <div class="detail-item"><div class="detail-label">✅ 执行效果检查</div><div class="detail-content"><ul id="perfCheckPoints"></ul></div></div></div>
                <button id="togglePerfDetailBtn" class="reveal-btn">🔎 显示详情(预期目标+要点+检查)</button></div>
                <div class="nav-buttons"><button id="prevPerfBtn" class="nav-btn">◀ 上一个</button><button id="nextPerfBtn" class="nav-btn">下一个 ▶</button></div>
                <div class="footer">🌟 第四版核心 · 绩效域必考点</div>
            </div>
        `;
        this.renderCard();
        document.getElementById('prevPerfBtn').onclick = () => {
            this.currentIndex = (this.currentIndex - 1 + rawPerformanceDomains.length) % rawPerformanceDomains.length;
            this.renderCard();
        };
        document.getElementById('nextPerfBtn').onclick = () => {
            this.currentIndex = (this.currentIndex + 1) % rawPerformanceDomains.length;
            this.renderCard();
        };
        document.getElementById('randomPerfBtn').onclick = () => {
            this.currentIndex = Math.floor(Math.random() * rawPerformanceDomains.length);
            this.renderCard();
        };
        document.getElementById('togglePerfDetailBtn').onclick = () => {
            const sec = document.getElementById('performanceDetailSection');
            const btn = document.getElementById('togglePerfDetailBtn');
            if(sec.classList.contains('hidden-detail')){
                sec.classList.remove('hidden-detail');
                btn.innerText = '🙈 隐藏详情';
            } else {
                sec.classList.add('hidden-detail');
                btn.innerText = '🔎 显示详情(预期目标+要点+检查)';
            }
        };
        document.getElementById('backHomeBtnPerf').onclick = () => GuideModule.render();
        document.getElementById('performanceDetailSection').classList.add('hidden-detail');
    },
    renderCard() {
        const card = rawPerformanceDomains[this.currentIndex];
        document.getElementById('perfName').innerText = card.name;
        document.getElementById('perfObjective').innerText = card.objectiveRaw;
        const keyUl = document.getElementById('perfKeyPoints');
        keyUl.innerHTML = '';
        card.keyPoints.forEach(p => { const li = document.createElement('li'); li.innerText = p; keyUl.appendChild(li); });
        const checkUl = document.getElementById('perfCheckPoints');
        checkUl.innerHTML = '';
        card.checkPoints.forEach(cp => { const li = document.createElement('li'); li.innerText = cp; checkUl.appendChild(li); });
        document.getElementById('perfProgress').innerText = `${this.currentIndex+1}/${rawPerformanceDomains.length}`;
    }
};
