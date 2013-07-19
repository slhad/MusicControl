Music Control for Chrome

Almost the same thing as the orginal version :
	
	1 - In Chrome, go to Window > Extensions. Make sure "Developer Mode" is checked.
    2 - Click on "Load unpacked extension," then navigate to the "app" directory.
	3 - Click on "Load unpacked extension," then navigate to the "extension" directory.
	4 - Install any application that lets you map global keyboard shortcuts to shell scripts (or AppleScripts, but I prefer bash). I used an app called Shortcuts, but I'm sure there are plenty of free alternatives.
    5 - Setup whatever keyboard shortcuts you want to map to the following bash commands (note that you can use something like wget rather than curl if you prefer):
        curl "http://localhost:8000/music?play"
        curl "http://localhost:8000/music?next"
        curl "http://localhost:8000/music?previous"
    6 - You're done! You should now be able to control you web-based music players with keyboard shortcuts.
	

Original Setup

Setup from http://www.livingdigitally.net/2012/06/controlling-web-based-music-players-with-global-keyboard-shortcuts.html :

------------------------------------------------------------------
Controlling Web Based Music Players with Global Keyboard Shortcuts

Ever since I switched from iTunes to using web-based music players (Google Music, Amazon Cloud Player, and Pandora), I've wanted the ability to control them with global keyboard shortcuts. The other day, I finally took the time to set it up, and I'm very happy with the results:

If you're interested in setting this up for yourself (or simply learning about how it works), download the project files here, then follow these instructions:

    1 - Unzip the project files. You should see a directory called "music_control".
    2 - Make sure you have node.js installed, then cd into the "music_control" directory and start the server with: node server.js.
    3 - Cd into the "extension" directory and open "background.html" in your favorite editor. Change the SERVER_HOST variable to reflect your host name.
    4 - In Chrome, go to Window > Extensions. Make sure "Developer Mode" is checked.
    5 - Click on "Load unpacked extension," then navigate to the "extension" directory. (You can also package the extension and install it normally by double-clicking on the resulting "music_control.crx" file.)
    6 - Install any application that lets you map global keyboard shortcuts to shell scripts (or AppleScripts, but I prefer bash). I used an app called Shortcuts, but I'm sure there are plenty of free alternatives.
    7 - Setup whatever keyboard shortcuts you want to map to the following bash commands (note that you can use something like wget rather than curl if you prefer):
        curl "http://localhost:8000/music?play"
        curl "http://localhost:8000/music?next"
        curl "http://localhost:8000/music?previous"
    8 - You're done! You should now be able to control you web-based music players with keyboard shortcuts.

I realize there are a lot of moving parts here, and any number of ways to accomplish the same thing. If you decide you don't want to use this exact implementation, hopefully this will at least get you started down the right path of your own setup. Let me know if you get this working and/or if you adapt the concept to something equally or even more interesting. I have lots of ideas for where this could go.
------------------------------------------------------------------
