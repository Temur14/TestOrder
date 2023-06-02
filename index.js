const http = require("http");
const {
  getAllBook,
  createBook,
  getBookById,
  updateBook,
  deleteBook,
} = require("./services/books_service");
const {
  getAllOrders,
  createOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
} = require("./services/order_service");

const server = http.createServer(async (req, res) => {
  if (req.url === "/books" && req.method === "GET") {
    getAllBook(req, res);
  } else if (req.url === "/books" && req.method === "POST") {
    createBook(req, res);
  } else if (req.url.match(/\/books\/\w+/) && req.method === "GET") {
    getBookById(req, res);
  } else if (req.url.match(/\/books\/\w+/) && req.method === "DELETE") {
    deleteBook(req, res);
  } else if (req.url.match(/\/books\/\w+/) && req.method === "PUT") {
    updateBook(req, res);
  } else if (req.url == "/orders" && req.method === "GET") {
    getAllOrders(req, res);
  } else if (req.url == "/orders" && req.method === "POST") {
    createOrder(req, res);
  } else if (req.url.match(/\/orders\/\w+/) && req.method === "GET") {
    getOrderById(req, res);
  } else if (req.url.match(/\/orders\/\w+/) && req.method === "PUT") {
    updateOrder(req, res);
  } else if (req.url.match(/\/orders\/\w+/) && req.method === "DELETE") {
    deleteOrder(req, res);
  } else {
    res.writeHead(404, {
      "Content-type": "application/json charset utf-8",
    });
    const resp = {
      status: 404,
      message: "Endpoint or method not found",
    };
    res.end(JSON.stringify(resp));
  }
});

server.listen(3001, () => {
  console.log("Server is running at 3001");
});
