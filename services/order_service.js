const basicErrorHandler = require("../helpers/basicErrorHandler");
const getBodyData = require("../helpers/getBodyData");

const pool = require("../config/database/connect");

async function getAllOrders(req, res) {
  try {
    const results = await new Promise((resolve, reject) => {
      pool.query("SELECT * FROM orders", (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    const resp = {
      status: 200,
      data: results,
      message: "Orders fetched",
    };
    res.end(JSON.stringify(resp));
  } catch (err) {
    basicErrorHandler(err, res);
  }
}

async function createOrder(req, res) {
  try {
    const data = await getBodyData(req);
    const { book_id, summa, address } = JSON.parse(data);
    const query = "INSERT INTO book(book_id,summa,address) VALUES(?,?,?)";
    const results = await new Promise((resolve, reject) => {
      pool.query(
        "INSERT INTO orders SET?",
        [book_id, summa, address],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    const resp = {
      status: 200,
      data: results,
      message: "Order created",
    };
    res.end(JSON.stringify(resp));
  } catch (err) {
    basicErrorHandler(err, res);
  }
}

async function getOrderById(req, res) {
  try {
    const id = req.url.split("/")[2];
    const results = await new Promise((resolve, reject) => {
      pool.query("SELECT * FROM orders WHERE id =?", id, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    const resp = {
      status: 200,
      data: results,
      message: "Order found",
    };
    res.end(JSON.stringify(resp));
  } catch (err) {
    basicErrorHandler(err, res);
  }
}

async function updateOrder(req, res) {
  try {
    const id = req.url.split("/")[2];
    const data = await getBodyData(req);
    const { book_id, summa, address } = JSON.parse(data);
    const values = [book_id, summa, address];
    const results = await new Promise((resolve, reject) => {
      pool.query(
        "UPDATE orders SET book_id=?,summa=?,address=? WHERE id =?",
        query,
        values,
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    const resp = {
      status: 200,
      data: results,
      message: "Order updated",
    };
    res.end(JSON.stringify(resp));
  } catch (err) {
    basicErrorHandler(err, res);
  }
}

async function deleteOrder(req, res) {
  try {
    const id = req.url.split("/")[2];

    const results = await new Promise((resolve, reject) => {
      pool.query("DELETE FROM orders WHERE id =?", query, id, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    const resp = {
      status: 200,
      data: results,
      message: "Order deleted",
    };
    res.end(JSON.stringify(resp));
  } catch (err) {
    basicErrorHandler(err, res);
  }
}

module.exports = {
  getAllOrders,
  createOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
};
