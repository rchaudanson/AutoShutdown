const setButton = document.getElementById('btn')
setButton.addEventListener('click', () => {

    let run = "exit" // "shutdown /s /t 1000 /f /c \"Un^\arrêt automatique de votre ordinateur est prévu à 20h00\""
    window.electronAPI.setTitle(run)
});




const setButton2 = document.getElementById('btn2')
setButton2.addEventListener('click', () => {

    const NOTIFICATION_TITLE = 'AutoShutdown'
    const NOTIFICATION_BODY = "L'arrêt programmé de l'ordinateur a été annulé !"
    const CLICK_MESSAGE = 'Notification clicked!'
    new Notification(NOTIFICATION_TITLE, { body: NOTIFICATION_BODY, icon: './images/Autoshutdown_red.png' })
        .onclick = () => document.getElementById("output").innerText = CLICK_MESSAGE

    btn2.style.color = 'red';
    btn.style.color = 'black';
    btn.style.zoom = '110%';
    let run = "stop"
    window.electronAPI.setTitle(run)
});

