import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { MenuItem, TextField } from '@mui/material';
import toast from 'react-hot-toast';
import {
  PageHeader,
  GlassCard,
  ErrorState,
  SkeletonLoader,
} from '@/components/common';
import { useAsyncData } from '@/hooks';
import { incidentService } from '@/services/incidentService';
import { LogDropzone, UploadFileList, SupportedFormatsPanel } from './components';
import styles from './LogUpload.module.css';

const fieldSx = {
  '& .MuiOutlinedInput-root': { borderRadius: '4px' },
};

function LogUpload() {
  const { data, loading, error, refetch } = useAsyncData(
    () => incidentService.getLogUploadPageData(),
    []
  );

  const [files, setFiles] = useState([]);
  const [application, setApplication] = useState('');
  const [environment, setEnvironment] = useState('');
  const timersRef = useRef(new Map());

  useEffect(() => {
    if (!data) return;

    setFiles(data.recentUploads.map(incidentService.normalizeUploadEntry));
    setApplication(data.context.defaultApplication);
    setEnvironment(data.context.defaultEnvironment);
  }, [data]);

  useEffect(() => () => {
    timersRef.current.forEach((timer) => clearInterval(timer));
    timersRef.current.clear();
  }, []);

  const acceptMap = useMemo(
    () => incidentService.buildAcceptMap(data?.supportedFormats ?? []),
    [data?.supportedFormats]
  );

  const maxFiles = data?.pageConfig.maxFiles ?? 20;
  const maxFileSizeMb = data?.pageConfig.maxFileSizeMb ?? 50;

  const startUploadSimulation = useCallback((uploadId, fileSize) => {
    if (timersRef.current.has(uploadId)) return;

    const timer = setInterval(() => {
      setFiles((prev) => {
        let completed = false;

        const next = prev.map((entry) => {
          if (entry.id !== uploadId || entry.status !== 'uploading') {
            return entry;
          }

          const progress = incidentService.getNextProgress(entry.progress, fileSize);

          if (progress >= 100) {
            completed = true;
            return {
              ...entry,
              progress: 100,
              status: 'completed',
              uploadedAt: new Date().toISOString(),
            };
          }

          return { ...entry, progress };
        });

        if (completed) {
          clearInterval(timer);
          timersRef.current.delete(uploadId);
          toast.success('File uploaded successfully');
        }

        return next;
      });
    }, 180);

    timersRef.current.set(uploadId, timer);
  }, []);

  const handleFilesAdded = useCallback(
    (acceptedFiles, rejections = []) => {
      if (rejections.length) {
        toast.error('Some files were rejected. Check format and size limits.');
      }

      if (!acceptedFiles.length) return;

      const availableSlots = maxFiles - files.length;
      if (availableSlots <= 0) {
        toast.error(`Maximum of ${maxFiles} files allowed`);
        return;
      }

      const nextUploads = acceptedFiles
        .slice(0, availableSlots)
        .map((file) => incidentService.createUploadFromFile(file));

      setFiles((prev) => [...nextUploads, ...prev]);

      nextUploads.forEach((upload) => {
        startUploadSimulation(upload.id, upload.size);
      });

      if (acceptedFiles.length > availableSlots) {
        toast.error(`Only ${availableSlots} file(s) added due to upload limit`);
      } else {
        toast.success(
          nextUploads.length === 1
            ? `Uploading ${nextUploads[0].name}`
            : `Uploading ${nextUploads.length} files`
        );
      }
    },
    [files.length, maxFiles, startUploadSimulation]
  );

  const handleDelete = useCallback((fileId) => {
    const timer = timersRef.current.get(fileId);
    if (timer) {
      clearInterval(timer);
      timersRef.current.delete(fileId);
    }

    setFiles((prev) => {
      const target = prev.find((file) => file.id === fileId);
      if (target) {
        toast.success(`Removed ${target.name}`);
      }
      return prev.filter((file) => file.id !== fileId);
    });
  }, []);

  if (loading) {
    return (
      <div className={styles.page}>
        <SkeletonLoader variant="page" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <ErrorState
        title="Unable to load log upload"
        description={error || 'Something went wrong while loading upload settings.'}
        actionLabel="Retry"
        onAction={refetch}
      />
    );
  }

  const uploadingCount = files.filter((file) => file.status === 'uploading').length;
  const completedCount = files.filter((file) => file.status === 'completed').length;

  return (
    <div className={styles.page}>
      <PageHeader
        title={data.pageConfig.title}
        subtitle={data.pageConfig.subtitle}
        breadcrumbs={[
          { label: 'Home' },
          { label: 'Log Upload' },
        ]}
      />

      <div className={styles.summary}>
        <div className={styles.summaryItem}>
          <span className={styles.summaryValue}>{files.length}</span>
          <span className={styles.summaryLabel}>Total files</span>
        </div>
        <div className={styles.summaryItem}>
          <span className={styles.summaryValue}>{uploadingCount}</span>
          <span className={styles.summaryLabel}>Uploading</span>
        </div>
        <div className={styles.summaryItem}>
          <span className={styles.summaryValue}>{completedCount}</span>
          <span className={styles.summaryLabel}>Completed</span>
        </div>
      </div>

      <GlassCard title="Upload context" variant="solid" className={styles.contextCard}>
        <div className={styles.contextFields}>
          <TextField
            select
            label="Application"
            value={application}
            onChange={(event) => setApplication(event.target.value)}
            fullWidth
            size="small"
            sx={fieldSx}
          >
            {data.context.applications.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Environment"
            value={environment}
            onChange={(event) => setEnvironment(event.target.value)}
            fullWidth
            size="small"
            sx={fieldSx}
          >
            {data.context.environments.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <p className={styles.helpText}>{data.pageConfig.helpText}</p>
      </GlassCard>

      <div className={styles.grid}>
        <GlassCard title="Upload logs" variant="solid" className={styles.uploadCard}>
          <LogDropzone
            accept={acceptMap}
            maxSizeMb={maxFileSizeMb}
            maxFiles={maxFiles}
            currentCount={files.length}
            disabled={files.length >= maxFiles}
            onFilesAdded={handleFilesAdded}
          />
        </GlassCard>

        <GlassCard title="Supported formats" variant="solid" className={styles.formatsCard}>
          <SupportedFormatsPanel
            formats={data.supportedFormats}
            maxFileSizeMb={maxFileSizeMb}
          />
        </GlassCard>
      </div>

      <GlassCard
        title="File list"
        subtitle={`${files.length} file${files.length === 1 ? '' : 's'} in queue`}
        variant="solid"
      >
        <UploadFileList files={files} onDelete={handleDelete} />
      </GlassCard>
    </div>
  );
}

export default LogUpload;
