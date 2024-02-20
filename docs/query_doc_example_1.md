# Query Example 1

```sql
SELECT 
  c.`code` as countryCode,
  JSON_UNQUOTE(doc-> '$.tableName') AS tableName,
  JSON_UNQUOTE(doc->'$.geographicZone') AS geographicZone,
  c.alias as countryAlias,
  JSON_UNQUOTE(doc->'$.categories')
FROM beeyond.audience_metadata as am
LEFT JOIN beeyond.country AS c ON c.`code` = JSON_UNQUOTE(am.doc->'$.geographicZone')
ORDER BY am.doc->'$.geographicZone' ASC;
```
