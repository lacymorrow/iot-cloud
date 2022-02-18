# iot-firmware-boilerplate
Raspberry Pi OS -based system

## Install

With a fresh Raspberry Pi running RaspberryPi OS (Raspbian):

- Open terminal or ssh in (if you've already enabled it)
- Run: `bash <(curl -s https://raw.githubusercontent.com/lacymorrow/iot-firmware/main/install.sh)`

## Under the hood:

- Installs `git`
- Clones this repo
- Changes password to `pi` (Username is also `pi`)
- Changes splash screen
- Setup raspi-config
- Enables SSH
- Adds boot config
- Adds boot script (`/boot/rc.local`)
