import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUploadCloud } from 'react-icons/fi';
import styles from './AttachmentDropzone.module.css';

function AttachmentDropzone({ files = [], onChange }) {
  const onDrop = useCallback(
    (accepted) => {
      onChange?.([...files, ...accepted]);
    },
    [files, onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: 10 * 1024 * 1024,
  });

  const removeFile = (index) => {
    onChange?.(files.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div
        {...getRootProps()}
        className={`${styles.dropzone} ${isDragActive ? styles.dropzoneActive : ''}`}
      >
        <input {...getInputProps()} aria-label="Upload attachments" />
        <FiUploadCloud className={styles.icon} size={28} aria-hidden="true" />
        <p className={styles.text}>
          Drag & drop files here, or click to browse
        </p>
        <p className={styles.hint}>PDF, PNG, JPG, LOG — max 10 MB each</p>
      </div>
      {files.length > 0 && (
        <ul className={styles.fileList}>
          {files.map((file, index) => (
            <li key={`${file.name}-${index}`} className={styles.fileItem}>
              <span>{file.name}</span>
              <button
                type="button"
                className={styles.removeBtn}
                onClick={() => removeFile(index)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AttachmentDropzone;
