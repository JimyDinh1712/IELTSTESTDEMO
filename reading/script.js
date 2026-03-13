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
    const range = questionRanges[index]; // Lấy phạm vi tương ứng với part

    // 1. Cập nhật tiêu đề bài đọc và nội dung
    document.getElementById('passage-title').innerText = data.title;
    document.getElementById('passage-text').innerHTML = data.content;

    // 2. Cập nhật Banner: Part X và Questions X - Y
    document.getElementById('current-part-label').innerText = `Part ${index + 1}`;
    document.getElementById('q-range').innerText = `${range.start} - ${range.end}`;
    
    // 3. Cập nhật câu hỏi bên phải
    const container = document.getElementById('questions-container');
    container.innerHTML = '';
    
    data.questions.forEach(q => {
        const div = document.createElement('div');
        div.className = `q-item ${userAnswers[q.id] ? 'selected' : ''}`;
        
        let html = `<p><strong>${q.id}</strong> ${q.text}</p>`;
        
        if (q.type === 'multiple-choice') {
            q.options.forEach(opt => {
                const isSelected = userAnswers[q.id] === opt;
                const checked = isSelected ? 'checked' : '';
                // Thêm class option-wrapper đã tạo ở bước trước
                html += `
                    <label class="option-wrapper ${isSelected ? 'active' : ''}">
                        <input type="radio" name="q${q.id}" 
                               onchange="save(${q.id}, '${opt}')" ${checked}>
                        <span>${opt}</span>
                    </label>`;
            });
        } else {
            const val = userAnswers[q.id] || '';
            html += `<input type="text" class="input-text" value="${val}" oninput="save(${q.id}, this.value)">`;
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

function submitTest() {
    // Xác nhận với người dùng
    const confirmSubmit = confirm("Bạn có chắc chắn muốn nộp bài? Bạn sẽ không thể sửa đáp án sau khi nộp.");
    
    if (confirmSubmit) {
        // Dừng timer
        // clearInterval(countdown); // Bạn cần biến countdown là biến toàn cục
        
        // Tính điểm hoặc hiển thị thông báo
        alert("Bài làm của bạn đã được ghi nhận!");
        console.log("Đáp án của thí sinh:", userAnswers);
        
        // Có thể chuyển hướng sang trang kết quả
        // window.location.href = "results.html";
    }
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