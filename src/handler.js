/** @format */

const { nanoid } = require("nanoid");
const books = require("./books");
//Kriteria 3 API dapat menyimpan buku (addBookHandler)
const addBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  if (name === undefined) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  } else if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  } else {
    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = pageCount === readPage;

    const newBook = {
      id,
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      insertedAt,
      updatedAt,
    };
    books.push(newBook);

    const isSuccess = books.filter((note) => note.id === id).length > 0;

    if (isSuccess) {
      const response = h.response({
        status: "success",
        message: "Buku berhasil ditambahkan",
        data: {
          noteId: id,
        },
      });
      response.code(201);
      return response;
    }
  }

  const response = h.response({
    status: "error",
    message: "catatan gagal ditambahkan",
  });
  response.code(500);
  return response;
};
//kriteria 4: API menampilkan seluruh buku
const getAllBooksHandler = (request, h) => {
  const { name, reading, finished } = request.query;

  if (name !== undefined) {
    const NameBooks = books.filter((book) =>
      book.name.toLowerCase().include(name.toLowerCase())
    );
    const response = h.response({
      status: "success",
      data: {
        books: NameBooks.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    });
    response.code(200);
    return response;
  } else if (reading !== undefined) {
    const ReadingBooks = books.filter(
      (book) => Number(book.reading) === Number(reading)
    );
    const response = h.response({
      status: "success",
      data: {
        books: ReadingBooks.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    });
    response.code(200);
    return response;
  } else if (finished !== undefined) {
    const finishedBooks = books.filter((book) => book.finished == finished);
    const response = h.response({
      status: "success",
      data: {
        books: finishedBooks.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    });
    response.code(200);
    return response;
  } else {
    const response = h.response({
      status: "success",
      data: {
        books: books.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    });
    response.code(200);
    return response;
  }
};
module.exports = {
  addBookHandler,
  getAllBooksHandler,
};
