
# AutoShutdown
AutoShutdown is a small application that allows a user's computer to be shut down at a predefined time.<br><br>
Easily from the interface, the user can cancel the scheduled shutdown of his computer at any time for the current day, the automatic shutdown is reactivated the next day.<br><br>
The goal is to turn off unused computers that have not been turned off by users.


<br><br>
<p align="center">
  <img src="http://www.linux-migration.fr/Animation.gif" />
</p>
<br><br>


## Configuration
Edit C:\Program Files\AutoShutdown\resources\app\config.js :<br><br>


shutdowntime = "20";   &ensp;&ensp;&ensp;// Computer shutdown time in hour ( 01 - 23)

startpopup = "yes";   &ensp;&ensp;&ensp;// show application at user login<br>
startafter = "60000";   &ensp;&ensp;&ensp;// Show app after ( in milliseconds )
<br><br>

## Development 
Electron
https://electronjs.org
<br><br>

## Other
The app only supports ***HH:MM:SS*** time format in Windows configuration
<br><br>
<br><br>

## Author
CHAUDANSON Raphael<br><br>
rchaudanson@gmail.com
<br><br>

## Licence

**GNU** General Public License
<br><br>

## Download
Download Windows x86-64 setup: [AutoShutdown1.0_SETUP.exe](https://onthelight.com/1X/AutoShutdown1.0_SETUP.exe)
<br>Check file on: [VirusTotal](https://www.virustotal.com/gui/file/5e0729e8a7a7220b7bd083008d6dacef29042aa789a5c961c46356acc21525a2)

