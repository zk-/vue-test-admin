var mock = require('./mock.server');
module.exports = {
    devServer: {
        before: function (app, server) {
            mock(app);
        },
    },
};