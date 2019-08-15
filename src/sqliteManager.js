import sqlite3 from 'sqlite3';
import sqlite from 'sqlite';
import path from 'path';
import { error } from 'util';
import { selectQuery, createTokenTableQuery } from './constants';

const databasePath = path.join(__dirname, '/../database.sqlite');
const sqliteDB = sqlite3.verbose();

function dbInitializer() {
  return new Promise((resolve, reject) => {
    const db = new sqliteDB.Database(databasePath, err => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(db);
      }
    });
  });
}
function createStateTable(db) {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run(createTokenTableQuery, err => {
        if (err) reject(err);
        else {
          resolve(db);
        }
      });
    });
  });
}
// function insertState(db) {
//   return new Promise((resolve, reject) => {
//     db.serialize(() => {
//       const insertIntoStateTable =
//         'INSERT INTO State (stateID , idToken , role , lastURL) VALUES (?, ?, ?, ?)';
//       db.run(insertIntoStateTable, stateHashedKey, '', '', '', (err) => {
//         if (err) {
//           console.log("could not insert" , err);
//         } else {
//           const data = {
//             idToken: 'hello',
//             role: 'reviewer',
//             lasturl: '/forget',
//           };
//           console.log("******************3-INSERTED SUCCESSFULLY*********************");
//           resolve(data);
//         }
//       });
//     });
//   })
// }
function InitializeSQLite() {
  dbInitializer()
    .then(function(db) {
      console.log(
        '**************1-Connected to the SQlite database***************',
      );
      createStateTable(db)
        .then(function() {
          console.log(
            '****************2-created succesfully : ***************',
          );
        })
        .catch(err => {
          throw err;
        });
    })
    .catch(err => {
      throw err;
    });
}
async function readTokenIdFromDB(id) {
  const db = await sqlite.open(databasePath, { Promise });
  const state = await Promise.all([db.get(selectQuery, id)]);
  return state[0];
}
export { InitializeSQLite, databasePath, stateHashedKey, readTokenIdFromDB };
