from PIL import Image
import io
import cairosvg

# Convert SVG to PNG first
png_data = cairosvg.svg2png(url="images/logo.svg", output_width=64, output_height=64)

# Open the PNG data
img = Image.open(io.BytesIO(png_data))

# Save as ICO
img.save("images/favicon.ico")

# Also save as PNG for modern browsers
img.save("images/favicon.png")

print("Favicon created successfully!")
