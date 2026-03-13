// --- BIẾN TOÀN CỤC ---
let userAnswers = {};
let currentIdx = 0;

const questionRanges = [
    { start: 1, end: 10 },
    { start: 11, end: 20 },
    { start: 21, end: 30 },
    { start: 31, end: 40 }
];

// --- KHỞI TẠO ---
document.addEventListener('DOMContentLoaded', () => {
    init();
});

function init() {
    const audio = document.getElementById('main-audio');
    if (audio) {
        document.addEventListener('click', () => {
            audio.play().catch(err => console.log("Autoplay waiting..."));
        }, { once: true });
    }

    window.addEventListener('keydown', (e) => {
        if (e.code === 'Space') e.preventDefault();
    });

    setTimeout(() => {
        if (typeof passage1Data !== 'undefined') {
            loadPassage(0);
            startTimer();
        }
    }, 150);
}

// --- HÀM ĐIỀU KHIỂN CHÍNH ---
function loadPassage(index) {
    currentIdx = index;
    const allData = [
        typeof passage1Data !== 'undefined' ? passage1Data : null,
        typeof passage2Data !== 'undefined' ? passage2Data : null,
        typeof passage3Data !== 'undefined' ? passage3Data : null,
        typeof passage4Data !== 'undefined' ? passage4Data : null
    ];

    const data = allData[index];
    if (!data) return;

    // Cập nhật Banner (Phần phía trên container)
    document.getElementById('current-part-label').innerText = data.section || `Part ${index + 1}`;
    document.getElementById('q-range').innerText = `${questionRanges[index].start} - ${questionRanges[index].end}`;
    
    const container = document.getElementById('questions-container');
    container.innerHTML = ''; // Xóa sạch nội dung cũ

    // Điều hướng render theo từng Part
    if (index === 1) {
        renderPart2Custom(container, data);
    } else if (index === 3) {
        renderPart4(container, data); // Render riêng cho Note Completion
    } else {
        renderQuestionsDefault(container, data, index);
    }

    renderFooter();
    window.scrollTo(0, 0);
}

// --- RENDER MẶC ĐỊNH (Sửa lỗi hiển thị sai thông tin Part 1) ---
function renderQuestionsDefault(container, data, index) {
    const wrapper = document.createElement('div');
    wrapper.className = "s-wrapper";

    // Lấy đúng số câu hỏi dựa trên index
    const range = questionRanges[index];

    wrapper.innerHTML = `
        <h3 class="section-title">${data.section}</h3>
        <p class="q-range-text">Questions ${range.start} - ${range.end}</p>
        <div class="instruction-box">
            ${data.instruction}
        </div>
        <h2 class="form-main-title">${data.title || ''}</h2>
    `;

    const formContainer = document.createElement('div');
    formContainer.className = "form-container";

    data.questions.forEach(q => {
        const row = document.createElement('div');
        row.className = "s1-form-row";
        const val = userAnswers[q.id] || '';
        
        row.innerHTML = `
            <label class="s1-label"><strong>${q.id}</strong> ${q.text}</label>
            <input type="text" class="s1-input" value="${val}" 
                   oninput="save(${q.id}, this.value)">
        `;
        formContainer.appendChild(row);
    });

    wrapper.appendChild(formContainer);
    container.appendChild(wrapper);
}

