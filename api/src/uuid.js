/** Generate a UUID
 * 
 * @returns a unique ID based on v1 uuid
 */

const {v1: uuidv1 } = require('uuid');
const key = {
  generateUUID: () => {
     const uuid = uuidv1();  
     return uuid;
  }
}
module.exports = key;