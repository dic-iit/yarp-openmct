var express = require('express');

function HistoryServer(device) {
    var router = express.Router();

    router.get('/:pointId/latest', function (req, res) {
        var ids = req.params.pointId.split(',');
        var response = ids.reduce(function (resp, id) {
            if (device.history[id].length == 0) {
                return resp.concat([]);
            }
            return resp.concat(device.history[id][device.history[id].length-1]);
        }, []);
        res.status(200).json(response).end();
    });

    router.get('/:pointId', function (req, res) {
        var start = +req.query.start;
        var end = +req.query.end;
        var ids = req.params.pointId.split(',');

        var response = ids.reduce(function (resp, id) {
            return resp.concat(device.history[id].filter(function (p) {
                return p.timestamp > start && p.timestamp < end;
            }));
        }, []);
        res.status(200).json(response).end();
    });

    return router;
}

module.exports = HistoryServer;
