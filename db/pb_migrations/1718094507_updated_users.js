/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("syh0oev6kn4vnow")

  // remove
  collection.schema.removeField("6sgv25kt")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "6iam9hhs",
    "name": "years",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("syh0oev6kn4vnow")

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

  // remove
  collection.schema.removeField("6iam9hhs")

  return dao.saveCollection(collection)
})
