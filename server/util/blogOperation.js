const { Deta } = require("deta");
const axios = require("axios");
const errorReporter = require("./errorReporter");

const deta = Deta(process.env.SPACE_DETA_PROJECT_KEY);
const db = deta.Base("Blogs");

// Fetch all blogs from the collection
async function getAllBlogs(cb) {
  let res = await db.fetch();
  let data = res.items;

  // Fetch all the data from the database when limit is reached
  while (res.last) {
    res = await db.fetch({}, { last: res.last });
    data = data.concat(res.items);
  }

  // Sort the data by createdAt property
  data.sort((a, b) => {
    return new Date(b.properties.createdAt) - new Date(a.properties.createdAt);
  });

  cb({ statusCode: 200, data });
}

// Fetch all blogs from the collection
async function getSpecificBlog(key, cb) {
  let res = await db.get(key);

  cb({
    statusCode: res ? 200 : 404,
    data: res ? res : { message: "Not Found" },
  });
}

async function putData(data, cb) {
  await db
    .put(data, data.key)
    .then((data) => cb({ statusCode: 200, data }))
    .catch((err) => {
      errorReporter(err);
      cb({ statusCode: err.statusCode ?? 400, data: err });
    });
}

async function deleteData(key, cb) {
  await db
    .delete(key)
    .then((data) => cb({ statusCode: 200, data }))
    .catch((err) => {
      errorReporter(err);
      cb({ statusCode: err.statusCode ?? 400, data: err });
    });
}

module.exports = { getAllBlogs, getSpecificBlog, putData, deleteData };
