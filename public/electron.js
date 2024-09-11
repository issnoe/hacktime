const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

const {
  db,
  insertTask,
  insertUser,
  updateTask,
  insertTimer,
} = require("../src/database");

let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: { nodeIntegration: true, contextIsolation: false },
  });
  // and load the index.html of the app.
  console.log(__dirname);
  mainWindow.loadFile(path.join(__dirname, "../build/index.html"));
  mainWindow.isAlwaysOnTop(true);
  // TODO: Add this logic every time that the timer is 3 seconds left
  // setTimeout(() => {
  mainWindow.isAlwaysOnTop(true);
  mainWindow.show();
  //}, 10000);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Example: Handling an IPC event to get users from the database
ipcMain.handle("get-users", async () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM users", [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
});

ipcMain.handle("get-times-by-day", async () => {
  return new Promise((resolve, reject) => {
    const thisDay = `'1726%'`;
    // "SELECT * FROM timers where date LIKE ?;",
    db.all("SELECT * FROM timers ;", [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
});

ipcMain.handle("fetch-tasks", async () => {
  return new Promise((resolve, rejected) => {
    db.all("SELECT * FROM tasks", [], (err, rows) => {
      if (err) {
        rejected(err);
      } else {
        resolve(rows);
      }
    });
  });
});

// IPC handler to insert a user
ipcMain.handle("insert-user", async (event, name, email) => {
  try {
    const result = await insertUser(name, email);
    return result;
  } catch (error) {
    console.error("Error inserting user:", error);
    throw error;
  }
});

// IPC handler to insert a user
ipcMain.handle(
  "insert-task",
  async (event, description, time, project, completed) => {
    try {
      const result = await insertTask(description, time, project, completed);
      return result;
    } catch (error) {
      console.error("Error inserting user:", error);
      throw error;
    }
  }
);

ipcMain.handle(
  "update-task",
  async (event, id, description, time, project, completed) => {
    try {
      const result = await updateTask(
        id,
        description,
        time,
        project,
        completed
      );
      return result;
    } catch (error) {
      console.error("Error inserting user:", error);
      throw error;
    }
  }
);

ipcMain.handle("insert-timer", async (event, taskId, timeSeconds) => {
  try {
    const result = await insertTimer(taskId, timeSeconds);
    return result;
  } catch (error) {
    console.error("Error inserting timer:", error);
    throw error;
  }
});
