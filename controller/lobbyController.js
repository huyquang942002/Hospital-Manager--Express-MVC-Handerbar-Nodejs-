const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

// Sử dụng body-parser để xử lý dữ liệu từ form
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Router cho form đăng ký bệnh nhân
router.post('/', (req, res) => {
  // Lấy dữ liệu từ form
  const name = req.body.name;
  const age = req.body.age;
  const sick = req.body.sick;

  // Lưu thông tin bệnh nhân vào file JSON
  // ví dụ:
  const fs = require('fs');
  const data = {
    name: name,
    age: age,
    sick: sick
  };
  fs.appendFileSync('patients.json', JSON.stringify(data));

  // Phản hồi với thông báo đăng ký thành công
  res.send('Đăng ký bệnh nhân thành công');
});

// Export router để sử dụng trong file app.js
module.exports = router;
