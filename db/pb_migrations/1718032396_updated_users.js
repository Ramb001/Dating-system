/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("syh0oev6kn4vnow")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "6pvl7rek",
    "name": "city",
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

  // remove
  collection.schema.removeField("6pvl7rek")

  return dao.saveCollection(collection)
})
