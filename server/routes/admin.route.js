const router = require("express").Router();
const { Deta } = require("deta");
const axios = require("axios");

const deta = Deta(process.env.SPACE_DETA_PROJECT_KEY);
const db = deta.Base("Admin");

async function userIsAdmin(email) {
    let admin = await db.get("email");
    admin = admin?.value;
    if (admin?.length > 0) return admin.includes(email);
    else return false;
}

router.get("/:email", async (req, res) => {
    return res.status(200).send(
        JSON.stringify(
            {
                statusCode: 200,
                email: req.params.email,
                isAdmin: await userIsAdmin(req.params.email),
            },
            null,
            2
        )
    );
});

module.exports = router;
