// importamos las clases necesarias desde electron
const { app, BrowserWindow, ipcMain } = require("electron");
// importo todo lo necesario para el store
const Store = require('electron-store');

// creamos una variable para almacenar nuestra ventana
let appWin;
// creo una obejto del tipo Store y lo almaceno
const store = new Store();

// metodo que ejecutara todo lo relacionado con nuestra ventana
createWindow = () => {
  // creamos nuestra ventana y la almacenamos en la variable appWin
  appWin = new BrowserWindow({
    width: 800,
    height: 600,
    title: "first app electron.",
    resizable: false,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true
    }
  });

  // cargamos vista principal (index.html)
  appWin.loadURL(`file://${__dirname}/dist/index.html`);

  // quitamos el menu por defecto
  appWin.setMenu(null);

  // abrimos las herramientas de desarrollador
  appWin.webContents.openDevTools();

  // configuramos el cierre de nuestra ventana
  appWin.on("closed", ()=>{
    appWin = null;
  });

}

// llamamos al metodo 'on' de 'app' y le pasamos como parametro 'ready'  y el metodo que ejecuta la creacion de la ventana
app.on("ready", createWindow);
// configuramos el ipcMain para que retorne un mensage de replica
ipcMain.on("message", (event) => event.reply("reply", "pong"));
// si no extiste la clave 'clicks' en el store la creamos y la inicializamos en '0'
if(!store.get('clicks')) store.set("clicks", 0);

// configuramos el cierre de la app
app.on("window-all-closed", () =>{
  if(process.platform !== "darwin") {
    app.quit();
  }
});