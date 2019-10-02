module.exports = function(){
    const mysql = require('mysql')

    const connection = mysql.createConnection({ //conf의 값을 가지고 db에 로그인한다.
    host : 'trabkim.c3kkdxpfurdg.ap-northeast-2.rds.amazonaws.com',
    user : 'scd7896',
    password : 'rlatjqj1423',
    port : 3306,
    database : 'trab'
});
    connection.connect();
    return connection
}