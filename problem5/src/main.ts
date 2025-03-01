import express from "express";
import sqlite3 from "sqlite3";
const app = express();
const port: number = 5173;
// init db
const db: sqlite3.Database = new sqlite3.Database("database.db", (err) => {
  if (err) {
    console.log("Error when trying to open database", err.message);
  } else {
    console.log("Connected to database success");
    db.run(
      "CREATE TABLE IF NOT EXISTS my_table(id INTEGER PRIMARY KEY, name TEXT NOT NULL, telephone TEXT NOT NULL, address TEXT NOT NULL)"
    );
  }
});
app.use(express.json());
app.get("/", (req: express.Request, res: express.Response) => {
  res.send("API usage in README.md <3");
});

// Get all user data
app.get(
  "/api/v1/get-all-user",
  (req: express.Request, res: express.Response) => {
    db.all("SELECT * FROM my_table", [], (err, rows) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.status(200).json({ message: "success", data: rows });
    });
  }
);
// Get specific user data
app.get(
  "/api/v1/get-user/:id",
  (req: express.Request, res: express.Response) => {
    db.all(
      "SELECT * FROM my_table WHERE id = ?",
      [req.params.id],
      (err, rows) => {
        if (err) {
          res.status(400).json({ error: err.message });
          return;
        }
        res.status(200).json({ message: "success", data: rows });
      }
    );
  }
);
// Get user with specific address
app.get(
  "/api/v1/get-user-with-address/:address",
  (req: express.Request, res: express.Response) => {
    db.all(
      "SELECT * FROM my_table WHERE address = ?",
      [req.params.address],
      (err, rows) => {
        if (err) {
          res.status(400).json({ error: err.message });
        } else {
          res.status(200).json({ message: "success", data: rows });
        }
      }
    );
  }
);
// Get user with specific name
app.get(
  "/api/v1/get-user-with-name/:name",
  (req: express.Request, res: express.Response) => {
    db.all(
      "SELECT * FROM my_table WHERE name = ?",
      [req.params.name],
      (err, rows) => {
        if (err) {
          res.status(400).json({ error: err.message });
        } else {
          res.status(200).json({ message: "success", data: rows });
        }
      }
    );
  }
);
//Get user with specific telephone
app.get(
  "/api/v1/get-user-with-telephone/:telephone",
  (req: express.Request, res: express.Response) => {
    db.all(
      "SELECT * FROM my_table WHERE telephone = ?",
      [req.params.telephone],
      (err, rows) => {
        if (err) {
          res.status(400).json({ error: err.message });
        } else {
          res.status(200).json({ message: "success", data: rows });
        }
      }
    );
  }
);
//user props structure
interface userProps {
  name: string;
  telephone: string;
  address: string;
}
//validation for insert user
const userInsertValidation = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { name, telephone, address }: userProps = req.body;
  if (typeof name !== "string") {
    res.status(400).json({ error: "name must be string and not empty!!" });
    return;
  } else if (typeof telephone !== "string") {
    res.status(400).json({ error: "telephone must be string and not empty!!" });
    return;
  } else if (typeof address !== "string") {
    res.status(400).json({ error: "address must be string and not empty!!" });
    return;
  }
  next();
};
//Insert user into database
app.post(
  "/api/v1/post-user",
  userInsertValidation,
  (req: express.Request, res: express.Response) => {
    db.run(
      "INSERT INTO my_table(name, telephone, address) VALUES (?, ?, ?);",
      [req.body.name, req.body.telephone, req.body.address],
      function (err) {
        if (err) {
          res
            .status(400)
            .json({ message: "failed to insert user", error: err?.message });
        } else {
          res.status(200).json({ message: "add user success" });
        }
      }
    );
  }
);
//update user validation
const userUpdateValidation = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { name, telephone, address }: userProps = req.body;
  const id: number = req.body;
  if (typeof name !== "string") {
    res.status(400).json({ error: "name must be string and not empty!!" });
    return;
  } else if (typeof telephone !== "string") {
    res.status(400).json({ error: "telephone must be string and not empty!!" });
    return;
  } else if (typeof address !== "string") {
    res.status(400).json({ error: "address must be string and not empty!!" });
    return;
  } else if (typeof id !== "number") {
    res.status(400).json({ error: "id must be number and not empty!!" });
    return;
  }
  next();
};
//Update user info by user id
app.put(
  "/api/v1/update-user/:id",
  userUpdateValidation,
  (req: express.Request, res: express.Response) => {
    db.run(
      "UPDATE my_table SET name = ?, telephone = ?, address = ? WHERE id = ?",
      [req.body.name, req.body.telephone, req.body.address, req.params.id],
      function (err) {
        if (err) {
          res.status(400).json({
            message: "failed to update user data",
            error: err.message,
          });
        } else {
          res.status(200).json({ message: "update user success" });
        }
      }
    );
  }
);
//Delete user info by user id
app.delete(
  "/api/v1/delete-user/:id",
  (req: express.Request, res: express.Response) => {
    db.run(
      "DELETE FROM my_table WHERE id = ?",
      [req.params.id],
      function (err) {
        if (err) {
          res
            .status(400)
            .json({
              message: "failed to delete user data",
              error: err.message,
            });
        } else {
          res.status(200).json({ message: "delete user success" });
        }
      }
    );
  }
);

app.listen(port, () => {
  console.log("Express server listing to port " + port);
});
