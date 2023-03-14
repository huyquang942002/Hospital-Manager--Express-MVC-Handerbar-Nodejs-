const fs = require('fs');

// Đọc tệp 1.json
const data1 = JSON.parse(fs.readFileSync('./models/lobby.json'));

// Lấy phần tử đầu tiên từ data1 và di chuyển nó sang data2
const data2 = JSON.parse(fs.readFileSync('./models/reception.json'));
data2.push(data1.shift());
fs.writeFileSync('./models/reception.json', JSON.stringify(data2));

// Ghi lại data1
fs.writeFileSync('./models/lobby.json', JSON.stringify(data1));
