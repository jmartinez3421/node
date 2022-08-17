const http = require('http');

http.createServer((req, res) => {

    // res.writeHead(200, { 'Content-Type': 'application/json' });
    res.setHeader('Content-Disposition', 'attachment; filename=list.csv');
    res.writeHead(200, { 'Content-Type': 'application/csv' });

    // const person = {
    //     id: 1,
    //     name: 'Jordi'
    // }
    //
    // res.write(JSON.stringify(person));  //Sends a response

    res.write('id, name\n');
    res.write('1, Jordi\n');
    res.write('2, Juan\n');
    res.write('3, Carlos\n');
    res.write('4, Anna\n');
    res.write('5, Julia\n');

    res.end(); //Ends the response
})
    .listen( 8080 );

console.log('Listening port: ', 8080);
