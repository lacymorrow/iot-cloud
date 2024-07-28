# iot-firmware-boilerplate

Raspberry Pi OS -based system

> See https://github.com/lacymorrow/iot-firmware

## Workflow

1. Develop with `npm run dev`
2. Build with `npm run build`
3. Copy the `out` folder to the iot-firmware repo
4. Run `bash <(curl -s https://raw.githubusercontent.com/lacymorrow/iot-firmware/main/install.sh)` on the Raspberry Pi
