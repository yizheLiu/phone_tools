// ---- 首页模块 ----
const GuideModule = {
    render: () => {
        document.getElementById('root').innerHTML = `
            <div class="guide-screen">
                <div class="guide-title">📚 高项记忆库</div>
                <div class="guide-sub">信息系统项目管理师 · 核心背诵+练习</div>
                <div class="card-module" id="gotoKnowledge">
                    <div class="module-icon">📐</div>
                    <div class="module-name">十大知识域</div>
                    <div class="module-desc">五大过程组 · 49个过程 · 描述+作用</div>
                    <div class="badge-new">完整背诵版本</div>
                </div>
                <div class="card-module" id="gotoPerformance">
                    <div class="module-icon">🎯</div>
                    <div class="module-name">八大绩效域</div>
                    <div class="module-desc">预期目标 · 绩效要点 · 执行效果检查</div>
                    <div class="badge-new">第四版核心考点</div>
                </div>
                <div class="card-module" id="gotoQuiz">
                    <div class="module-icon">✍️</div>
                    <div class="module-name">选择题练习</div>
                    <div class="module-desc">随机顺序 · 答对自动下一题 · 错题重做</div>
                    <div class="badge-new">智能练习</div>
                </div>
                <div class="footer" style="margin-top: 30px;">👉 点选模块，随时随地记忆 👈</div>
            </div>
        `;
        document.getElementById('gotoKnowledge').onclick = () => KnowledgeModule.init();
        document.getElementById('gotoPerformance').onclick = () => PerformanceModule.init();
        document.getElementById('gotoQuiz').onclick = () => QuizModule.showTypeSelect();
    }
};


// 启动
GuideModule.render();