
// ---- 十大知识域模块 ----
const KnowledgeModule = {
    currentIndex: 0,
    currentFilter: '全部',
    filteredCards: [],
    detailVisible: false,

    updateFilteredCards() {
        if (this.currentFilter === '全部') {
            this.filteredCards = [...knowledgeAreasData];
        } else {
            this.filteredCards = knowledgeAreasData.filter(c => c.area === this.currentFilter);
        }
        if (this.currentIndex >= this.filteredCards.length) this.currentIndex = 0;
        if (this.filteredCards.length === 0) this.currentIndex = -1;
        else if (this.currentIndex === -1 && this.filteredCards.length) this.currentIndex = 0;
    },

    renderCard() {
        if (!this.filteredCards.length || this.currentIndex < 0) {
            document.getElementById('cardArea').innerText = '暂无';
            return;
        }
        const card = this.filteredCards[this.currentIndex];
        document.getElementById('cardArea').innerText = card.area;
        document.getElementById('cardCategory').innerText = card.category + '过程组';
        document.getElementById('cardProcess').innerText = card.process;
        document.getElementById('cardDesc').innerText = card.desc;
        document.getElementById('cardEffect').innerText = card.effect;
        document.getElementById('progressIndicator').innerText = `${this.currentIndex+1}/${this.filteredCards.length}`;
    },

    init() {
        this.currentFilter = '全部';
        this.updateFilteredCards();
        this.currentIndex = 0;
        this.detailVisible = false;
        const areas = [...new Set(knowledgeAreasData.map(c => c.area))].sort();
        let options = '<option value="全部">🔽 全部知识域</option>';
        areas.forEach(area => { options += `<option value="${area}">📌 ${area}</option>`; });
        document.getElementById('root').innerHTML = `
            <div>
                <div class="top-bar"><button id="backHomeBtn" class="back-btn">← 返回首页</button><span class="module-title">十大知识域·五大过程组</span></div>
                <div class="filter-area"><span>📂 知识域</span><select id="areaSelect">${options}</select></div>
                <div class="progress-random"><span class="progress-badge" id="progressIndicator">0/0</span><button id="randomBtn" class="random-btn">🎲</button></div>
                <div class="flashcard"><div class="card-badge"><span class="area-tag" id="cardArea">整合管理</span><span class="category-tag" id="cardCategory">启动</span></div><div class="process-name" id="cardProcess">制定项目章程</div>
                <div id="knowledgeDetailSection" class="detail-section hidden-detail"><div class="detail-item"><div class="detail-label">📝 描述</div><div class="detail-content" id="cardDesc"></div></div><div class="detail-item"><div class="detail-label">🎯 作用</div><div class="detail-content" id="cardEffect"></div></div></div>
                <button id="toggleKnowledgeDetailBtn" class="reveal-btn">🔎 显示描述&作用</button></div>
                <div class="nav-buttons"><button id="prevBtn" class="nav-btn">◀ 上一个</button><button id="nextBtn" class="nav-btn">下一个 ▶</button></div>
                <div class="footer">📖 主动回忆 · 点击显示答案</div>
            </div>
        `;
        this.renderCard();

        document.getElementById('areaSelect').onchange = (e) => {
            this.currentFilter = e.target.value;
            this.updateFilteredCards();
            if(this.filteredCards.length) this.currentIndex = 0;
            this.renderCard();
            document.getElementById('knowledgeDetailSection').classList.add('hidden-detail');
            document.getElementById('toggleKnowledgeDetailBtn').innerText = '🔎 显示描述&作用';
        };
        document.getElementById('randomBtn').onclick = () => {
            if(this.filteredCards.length){
                this.currentIndex = Math.floor(Math.random() * this.filteredCards.length);
                this.renderCard();
                document.getElementById('knowledgeDetailSection').classList.add('hidden-detail');
                document.getElementById('toggleKnowledgeDetailBtn').innerText = '🔎 显示描述&作用';
            }
        };
        document.getElementById('prevBtn').onclick = () => {
            if(this.filteredCards.length){
                this.currentIndex = (this.currentIndex - 1 + this.filteredCards.length) % this.filteredCards.length;
                this.renderCard();
                document.getElementById('knowledgeDetailSection').classList.add('hidden-detail');
                document.getElementById('toggleKnowledgeDetailBtn').innerText = '🔎 显示描述&作用';
            }
        };
        document.getElementById('nextBtn').onclick = () => {
            if(this.filteredCards.length){
                this.currentIndex = (this.currentIndex + 1) % this.filteredCards.length;
                this.renderCard();
                document.getElementById('knowledgeDetailSection').classList.add('hidden-detail');
                document.getElementById('toggleKnowledgeDetailBtn').innerText = '🔎 显示描述&作用';
            }
        };
        document.getElementById('toggleKnowledgeDetailBtn').onclick = () => {
            const sec = document.getElementById('knowledgeDetailSection');
            const btn = document.getElementById('toggleKnowledgeDetailBtn');
            if(sec.classList.contains('hidden-detail')){
                sec.classList.remove('hidden-detail');
                btn.innerText = '🙈 隐藏描述&作用';
            } else {
                sec.classList.add('hidden-detail');
                btn.innerText = '🔎 显示描述&作用';
            }
        };
        document.getElementById('backHomeBtn').onclick = () => GuideModule.render();
    }
};
