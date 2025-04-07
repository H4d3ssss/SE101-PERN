import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

const db = new pg.Client({
  user: process.env.USERDB,
  host: process.env.HOSTDB,
  database: process.env.DATABASE,
  password: process.env.PASSWORDDB,
  port: process.env.PORTDB,
});

db.connect();

const insertLawyer = async (data) => {
  const query = `WITH new_user AS (
  INSERT INTO users (
    first_name, last_name, email, password, address, date_of_birth, role
  )
  VALUES (
    $1, $2, $3, $4, $5, $6, 'Lawyer'
  )
  RETURNING user_id, role
)
INSERT INTO lawyers (user_id, bar_number, specialization)
SELECT user_id, $7, $8 FROM new_user WHERE role = 'Lawyer';`;
  try {
    const response = await db.query(query, [
      data.firstName,
      data.lastName,
      data.email,
      data.password, // hash natin to
      data.address,
      data.dateOfBirth,
      data.barNumber,
      data.specialization,
    ]);
    return response.rowCount > 0;
  } catch (err) {
    console.log(err.stack);
    return false;
  }
};

app.post("/api/lawyers", async (req, res) => {
  try {
    const data = req.body;
    const response = await insertLawyer(data);
    console.log(response);
    res.status(201).send({
      response,
      message: "successfully added lawyer",
      data,
    });
  } catch (err) {
    console.log(err.stack);
    res
      .status(500)
      .send({ message: "an error has occured while inserting lawyer data" });
  }
});

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`server running at port ${port}`);
});
