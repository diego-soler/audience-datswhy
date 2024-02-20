# Create Table

```sql
CREATE TABLE `audience_metadata` (
  `doc` json DEFAULT NULL,
  `_id` varbinary(32) GENERATED ALWAYS AS (json_unquote(json_extract(`doc`,_utf8mb4'$._id'))) STORED NOT NULL,
  `_json_schema` json GENERATED ALWAYS AS (_utf8mb4'{"$schema":"http://json-schema.org/draft-07/schema#","properties":{"categories":{"items":{"additionalProperties":false,"properties":{"description":{"type":"string"},"name":{"type":"string"},"subcategories":{"items":{"additionalProperties":false,"properties":{"description":{"type":"string"},"name":{"type":"string"},"segments":{"items":{"additionalProperties":false,"properties":{"description":{"type":"string"},"name":{"type":"string"},"ui":{"additionalProperties":false,"properties":{"hint":{"additionalProperties":{"type":"string"},"type":"object"},"title":{"additionalProperties":{"type":"string"},"type":"object"}},"required":["title","hint"],"type":"object"}},"required":["name","description","ui"],"type":"object"},"type":"array"},"ui":{"additionalProperties":false,"properties":{"hint":{"additionalProperties":{"type":"string"},"type":"object"},"title":{"additionalProperties":{"type":"string"},"type":"object"}},"required":["title","hint"],"type":"object"}},"required":["name","description","ui","segments"],"type":"object"},"type":"array"},"ui":{"additionalProperties":false,"properties":{"hint":{"additionalProperties":{"type":"string"},"type":"object"},"title":{"additionalProperties":{"type":"string"},"type":"object"}},"required":["title","hint"],"type":"object"}},"required":["name","description","ui","subcategories"],"type":"object"},"type":"array"},"geographicZone":{"type":"string"},"providerName":{"type":"string"},"tableName":{"type":"string"}},"required":["geographicZone","tableName","providerName","categories"],"type":"object"}') VIRTUAL,
  PRIMARY KEY (`_id`),
  CONSTRAINT `$val_strict_0BC0345E426365EFD479540A8725EF83F349831A` CHECK (json_schema_valid(`_json_schema`,`doc`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci; 
```