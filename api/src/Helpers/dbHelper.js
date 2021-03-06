/** Creates a table for users
 * @param
 * @returns a table user with the neccessary rows
 */

 async function createTable(db) {
    await db.schema.hasTable('users').then(async (exists) => {
      if (!exists) {
          return db.schema.createTable('users', (table) => {
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

/** Creates a table for models
 * @param
 * @returns a table models with the neccessary rows
 */
  async function createModelsTable(db){
    await db.schema.hasTable('models').then(async (exists)=> {
      if (!exists){
        return db.schema.createTable('models', (table)=>{
          table.uuid('uuid');
          table.string('title');
          table.string('CreatedBy');
        }).then(async ()=>{
          console.log('created new table models');
        });
      }else{
        console.log("model table already exists");
      }
    });
  }
  module.exports = {createTable, createModelsTable}