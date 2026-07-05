import { useEffect, useMemo, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  TextField,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import toast from 'react-hot-toast';
import { FiSave, FiSend } from 'react-icons/fi';
import {
  PageHeader,
  GlassCard,
  ErrorState,
  SkeletonLoader,
} from '@/components/common';
import { useAsyncData } from '@/hooks';
import { createIncidentService } from './createIncidentService';
import { AiAssistPanel, AttachmentDropzone } from './components';
import styles from './CreateIncident.module.css';

const fieldSx = {
  '& .MuiOutlinedInput-root': { borderRadius: '4px' },
};

const defaultValues = {
  title: '',
  description: '',
  application: '',
  environment: 'Production',
  category: '',
  priority: 'medium',
  impact: 'team',
  urgency: 'medium',
  assignee: 'Unassigned',
  team: '',
};

function CreateIncident() {
  const navigate = useNavigate();
  const [attachments, setAttachments] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [savingDraft, setSavingDraft] = useState(false);

  const { data: options, loading, error, refetch } = useAsyncData(
    () => createIncidentService.getFormOptions(),
    []
  );

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isDirty },
  } = useForm({ defaultValues, mode: 'onBlur' });

  const description = watch('description');

  const aiSuggestion = useMemo(
    () => createIncidentService.getAiSuggestion(description),
    [description]
  );

  const applyAiSuggestion = () => {
    setValue('priority', aiSuggestion.priority, { shouldDirty: true });
    setValue('category', aiSuggestion.category, { shouldDirty: true });
    toast.success('AI suggestions applied');
  };

  const onSubmit = async (formData) => {
    setSubmitting(true);
    try {
      const result = await createIncidentService.submitIncident({
        ...formData,
        attachments: attachments.map((f) => f.name),
      });
      toast.success(`Incident ${result.id} created successfully`);
      navigate('/incidents');
    } catch {
      toast.error('Failed to create incident. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const onSaveDraft = async () => {
    setSavingDraft(true);
    try {
      const formData = watch();
      await createIncidentService.saveDraft({
        ...formData,
        attachments: attachments.map((f) => f.name),
      });
      toast.success('Draft saved');
    } catch {
      toast.error('Failed to save draft');
    } finally {
      setSavingDraft(false);
    }
  };

  const handleCancel = () => {
    if (isDirty && !window.confirm('Discard unsaved changes?')) return;
    navigate('/incidents');
  };

  useEffect(() => {
    if (options?.teams?.[0]) {
      setValue('team', options.teams[0]);
    }
  }, [options, setValue]);

  if (loading) {
    return (
      <div className={styles.createIncident}>
        <SkeletonLoader variant="page" />
      </div>
    );
  }

  if (error) {
    return <ErrorState message={error} onRetry={refetch} />;
  }

  if (!options) {
    return (
      <ErrorState
        title="Form unavailable"
        message="Unable to load incident form options."
        onRetry={refetch}
      />
    );
  }

  return (
    <div className={styles.createIncident}>
      <PageHeader
        title="Create incident"
        subtitle="Log a new incident with classification and assignment details"
        breadcrumbs={[
          { label: 'Home' },
          { label: 'Incidents' },
          { label: 'Create' },
        ]}
        variant="simple"
      />

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={styles.layout}>
          <div className={styles.formColumn}>
            <GlassCard title="Basic information" variant="solid">
              <div className={styles.formSection}>
                <Controller
                  name="title"
                  control={control}
                  rules={{
                    required: 'Title is required',
                    minLength: { value: 5, message: 'Minimum 5 characters' },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Title"
                      placeholder="Brief summary of the incident"
                      fullWidth
                      required
                      error={!!errors.title}
                      helperText={errors.title?.message}
                      sx={fieldSx}
                    />
                  )}
                />
                <Controller
                  name="description"
                  control={control}
                  rules={{
                    required: 'Description is required',
                    minLength: { value: 20, message: 'Minimum 20 characters' },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Description"
                      placeholder="Detailed description — symptoms, impact, steps taken..."
                      fullWidth
                      required
                      multiline
                      minRows={4}
                      error={!!errors.description}
                      helperText={errors.description?.message}
                      sx={fieldSx}
                    />
                  )}
                />
              </div>
            </GlassCard>

            <GlassCard title="Classification" variant="solid">
              <div className={styles.fieldGrid}>
                <Controller
                  name="application"
                  control={control}
                  rules={{ required: 'Application is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label="Application"
                      fullWidth
                      required
                      error={!!errors.application}
                      helperText={errors.application?.message}
                      sx={fieldSx}
                    >
                      {options.applications.map((app) => (
                        <MenuItem key={app} value={app}>
                          {app}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
                <Controller
                  name="environment"
                  control={control}
                  rules={{ required: 'Environment is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label="Environment"
                      fullWidth
                      required
                      error={!!errors.environment}
                      helperText={errors.environment?.message}
                      sx={fieldSx}
                    >
                      {options.environments.map((env) => (
                        <MenuItem key={env} value={env}>
                          {env}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
                <Controller
                  name="category"
                  control={control}
                  rules={{ required: 'Category is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label="Category"
                      fullWidth
                      required
                      error={!!errors.category}
                      helperText={errors.category?.message}
                      sx={fieldSx}
                    >
                      {options.categories.map((cat) => (
                        <MenuItem key={cat} value={cat}>
                          {cat}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
                <Controller
                  name="priority"
                  control={control}
                  rules={{ required: 'Priority is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label="Priority"
                      fullWidth
                      required
                      error={!!errors.priority}
                      helperText={errors.priority?.message}
                      sx={fieldSx}
                    >
                      {options.priorities.map((p) => (
                        <MenuItem key={p.value} value={p.value}>
                          {p.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
                <Controller
                  name="impact"
                  control={control}
                  rules={{ required: 'Impact is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label="Impact"
                      fullWidth
                      required
                      error={!!errors.impact}
                      helperText={errors.impact?.message}
                      sx={fieldSx}
                    >
                      {options.impacts.map((item) => (
                        <MenuItem key={item.value} value={item.value}>
                          {item.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
                <Controller
                  name="urgency"
                  control={control}
                  rules={{ required: 'Urgency is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label="Urgency"
                      fullWidth
                      required
                      error={!!errors.urgency}
                      helperText={errors.urgency?.message}
                      sx={fieldSx}
                    >
                      {options.urgencies.map((item) => (
                        <MenuItem key={item.value} value={item.value}>
                          {item.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </div>
            </GlassCard>

            <GlassCard title="Assignment" variant="solid">
              <div className={styles.fieldGrid}>
                <Controller
                  name="assignee"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label="Assignee"
                      fullWidth
                      sx={fieldSx}
                    >
                      {options.assignees.map((name) => (
                        <MenuItem key={name} value={name}>
                          {name}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
                <Controller
                  name="team"
                  control={control}
                  rules={{ required: 'Team is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      label="Team"
                      fullWidth
                      required
                      error={!!errors.team}
                      helperText={errors.team?.message}
                      sx={fieldSx}
                    >
                      {options.teams.map((team) => (
                        <MenuItem key={team} value={team}>
                          {team}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </div>
            </GlassCard>

            <GlassCard title="Attachments" subtitle="Optional supporting files" variant="solid">
              <AttachmentDropzone files={attachments} onChange={setAttachments} />
            </GlassCard>
          </div>

          <aside className={styles.sideColumn} aria-label="AI assistance">
            <GlassCard variant="solid" noPadding={false}>
              <AiAssistPanel
                suggestion={aiSuggestion}
                similarIncidents={options.similarIncidents}
                knowledgeArticles={options.knowledgeArticles}
                onApplySuggestion={applyAiSuggestion}
              />
            </GlassCard>
          </aside>
        </div>

        <div className={styles.actions}>
          <div className={styles.actionsLeft}>
            <p className={styles.requiredNote}>* Required fields</p>
          </div>
          <Button
            type="button"
            variant="outlined"
            onClick={handleCancel}
            disabled={submitting || savingDraft}
            sx={{ borderRadius: '4px', textTransform: 'none' }}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="outlined"
            startIcon={savingDraft ? <CircularProgress size={16} /> : <FiSave />}
            onClick={onSaveDraft}
            disabled={submitting || savingDraft}
            sx={{ borderRadius: '4px', textTransform: 'none' }}
          >
            Save draft
          </Button>
          <Button
            type="submit"
            variant="contained"
            startIcon={submitting ? <CircularProgress size={16} color="inherit" /> : <FiSend />}
            disabled={submitting || savingDraft}
            sx={{ borderRadius: '4px', textTransform: 'none', boxShadow: 'none' }}
          >
            Submit incident
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateIncident;
