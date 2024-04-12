import axios from "axios";
import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

const PORT = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (request: Request, response: Response) => {
  response.status(200).send("Hello World");
});

app.get("/request-list", async (request: Request, response: Response) => {
  try {
    const { apiKey } = request.query;
    const result = await axios.get(
      `https://zalexinc.azure-api.net/request-list?subscription-key=${apiKey}`
    );
    response.status(200).send(result.data);
  } catch (error) {
    response.status(500).send("Something went wrong while creating request");
  }
});

app.post(
  "/request-certificate",
  async (request: Request, response: Response) => {
    try {
      const { reqBody, apiKey } = request.body;
      const { address_to, purpose, issued_on, employee_id } = reqBody;
      if (!address_to || !purpose || !issued_on || !employee_id) {
        response.status(400).send("Missing required fields");
        return;
      }
      const postData = { address_to, purpose, issued_on, employee_id };
      const result = await axios.post(
        `https://zalexinc.azure-api.net/request-certificate?subscription-key=${apiKey}`,
        postData
      );
      response.status(200).send(result.data);
    } catch (error) {
      console.log(error);
      response
        .status(500)
        .send("Something went wrong while fetching request certificates");
    }
  }
);

app
  .listen(PORT, () => {
    console.log("Server running at PORT: ", PORT);
  })
  .on("error", (error) => {
    // gracefully handle error
    throw new Error(error.message);
  });
