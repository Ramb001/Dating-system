/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("syh0oev6kn4vnow")

  // remove
  collection.schema.removeField("pbdzjceh")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0zkszwuf",
    "name": "description",
    "type": "editor",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "convertUrls": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("syh0oev6kn4vnow")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pbdzjceh",
    "name": "description",
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
  collection.schema.removeField("0zkszwuf")

  return dao.saveCollection(collection)
})
