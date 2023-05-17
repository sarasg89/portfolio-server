const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(express.static('public'));

const emailjs = require('@emailjs/nodejs');
require('dotenv').config({ path:__dirname+'/.env' });

app.post("/api/contact-form", (req, res) => {
    emailjs.send(process.env.SERVICE_ID, process.env.TEMPLATE_ID, req.body, { publicKey: process.env.PUBLIC_KEY, privateKey: process.env.PRIVATE_KEY })
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    res.json({ message: "Message SENT!" });
});

app.get('/api/resume', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/resume.pdf'))
);

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
