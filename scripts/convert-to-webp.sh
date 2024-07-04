#!/bin/bash

# Directory where PNG images are located in assets folder
PNG_ASSETS_DIR="./src/assets/img"

# Loop through PNG files in assets folder and convert each to WebP
for img in "$PNG_ASSETS_DIR"/*.png; do
    filename=$(basename "$img")
    filename_noext="${filename%.*}"
    magick "$PNG_ASSETS_DIR/$filename" "$PNG_ASSETS_DIR/$filename_noext.webp"
done

# Directory where PNG images are located in public folder
PNG_PUBLIC_DIR="./public/img"

# Loop through PNG files in public folder and convert each to WebP
for img in "$PNG_PUBLIC_DIR"/*.png; do
    filename=$(basename "$img")
    filename_noext="${filename%.*}"
    magick "$PNG_PUBLIC_DIR/$filename" "$PNG_PUBLIC_DIR/$filename_noext.webp"
done