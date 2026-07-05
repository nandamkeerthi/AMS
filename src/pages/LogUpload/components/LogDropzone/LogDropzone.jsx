import { useCallback } from 'react';
import { Button } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { FiUploadCloud } from 'react-icons/fi';
import styles from './LogDropzone.module.css';

function LogDropzone({
  accept,
  maxSizeMb = 50,
  maxFiles = 20,
  currentCount = 0,
  disabled = false,
  onFilesAdded,
}) {
  const remainingSlots = Math.max(0, maxFiles - currentCount);

  const onDrop = useCallback(
    (acceptedFiles, fileRejections) => {
      if (acceptedFiles.length) {
        onFilesAdded?.(acceptedFiles.slice(0, remainingSlots));
      }

      if (fileRejections.length) {
        onFilesAdded?.([], fileRejections);
      }
    },
    [onFilesAdded, remainingSlots]
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept,
    maxSize: maxSizeMb * 1024 * 1024,
    multiple: true,
    noClick: true,
    noKeyboard: true,
    disabled: disabled || remainingSlots === 0,
  });

  return (
    <div className={styles.wrapper}>
      <div
        {...getRootProps()}
        className={`${styles.dropzone} ${isDragActive ? styles.dropzoneActive : ''} ${disabled || remainingSlots === 0 ? styles.dropzoneDisabled : ''}`}
      >
        <input {...getInputProps()} aria-label="Upload log files" />
        <FiUploadCloud className={styles.icon} size={36} aria-hidden="true" />
        <p className={styles.title}>
          {isDragActive ? 'Drop log files here' : 'Drag and drop log files'}
        </p>
        <p className={styles.text}>
          Drop files into this area or browse from your workstation.
        </p>
        <Button
          type="button"
          variant="contained"
          onClick={open}
          disabled={disabled || remainingSlots === 0}
          className={styles.browseButton}
        >
          Browse files
        </Button>
        <p className={styles.hint}>
          Up to {maxFiles} files · {maxSizeMb} MB per file · {remainingSlots} slot
          {remainingSlots === 1 ? '' : 's'} remaining
        </p>
      </div>
    </div>
  );
}

export default LogDropzone;
