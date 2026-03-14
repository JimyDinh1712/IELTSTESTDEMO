const allPassages = [passage1Data, passage2Data, passage3Data];
let userAnswers = {};
let flaggedQuestions = {};
let currentIdx = 0;

// Khởi tạo khi trang web load xong
document.addEventListener('DOMContentLoaded', () => {
    init();
});

function init() {
    loadPassage(0);
    renderFooter();
    startTimer();
}

const questionRanges = [
    { start: 1, end: 13 },
    { start: 14, end: 26 },
    { start: 27, end: 40 }
];
function loadPassage(index) {
    currentIdx = index;
    const data = allPassages[index];
    const range = questionRanges[index];

    document.getElementById('passage-title').innerText = data.title;
    document.getElementById('passage-text').innerHTML = data.content;
    document.getElementById('current-part-label').innerText = `Part ${index + 1}`;
    document.getElementById('q-range').innerText = `${range.start} - ${range.end}`;
    
    const container = document.getElementById('questions-container');
    container.innerHTML = '';
    
    data.questions.forEach(q => {
        const div = document.createElement('div');
        
        // 1. Xử lý phần hướng dẫn (Instruction)
        if (q.type === 'instruction') {
            div.className = 'instruction-wrapper';
            div.innerHTML = q.text;
            container.appendChild(div);
            return;
        }

        // 2. Xử lý nhãn mốc thời gian (Label)
        if (q.label) {
            const labelDiv = document.createElement('div');
            labelDiv.className = 'time-label';
            labelDiv.style = "margin-top: 15px; font-weight: bold;";
            labelDiv.innerHTML = q.label;
            container.appendChild(labelDiv);
        }

        // 3. Xử lý câu hỏi
        div.className = `q-item ${userAnswers[q.id] ? 'selected' : ''} ${q.sub ? 'sub-question' : ''}`;
        
        let html = '';
        if (q.type === 'multiple-choice') {
            html += `<p><strong>${q.id}</strong> ${q.text}</p>`;
            q.options.forEach(opt => {
                const isSelected = userAnswers[q.id] === opt;
                html += `
                    <label class="option-wrapper ${isSelected ? 'active' : ''}">
                        <input type="radio" name="q${q.id}" onchange="save(${q.id}, '${opt}')" ${isSelected ? 'checked' : ''}>
                        <span>${opt}</span>
                    </label>`;
            });
        } else if (q.type === 'text') {
            const val = userAnswers[q.id] || '';
            // Regex này sẽ thay thế cụm "(số) _____" thành ô input
            const formattedText = q.text.replace(/\(\d+\) ____________/, `<strong>${q.id}</strong> <input type="text" class="input-inline" value="${val}" oninput="save(${q.id}, this.value)">`);
            html += `<p>${formattedText}</p>`;
        }

        div.innerHTML = html;
        container.appendChild(div);
    });
}
function save(id, val) {
    userAnswers[id] = val;
    renderFooter();
}

document.getElementById('review-checkbox').addEventListener('change', (e) => {
    const firstQId = allPassages[currentIdx].questions[0].id;
    flaggedQuestions[firstQId] = e.target.checked;
    renderFooter();
});

function renderFooter() {
    const parts = [1, 2, 3];
    
    parts.forEach((p, i) => {
        const nav = document.getElementById(`nav-part-${p}`);
        if (!nav) return;
        nav.innerHTML = '';
        
        const start = questionRanges[i].start;
        const end = questionRanges[i].end;

        for (let q = start; q <= end; q++) {
            const dot = document.createElement('div');
            // Thêm class 'active' nếu là part hiện tại để highlight số câu hỏi
            const isCurrentPart = (currentIdx === i);
            dot.className = `dot ${userAnswers[q] ? 'answered' : ''} ${flaggedQuestions[q] ? 'flagged' : ''}`;
            dot.innerText = q;
            dot.onclick = () => loadPassage(i);
            nav.appendChild(dot);
        }
    });
}

// --- LOGIC HIGHLIGHT CHUẨN ---
const menu = document.getElementById('highlight-menu');

