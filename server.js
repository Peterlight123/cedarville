const express = require('express');
const path = require('path');
const app = express();
const PORT = 5000;

app.use(express.static(path.join(__dirname)));

// Serve all static HTML pages
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/about', (req, res) => res.sendFile(path.join(__dirname, 'about.html')));
app.get('/admissions', (req, res) => res.sendFile(path.join(__dirname, 'admissions.html')));
app.get('/academics', (req, res) => res.sendFile(path.join(__dirname, 'academics.html')));
app.get('/gallery', (req, res) => res.sendFile(path.join(__dirname, 'gallery.html')));
app.get('/blog', (req, res) => res.sendFile(path.join(__dirname, 'blog.html')));
app.get('/contact', (req, res) => res.sendFile(path.join(__dirname, 'contact.html')));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Cedarville Schools website running on http://0.0.0.0:${PORT}`);
});
