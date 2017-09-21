const path = require('path');
const controller = require(path.join(__dirname, "../controllers/appController"));

exports.config = (app) => {

    app.get('/', (req, res, next) => {
        res.redirect('http://garagem1157.mybluemix.net/');
    });

    app.post('/facebook', (req, res, next) => {
        controller.facebook(req)
            .then(responseObj =>
                res.status(200).send(responseObj))
            .catch(next)
    });


    // error handler
    app.use((err, req, res) => {
        // set locals, only providing error in development
        console.log(err);
        res.locals.message = err.message;
        res.locals.error = err;

        // Debug purposes: console.log(req.body);
        res.status(err.status || 500);
        res.send(err.message);
    });
}
