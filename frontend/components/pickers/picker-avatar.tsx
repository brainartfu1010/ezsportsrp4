"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { Button, Buttons } from "@/components/controls/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { Upload as UploadIcon, Trash2 as TrashIcon } from "lucide-react";

interface AvatarPickerProps {
  value?: string | null; // controlled value (base64)
  onChange?: (image: string | null) => void;
  layout?: "horizontal" | "vertical";
  width?: number;
  height?: number;
}

export default function AvatarPicker({
  value,
  onChange,
  layout = "vertical",
  width = 120,
  height = 120,
}: AvatarPickerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [image, setImage] = useState<string | null>(null);
  const [scale, setScale] = useState(100);
  const [rotate, setRotate] = useState(0);
  const [position, setPosition] = useState({ x: 0.5, y: 0.5 });
  const [isDragging, setIsDragging] = useState(false);

  // Track if the value change comes from this component (local)
  const isLocalChange = useRef(false);

  /** ----------------------------
   * Controlled value sync
   * ---------------------------- */
  useEffect(() => {
    if (isLocalChange.current) {
      isLocalChange.current = false; // skip feedback loop
      return;
    }

    if (value && value !== image) {
      // Validate image URL/data
      const validateImageUrl = (url: string) => {
        return new Promise<boolean>((resolve) => {
          if (!url) {
            console.error('Invalid image: Empty URL');
            resolve(false);
            return;
          }

          // Check if it's a data URL or a valid HTTP/HTTPS URL
          if (!url.startsWith('data:image/') && 
              !url.startsWith('http://') && 
              !url.startsWith('https://')) {
            console.error('Invalid image URL format:', url);
            resolve(false);
            return;
          }

          // For data URLs, we can skip further validation
          if (url.startsWith('data:image/')) {
            resolve(true);
            return;
          }

          // For HTTP/HTTPS URLs, attempt to load the image
          const testImg = new Image();
          testImg.onload = () => {
            console.log('Image URL is valid:', url);
            resolve(true);
          };
          testImg.onerror = (e) => {
            console.error('Failed to load image URL:', url, e);
            resolve(false);
          };
          testImg.src = url;
        });
      };

      validateImageUrl(value).then((isValid) => {
        if (isValid) {
          setImage(value);
          // Only reset zoom/rotate/position if image actually changed
          setScale(100);
          setRotate(0);
          setPosition({ x: 0.5, y: 0.5 });
        } else {
          console.error('Invalid image provided:', value);
          // Optionally, reset the image
          setImage(null);
        }
      });
    } else if (!value && image) {
      setImage(null);
    }
  }, [value]);

  /** ----------------------------
   * Image rendering
   * ---------------------------- */
  const renderImage = useCallback(() => {
    if (!canvasRef.current || !imageRef.current || !image) return null;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Save context state
    ctx.save();

    // Move to center of canvas
    ctx.translate(canvas.width / 2, canvas.height / 2);

    // Rotate
    ctx.rotate((rotate * Math.PI) / 180);

    // Calculate scale
    const scaleFactor = scale / 100;
    ctx.scale(scaleFactor, scaleFactor);

    // Draw image with adjusted position
    const img = imageRef.current;
    const aspectRatio = img.naturalWidth / img.naturalHeight;
    const drawWidth =
      aspectRatio > 1 ? canvas.width : canvas.height * aspectRatio;
    const drawHeight =
      aspectRatio > 1 ? canvas.width / aspectRatio : canvas.height;

    const offsetX = (position.x - 0.5) * (drawWidth - canvas.width);
    const offsetY = (position.y - 0.5) * (drawHeight - canvas.height);

    ctx.drawImage(
      img,
      -drawWidth / 2 + offsetX,
      -drawHeight / 2 + offsetY,
      drawWidth,
      drawHeight
    );

    // Restore context state
    ctx.restore();

    // Generate result image
    return canvas.toDataURL();
  }, [image, scale, rotate, position]);

  /** ----------------------------
   * Safe onChange
   * ---------------------------- */
  const safeOnChange = (next: string | null) => {
    if (next === value) return;
    isLocalChange.current = true;
    onChange?.(next);
  };

  /** ----------------------------
   * File handling
   * ---------------------------- */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validate file type and size
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    if (!validTypes.includes(file.type)) {
      console.error('Invalid file type. Please upload an image.');
      return;
    }
    
    if (file.size > maxSize) {
      console.error('File is too large. Maximum size is 5MB.');
      return;
    }
    
    const reader = new FileReader();
    
    reader.onloadstart = () => {
      console.log('Starting to read file:', file.name);
    };
    
    reader.onloadend = () => {
      const img = reader.result as string;
      
      // Validate data URL
      if (!img.startsWith('data:image/')) {
        console.error('Invalid image data URL');
        return;
      }
      
      setImage(img);
      setScale(100);
      setRotate(0);
      setPosition({ x: 0.5, y: 0.5 });
      safeOnChange(img);
    };
    
    reader.onerror = (error) => {
      console.error('Error reading file:', error);
    };
    
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleChooseFile = () => fileInputRef.current?.click();
  const handleRemoveImage = () => {
    setImage(null);
    safeOnChange(null);
  };

  /** ----------------------------
   * Zoom/Rotate handlers
   * ---------------------------- */
  const handleScaleChange = (v: number[]) => {
    setScale(v[0]);
    // Delay onChange to prevent too many updates
    setTimeout(() => {
      const result = renderImage();
      if (result) safeOnChange(result);
    }, 200);
  };

  const handleRotateChange = (v: number[]) => {
    setRotate(v[0]);
    // Delay onChange to prevent too many updates
    setTimeout(() => {
      const result = renderImage();
      if (result) safeOnChange(result);
    }, 200);
  };

  /** ----------------------------
   * Wheel zoom
   * ---------------------------- */
  useEffect(() => {
    if (!image) return;

    const handleWheel = (e: WheelEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      // Prevent default scrolling
      e.preventDefault();
      e.stopPropagation();

      // Determine if the wheel event is within the canvas
      const rect = canvas.getBoundingClientRect();
      const isWithinCanvas = 
        e.clientX >= rect.left && 
        e.clientX <= rect.right && 
        e.clientY >= rect.top && 
        e.clientY <= rect.bottom;

      if (!isWithinCanvas) return;

      // Adjust scale with more precise control
      setScale(prev => {
        // Use smaller divisor and more controlled scaling
        const scaleChange = e.deltaY > 0 ? -5 : 5;
        const newScale = Math.min(400, Math.max(50, prev + scaleChange));
        
        return newScale;
      });
    };

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('wheel', handleWheel, { passive: false });
      return () => {
        canvas.removeEventListener('wheel', handleWheel);
      };
    }
  }, [image]);

  // Effect to handle rendering after scale changes
  useEffect(() => {
    if (image) {
      const result = renderImage();
      if (result) safeOnChange(result);
    }
  }, [scale, image, renderImage, safeOnChange]);

  /** ----------------------------
   * Pan (position) handling
   * ---------------------------- */
  const [panStart, setPanStart] = useState<{ x: number; y: number } | null>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!image) return;

    // Prevent default to stop text selection
    e.preventDefault();
    
    // Get canvas dimensions and bounding rectangle
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    
    // Calculate mouse position relative to canvas
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Store the initial pan start point
    setPanStart({ 
      x: mouseX / canvas.width, 
      y: mouseY / canvas.height 
    });
    
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !image || !panStart) return;
    
    // Prevent default to stop text selection
    e.preventDefault();

    // Get canvas dimensions and bounding rectangle
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    
    // Calculate mouse position relative to canvas
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Calculate delta in normalized coordinates
    const currentPos = { 
      x: mouseX / canvas.width, 
      y: mouseY / canvas.height 
    };

    // Calculate the movement delta
    const deltaX = currentPos.x - panStart.x;
    const deltaY = currentPos.y - panStart.y;

    // Update position
    setPosition(prev => {
      const newX = Math.min(1, Math.max(0, prev.x - deltaX));
      const newY = Math.min(1, Math.max(0, prev.y - deltaY));
      
      return { x: newX, y: newY };
    });

    // Update pan start for next move
    setPanStart(currentPos);
  };

  // Effect to handle rendering after position changes
  useEffect(() => {
    if (image) {
      const result = renderImage();
      if (result) safeOnChange(result);
    }
  }, [position, image, renderImage, safeOnChange]);

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    // Prevent default to stop text selection
    e.preventDefault();
    
    setIsDragging(false);
    setPanStart(null);
  };

  /** ----------------------------
   * Render
   * ---------------------------- */
  return (
    <div
      className={cn(
        "flex flex-col gap-2",
        layout === "horizontal" ? "flex-row items-center" : ""
      )}
    >
      <div
        className="avatar-editor-container relative bg-[repeating-conic-gradient(#eee_0_25%,#ccc_0_50%)]"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          backgroundSize: "20px 20px",
        }}
      >
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className={`border-1 ${image ? 'cursor-move' : ''}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />
        {image && (
          <img
            ref={imageRef}
            src={image}
            alt="Source"
            className="hidden"
            onLoad={() => {
              const result = renderImage();
              if (result) safeOnChange(result);
            }}
            onError={(e) => {
              console.error('Image failed to load:', {
                src: image,
                errorEvent: e,
                imageRef: imageRef.current,
                imageRefSrc: imageRef.current?.src,
                imageRefComplete: imageRef.current?.complete,
                imageRefNaturalWidth: imageRef.current?.naturalWidth,
                imageRefNaturalHeight: imageRef.current?.naturalHeight
              });
            }}
          />
        )}
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center gap-4">
        <Button
          type="button"
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            handleChooseFile();
          }}
          variant="default"
          icon="upload"
          size="sm"
        />
        <Button
          type="button"
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            handleRemoveImage();
          }}
          variant="destructive"
          icon="delete"
          size="sm"
          disabled={!image}
        />
      </div>

      {/* Sliders Panel */}
      <div className="w-full space-y-4">
        {/* Zoom */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`text-sm ${!image ? "text-gray-400" : ""}`}>
                Zoom
              </span>
            </div>
            <span className={`text-sm ${!image ? "text-gray-400" : ""}`}>
              {scale}%
            </span>
          </div>
          <Slider
            className="w-full"
            min={50}
            max={400}
            value={[scale]}
            onValueChange={handleScaleChange}
            disabled={!image}
          />
        </div>

        {/* Rotate */}
        <div className="space-y-2 mb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`text-sm ${!image ? "text-gray-400" : ""}`}>
                Rotate
              </span>
            </div>
            <span className={`text-sm ${!image ? "text-gray-400" : ""}`}>
              {rotate}°
            </span>
          </div>
          <Slider
            className="w-full"
            min={-180}
            max={180}
            value={[rotate]}
            onValueChange={handleRotateChange}
            disabled={!image}
          />
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}

// Remove all custom icon components
