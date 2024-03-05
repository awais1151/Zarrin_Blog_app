import React from 'react';

interface UploadImageProps {
  onImageChange: (file: File) => void;
}

const UploadImage: React.FC<UploadImageProps> = ({ onImageChange }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageChange(file);
    }
  };

  return (
    <div className="form-group">
      <label htmlFor="image">Upload Image</label>
      <input
        type="file"
        id="image"
        name="image"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default UploadImage;