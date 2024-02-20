
import * as mysqlx from '@mysql/xdevapi';
import { faker } from '@faker-js/faker';
import { Category, Doc, Segment, Subcategory } from '../schemas/schema';

const MAX_NUM_SEGMENTS = 3;
const MAX_NUM_SUBCATEGORIES = 2;
const MAX_NUM_CATEGORIES = 2;

// Connect to server on localhost
mysqlx
  .getSession({
    user: 'root',
    password: 'root',
    host: 'localhost',
    port: 3306
  })
  .then(function (session: mysqlx.Session) {
    const schema = session.getSchema('beeyond');
    const coll = schema.getCollection('audience_metadata');
    // const coll = createCollection(schema);
    return coll;
  }).then(function (coll: mysqlx.Collection) {
    const firstDoc = getDocumentData();
    console.log(JSON.stringify(firstDoc, null, 2));
    const insert = coll.add(firstDoc);
    return insert.execute();
  })
  .then(function (result: mysqlx.Result) {
    console.log("Affected items count: ", result.getAffectedItemsCount());
  })
  .catch(function (err) {
    // Handle error
    console.error(err);
  });

function getSegments(): Segment[] {
  const numSegments = faker.number.int({ min: 1, max: MAX_NUM_SEGMENTS });
  const segments: Segment[] = [];
  for (let i= 0 ; i < numSegments; i++) {
    const segment = faker.commerce.productName();
    const segmentDesc = faker.commerce.productDescription();
    segments.push({
      name: segment,
      description: segmentDesc,
      ui: {
        title: {
          en: segment,
        },
        hint: {
          en: segmentDesc,
        }
      }
    });
  }
  return segments;
}

function getSubcategories(): Subcategory[] {
  const numSubcategories = faker.number.int({ min: 1, max: MAX_NUM_SUBCATEGORIES });
  const subcategories: Subcategory[] = [];
  for (let i= 0 ; i < numSubcategories; i++) {
    const subcategory = faker.commerce.productName();
    const subcategoryDesc = faker.commerce.productDescription();
    subcategories.push({
      name: subcategory,
      description: subcategoryDesc,
      ui: {
        title: {
          en: subcategory,
        },
        hint: {
          en: subcategoryDesc,
        }
      },
      segments: getSegments()
    });
  }
  return subcategories;
}

function getCategories(): Category[] {
  const numCategories = faker.number.int({ min: 1, max: MAX_NUM_CATEGORIES });
  const categories: Category[] = [];
  for (let i= 0 ; i < numCategories; i++) {
    const category = faker.commerce.productName();
    const categoryDesc = faker.commerce.productDescription();
    categories.push({
      name: category,
      description: categoryDesc,
      ui: {
        title: {
          en: category,
        },
        hint: {
          en: categoryDesc,
        }
      },
      subcategories: getSubcategories(),
    });
  }
  return categories;
}


function getDocumentData(): Doc {
  const doc: Doc = {
    geographicZone: "CO",
    tableName: "audience_colombia",
    providerName: "Colombian audience provider",
    categories: getCategories(),
  };
  return doc;
}

async function createCollection(schema: mysqlx.Schema): Promise<mysqlx.Collection> {
  return await schema.createCollection("audience_metadata", {
    validation: {
      level: "strict",
      schema: {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "properties": {
          "categories": {
            "items": {
              "additionalProperties": false,
              "properties": {
                "description": {
                  "type": "string"
                },
                "name": {
                  "type": "string"
                },
                "subcategories": {
                  "items": {
                    "additionalProperties": false,
                    "properties": {
                      "description": {
                        "type": "string"
                      },
                      "name": {
                        "type": "string"
                      },
                      "segments": {
                        "items": {
                          "additionalProperties": false,
                          "properties": {
                            "description": {
                              "type": "string"
                            },
                            "name": {
                              "type": "string"
                            },
                            "ui": {
                              "additionalProperties": false,
                              "properties": {
                                "hint": {
                                  "additionalProperties": {
                                    "type": "string"
                                  },
                                  "type": "object"
                                },
                                "title": {
                                  "additionalProperties": {
                                    "type": "string"
                                  },
                                  "type": "object"
                                }
                              },
                              "required": ["title", "hint"],
                              "type": "object"
                            }
                          },
                          "required": ["name", "description", "ui"],
                          "type": "object"
                        },
                        "type": "array"
                      },
                      "ui": {
                        "additionalProperties": false,
                        "properties": {
                          "hint": {
                            "additionalProperties": {
                              "type": "string"
                            },
                            "type": "object"
                          },
                          "title": {
                            "additionalProperties": {
                              "type": "string"
                            },
                            "type": "object"
                          }
                        },
                        "required": ["title", "hint"],
                        "type": "object"
                      }
                    },
                    "required": ["name", "description", "ui", "segments"],
                    "type": "object"
                  },
                  "type": "array"
                },
                "ui": {
                  "additionalProperties": false,
                  "properties": {
                    "hint": {
                      "additionalProperties": {
                        "type": "string"
                      },
                      "type": "object"
                    },
                    "title": {
                      "additionalProperties": {
                        "type": "string"
                      },
                      "type": "object"
                    }
                  },
                  "required": ["title", "hint"],
                  "type": "object"
                }
              },
              "required": ["name", "description", "ui", "subcategories"],
              "type": "object"
            },
            "type": "array"
          },
          "geographicZone": {
            "type": "string"
          },
          "providerName": {
            "type": "string"
          },
          "tableName": {
            "type": "string"
          }
        },
        "required": ["geographicZone", "tableName", "providerName", "categories"],
        "type": "object"
      },
    },
  });
}