// --- RENDER RIÊNG CHO PART 4 (NOTE COMPLETION) ---
function renderPart4(container, data) {
    const wrapper = document.createElement('div');
    wrapper.className = "p4-layout";

    let html = `
        <h3 class="section-title">${data.section}</h3>
        <p class="q-range-text">Questions 31 - 40</p>
        <div class="instruction-box">${data.instruction}</div>
        
        <div class="note-paper">
            <h2 class="note-main-title">${data.title}</h2>
    `;

    data.groups.forEach(group => {
        html += `<h4 class="note-sub-heading">${group.heading}</h4>`;
        html += `<ul class="note-list">`;
        
        group.questions.forEach(q => {
            const val = userAnswers[q.id] || '';
            // Thay thế gạch dưới bằng ô input
            const inputHtml = `<input type="text" class="note-input" 
                                value="${val}" 
                                oninput="save(${q.id}, this.value)">`;
            const processedText = q.text.replace(/__________/g, `<strong>${q.id}</strong> ${inputHtml}`);
            
            html += `<li class="note-item">${processedText}</li>`;
        });
        
        html += `</ul>`;
    });

    html += `</div>`;
    wrapper.innerHTML = html;
    container.appendChild(wrapper);
}
// --- RENDER PART 2 (MAP & MATCHING) ---
function renderPart2Custom(container, data) {
    const wrapper = document.createElement('div');
    wrapper.className = "p2-wrapper";

    const mapLayout = document.createElement('div');
    mapLayout.className = "map-layout-container";

    const qSide = document.createElement('div');
    qSide.className = "map-questions-side";
    qSide.innerHTML = `
        <h3 class="section-title">Questions 11-15</h3>
        <p class="ins">${data.instruction}</p>
    `;
    
    data.questions.slice(0, 5).forEach(q => {
        const row = document.createElement('div');
        row.className = "select-row-item";
        row.innerHTML = `
            <span><strong>${q.id}</strong> ${q.text}</span>
            <select class="ielts-select-box" onchange="save(${q.id}, this.value)">
                <option value="">Select...</option>
                ${['A','B','C','D','E','F','G'].map(letter => 
                    `<option value="${letter}" ${userAnswers[q.id] === letter ? 'selected' : ''}>${letter}</option>`
                ).join('')}
            </select>
        `;
        qSide.appendChild(row);
    });

    const imgSide = document.createElement('div');
    imgSide.className = "map-image-side";
    imgSide.innerHTML = `<img src="${data.image}" class="map-img-fluid">`;

    mapLayout.appendChild(qSide); 
    mapLayout.appendChild(imgSide); 
    wrapper.appendChild(mapLayout);

    const sectionBottom = document.createElement('div');
    sectionBottom.style.marginTop = "50px";
    sectionBottom.innerHTML = `
        <h3 class="section-title">Questions 16-20</h3>
        <p class="ins">Move the correct option into the box.</p>
    `;

    const dndFlex = document.createElement('div');
    dndFlex.className = "dnd-flex";

    const dndQCol = document.createElement('div');
    dndQCol.className = "dnd-q-col";
    data.questions.slice(5, 10).forEach(q => {
        const ans = userAnswers[q.id] || "";
        const row = document.createElement('div');
        row.className = "dnd-row";
        row.innerHTML = `
            <span class="q-text"><strong>${q.id}</strong> ${q.text}</span>
            <div class="drop-target" ondrop="dropHandler(event, ${q.id})" ondragover="allowDrop(event)" onclick="removeAns(${q.id})">
                ${ans ? `<div class="placed-box">${ans}</div>` : `<span class="placeholder">${q.id}</span>`}
            </div>
        `;
        dndQCol.appendChild(row);
    });

    const optCol = document.createElement('div');
    optCol.className = "dnd-opt-sticky";
    optCol.innerHTML = `<div class="opt-header">Options</div>`;
    const options = data.options_Matching || data.options_A_G || [];
    options.forEach(opt => {
        const item = document.createElement('div');
        item.className = "drag-item";
        item.draggable = true;
        item.innerText = opt;
        item.ondragstart = (e) => e.dataTransfer.setData("text", opt.charAt(0));
        optCol.appendChild(item);
    });

    dndFlex.appendChild(dndQCol);
    dndFlex.appendChild(optCol);
    sectionBottom.appendChild(dndFlex);
    wrapper.appendChild(sectionBottom);
    container.appendChild(wrapper);
}

// --- HÀM XỬ LÝ DỮ LIỆU ---
function save(id, val) {
    if (val === "" || val === null) delete userAnswers[id];
    else userAnswers[id] = val;
    renderFooter();
}

function allowDrop(e) { e.preventDefault(); }

function dropHandler(e, qId) {
    e.preventDefault();
    const data = e.dataTransfer.getData("text");
    save(qId, data);
    loadPassage(currentIdx); 
}

function removeAns(qId) {
    save(qId, "");
    loadPassage(currentIdx);
}

function renderFooter() {
    questionRanges.forEach((range, i) => {
        const nav = document.getElementById(`nav-part-${i + 1}`);
        if (!nav) return;
        nav.innerHTML = '';
        for (let q = range.start; q <= range.end; q++) {
            const dot = document.createElement('div');
            // Cập nhật logic highlight câu đang chọn
            const isCurrentPart = (q >= questionRanges[currentIdx].start && q <= questionRanges[currentIdx].end);
            dot.className = `dot ${userAnswers[q] ? 'answered' : ''} ${isCurrentPart ? 'active' : ''}`;
            dot.innerText = q;
            dot.onclick = () => loadPassage(i);
            nav.appendChild(dot);
        }
    });
}
// --- CHỨC NĂNG HIGHLIGHT TỰ ĐỘNG ---

