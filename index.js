import express from "express";
import bodyParser from "body-parser";
import multer from "multer";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const content = [];
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'public/uploads')); // Save files to public/uploads directory
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

const ITEMS_PER_PAGE = 9; // Number of items to display per page

app.get("/", (req, res) => {
  res.render("index", { searchQuery: "", subject: "", apiKey: process.env.TINYMCE_API_KEY });
});

app.get("/faq", (req, res) => {
  res.render("index", { searchQuery: "", subject: "faq", apiKey: process.env.TINYMCE_API_KEY });
});

app.get("/careers", (req, res) => {
  res.render("index", { searchQuery: "", subject: "careers", apiKey: process.env.TINYMCE_API_KEY });
});

app.get("/research", (req, res) => {
  res.render("index", { searchQuery: "", subject: "research", apiKey: process.env.TINYMCE_API_KEY });
});

app.get("/events", (req, res) => {
  res.render("index", { searchQuery: "", subject: "events", apiKey: process.env.TINYMCE_API_KEY });
});

app.get("/swe", (req, res) => {
  res.render("index", { searchQuery: "", subject: "swe", apiKey: process.env.TINYMCE_API_KEY });
});

app.get("/mlai", (req, res) => {
  res.render("index", { searchQuery: "", subject: "mlai", apiKey: process.env.TINYMCE_API_KEY });
});

app.get("/vrar", (req, res) => {
  res.render("index", { searchQuery: "", subject: "vrar", apiKey: process.env.TINYMCE_API_KEY });
});

app.get("/cybersec", (req, res) => {
  res.render("index", { searchQuery: "", subject: "cybersec", apiKey: process.env.TINYMCE_API_KEY });
});

app.get("/post", (req, res) => {
  res.render("post", { searchQuery: "", subject: "", apiKey: process.env.TINYMCE_API_KEY });
});

app.get("/explore", (req, res) => {
  const subject = req.query.subject || "";
  const searchQuery = req.query.search || "";
  const page = parseInt(req.query.page) || 1;

  let filteredContent = content;

  if (subject) {
    filteredContent = filteredContent.filter(item => item.subject === subject);
  }

  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredContent = filteredContent.filter(item =>
      item.title.toLowerCase().includes(query) || item.name.toLowerCase().includes(query)
    );
  }

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = page * ITEMS_PER_PAGE;
  const paginatedContent = filteredContent.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredContent.length / ITEMS_PER_PAGE);

  res.render("explore", { content: paginatedContent, page, totalPages, errorMessage: "", subject, searchQuery, apiKey: process.env.TINYMCE_API_KEY });
});

app.get("/edit/:id", (req, res) => {
  const card = content.find(item => item.id == req.params.id);
  if (card) {
    res.render("edit", { card, errorMessage: "", searchQuery: "", subject: "", apiKey: process.env.TINYMCE_API_KEY });
  } else {
    res.status(404).send("Card not found");
  }
});

app.post("/edit/:id", upload.single('image'), (req, res) => {
  const cardIndex = content.findIndex(item => item.id == req.params.id);
  if (cardIndex !== -1) {
    const card = content[cardIndex];
    card.name = req.body.name;
    card.title = req.body.title;
    card.text = req.body.text;
    card.subject = req.body.subject;
    if (req.file) {
      card.image = `/uploads/${req.file.filename}`;
    }
    res.redirect(`/explore?page=1`);
  } else {
    res.status(404).send("Card not found");
  }
});

app.post("/delete/:id", (req, res) => {
  const cardIndex = content.findIndex(item => item.id == req.params.id);
  if (cardIndex !== -1) {
    content.splice(cardIndex, 1);
    res.redirect(`/explore?page=1`);
  } else {
    res.status(404).send("Card not found");
  }
});

app.post("/verify-password/:id", (req, res) => {
  const card = content.find(item => item.id == req.params.id);
  const { password } = req.body;
  if (card && card.password === password) {
    res.json({ success: true, id: card.id });
  } else {
    res.json({ success: false });
  }
});

app.post("/explore", upload.single('image'), (req, res) => {
  const data = req.body;
  const randomNum = Math.floor(100000 + Math.random() * 900000);

  data.id = randomNum;
  data.image = `/uploads/${req.file.filename}`;

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  today = mm + '/' + dd + '/' + yyyy;
  data.date = today;
  content.push(data);
  console.log(data);

  res.redirect(`/explore?page=${Math.ceil(content.length / ITEMS_PER_PAGE)}`);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
