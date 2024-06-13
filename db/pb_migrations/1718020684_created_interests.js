/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "fj9yprdwadqb76v",
    "created": "2024-06-10 11:58:04.144Z",
    "updated": "2024-06-10 11:58:04.144Z",
    "name": "interests",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "kexvisnk",
        "name": "interest",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("fj9yprdwadqb76v");

  return dao.deleteCollection(collection);
})
