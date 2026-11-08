import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function FileUpload({ label, onUploadComplete, required = false }) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');

  const handleUpload = async (event) => {
    try {
      setError('');
      const file = event.target.files[0];
      if (!file) return;

      // Validate (e.g., max 2MB, images only)
      if (file.size > 2 * 1024 * 1024) {
        setError('File size must be less than 2MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file (JPG, PNG)');
        return;
      }

      setUploading(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Generate unique file path: userId/timestamp-filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('applications')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('applications')
        .getPublicUrl(filePath);

      setPreview(publicUrl);
      onUploadComplete(publicUrl); // Send URL back to ApplyPage.jsx

    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold mb-2" style={{ color: '#0A1F44' }}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      <div 
        className="border-2 border-dashed rounded p-4 text-center transition-all"
        style={{ borderColor: preview ? '#C9A227' : '#334155', backgroundColor: '#F8FAFC' }}
      >
        {preview ? (
          <div className="flex flex-col items-center">
            <img src={preview} alt="Preview" className="h-24 w-24 object-cover rounded mb-2" />
            <span className="text-sm text-green-600 font-medium">Upload successful</span>
            <button 
              type="button" 
              onClick={() => { setPreview(null); onUploadComplete(null); }}
              className="text-xs text-red-500 mt-2 hover:underline"
            >
              Remove
            </button>
          </div>
        ) : (
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              disabled={uploading}
              className="hidden"
              id={`file-upload-${label.replace(/\s+/g, '-').toLowerCase()}`}
            />
            <label 
              htmlFor={`file-upload-${label.replace(/\s+/g, '-').toLowerCase()}`}
              className="cursor-pointer text-sm font-medium"
              style={{ color: '#0A1F44' }}
            >
              {uploading ? 'Uploading...' : 'Click to upload passport photograph'}
            </label>
            <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 2MB</p>
          </div>
        )}
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}
