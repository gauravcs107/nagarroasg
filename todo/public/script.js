console.log('it is loading')
var RESPONSE_DONE=4;
var STATUS_OK=200;
var ID = "todolistdiv"
function addtodoelements(id,tododatajson)
{
    var todos = JSON.parse(tododatajson);
    var parent = document.getElementById(id);
    parent.innerText = tododatajson;
}
    //var
 /*   if(parent)
    {
        Object.keys(todos).forEach(

            function(key) {
                var todoelement =a;


            }



        )
}}*/
function gettodoajax()
{
    var xhr=new XMLHttpRequest();
    xhr.open("GET","/api/todos",true);
    xhr.onreadystatechange=function()
    {
        if(xhr.readyState==RESPONSE_DONE)
        {
            if(xhr.status==STATUS_OK)
            {
                console.log(xhr.responseText);
                addtodoelements(ID,xhr.responseText);


            }
        }
    }

    xhr.send(data=null);

}

function todosjax()
{
    var title=document.getElementById(NEWTODOINPUTELEMENT).value;
    var xhr=new XmlHttpRequest();
    xhr.open("POST","api/todos",true);
     xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded")
    var data="todo_title"+encodeURI(title);
     xhr.onreadystatechange=function () {
         if (xhr.readyState == RESPONSE_DONE) {
             if (xhr.status == STATUS_OK) {
                 gettodoajax();

             }

         }

     }
}