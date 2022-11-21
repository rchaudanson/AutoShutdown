const setButton = document.getElementById('btn')
setButton.addEventListener('click', () => {

    window.api.send("toMain", "exit");
});




const setButton2 = document.getElementById('btn2')
setButton2.addEventListener('click', () => {


    if (btn2.style.color == 'darkgray') {
        btn2.style.color = 'red';
        //btn.style.color = 'black';
        //btn.style.zoom = '110%';
    }
    else if (btn2.style.color == 'red') {
        btn2.style.color = 'darkgray';
        //btn.style.color = 'black';
        //btn.style.zoom = '110%';
    }


    window.api.send("toMain", "stop");
});


window.api.receive("fromMain", (data) => {
            document.getElementById("p1").innerHTML = data;
            console.log(`Received ${data} from main process`);
        });