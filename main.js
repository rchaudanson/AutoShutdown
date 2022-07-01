const {app, BrowserWindow, ipcMain, Tray, Menu, nativeImage, Notification} = require('electron');
const exec = require('child_process').exec;
const path = require("path");

app.setAppUserModelId("AutoShutdown.exe");






let stop = "yes";
let time = '0';




function createWindow() {
  const window = new BrowserWindow({
    frame: false,
    width: 450,
    height: 715,
    webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });






    ipcMain.on('command', (event, run) => {
    if (run == 'exit') { window.hide(); console.log(stop) }; //app.quit();
    if (run == 'stop') { stop = "no" };
    //exec(run, (output) => {console.log(output) })
    })






    setInterval(Time, 5000);

    function Time()
    {
    
    time = new Date().toLocaleTimeString();
    //console.log(time)
    }





    setInterval(Shutdown, 100000);

    function Shutdown()
    {

    if (time >= '20:00:**' && time <= '20:10:**' && stop != "no" ) {
    exec ("shutdown /s /t 60 /f /c \"Votre ordinateur va s'éteindre\"", (output) => {console.log(output);
      })

      }

    }





    let intervalID1 = setInterval(Popup, 300000);

    function Popup()
    {
    if (time >= '15:00:**' && time <= '15:06:**' && stop != "no" ) {
    
    window.show();
    showNotification();
    console.log("run Popup");
    clearInterval(intervalID1);
    console.log("run Popup Disabled");

      }

    }





    setInterval(Reload, 600000);

    function Reload()
    {
    if (time >= '22:00:**' && time <= '23:00:**' &&  stop == "no") {
    
    console.log("run Reload");
    stop = "yes";
    window.reload();
    
      }

    }




    let intervalID2 = setInterval(BootPopup, 300000);

    function BootPopup()
    {
    if (stop == "yes") {
    
    console.log("run Bootscreen");
    window.show();
    showNotification();
    
      }

      clearInterval(intervalID2);
      console.log("run Bootscreen Disabled");
    
    }















    window.loadFile('index.html')
        .then(() => { window.hide(); });

    window.on('restore', (event) => {
        console.log('restore event'); 
    })

    window.on('show', (event) => {
        console.log('show event'); 
    })

    window.on('close', (event) => {
        event.preventDefault();
        window.hide();
    })




    return window;

}







function showNotification () {
  new Notification({ title: "AutoShutdown", body: "L'arrêt automatique de votre ordinateur est prévu à 20h00.", icon: './resources/app/images/Autoshutdown.png' }).show()
}









function createTray() {
  let tray

  app.whenReady().then(() => {
  const icon = nativeImage.createFromPath('./resources/app/images/Autoshutdown.png')
  tray = new Tray(icon)

  const contextMenu = Menu.buildFromTemplate([
            
            {
               label: 'Ouvrir',
               click: function () {
                  //shell.openExternal('https://www.google.fr');
                  window.show();
               }
            },
            
            {
               label: 'Quitter',
               click: function () {
                  console.log("Quitter");
                  app.quit();
               },
               enabled: false
            }
         ])

tray.setContextMenu(contextMenu);
tray.setToolTip('AutoShutdown');
tray.setTitle('AutoShutdown');

})

}











app.on('ready', () => {
    window = createWindow();
    tray = createTray();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});