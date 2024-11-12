/**
 * DB should be initialied successfully
 * 
 */

const { DB, DBCollection } = require("../src/classes/Database")
let db = new DB(true);

test("Create a new collection", ()=>{
    db.addCollection("Mathematics");
    expect(JSON.stringify(db.getCollections())).toMatch(/Mathematics/)
})

test("Delete a collection", () => {
    db.removeCollection("Mathematics");
    expect(JSON.stringify(db.getCollections())).not.toMatch(/Mathematics/)
})


