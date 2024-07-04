### Image Conversion to WebP

To convert PNG images to WebP format, use the `convert-to-webp.sh` script located in the `scripts` directory. This script automates the conversion process using ImageMagick.

#### Usage:

1. Install ImageMagick: `brew install imagemagick` (for macOS) or `sudo apt-get install imagemagick` (for Ubuntu/Debian).

2. Make the script executable: `chmod +x scripts/convert-to-webp.sh`.

3. Run the script: `./scripts/convert-to-webp.sh`.

This script will convert all PNG images in the specified directories to WebP format, optimizing them for web usage.