const app = require('express')();
const PORT = 8080;

app.listen(
    PORT,
    () =>console.log("running at http://localhost:"+PORT)
)

app.get('/database', (req, res, next)=>{
    res.status(200).send("goofy ahhaha you seee database");
});