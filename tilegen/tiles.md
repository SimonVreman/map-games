generate

```
bun run tool:generate-base-tiles
```

upload

```
AWS_EC2_METADATA_DISABLED=true AWS_REQUEST_CHECKSUM_CALCULATION=WHEN_REQUIRED aws s3 cp output/tiles/ s3://bucket/dir/ --endpoint-url=https://s3.eu-central-003.backblazeb2.com --recursive \
  --content-type=application/x-protobuf \
  --exclude "*" --include "*.pbf"
```
