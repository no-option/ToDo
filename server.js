const fs = require('fs')
const http = require('http')
const url = require('url')

http.createServer((request, response) => {
    let Prsed = url.parse(request.url, true);
    if (request.url === '/') {
        //read json store & push into it the new object
        let HTMLPage = fs.readFileSync('./addtask.html', 'utf-8');
        response.write(HTMLPage);
    }
    else if (Prsed.pathname === '/addtask') {
        let data=fs.readFileSync('./todo.json');
        data=JSON.parse(data);
        data.push(Prsed.query);
        fs.writeFileSync('./todo.json',JSON.stringify(data));
        response.write("Pushed Into Json");
    }
    else if(Prsed.pathname==='/tasks')
    {
        let data=fs.readFileSync('./todo.json');
        data=JSON.parse(data);
        let PendingTasks=data.filter((obj)=>{
              return obj.status=='pending';
        })
        console.log("Chole6e");
        console.log(PendingTasks);
    }
    response.end();
}).listen(3001)