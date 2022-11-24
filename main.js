const {app, BrowserWindow, ipcMain, Tray, Menu, nativeImage, Notification} = require('electron');
const exec = require('child_process').exec;
const path = require("path");
const config = require('./config.js');
const gotTheLock = app.requestSingleInstanceLock()

app.setAppUserModelId("AutoShutdown.exe");








let stop = "yes";






function createWindow() {
  const window = new BrowserWindow({
    frame: false,
    width: 450,
    height: 715,
    resizable: false,
    webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });






    ipcMain.on("toMain", (event, run) => {
    if (run == "exit") { window.hide(); };
    if (run == "stop" && stop == "yes") { stopscheduleshutdown(); }
    else if (run == "stop" && stop == "no") { scheduleshutdown(); };
    console.log(stop)
    })












    scheduleshutdown();






    function dateDiff(date1, date2){

    date1 = new Date();
    date2 = new Date();
    date2.setHours(shutdowntime);
    date2.setMinutes('00');
    date2.setSeconds('00');

    let diff = {}
    let tmp = date2 - date1;
    if (tmp < 0) { diff.exp = "yes"; return diff; };
 
    tmp = Math.floor(tmp/1000);             // Seconds between the 2 dates
    diff.sec = tmp % 60;
    if (diff.sec < 10) { diff.sec = '0'+diff.sec; };
 
    tmp = Math.floor((tmp-diff.sec)/60);    // Minutes
    diff.min = tmp % 60;
    if (diff.min < 10) { diff.min = '0'+diff.min; };
 
    tmp = Math.floor((tmp-diff.min)/60);    // Hours
    diff.hour = tmp % 24;
    if (diff.hour < 10) { diff.hour = '0'+diff.hour; };
     
    tmp = Math.floor((tmp-diff.hour)/24);   // Days
    diff.day = tmp;
     
    return diff;
    } 






    function scheduleshutdown()
    {

    stop = "yes";
    showNotificationON();
    date1 = new Date();
    date2 = new Date();
    date2.setHours(shutdowntime);
    date2.setMinutes('00');
    date2.setSeconds('00');
    tmmp = date2 - date1;
    tmmp = Math.floor(tmmp/1000);
    console.log(tmmp);
    
    exec ('shutdown /s /f /t ' +tmmp+ ' /c " "', (output) => {console.log(output);
      });

    }








    function stopscheduleshutdown()
    {

    stop = "no";
    showNotificationOFF();
    exec ("shutdown /a", (output) => {console.log(output);
    window.webContents.send("fromMain", "<span style='font-size:30px;'>&#128564;</span>");
    });

    }









    setInterval(Reload, 600000);

    function Reload()
    {
    if (new Date().toLocaleTimeString() >= '00:00:**' && new Date().toLocaleTimeString() <= '01:00:**' &&  stop == "no") {
    
    console.log("run Reload");
    scheduleshutdown();
    window.reload();
    
      }

    }





    let intervalID2 = setInterval(BootPopup, startafter);

    function BootPopup()
    {
    if (stop == "yes" &&  startpopup == "yes") {
    
    console.log("run Bootscreen");
    window.show();
    showNotificationON();
    
      }

      clearInterval(intervalID2);
      console.log("run Bootscreen Disabled");
    
    }





    setInterval(CountDown, 1000);

    function CountDown()
    {
      if (stop == "yes") {
      console.log(new Date().toLocaleTimeString());


      diff = dateDiff(date1, date2);
      time = diff.hour+ ":" +diff.min+ ":" +diff.sec;
      if (diff.exp == "yes") { time = "Demain à "+shutdowntime+"H00";}
      
      window.webContents.send("fromMain", time)

      }
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







function showNotificationON () {
  new Notification({ title: "AutoShutdown", body: "L'arrêt automatique de votre ordinateur est prévu à " +shutdowntime+ "H00.", icon: './resources/app/images/Autoshutdown.png' }).show()
}


function showNotificationOFF () {
  new Notification({ title: "AutoShutdown", body: "Le prochain arrêt programmé de l'ordinateur a été annulé !", icon: './resources/app/images/Autoshutdown_red.png' }).show()
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








if (!gotTheLock) {
  app.quit()
} else {


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

}