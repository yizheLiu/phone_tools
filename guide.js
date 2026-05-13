const GuideModule = {
    render: () => {
        document.getElementById('root').innerHTML = `
            <div class="guide-screen">
                <div class="guide-title">📚 高项记忆库</div>
                <div class="guide-sub">信息系统项目管理师 · 核心背诵+练习+默写</div>
                <div class="card-module" id="gotoKnowledge">
                    <div class="module-icon">📐</div>
                    <div class="module-name">十大知识域</div>
                    <div class="module-desc">五大过程组 · 49个过程 · 描述+作用</div>
                    <div class="badge-new">背诵卡片</div>
                </div>
                <div class="card-module" id="gotoPerformance">
                    <div class="module-icon">🎯</div>
                    <div class="module-name">八大绩效域</div>
                    <div class="module-desc">预期目标 · 绩效要点 · 执行效果检查</div>
                    <div class="badge-new">背诵卡片</div>
                </div>
<!--                <div class="card-module" id="gotoQuiz">-->
<!--                    <div class="module-icon">✍️</div>-->
<!--                    <div class="module-name">选择题练习</div>-->
<!--                    <div class="module-desc">随机抽题 · 匹配绩效域所属</div>-->
<!--                    <div class="badge-new">自测巩固</div>-->
<!--                </div>-->
                <div class="card-module" id="gotoPerfWrite">
                    <div class="module-icon">📝</div>
                    <div class="module-name">绩效域默写</div>
                    <div class="module-desc">默写预期目标与绩效要点 · 智能比对</div>
                    <div class="badge-new">新功能</div>
                </div>
                <div class="card-module" id="gotoKnowledgeWrite">
                    <div class="module-icon">📖</div>
                    <div class="module-name">知识域过程默写</div>
                    <div class="module-desc">默写过程描述与作用 · 智能比对</div>
                    <div class="badge-new">新功能</div>
                </div>
                <div class="footer" style="margin-top: 30px;">👉 点选模块，随时随地记忆 👈</div>
            </div>
        `;
        document.getElementById('gotoKnowledge').onclick = () => KnowledgeModule.init();
        document.getElementById('gotoPerformance').onclick = () => PerformanceModule.init();
        document.getElementById('gotoQuiz').onclick = () => QuizModule.showTypeSelect();
        document.getElementById('gotoPerfWrite').onclick = () => WriteModule.init('performance');
        document.getElementById('gotoKnowledgeWrite').onclick = () => WriteModule.init('knowledge');
    }
};