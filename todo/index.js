var express=require("express");
var bodyParser = require("body-parser");
var app=express();

app.use("/", bodyParser.urlencoded({extended:false}));


app.use("/",function (req,res,next) {
    next();
})
var tododb=require("./seed.js");
console.log(tododb)

app.use("/",express.static(__dirname+"/public"));

app.get("/api/todos",function (req,res) {
    res.json(tododb);
    //next();
});


app.get("/api/todos/active",function (req,res) {
    var htmlResponse =  '<ul>'
    for(var i=1;i<tododb.next_todo_id;i++)
    {
        if(tododb.todos[i].status==tododb.StatusENUMS.ACTIVE)
        {

            htmlResponse += '<li>' + tododb.todos[i].title + '</li>'
        }


    }

    htmlResponse += '</ul>'
    res.send(htmlResponse)
    //next();
});



app.get("/api/todos/complete",function (req,res) {
    var htmlResponse =  '<ul>'
    for(var i=1;i<tododb.next_todo_id;i++)
    {
        if(tododb.todos[i].status==tododb.StatusENUMS.COMPLETE)
        {

            htmlResponse += '<li>' + tododb.todos[i].title + '</li>'
        }


    }

    htmlResponse += '</ul>'
    res.send(htmlResponse)
    //next();
});

app.get("/api/todos/delete",function (req,res) {
    var htmlResponse =  '<ul>'
    for(var i=1;i<tododb.next_todo_id;i++)
    {
        if(tododb.todos[i].status==tododb.StatusENUMS.DELETED)
        {

            htmlResponse += '<li>' + tododb.todos[i].title + '</li>'
        }


    }

    htmlResponse += '</ul>'
    res.send(htmlResponse)
    //next();
});



app.delete("/api/todos/:id", function(req, res) {
    var del_id = req.params.id;
    console.log(tododb.todos[del_id]);
    var todo = tododb.todos[del_id];
    if (!todo) {

        res.status(400).json({error: "Todo doesn't exist"});

    }
    else {todo.status = tododb.StatusENUMS.DELETED;
        res.json(tododb.todos);}



});



app.post("/api/todos", function(req, res){

    var todo = req.body.todo_title;

    if (!todo || todo == "" || todo.trim() == ""){

        res.status(400).json({error : "Todo Title Can't Be Empty"});

    }



    else {



        var new_todo_object = {

            title : req.body.todo_title,

            status : tododb.StatusENUMS.ACTIVE

        }



        tododb.todos[tododb.next_todo_id] = new_todo_object;

        tododb.next_todo_id = tododb.next_todo_id + 1;

        res.json(tododb.todos);



    }



})




app.put("/api/todos/:id", function(req, res) {

    var mod_id = req.params.id;

    var todo = tododb.todos[mod_id];

    tododb.todos[mod_id].status=tododb.StatusENUMS.COMPLETE;
   /* if (!todo) {

        res.status(400).json({error: "Can't modify a todo that doesnt exist"});

    }

    else {
        var todo_title = req.body.todo_title;



        if(todo_title && todo_title!="" && todo_title.trim()!=""){

            todo.title = todo_title;
   }
 var todo_status = req.body.todo_status;
     if(todo_status &&

            (todo_status == tododb.StatusENUMS.ACTIVE ||
                todo_status== tododb.StatusENUMS.COMPLETE )

        ) {

            todo.status = todo_status;

        }


*/
        res.json(tododb.todos);

  //  }





});




app.listen(4000)