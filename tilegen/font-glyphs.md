Using https://maplibre.org/font-maker/ convert the font to glyphs.

gzip

```bash
find output/glyphs/ -name "*.pbf" -exec gzip -9 {} \;
```

rename

```bash
find output/glyphs/ -name "*.pbf.gz" -exec sh -c 'mv "$0" "${0%.gz}"' {} \;
```

upload

```bash
AWS_EC2_METADATA_DISABLED=true AWS_REQUEST_CHECKSUM_CALCULATION=WHEN_REQUIRED aws s3 cp output/glyphs/ s3://bucket/fonts/glyph/name --endpoint-url=https://s3.eu-central-003.backblazeb2.com --recursive \
  --content-type=application/x-protobuf \
  --content-encoding=gzip \
  --exclude "*" --include "*.pbf"
```
