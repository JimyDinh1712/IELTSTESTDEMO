// data/answers.js
// Lưu ý: File này chứa đáp án đúng để đối chiếu với userAnswers

const correctAnswers = {
    // PART 1
    1: "no",
    2: "weather",
    3: "Town Hall",
    4: "variety",
    5: "plane",
    6: "older than 40",
    7: "mid-range",
    8: "tourism",
    9: "computer programmer",
    10: "good value",

    // PART 2: Map & Matching (Chữ cái)
    11: "B",
    12: "A",
    13: "E",
    14: "C",
    15: "D",
    16: "E",
    17: "G",
    18: "C",
    19: "D",
    20: "A",

    // PART 3
    21: "C",
    22: "B",
    23: "A",
    24: "interview",
    25: "format",
    26: "copies",
    27: "May 11th",
    28: "change",
    29: "note",
    30: "procedure",

    // PART 4
    31: "distance",
    32: "sound",
    33: "smell",
    34: "flexibility",
    35: "reaction",
    36: "native languages",
    37: "newspapers",
    38: "environment",
    39: "swimming pool",
    40: "national park"
};

// Hàm hỗ trợ kiểm tra đáp án (sẽ được gọi từ script.js)
// Giúp chấp nhận cả đáp án có (s) hoặc có từ trong ngoặc
function checkAnswer(questionId, userValue) {
    if (!userValue) return false;
    
    let userAns = userValue.toLowerCase().trim();
    let correctAns = correctAnswers[questionId].toLowerCase().trim();

    // Logic xử lý trường hợp đáp án có dấu ngoặc hoặc nhiều lựa chọn
    // Ví dụ: "newspaper" và "newspapers" đều đúng
    if (userAns === correctAns) return true;
    
    // Xử lý một số trường hợp đặc biệt cho bài nghe
    if (questionId == 30 && userAns === "procedures") return true;
    if (questionId == 37 && userAns === "newspaper") return true;
    if (questionId == 2 && userAns === "amazing weather") return true;
    if (questionId == 34 && userAns === "the flexibility") return true;

    return false;
}