// --- LOGIC HIGHLIGHT CHUYÊN NGHIỆP ---

const highlightMenu = document.getElementById('highlight-menu');

document.addEventListener('mouseup', function(e) {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();

    // 1. Nếu có bôi đen văn bản trong vùng cho phép
    if (selectedText.length > 0) {
        const range = selection.getRangeAt(0);
        const container = document.getElementById('questions-container');

        if (container.contains(range.commonAncestorContainer)) {
            // Hiển thị menu tại vị trí chuột
            highlightMenu.style.display = 'block';
            highlightMenu.style.left = e.pageX + 'px';
            highlightMenu.style.top = (e.pageY - 40) + 'px'; // Hiện phía trên con trỏ một chút
        }
    } else {
        // 2. Nếu click ra ngoài mà không bôi đen, ẩn menu
        if (!highlightMenu.contains(e.target)) {
            highlightMenu.style.display = 'none';
        }
    }
});

// Hàm thực hiện Highlight
function handleHighlight() {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const span = document.createElement('span');
    span.className = 'highlight-text'; // Class này định nghĩa trong CSS
    
    try {
        range.surroundContents(span);
    } catch (e) {
        console.log("Không thể highlight vùng chọn phức tạp");
    }

    selection.removeAllRanges();
    highlightMenu.style.display = 'none'; // Ẩn menu sau khi chọn
}

// Hàm thực hiện Clear Highlight
function handleClear() {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const parent = range.commonAncestorContainer.parentElement;

    // Nếu vùng bôi đen nằm trong một thẻ đã được highlight
    if (parent && parent.classList.contains('highlight-text')) {
        const text = parent.innerText;
        parent.replaceWith(text);
    }
    
    selection.removeAllRanges();
    highlightMenu.style.display = 'none'; // Ẩn menu sau khi chọn
}
function startTimer() {
    let seconds = 1800;
    const el = document.getElementById('timer');
    if (!el) return;
    const countdown = setInterval(() => {
        seconds--;
        if (seconds < 0) { clearInterval(countdown); alert("Time is up!"); return; }
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        el.innerText = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')} left`;
    }, 1000);
}


// --- XỬ LÝ KẾT THÚC BÀI THI ---
function submitTest() {
    // 1. Xác nhận với người dùng
    const confirmSubmit = confirm("Do you want to finish the test and see your results?");
    if (!confirmSubmit) return;

    // 2. Dừng nhạc (nếu đang phát)
    const audio = document.getElementById('main-audio');
    if (audio) audio.pause();

    // 3. Tính điểm
    let score = 0;
    const totalQuestions = 40;
    let resultDetails = "";

    // Giả định biến correctAnswers được định nghĩa trong file answers.js
    if (typeof correctAnswers === 'undefined') {
        alert("Error: Correct answers data not found!");
        return;
    }

    for (let i = 1; i <= totalQuestions; i++) {
        const userAns = (userAnswers[i] || "").toString().trim().toUpperCase();
        const correctAns = (correctAnswers[i] || "").toString().trim().toUpperCase();

        if (userAns === correctAns && correctAns !== "") {
            score++;
        }
    }

    // 4. Hiển thị kết quả (Bạn có thể tạo một Modal hoặc dùng alert đơn giản)
    const bandScore = calculateIELTSBand(score);
    
    const message = `
        TEST COMPLETED!
        -----------------------
        Your Score: ${score} / ${totalQuestions}
        Estimated Band Score: ${bandScore}
        
        Click OK to review the test.
    `;
    
    alert(message);
    
    // 5. Chuyển sang chế độ Review (Khóa không cho sửa bài)
    disableInputs();
}

// Hàm tính Band Score ước lượng (Listening)
function calculateIELTSBand(score) {
    if (score >= 39) return "9.0";
    if (score >= 37) return "8.5";
    if (score >= 35) return "8.0";
    if (score >= 32) return "7.5";
    if (score >= 30) return "7.0";
    if (score >= 26) return "6.5";
    if (score >= 23) return "6.0";
    if (score >= 18) return "5.5";
    if (score >= 13) return "5.0";
    return "Below 5.0";
}

// Khóa toàn bộ các ô nhập liệu sau khi nộp bài
function disableInputs() {
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(el => {
        el.disabled = true;
        el.style.backgroundColor = "#f0f0f0";
    });
    document.getElementById('submit-btn').style.display = 'none';
}