/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("syh0oev6kn4vnow")

  // remove
  collection.schema.removeField("lyexou1l")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "6sgv25kt",
    "name": "birthday",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("syh0oev6kn4vnow")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lyexou1l",
    "name": "birthday",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  // remove
  collection.schema.removeField("6sgv25kt")

  return dao.saveCollection(collection)
})
