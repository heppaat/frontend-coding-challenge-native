import express, { json } from "express";
import filesystem from "fs/promises";
import cors from "cors";

const server = express();

//backend and frontend on different server
server.use(cors());

const readFile = async () => {
  try {
    const data = await filesystem.readFile(
      `${__dirname}/../people.json`,
      "utf-8"
    );
    const people = JSON.parse(data);
    return people;
  } catch (error) {
    return null;
  }
};

server.get("/api/people", async (req, res) => {
  const people = await readFile();

  //if there is no file, wrong database, syntax error in database
  if (!people) return res.sendStatus(500);

  res.json(people);
});

server.listen(4100);
