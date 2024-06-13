/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("syh0oev6kn4vnow")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cfcaoiiy",
    "name": "gender",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "male",
        "female"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("syh0oev6kn4vnow")

  // remove
  collection.schema.removeField("cfcaoiiy")

  return dao.saveCollection(collection)
})
