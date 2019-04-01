const User = require('../models/User');
const Kudo = require('../models/Kudo')

module.exports = function (app) {
    app.get('api/kudo', function (req, res) {
        Kudo.find({})
            .populate('to')
            .populate('from')
            .then(function (data) {
                res.json(data);
            })
            .catch(function(err) {
                res.json(err);
            })
        app.get('api/user', function(req,res) {
            User.find({})
            .then(function(data) {
                res.json(data);
            })
            .catch(function(err) {
                res.json(err)
            });
        })
        app.post('/api/kudo', function (req, res) {
            const newKudo = {
                title: req.body.title,
                body: req.body.body,
                to: req.body.to,
                from: req.body.from
            }
            console.log(newKudo);
            Kudo.create(newKudo)
            .then(function(data) {
                res.json(data);
            })
            .catch(function(err) {
                res.json(err)
            });
        });
})