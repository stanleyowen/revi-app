const cors = require("cors");
const axios = require("axios");
const helmet = require("helmet");
const express = require("express");
const rateLimit = require("express-rate-limit");

// Load the environment variables on development environment
// Also, load the crash reporter on production and staging environments
if (
    process.env.NODE_ENV !== "production" &&
    process.env.NODE_ENV !== "staging"
) {
    require("dotenv").config();
} else require("./util/crashReporter");

const app = express();
const PORT = process.env.PORT || 5000;
const limiter = {
    statusCode: 429,
    statusMessage: "Too Many Requests",
    message:
        "We're sorry, but you have made too many requests to our servers. Please try again later.",
};

app.use(
    cors({
        origin: (origin, cb) => {
            if (
                !origin ||
                process.env.CORS_ORIGIN.split(",").indexOf(origin) !== -1
            )
                cb(null, true);
            else
                cb(
                    JSON.stringify(
                        {
                            statusCode: 401,
                            statusMessage: "Unauthorized",
                            message:
                                "Connnection has been blocked by CORS Policy: The origin header(s) is not equal to the supplied origin.",
                        },
                        null,
                        2
                    )
                );
        },
        optionsSuccessStatus: 200,
        credentials: true,
    })
);

app.use(helmet());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));

app.use((_, res, next) => {
    res.header("Content-Type", "application/json; charset=UTF-8");
    return next();
});

app.use(async function (req, _, next) {
    await axios
        .post(
            `${process.env.WEBHOOK_URL}?thread_id=${process.env.INCOMING_REQUEST_THREAD_ID}
    `,
            {
                content:
                    "```" +
                    req.method +
                    " " +
                    req.protocol +
                    "://" +
                    req.get("host") +
                    req.originalUrl +
                    " from " +
                    req.ip +
                    " with origin " +
                    req.get("origin") +
                    "\n" +
                    JSON.stringify(req.headers, null, 2) +
                    "```",
            }
        )
        .catch((error) => console.error(error));
    return next();
});

app.use(
    rateLimit({
        windowMs: 60 * 1000, // 1 minute
        max: 60,
        handler: (_, res) =>
            res.status(429).send(JSON.stringify(limiter, null, 2)),
    })
);

app.use((req, res, next) => {
    // Get the full URL of the request
    const { HTTP_AUTH_USERNAME, HTTP_AUTH_PASSWORD } = process.env;
    const b64auth = (req.headers.authorization || "").split(" ")[1] || "";
    const [login, password] = Buffer.from(b64auth, "base64")
        .toString()
        .split(":");

    // Exclude Basic Auth for following routes
    // "/", "/blogs/*"
    if (
        req.path === "/" ||
        (login &&
            password &&
            login === HTTP_AUTH_USERNAME &&
            password === HTTP_AUTH_PASSWORD)
    )
        return next();

    return res
        .set("WWW-Authenticate", 'Basic realm="401"')
        .status(401)
        .send(
            JSON.stringify(
                {
                    statusCode: 401,
                    statusMessage: "Unauthorized",
                    message:
                        "The page you are trying to access requires authentication. Please try again.",
                },
                null,
                2
            )
        );
});

const mainRouter = require("./routes/main.route");
const detaRouter = require("./routes/deta.route");
const blogsRouter = require("./routes/blogs.route");
const adminRouter = require("./routes/admin.route");
app.use("/", mainRouter);
app.use("/deta", detaRouter);
app.use("/blogs", blogsRouter);
app.use("/admin", adminRouter);

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
