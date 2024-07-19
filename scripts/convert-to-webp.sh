#!/bin/bash

# Directory where JPG images are located in assets folder
JPG_ASSETS_DIR="./src/assets/img"

# Loop through JPG files in assets folder and convert each to WebP
for img in "$JPG_ASSETS_DIR"/*.jpg; do
    filename=$(basename "$img")
    filename_noext="${filename%.*}"
    magick "$JPG_ASSETS_DIR/$filename" "$JPG_ASSETS_DIR/$filename_noext.webp"
done

# Directory where JPG images are located in public folder
JPG_PUBLIC_DIR="./public/img"

# Loop through JPG files in public folder and convert each to WebP
for img in "$JPG_PUBLIC_DIR"/*.jpg; do
    filename=$(basename "$img")
    filename_noext="${filename%.*}"
    magick "$JPG_PUBLIC_DIR/$filename" "$JPG_PUBLIC_DIR/$filename_noext.webp"
done