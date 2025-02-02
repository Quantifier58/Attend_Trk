const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const PORT = 3002;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(cors());
app.use(express.json());

app.post('/attendance', upload.single('photo'), async (req, res) => {
  try {
    const { date } = req.body;
    const photoBuffer = req.file.buffer;

    const photoPath = path.join(__dirname, '../../../public/photos', `${date}.jpg`);
    await fs.writeFile(photoPath, photoBuffer);

    // Run the Python script
    const pythonScriptPath = 'facereg\src\test\test.py'; // Update with the actual path
    const pythonProcess = spawn('python', [pythonScriptPath, photoPath]);

    pythonProcess.on('close', (code) => {
      console.log(`Python script exited with code ${code}`);
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
