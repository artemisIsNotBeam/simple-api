const express = require('express');
const app = express();
const PORT = 8080;

let database = {
    "control": {
        wins: 0,
        losses: 0
    }, 
    "aggro": {
        wins: 0,
        losses: 0
    }, 
    "combo": {
        wins: 0,
        losses: 0
    }
}
// put is update | get is read
// posts is create | delete is delete
app.put('/lose/:type', (req, res)=>{
    let type = req.params.type;
    if (type == "control" || type =="aggro" || type == "combo"){
        database[type].losses +=1
        res.status(200).send("you added a loss to"+type);
    } else {
        res.status(400).send("invalid type");
    }
});

app.put('/win/:type', (req, res)=>{
    let type = req.params.type;
    if (type == "control" || type =="aggro" || type == "combo"){
        database[type].wins +=1
        res.status(200).send("you added a win to"+type);
    } else {
        res.status(400).send("invalid type");
    }
});

app.get('/', (req, res)=>{
    res.status(200).send(database);
});

app.get('/winrate', (req, res)=>{
    let control = database.control.wins / (database.control.wins + database.control.losses);
    let aggro = database.aggro.wins / (database.aggro.wins + database.aggro.losses);
    let combo = database.combo.wins / (database.combo.wins + database.combo.losses);
    res.status(200).send(
        {
            "control": control,
            "aggro" : aggro,
            "combo": combo
        }
    )
});

app.delete('/',(req,res)=>{
    database = {
        "control": {
            wins: 0,
            losses: 0
        }, 
        "aggro": {
            wins: 0,
            losses: 0
        }, 
        "combo": {
            wins: 0,
            losses: 0
        }
    }
    res.status(200).send("deleted")
});

// go into insomnia and put http://localhost:8080
// then fill out the end with what you want to do and select get/put/delete
// eg: get http://localhost:8080/database/lose

app.listen(process.env.PORT || PORT);