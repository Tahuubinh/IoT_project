const mqtt = require("mqtt");
const DeviceData = require('../models/devicedata.model');
const Device = require('../models/device.model');

const topic = process.env.TOPIC;
const host = process.env.HOST;
const mqttPort = process.env.MQTTPORT;
const username = process.env.MQTTUSERNAME;
const password = process.env.MQTTPASSWORD;

console.log(username, password);

const addOneData = async (data) => {
    try {
        const now = (new Date()).toISOString();
        const name = data.name;
        if (!name) {
            console.log(`${now}: Name of data is missing`);
            return;
        }
    
        let value = data.value;
        if (value == undefined) {
            console.log(`${now}: Value of data is missing`);
            return;
        }
    
        const result = await DeviceData.create(data);
        if (name == "status" && (data.value === "ON" || data.value === "OFF")) {
            await Device.findByIdAndUpdate(data.deviceId, {
                status: data.value
            });
        }
        return result;
    } catch (err) {
        console.log(err);
        return null;
    }
}

const addDatas = async (topic, message) => {
    try {
        const msgJson = JSON.parse(message.toString());
        console.log(msgJson);
        if (Array.isArray(msgJson)) {
            for (let data of msgJson) {
                await addOneData(data);
            }
        } else {
            await addOneData(msgJson);
        }
    } catch (err) {
        console.log(err);
    }
}

const client = mqtt.connect({
    host: host,
    port: mqttPort,
    protocol: 'mqtts',
    username: username,
    password: password
    }
);

client.subscribe(topic);

client.on('connect', function () {
    console.log('Connected');
});

client.on('error', function (error) {
    console.log(error);
});

client.on("message", addDatas);