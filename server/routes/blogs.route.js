const router = require("express").Router();
const {
  getAllBlogs,
  getSpecificBlog,
  putData,
  deleteData,
} = require("../util/blogOperation");

async function estimateReadTime(content) {
  let words = content.split(" ").length;
  let time = Math.ceil(words / 200);
  return time;
}

router.get("/", (_, res) =>
  getAllBlogs((cb) =>
    res.status(cb.statusCode).send(JSON.stringify(cb.data, null, 2))
  )
);

router.get("/:key", (req, res) => {
  getSpecificBlog(req.params.key, (cb) =>
    res.status(cb.statusCode).send(JSON.stringify(cb.data, null, 2))
  );
});

router.post("/", async (req, res) => {
  {
    req.body.properties = {
      estimatedReadTime: await estimateReadTime(req.body.content),
      createdAt: new Date().toISOString(),
    };

    putData(req.body, (cb) =>
      res.status(cb.statusCode).send(JSON.stringify(cb, null, 2))
    );
  }
});

router.delete("/:key", (req, res) =>
  deleteData(req.params.key, (cb) =>
    res.status(cb.statusCode).send(JSON.stringify(cb, null, 2))
  )
);

module.exports = router;