// Bắt sự kiện chuột phải trên toàn bộ vùng làm bài
document.addEventListener('contextmenu', (e) => {
    const selection = window.getSelection().toString();
    // Kiểm tra nếu click chuột phải vào vùng bài đọc hoặc câu hỏi và có bôi đen
    if (selection.trim() !== "" && (e.target.closest('#reading-pane') || e.target.closest('#question-pane'))) {
        e.preventDefault();
        menu.style.display = 'block';
        menu.style.left = e.pageX + 'px';
        menu.style.top = e.pageY + 'px';
    } else {
        menu.style.display = 'none';
    }
});

// Ẩn menu khi click chuột trái ra ngoài
document.addEventListener('click', () => {
    menu.style.display = 'none';
});

function applyHighlight() {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const span = document.createElement('span');
        span.className = 'highlight';
        try {
            span.appendChild(range.extractContents());
            range.insertNode(span);
        } catch (error) {
            console.error("Không thể highlight vùng này:", error);
        }
    }
    selection.removeAllRanges();
}

function clearHighlight() {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
        let container = selection.anchorNode.parentElement;
        // Tìm thẻ span.highlight gần nhất
        if (container.classList.contains('highlight')) {
            const parent = container.parentNode;
            while (container.firstChild) {
                parent.insertBefore(container.firstChild, container);
            }
            parent.removeChild(container);
        } else {
            // Nếu không chọn trúng nhãn highlight, reload lại passage để xóa sạch
            loadPassage(currentIdx);
        }
    }
}

// 1. Chặn menu chuột phải mặc định trên toàn trang
document.addEventListener('contextmenu', (e) => {
    // Chỉ cho phép menu highlight hiện ra ở vùng chỉ định
    if (e.target.closest('#reading-pane') || e.target.closest('#question-pane')) {
        const selection = window.getSelection().toString();
        if (selection.trim() !== "") {
            e.preventDefault(); // Chặn menu gốc của trình duyệt
            showHighlightMenu(e.pageX, e.pageY);
        } else {
            e.preventDefault(); // Vẫn chặn chuột phải kể cả khi không bôi đen
        }
    } else {
        e.preventDefault();
    }
}, false);

// 2. Chặn các phím tắt Copy, Cut, Paste, Print Screen, và Inspect (F12)
document.addEventListener('keydown', (e) => {
    // Chặn Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+U (xem code), Ctrl+P (in)
    if (e.ctrlKey && (e.key === 'c' || e.key === 'v' || e.key === 'x' || e.key === 'u' || e.key === 'p')) {
        e.preventDefault();
        return false;
    }
    // Chặn F12
    if (e.key === 'F12') {
        e.preventDefault();
        return false;
    }
});

// 3. Chặn sự kiện copy/cut trực tiếp
document.addEventListener('copy', (e) => {
    e.preventDefault();
    return false;
});

document.addEventListener('cut', (e) => {
    e.preventDefault();
    return false;
});

