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
    const result = await axios.get(
      "https://zalexinc.azure-api.net/request-list?subscription-key=43b647491f1d436cb0130a329fcdca50"
    ); // replace with your API endpoint
    response.status(200).send(result.data);
  } catch (error) {
    response
      .status(500)
      .send("Something went wrong while fetching request-list");
  }
});

app.post(
  "/request-certificate",
  async (request: Request, response: Response) => {
    try {
      const { address_to, purpose, issued_on, employee_id } = request.body;
      if (!address_to || !purpose || !issued_on || !employee_id) {
        response.status(400).send("Missing required fields");
        return;
      }
      const postData = { address_to, purpose, issued_on, employee_id };
      const result = await axios.post(
        "https://zalexinc.azure-api.net/request-certificate?subscription-key=43b647491f1d436cb0130a329fcdca50",
        postData
      ); // replace with your API endpoint
      response.status(200).send(result.data);
    } catch (error) {
      console.log(error);
      response
        .status(500)
        .send("Something went wrong while fetching request-cert");
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
