#!/usr/bin/env python

import sys
import subprocess
import dbus, gobject
from dbus.mainloop.glib import DBusGMainLoop

APP_ID = "MediaKeys"
CMD = "curl"
HOST = "localhost"
PORT = "8000"
VERBOSE = (len(sys.argv) == 2) 

def sendMusicControlCmd(action):
	cmdArg1 = "-s"
	cmdArg2 = "http://" + HOST + ":" + PORT + "/music?" + action
	if VERBOSE:
		print "Running command: " + CMD + " " + cmdArg1 + " " + cmdArg2
	try:
		subprocess.call([CMD, cmdArg1, cmdArg2])
	except subprocess.CalledProcessError:
		print "Failed to run " + cmdString
		pass
	except OSError:
		print "Could not find file to run"
		pass

def mediakey_pressed(app, action):
   if app == APP_ID:
		if VERBOSE:
			print action + " key pressed."
		sendMusicControlCmd(action)


def main():

	DBusGMainLoop(set_as_default=True)

	try:
		bus = dbus.SessionBus()
		mk = bus.get_object("org.gnome.SettingsDaemon","/org/gnome/SettingsDaemon/MediaKeys")
		mk.GrabMediaPlayerKeys(APP_ID, 0, dbus_interface='org.gnome.SettingsDaemon.MediaKeys')
		mk.connect_to_signal("MediaPlayerKeyPressed", mediakey_pressed)
		if VERBOSE:
			print "Bound media keys with DBUS"
	except dbus.DBusException:
		exit(0)

	loop = gobject.MainLoop()
	loop.run()

if __name__ == "__main__":
	main()
