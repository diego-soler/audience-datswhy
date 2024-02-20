# Query Example 2

```sql
SELECT am.* 
FROM audience_metadata, 
    JSON_TABLE(doc, '$' COLUMNS (
		nombre_tabla VARCHAR(255)  PATH '$.tableName',
		zona_geografica VARCHAR(100) PATH '$.geographicZone')
     ) AS am
WHERE am.nombre_tabla LIKE '%o%'
```