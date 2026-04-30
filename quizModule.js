
// ---- 练习模块（支持错题重做，全部遍历）----
const QuizModule = {
    currentType: null,     // 'objective', 'keypoint', 'check'
    allQuestions: [],      // 当前类型的所有题目
    currentQIndex: 0,
    userAnswers: [],       // 记录每道题是否正确 { correct: bool, selected: string }
    waitingForConfirm: false, // 错误后等待确认
    wrongQuestions: [],    // 错题列表（用于重做）
    isRetryMode: false,    // 是否处于错题重做模式

    showTypeSelect() {
        document.getElementById('root').innerHTML = `
            <div class="top-bar"><button id="quizSelectBack" class="back-btn">← 返回首页</button><span class="module-title">✍️ 选择练习类型</span></div>
            <div class="quiz-type-grid">
                <div class="quiz-type-card" data-type="objective"><div class="quiz-type-title">🎯 预期目标匹配</div><div class="quiz-type-desc">根据目标描述，选择所属绩效域</div></div>
                <div class="quiz-type-card" data-type="keypoint"><div class="quiz-type-title">📌 绩效要点匹配</div><div class="quiz-type-desc">根据绩效要点，判断属于哪个域</div></div>
                <div class="quiz-type-card" data-type="check"><div class="quiz-type-title">✅ 执行效果检查匹配</div><div class="quiz-type-desc">根据检查项，选择正确绩效域</div></div>
            </div>
        `;
        document.querySelectorAll('.quiz-type-card').forEach(card => {
            card.onclick = () => {
                const type = card.dataset.type;
                this.startNewPractice(type);
            };
        });
        document.getElementById('quizSelectBack').onclick = () => GuideModule.render();
    },

    startNewPractice(type, retryQuestions = null) {
        this.currentType = type;
        this.waitingForConfirm = false;
        this.isRetryMode = (retryQuestions !== null);

        if (retryQuestions) {
            this.allQuestions = [...retryQuestions];
        } else {
            let source = [];
            if (type === 'objective') source = allQuestionBank.objectiveQuestions;
            else if (type === 'keypoint') source = allQuestionBank.keypointQuestions;
            else source = allQuestionBank.checkQuestions;
            // 随机打乱顺序，但确保全部题目都出现
            this.allQuestions = [...source];
            for (let i = this.allQuestions.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [this.allQuestions[i], this.allQuestions[j]] = [this.allQuestions[j], this.allQuestions[i]];
            }
        }

        this.currentQIndex = 0;
        this.userAnswers = new Array(this.allQuestions.length).fill(null);
        this.renderCurrentQuestion();
    },

    renderCurrentQuestion() {
        if (this.currentQIndex >= this.allQuestions.length) {
            this.showResult();
            return;
        }
        const q = this.allQuestions[this.currentQIndex];
        const typeLabel = this.currentType === 'objective' ? '预期目标' : (this.currentType === 'keypoint' ? '绩效要点' : '执行效果检查');
        const modeText = this.isRetryMode ? '（错题重做模式）' : '';
        let html = `
            <div class="top-bar"><button id="quizBackHome" class="back-btn">← 返回首页</button><span class="module-title">📝 ${typeLabel}练习 ${modeText}</span></div>
            <div class="progress-random"><span class="progress-badge">第 ${this.currentQIndex+1} / ${this.allQuestions.length} 题</span></div>
            <div class="question-area">${q.text}</div>
            <div class="options-list" id="optionsList"></div>
        `;
        // 如果已经有临时答案（已经回答过但等待确认或已正确），显示反馈
        const existingAnswer = this.userAnswers[this.currentQIndex];
        if (existingAnswer) {
            const isCorrect = existingAnswer.correct;
            const selectedDomain = existingAnswer.selected;
            if (isCorrect) {
                html += `<div class="quiz-feedback" style="background:#dcfce7;">✅ 回答正确！ 自动跳转下一题...</div>`;
                // 自动跳转
                setTimeout(() => {
                    this.currentQIndex++;
                    this.renderCurrentQuestion();
                }, 500);
                document.getElementById('root').innerHTML = html;
                this.bindOptionsWithExisting(selectedDomain, isCorrect);
                return;
            } else {
                // 错误，显示正确答案，并显示确认按钮
                const correctAns = q.correct;
                html += `<div class="quiz-feedback wrong-answer-notice">❌ 回答错误！正确答案是：${correctAns}<br><button id="confirmWrongBtn" class="next-quiz-btn" style="margin-top:10px;">确定，继续下一题</button></div>`;
                document.getElementById('root').innerHTML = html;
                this.bindOptionsWithExisting(selectedDomain, false);
                document.getElementById('confirmWrongBtn').onclick = () => {
                    this.currentQIndex++;
                    this.renderCurrentQuestion();
                };
                return;
            }
        } else {
            // 未作答，渲染选项，点击选项直接判断
            document.getElementById('root').innerHTML = html;
            const container = document.getElementById('optionsList');
            allDomainsList.forEach(domain => {
                const div = document.createElement('div');
                div.className = 'option-item';
                div.innerText = domain;
                div.onclick = () => {
                    // 清除其他选项的选中样式（可选，但为了视觉反馈）
                    document.querySelectorAll('.option-item').forEach(opt => opt.classList.remove('selected'));
                    div.classList.add('selected');
                    // 直接判断正误
                    const q = this.allQuestions[this.currentQIndex];
                    const isCorrect = (domain === q.correct);
                    this.userAnswers[this.currentQIndex] = { correct: isCorrect, selected: domain };
                    this.renderCurrentQuestion(); // 重新渲染当前题，显示反馈并处理跳转
                };
                container.appendChild(div);
            });
// 不需要提交按钮，但保留返回首页按钮的事件绑定
            const backBtn = document.getElementById('quizBackHome');
            if (backBtn) backBtn.onclick = () => GuideModule.render();
        }
    },

    bindOptionsWithExisting(selectedDomain, isCorrect) {
        // 重绘选项时禁用点击
        const container = document.getElementById('optionsList');
        if (container) {
            allDomainsList.forEach(domain => {
                const div = document.createElement('div');
                div.className = 'option-item';
                if (domain === selectedDomain) div.classList.add('selected');
                div.innerText = domain;
                div.style.opacity = '0.7';
                div.style.cursor = 'default';
                container.appendChild(div);
            });
        }
    },

    showResult() {
        const total = this.allQuestions.length;
        let correctCount = this.userAnswers.filter(a => a && a.correct === true).length;
        const wrongCount = total - correctCount;
        const wrongList = [];
        for (let i = 0; i < this.allQuestions.length; i++) {
            if (!this.userAnswers[i] || !this.userAnswers[i].correct) {
                wrongList.push(this.allQuestions[i]);
            }
        }
        const hasWrong = wrongList.length > 0;
        document.getElementById('root').innerHTML = `
            <div class="top-bar"><button id="resultBackHome" class="back-btn">← 返回首页</button><span class="module-title">📊 练习结果</span></div>
            <div class="quiz-result">
                <div style="font-size:2rem;margin-bottom:10px;">${correctCount} / ${total}</div>
                <div style="font-size:1rem;">正确率 ${Math.round((correctCount/total)*100)}%</div>
                ${hasWrong ? `<button id="retryWrongBtn" class="retry-wrong-btn">🔁 重做错题 (${wrongList.length}题)</button>` : ''}
                <button id="changeTypeBtn" class="nav-btn" style="margin-top:10px;">🎯 切换练习类型</button>
            </div>
        `;
        document.getElementById('resultBackHome').onclick = () => GuideModule.render();
        if (hasWrong) {
            document.getElementById('retryWrongBtn').onclick = () => {
                this.startNewPractice(this.currentType, wrongList);
            };
        }
        document.getElementById('changeTypeBtn').onclick = () => this.showTypeSelect();
    }
};
