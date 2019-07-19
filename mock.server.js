module.exports = function (app) {
    app.get('/some/path', function (req, res) {
        res.json({ custom: 'response' });
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