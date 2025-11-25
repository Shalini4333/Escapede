"""
Image Resizing Script using Lanczos Resampling
This script resizes images while maintaining aspect ratio using Lanczos resampling
"""

import os
from PIL import Image
import argparse
from pathlib import Path

def resize_image_with_aspect_ratio(image_path, output_path, max_width=None, max_height=None, quality=95):
    """
    Resize an image while maintaining aspect ratio using Lanczos resampling
    
    Args:
        image_path (str): Path to the input image
        output_path (str): Path for the output image
        max_width (int): Maximum width (optional)
        max_height (int): Maximum height (optional)
        quality (int): JPEG quality (1-100, default: 95)
    """
    try:
        # Open the image
        with Image.open(image_path) as img:
            # Get original dimensions
            original_width, original_height = img.size
            print(f"Original size: {original_width}x{original_height}")
            
            # Calculate new dimensions while maintaining aspect ratio
            if max_width and max_height:
                # Fit within both constraints
                ratio = min(max_width / original_width, max_height / original_height)
            elif max_width:
                # Fit within width constraint
                ratio = max_width / original_width
            elif max_height:
                # Fit within height constraint
                ratio = max_height / original_height
            else:
                # Default to 50% if no constraints given
                ratio = 0.5
            
            # Calculate new dimensions
            new_width = int(original_width * ratio)
            new_height = int(original_height * ratio)
            
            print(f"New size: {new_width}x{new_height}")
            
            # Resize using Lanczos resampling (high quality)
            resized_img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
            
            # Save the resized image
            if img.format == 'JPEG' or output_path.lower().endswith(('.jpg', '.jpeg')):
                # For JPEG images, maintain quality
                resized_img.save(output_path, 'JPEG', quality=quality, optimize=True)
            else:
                # For PNG and other formats
                resized_img.save(output_path, optimize=True)
                
            print(f"✓ Resized and saved: {output_path}")
            
    except Exception as e:
        print(f"✗ Error processing {image_path}: {str(e)}")

def batch_resize_images(input_dir, output_dir=None, max_width=None, max_height=None, quality=95):
    """
    Batch resize all images in a directory
    
    Args:
        input_dir (str): Input directory containing images
        output_dir (str): Output directory (optional, defaults to input_dir/resized)
        max_width (int): Maximum width
        max_height (int): Maximum height
        quality (int): JPEG quality
    """
    input_path = Path(input_dir)
    
    # Set output directory
    if output_dir is None:
        output_path = input_path / "resized"
    else:
        output_path = Path(output_dir)
    
    # Create output directory if it doesn't exist
    output_path.mkdir(exist_ok=True)
    
    # Supported image extensions
    supported_extensions = {'.jpg', '.jpeg', '.png', '.bmp', '.tiff', '.tif'}
    
    # Process all images in the directory
    image_files = [f for f in input_path.iterdir() 
                  if f.is_file() and f.suffix.lower() in supported_extensions]
    
    if not image_files:
        print("No supported image files found in the directory.")
        return
    
    print(f"Found {len(image_files)} image(s) to process...")
    print(f"Output directory: {output_path}")
    print("-" * 50)
    
    for image_file in image_files:
        output_file = output_path / image_file.name
        print(f"Processing: {image_file.name}")
        resize_image_with_aspect_ratio(
            str(image_file), 
            str(output_file), 
            max_width, 
            max_height, 
            quality
        )
        print("-" * 30)

def main():
    """Main function with command line argument parsing"""
    parser = argparse.ArgumentParser(description='Resize images using Lanczos resampling while maintaining aspect ratio')
    parser.add_argument('input_dir', help='Input directory containing images')
    parser.add_argument('-o', '--output', help='Output directory (default: input_dir/resized)')
    parser.add_argument('-w', '--width', type=int, help='Maximum width in pixels')
    parser.add_argument('--height', type=int, help='Maximum height in pixels')
    parser.add_argument('-q', '--quality', type=int, default=95, help='JPEG quality (1-100, default: 95)')
    
    args = parser.parse_args()
    
    # Validate input directory
    if not os.path.isdir(args.input_dir):
        print(f"Error: Input directory '{args.input_dir}' does not exist.")
        return
    
    # Validate that at least one dimension is provided
    if not args.width and not args.height:
        print("Error: Please provide at least one dimension (--width or --height)")
        return
    
    # Validate quality
    if not 1 <= args.quality <= 100:
        print("Error: Quality must be between 1 and 100")
        return
    
    print("Image Resizing Script")
    print("=" * 50)
    print(f"Input directory: {args.input_dir}")
    print(f"Max width: {args.width or 'Not specified'}")
    print(f"Max height: {args.height or 'Not specified'}")
    print(f"Quality: {args.quality}")
    print("=" * 50)
    
    batch_resize_images(args.input_dir, args.output, args.width, args.height, args.quality)
    print("\nProcessing complete!")

if __name__ == "__main__":
    # Example usage if run directly without command line arguments
    if len(os.sys.argv) == 1:
        print("Example usage:")
        print("python resize_images.py . -w 800 -h 600")
        print("python resize_images.py . -w 1920")
        print("python resize_images.py . -h 1080 -q 85")
        print("\nProcessing current directory with default settings (max width: 1920px)...")
        
        current_dir = os.path.dirname(os.path.abspath(__file__))
        batch_resize_images(current_dir, max_width=1920, quality=90)
    else:
        main()
