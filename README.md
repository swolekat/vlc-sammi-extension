# VLC SAMMI Plugin

## Setup
To use this plugin:
* Enable the VLC web interface
* Install the plugin
* Put your password in the `VLC Variables` button
* Restart Sammi

### Enabling the VLC Web Interface
* Open vlc and open the `Tools` menu then select `Preferences`.
* Then toggle `All` settings. 
* Find `Main Interfaces` and check the `Web` checkbox.
* Expand `Main Interfaces` and open the `Lua` option.
* Set your password
* Save the settings
* Then restart VLC 

If you get a firewall warning, allow.

### Install the Plugin
* In Sammi open the `Sammi Bridge` Menu
* `Install an Extension`
* Locate the sef file (make sure you get it from the release page)

### Setup the Plugin
The plugin requires the VLC password to communicate with VLC.

If you installed the extension you should see a new `VLC Sammi Extension` deck.
* Open the deck
* Open the `VLC Variables` button
* put your password in the value section of the first line. By default it is `test`. Make sure it's surrounded by double quotes.

After setup, restart Sammi.

## Variables
In general, the `vlcVariables` button will have all the variables you would want.
* `title`
* `artist`
* `filename`
* `state` This will be one of `playing`, `paused`, `stopped`
* `length` The length of the current song in seconds.
* `time` The time that the current song has been playing for in seconds.

## Triggers
There are several triggers you can use for when vlc changes
* `VLC Status Updated` this fires every time the plugin gets a new status. Only use this if you want to show the time being updated. It has the `status` in full if you need it.
* `VLC Song Changed` this fires when the song changes. This will return all relevant metadata. 
* `VLC State Changed` this fires when the state of the player changes. This will return `state`. 

## Commands 
I've tried to cover the basic commands. If you'd like to see more please contact me.
* `VLC Play`
* `VLC Pause`
* `VLC Toggle Pause`
* `VLC Stop`
* `VLC Next`
* `VLC Previous`
* `VLC Toggle Random`
* `VLC Toggle Loop` Loops the entire playlist
* `VLC Toggle Repeat` Repeats just the current song 

## Lower Third Demo
To show off what you can do, I've included a "Lower Third" like widget. This will show the new song title whenever one comes on.

* First get your websocket password. It's in OBS under `Tools` and `Websocket Server Settings`
* Go in the VLC Deck and go to the commands of the `VLC DEMO SETUP` button. Replace `yourWebsocketPasswordGoesHere` with your actual password.
* Run the button. It'll create the `VLC DEMO LOWER THIRD` scene. 
* Next go into the `VLC DEMO` button and enable all the commands. 

You should see it work when it changes songs. Feel free to delete the demo buttons or use them as inspiration for your own widget.