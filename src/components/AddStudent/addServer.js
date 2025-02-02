const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs').promises;
const path = require('path');
const { spawn } = require('child_process');

const app = express();
const PORT = 3001;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(cors());
app.use(express.json());

app.post('/addStudent', upload.single('photo'), async (req, res) => {
  try {
    const { rollNo, name } = req.body;

    if (!rollNo || !name) {
      return res.status(400).json({ error: 'Roll No and Name are required' });
    }

    const csvData = `${rollNo},${name},0\n`;

    const filePath = path.join(__dirname, '../../../public/data.csv');
    await fs.appendFile(filePath, csvData);

    // Handle the photo
    if (req.file) {
      const photoBuffer = req.file.buffer;

      const photoPath = path.join(__dirname, '../../../public/photos', `${rollNo}.jpg`);
      await fs.writeFile(photoPath, photoBuffer);

      // Run the Python script
      const pythonScriptPath = 'E:/dsa pro/facereg/src/components/AddStudent/embedding.py';  // Replace with the actual path
      console.log(`path ${photoPath}`);
      const pythonProcess = spawn('python', [pythonScriptPath, photoPath]);

      pythonProcess.on('close', (code) => {
        console.log(`Python script exited with code ${code}`);
      });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
