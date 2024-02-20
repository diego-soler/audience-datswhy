SELECT am.*
FROM audience_metadata, JSON_TABLE(doc,
  '$' COLUMNS (
    zona_geografica VARCHAR(100) PATH '$.geographicZone',
    nombre_tabla VARCHAR(255) PATH '$.tableName',
    NESTED PATH '$.categories[*]' COLUMNS (
      nombre_categoria VARCHAR(80) PATH '$.name',
      descripcion_categoria VARCHAR(1024) PATH '$.description',
      NESTED PATH '$.subcategories[*]' COLUMNS (
        nombre_subcategoria VARCHAR(80) PATH '$.name',
        descripcion_subcategoria VARCHAR(1024) PATH '$.description',
        NESTED PATH '$.segments[*]' COLUMNS (
          nombre_segmento VARCHAR(80) PATH '$.name',
          descripcion_segmento VARCHAR(1024) PATH '$.description'
        )
      )
    )
  )
) AS am
ORDER BY
  zona_geografica ASC,
  nombre_categoria ASC,
  nombre_subcategoria ASC,
  nombre_segmento ASC