// 4. Hàm hiển thị menu highlight tự chế
function showHighlightMenu(x, y) {
    const menu = document.getElementById('highlight-menu');
    menu.style.display = 'block';
    menu.style.left = x + 'px';
    menu.style.top = y + 'px';
}
const correctAnswers = {
    1: "potatoes", 2: "butter", 3: "meat", 4: "crystals", 5: "cellophane", 6: "tin", 7: "refrigerator",
    8: "TRUE", 9: "FALSE", 10: "TRUE", 11: "FALSE", 12: "NOT GIVEN", 13: "TRUE", // Lưu ý sửa lại đúng theo data thực tế của bạn
    14: "v", 15: "ii", 16: "iv", 17: "vii", 18: "iii", 19: "vi",
    // Cặp câu hỏi chọn 2 (Thứ tự không quan trọng)
    20: ["C", "E"], 21: ["C", "E"],
    22: ["B", "D"], 23: ["B", "D"],
    24: "tentacles", 25: "protection", 26: "colour",
    27: "A", 28: "C", 29: "B", 30: "A", 31: "B", 32: "A", 33: "C",
    34: "C", 35: "B", 36: "D", 37: "B", 38: "C", 39: "B", 40: "C"
};
function submitTest() {
    const confirmSubmit = confirm("Bạn có chắc chắn muốn nộp bài? Hệ thống sẽ chấm điểm ngay lập tức.");
    
    if (confirmSubmit) {
        let score = 0;
        const totalQuestions = 40;

        for (let i = 1; i <= totalQuestions; i++) {
            let userAns = userAnswers[i] ? userAnswers[i].trim().toLowerCase() : "";
            
            // Xử lý các câu hỏi chọn 2 đáp án (20, 21, 22, 23)
            if ([20, 21, 22, 23].includes(i)) {
                const groupAnswers = correctAnswers[i].map(a => a.toLowerCase());
                // Nếu đáp án của người dùng nằm trong tập đáp án đúng
                if (groupAnswers.includes(userAns)) {
                    // Kiểm tra xem người dùng có chọn trùng 1 đáp án cho cả 2 ô không
                    const otherId = (i % 2 === 0) ? i + 1 : i - 1;
                    const otherAns = userAnswers[otherId] ? userAnswers[otherId].trim().toLowerCase() : "";
                    
                    if (userAns !== otherAns) {
                        score++;
                    } else if (i === 20 || i === 22) { // Chỉ cộng điểm 1 lần nếu chọn trùng
                        score += 0; 
                    }
                }
            } 
            // Xử lý các câu điền từ và trắc nghiệm thông thường
            else {
                let correctAns = correctAnswers[i].toString().toLowerCase();
                if (userAns === correctAns) {
                    score++;
                }
            }
        }

        // Hiển thị kết quả
        showResultModal(score, totalQuestions);
    }
}

function showResultModal(score, total) {
    // Dừng timer (nếu bạn đã khai báo countdown toàn cục)
    if (typeof countdown !== 'undefined') clearInterval(countdown);

    // Tạo một thông báo đẹp mắt
    const resultDiv = document.createElement('div');
    resultDiv.style = `
        position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
        background: white; padding: 30px; border-radius: 15px;
        box-shadow: 0 0 20px rgba(0,0,0,0.5); z-index: 10000; text-align: center;
        min-width: 300px; font-family: Arial, sans-serif;
    `;
    
    resultDiv.innerHTML = `
        <h2 style="color: #d32f2f;">Test Completed!</h2>
        <p style="font-size: 1.2rem;">Your Score: <strong style="font-size: 2rem; color: #1976d2;">${score}/${total}</strong></p>
        <p>Estimated Band Score: <strong>${calculateBand(score)}</strong></p>
        <button onclick="location.reload()" style="margin-top: 20px; padding: 10px 20px; cursor: pointer; background: #404040; color: white; border: none; border-radius: 5px;">Try Again</button>
    `;

    document.body.appendChild(resultDiv);
    
    // Thêm lớp phủ nền tối
    const overlay = document.createElement('div');
    overlay.style = "position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); z-index: 9999;";
    document.body.appendChild(overlay);
}

// Hàm tính Band Score Reading Academic tham khảo
function calculateBand(score) {
    if (score >= 39) return "9.0";
    if (score >= 37) return "8.5";
    if (score >= 35) return "8.0";
    if (score >= 33) return "7.5";
    if (score >= 30) return "7.0";
    if (score >= 27) return "6.5";
    if (score >= 23) return "6.0";
    if (score >= 19) return "5.5";
    if (score >= 15) return "5.0";
    return "Below 5.0";
}

// --- TIMER MM:SS ---
function startTimer() {
    let seconds = 3600;
    const el = document.getElementById('timer');
    if (!el) return;

    const countdown = setInterval(() => {
        seconds--;
        if (seconds < 0) {
            clearInterval(countdown);
            el.innerText = "00:00 - Time's up!";
            return;
        }
        
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        el.innerText = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')} left`;
    }, 1000);
}
