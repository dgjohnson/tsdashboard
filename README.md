# TSWUB
Thingsee - Weather Underground Bridge – Receives sensor data from Things One and sends it to Weather Underground

## Description

TSWUB is an node/express.js application that listens http connections from Thingsee one
sensor device and sends the environment sensor (temperature, humidity and barometric pressure) to
Weather Underground.

## Instructions

### 1. Register Weather Underground Personal Weather Station

Register a personal weather station at [Weather Underground](http://www.wunderground.com/personal-weather-station/signup.asp). Keep your WU password
and the new station id at hand.

### 2. Configure Thingsee One Device

In Thingsee Creator configure your Thingsee One to send environment sensor
updates to `Custom Cloud URL` that should contain the address and port you will
be running the TSWUB.

### 3. Configure TSWUB

Create configuration file config.js to top level of TSWUB distribution. It should have the following contents:

    {
      id: '<Weather Underground Station Id>',
      password: '<Your WU password>'
    }

### 4. Run the app

Run the app:

    PORT=8080 ./bin/www
