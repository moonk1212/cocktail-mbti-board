const mysql = require('mysql'); 
 require('dotenv').config();
const connection = mysql.createConnection({ 
    host: process.env.DB_HOST,
    user:process.env.DB_USER, 
    password:process.env.DB_PASSWORD, 
    port:process.env.DB_PORT, 
    database:process.env.DB_DATABASE,
    dateStrings:process.env.DB_DATESTRINGS 
});
function getAllMemos(callback){ 
    connection.query(`SELECT * FROM MEMOS ORDER BY ID DESC`, (err, rows, fields) => {
        if(err) throw err; 
        callback(rows); 
    }); 
}
function insertMemo(content, callback){ 
    connection.query(`INSERT INTO MEMOS (CONTENT, CREATED_AT, UPDATED_AT) VALUES ('${content}',NOW(),NOW())`
    , (err, result) =>{ 
        if (err) throw err; 
        callback(); 
    }); 
}
function getMemoById(id, callback){ 
    connection.query(`SELECT * FROM MEMOS WHERE ID =${id}`, (err,row, fields) =>{ 
        if(err) throw err; 
        callback(row); 
    }); 
}
function updateMemoById(id, content , callback){
    connection.query(`UPDATE MEMOS SET CONTENT='${content}', UPDATED_AT=NOW() WHERE ID=${id}`, (err, result) => { 
        if(err) throw err; 
        callback(); 
    }); 
}

function deleteMemoById(id, callback){ 
    connection.query(`DELETE FROM MEMOS WHERE ID=${id}`, (err, result) =>{ 
        if(err) throw err; 
        callback(); 
    }); 
}


 
module.exports = { 
    getAllMemos,
    insertMemo, 
    getMemoById,
    updateMemoById, 
    deleteMemoById

}

