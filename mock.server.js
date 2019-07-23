var fs = require('fs');
module.exports = function (app) {
    app.get('/get/weibo', function (req, res) {
        let data = fs.readFileSync('./card-data.json');
        setTimeout(() => {
            res.json(JSON.parse(data.toString()));
        }, 1000);
    });
    app.post('/login', function (req, res) {
        let rawData = '';
        req.on('data', (chunk) => { rawData += chunk; });
        req.on('end', () => {
            try {
                const parsedData = JSON.parse(rawData);
                if (parsedData.name == 'admin' && parsedData.psw == 'admin') {
                    res.send(200);
                } else {
                    res.send(500);
                }
            } catch (e) {
                console.error(e.message);
            }
        });
    });

};