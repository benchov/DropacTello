const dgram = require('dgram');
const _ = require('lodash');

const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const port = 8000;

const DRONE_PORT = '8889';
const STATE_PORT = '8890';
const HOST = '192.168.0.199';


const stateParser = (msg) => {
    const buffer = _.map(_.split(msg, ';'), (state) => {
        if (state !== "") {
            return _.split(state, ':')
        }
    });
    const buf2 = _.pull(buffer, undefined);
    return _.fromPairs(buf2, 'agx')
}

const drone = dgram.createSocket('udp4');
drone.bind(DRONE_PORT);

drone.send('command', 0, 'command'.length, DRONE_PORT, HOST, handleError);

const state = dgram.createSocket('udp4');
state.bind(STATE_PORT);

state.on('message', _.throttle(message => {
    console.log(`🚁  ${message}`);
    io.emit('tellostate', stateParser(message));
}), 10000);

function handleError(err) {
    if (err) {
        console.log('ERROR ', err);
    }
}

io.on('connection', socket => {
    socket.emit('status', 'CONNECTED');
});



io.on('connection', socket => {
    socket.on('command', (cmd) => {
        // console.log('cmd', cmd)
        if (cmd === 'command') {
            drone.send('command', 0, 'command'.length, DRONE_PORT, HOST, handleError);
            // drone.send('takeoff', 0, 'takeoff'.length, DRONE_PORT, HOST, handleError);
        }
        if (cmd === 'takeoff') {
            drone.send('command', 0, 'command'.length, DRONE_PORT, HOST, handleError);
            drone.send('takeoff', 0, 'takeoff'.length, DRONE_PORT, HOST, handleError);
        }
        if (cmd === 'land') {
            drone.send('command', 0, 'command'.length, DRONE_PORT, HOST, handleError);
            drone.send('land', 0, 'land'.length, DRONE_PORT, HOST, handleError);
        }
        if (cmd === 'emergency') {
            drone.send('command', 0, 'command'.length, DRONE_PORT, HOST, handleError);
            drone.send('emergency', 0, 'emergency'.length, DRONE_PORT, HOST, handleError);
        }
    });
});
server.listen(port, () => console.log("server running on port:" + port));