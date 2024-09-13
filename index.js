require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

const { initializeDatabase } = require("./db/db.connection");
const { Books1 } = require("./models/books1.model");

app.use(cors(corsOptions));
app.use(express.json());

initializeDatabase();

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.get("/books1", async (req, res) => {
  try {
    const allbooks = await Books1.find();
    res.json(allbooks);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/books1", async (req, res) => {
  const { bookName, author, genre } = req.body;

  try {
    const bookData = new Books1({ bookName, author, genre });
    await bookData.save();
    res.status(201).json(bookData);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/books1/:id", async (req, res) => {
  const bookId = req.params.id;

  try {
    const deletedBook = await Books1.findByIdAndRemove(bookId);

    if (!deletedBook) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json({
      message: "Book deleted successfully",
      book: deletedBook,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// to update a book detail
app.put("/books1/:id", async (req, res) => {
  const bookId = req.params.id;
  const updatedBookData = req.body;

  try {
    const updatedBook = await Books1.findByIdAndUpdate(
      bookId,
      updatedBookData,
      { new: true }
    );
    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(updatedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
