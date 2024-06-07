const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

// ตั้งค่าเซิร์ฟเวอร์ Express.js

const connection = mysql.createConnection({
  host: '206.189.93.101',
  user: 'medidba',
  password: 'MeDiSeeSdba?',
  database: 'clinic_dev'
});

// const nextIdcodeSql = 'SELECT * FROM clinic_code WHERE idcode > ? AND idcode_category = 0 AND status_get_code = 0 ORDER BY idcode ASC LIMIT 1';
// connection.query(nextIdcodeSql, [0], (error, nextIdcodeResults, fields) => {
//   if (error) {
//     console.error('เกิดข้อผิดพลาดในการดึง idcode ถัดไป: ' + error.stack);
//     return;
//   }

//   if (nextIdcodeResults.length > 0) {
//     const nextIdcode = nextIdcodeResults[0].idcode;
//     const row = nextIdcodeResults[0];
//     console.log('code',row.code)

//     const updateNextIdcodeSql = 'UPDATE clinic_code SET status_get_code = 1 WHERE idcode = ?';
//     connection.query(updateNextIdcodeSql, [nextIdcode], (error, updateNextIdcodeResults, fields) => {
//       if (error) {
//         console.error('เกิดข้อผิดพลาดในการอัปเดต idcode ถัดไป: ' + error.stack);
//         return;
//       }
//       console.log('อัปเดตสถานะสำเร็จสำหรับ idcode ถัดไป:', nextIdcode);
//     });
//   } else {
//     console.log('ไม่พบ idcode ถัดไปที่เป็นไปตามเงื่อนไข');
//   }

//   connection.end();
// });

app.get('/api/fetchNextCode', (req, res) => {
    const nextIdcodeSql = 'SELECT * FROM clinic_code WHERE idcode > ? AND idcode_category = 0 AND status_get_code = 0 ORDER BY idcode ASC LIMIT 1';
    connection.query(nextIdcodeSql, [0], (error, nextIdcodeResults, fields) => {
        if (error) {
            console.error('เกิดข้อผิดพลาดในการดึง idcode ถัดไป: ' + error.stack);
            res.status(500).json({ error: 'Error fetching next code' });
            return;
        }

        if (nextIdcodeResults.length > 0) {
            const nextIdcode = nextIdcodeResults[0].idcode;
            const row = nextIdcodeResults[0];
            console.log('code', row.code);

            const updateNextIdcodeSql = 'UPDATE clinic_code SET status_get_code = 1 WHERE idcode = ?';
            connection.query(updateNextIdcodeSql, [nextIdcode], (error, updateNextIdcodeResults, fields) => {
                if (error) {
                    console.error('เกิดข้อผิดพลาดในการอัปเดต idcode ถัดไป: ' + error.stack);
                    res.status(500).json({ error: 'Error updating next idcode' });
                    return;
                }
                console.log('อัปเดตสถานะสำเร็จสำหรับ idcode ถัดไป:', nextIdcode);
                res.json({ code: row.code });
            });
        } else {
            console.log('ไม่พบ idcode ถัดไปที่เป็นไปตามเงื่อนไข');
            res.json({ code: null });
        }
    });
});

//เริ่มเซิร์ฟเวอร์
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
