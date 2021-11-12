/** Creates a table for users
 * @param
 * @returns a table user with the neccessary rows
 */

 async function createTable(db) {
    await db.schema.hasTable('users').then(async (exists) => {
      if (!exists) {
          return db.schema.createTable('users', (table) => {
            table.increments("id").primary();
            table.uuid('uuid');
            table.string('name');
            table.string('age');
          }).then(async () => {console.log('created new table users');
        });
      }else{
          console.log("users table already exists");
      }
    });
  }

  module.exports = {createTable}