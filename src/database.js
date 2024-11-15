const path = require("path");
const sqlite3 = require("sqlite3").verbose();

// Define the path
const dbPath = path.resolve(__dirname, "local_db.sqlite");

// Crear or read the database
const db = new sqlite3.Database(dbPath, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Data base is working ");
  }
});

// Seed tables
db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, email TEXT)"
  );

  db.run(
    "CREATE TABLE if NOT EXISTS tasks (id integer  PRIMARY key , description text, time integer, project text, completed bool )"
  );

  db.run("CREATE INDEX if NOT EXISTS idx_task_id ON tasks(id);");
  db.run("CREATE INDEX if NOT EXISTS idx_timer_task_id ON timers(taskId);");
  db.run("PRAGMA foreign_keys = ON;");
  db.run(
    "CREATE TABLE if NOT EXISTS  timers ( id INTEGER PRIMARY KEY,taskId INTEGER,dateStart INTEGER,dateEnd INTEGER,FOREIGN KEY (taskId) REFERENCES tasks(id) ON DELETE CASCADE);"
  );
  //"CREATE TABLE if NOT EXISTS  timers ( id INTEGER PRIMARY KEY,taskId INTEGER, timer INTEGER);"
});

// Insert function
function insertUser(name, email) {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO users (name, email) VALUES (?, ?)",
      [name, email],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID });
        }
      }
    );
  });
}

function insertTimer(taskId, dateStart) {
  return new Promise((resolve, reject) => {
    const dateEnd = Date.now();
    db.run(
      "INSERT INTO timers (taskId, dateStart, dateEnd) VALUES (?,?,?)",
      [taskId, dateStart, dateEnd],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID });
        }
      }
    );
  });
}

function insertTask(description, time, project, completed) {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO tasks (description, time, project, completed) VALUES (?, ?, ?, ?)",
      [description, time, project, completed],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID });
        }
      }
    );
  });
}

function updateTask(id, description, time, project, completed) {
  return new Promise((resolve, reject) => {
    db.run(
      "UPDATE  tasks set completed = ? WHERE id = ?;",
      [completed, id],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID });
        }
      }
    );
  });
}
module.exports = { db, insertTask, insertUser, updateTask, insertTimer };
