const DeviceData = require('../models/devicedata.model');
const Device = require('../models/device.model');
const { StatusCodes } = require('http-status-codes');

const getDeviceData = async (req, res) => {
    try {
        const deviceId = req.body.deviceId;
        let startTime = req.body.startTime;
        if (!startTime) {
            throw new BadRequestError("Start time is missing");
        }
        startTime = new Date(startTime);
        if (!startTime) {
            throw new BadRequestError("Start time is invalid");
        }
        let endTime = req.body.endTime;
        if (!endTime) {
            throw new BadRequestError("End time is missing");
        }
        endTime = new Date(endTime);
        if (!endTime) {
            throw new BadRequestError("End time is invalid");
        }

        const result = await DeviceData.find({
            deviceId,
            timestamp: {
                $gte: startTime,
                $lte: endTime
            }
        }).populate("attributeId");

        const returnedResult = [];
        if (result.length > 0) {
            for (data of result) {
                const date = data["timestamp"];
                const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
                data = data.toObject();
                data.time = dateString;
                returnedResult.push(data);
            }
        }
        return res.status(StatusCodes.OK).json({ result: returnedResult });
    } catch (err) {
        return res.status(400).json({"err": err.toString()});
    }
}

const addData = async (req, res) => {
    try {
        const name = req.body.name;
        if (!name) {
            throw new BadRequestError("Name of data is missing");
        }

        let value = req.body.value;
        if (value == undefined) {
            throw new BadRequestError("Value of data is missing");
        }

        const result = await DeviceData.create(req.body);
        
        if (name == "status" && (value == "ON" || value == "OFF")) {
            await Device.findByIdAndUpdate(req.body.deviceId, {
                status: value
            });
        }

        return res.status(StatusCodes.CREATED).json({ result });
    } catch (err) {
        return res.status(400).json({"err": err.toString()});
    }
}

module.exports = {
    getDeviceData,
    addData
}