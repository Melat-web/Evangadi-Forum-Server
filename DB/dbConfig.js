// require("dotenv").config();
// let mysql2 = require("mysql2");

// const dbConnection = mysql2.createPool(process.env.urlDB);

// // SQL commands for creating tables
// const createTables = [
//     `CREATE TABLE if not exists users(
//         Userid int auto_increment not null,
//         Username varchar(20) not null,
//         Firstname varchar(20) not null,
//         Lastname varchar(20) not null,
//         Email varchar(40) not null,
//         Password varchar(100) not null,
//         PRIMARY KEY (Userid)
//     );`,
//     `CREATE TABLE if not exists questions(
//         id int not null auto_increment,
//         questionid varchar(100) not null unique,
//         userid int not null,
//         title varchar(200) not null,
//         description varchar(200) not null,
//         tag varchar(20),
//         PRIMARY KEY (id, questionid),
//         FOREIGN KEY (userid) REFERENCES users(userid)
//     );`,
//     `CREATE TABLE if not exists answers(
//         answerid int auto_increment not null,
//         userid int not null,
//         questionid varchar(200) not null,
//         answer varchar(200) not null,
//         PRIMARY KEY (answerid),
//         FOREIGN KEY (Userid) REFERENCES users(userid),
//         FOREIGN KEY (questionid) REFERENCES questions(questionid)
//     );`,
//     `ALTER TABLE answers MODIFY COLUMN answer VARCHAR(500);`,
// ];

// // Execute the SQL commands individually
// createTables.forEach((sql) => {
//     dbConnection.query(sql, (err, results) => {
//         if (err) {
//             console.error("Error creating tables:", err);
//         } else {
//             console.log("Tables created successfully:", results);
//         }
//     });
// });

// module.exports = dbConnection.promise();

require("dotenv").config();
let mysql2 = require("mysql2");
const dbConnection = mysql2.createPool({
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
});

const users = `
    CREATE TABLE IF NOT EXISTS users (
        userid INT AUTO_INCREMENT NOT NULL,
        username VARCHAR(20) NOT NULL,
        firstname VARCHAR(20) NOT NULL,
        lastname VARCHAR(20) NOT NULL,
        email VARCHAR(40) NOT NULL,
        password VARCHAR(100) NOT NULL,
        PRIMARY KEY (userid)
    )
`;

dbConnection.query(users, (err, result) => {
    if (err) {
        throw err;
    }
    console.log("Users table created successfully.");
});

const questions = `
    CREATE TABLE IF NOT EXISTS questions (
        id INT NOT NULL AUTO_INCREMENT,
        questionid VARCHAR(100) NOT NULL UNIQUE,
        userid INT NOT NULL,
        title VARCHAR(200) NOT NULL,
        description VARCHAR(200) NOT NULL,
        tag VARCHAR(20),
        PRIMARY KEY (id, questionid)
   
    )
`;

dbConnection.query(questions, (err, result) => {
    if (err) {
        throw err;
    }
    console.log("Questions table created successfully.");
});

const answer = `
    CREATE TABLE IF NOT EXISTS answers (
        answerid INT AUTO_INCREMENT NOT NULL,
        userid INT NOT NULL,
        questionid VARCHAR(200) NOT NULL,
        answer VARCHAR(200) NOT NULL,    
        PRIMARY KEY (answerid)
     
    )
`;

dbConnection.query(answer, (err, result) => {
    if (err) {
        throw err;
    }
    console.log("Answer table created successfully.");
});

module.exports = dbConnection.promise();
