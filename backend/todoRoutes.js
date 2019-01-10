const express = require("express");
const Data = require("./Data");
const todoRoutes = express.Router();


todoRoutes.post("/", (req, res) => {
    console.log(req.body);

    let newData = new Data({
        message: req.body.text
    });
    newData.save(err => {
        if (err) return res.send(err);
    });
});


todoRoutes.get("/", (_, res) => {
    Data.find({}, (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
    })
});

todoRoutes.post("/update/:postID", (req, res) => {
    const { postID } = req.params;
    const { text } = req.body;
    Data.findOneAndUpdate({_id: postID}, {message: text}, err => {
        if (err) return res.send(err);
    });
});

todoRoutes.delete("/delete/:postID", (req, res) => {
    console.log(req.params);
    const {postID}  = req.params;
    Data.findByIdAndDelete(postID, err => {
        if (err) return res.send(err);
    });
});

module.exports = todoRoutes;