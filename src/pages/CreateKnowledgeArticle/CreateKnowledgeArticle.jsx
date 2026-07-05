import { useEffect, useState } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  TextField,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import toast from 'react-hot-toast';
import { FiSave, FiSend, FiRotateCcw } from 'react-icons/fi';
import {
  PageHeader,
  GlassCard,
  ErrorState,
  SkeletonLoader,
} from '@/components/common';
import { AttachmentDropzone } from '@/pages/Incidents/CreateIncident/components';
import { useAsyncData } from '@/hooks';
import { createKnowledgeArticleService } from './createKnowledgeArticleService';
import {
  TagsInput,
  DynamicListField,
  CommandsField,
  AiSummaryPlaceholder,
  ArticlePreview,
} from './components';
import styles from './CreateKnowledgeArticle.module.css';

const fieldSx = {
  '& .MuiOutlinedInput-root': { borderRadius: '4px' },
};

const defaultValues = {
  title: '',
  category: '',
  application: '',
  tags: [],
  problem: '',
  symptoms: '',
  rootCause: '',
  resolutionSteps: [{ title: '', description: '' }],
  commands: [],
};

function CreateKnowledgeArticle() {
  const navigate = useNavigate();
  const [attachments, setAttachments] = useState([]);
  const [savingDraft, setSavingDraft] = useState(false);
  const [publishing, setPublishing] = useState(false);

  const { data: options, loading, error, refetch } = useAsyncData(
    () => createKnowledgeArticleService.getFormOptions(),
    []
  );

  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues, mode: 'onBlur' });

  const formValues = watch();

  const {
    fields: stepFields,
    append: appendStep,
    remove: removeStep,
  } = useFieldArray({ control, name: 'resolutionSteps' });

  const {
    fields: commandFields,
    append: appendCommand,
    remove: removeCommand,
  } = useFieldArray({ control, name: 'commands' });

  useEffect(() => {
    if (!options) return;
    setValue('category', options.defaults.category);
    setValue('application', options.defaults.application);
  }, [options, setValue]);

  const buildPayload = (formData) => ({
    ...formData,
    attachments: attachments.map((file) => file.name),
    resolutionSteps: formData.resolutionSteps.filter((step) => step.title?.trim()),
    commands: formData.commands.filter(
      (cmd) => cmd.label?.trim() || cmd.command?.trim()
    ),
  });

  const onSaveDraft = async () => {
    setSavingDraft(true);
    try {
      const result = await createKnowledgeArticleService.saveDraft(
        buildPayload(watch())
      );
      toast.success(`Draft saved (${result.draftId})`);
    } catch {
      toast.error('Failed to save draft');
    } finally {
      setSavingDraft(false);
    }
  };

  const onPublish = async (formData) => {
    setPublishing(true);
    try {
      const result = await createKnowledgeArticleService.publishArticle(
        buildPayload(formData)
      );
      toast.success(`Article ${result.id} published successfully`);
      navigate(`/knowledge/${result.id}`);
    } catch {
      toast.error('Failed to publish article');
    } finally {
      setPublishing(false);
    }
  };

  const handleReset = () => {
    if (!window.confirm('Reset all form fields?')) return;
    reset(defaultValues);
    setAttachments([]);
    if (options) {
      setValue('category', options.defaults.category);
      setValue('application', options.defaults.application);
    }
    toast.success('Form reset');
  };

  if (loading) {
    return (
      <div className={styles.page}>
        <SkeletonLoader variant="page" />
      </div>
    );
  }

  if (error || !options) {
    return (
      <ErrorState
        title="Unable to load form"
        message={error || 'Something went wrong while loading article options.'}
        onRetry={refetch}
      />
    );
  }

  return (
    <div className={styles.page}>
      <PageHeader
        title="Create Knowledge Article"
        subtitle="Document runbooks, troubleshooting guides, and best practices"
        breadcrumbs={[
          { label: 'Home' },
          { label: 'Knowledge' },
          { label: 'Create Article' },
        ]}
        actions={
          <div className={styles.headerActions}>
            <Button
              type="button"
              variant="outlined"
              startIcon={savingDraft ? <CircularProgress size={16} /> : <FiSave />}
              disabled={savingDraft || publishing}
              onClick={onSaveDraft}
              className={styles.actionBtn}
            >
              Save Draft
            </Button>
            <Button
              type="submit"
              form="create-knowledge-form"
              variant="contained"
              startIcon={publishing ? <CircularProgress size={16} color="inherit" /> : <FiSend />}
              disabled={savingDraft || publishing}
              className={styles.actionBtn}
            >
              Publish
            </Button>
          </div>
        }
      />

      <form
        id="create-knowledge-form"
        className={styles.layout}
        onSubmit={handleSubmit(onPublish)}
        noValidate
      >
        <div className={styles.formColumn}>
          <GlassCard title="Article details" variant="solid">
            <div className={styles.fieldGrid}>
              <TextField
                label="Article Title"
                fullWidth
                required
                {...register('title', { required: 'Article title is required' })}
                error={Boolean(errors.title)}
                helperText={errors.title?.message}
                sx={fieldSx}
              />
              <TextField
                select
                label="Category"
                fullWidth
                required
                defaultValue=""
                {...register('category', { required: 'Category is required' })}
                error={Boolean(errors.category)}
                helperText={errors.category?.message}
                sx={fieldSx}
              >
                {options.categories.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                label="Application"
                fullWidth
                required
                {...register('application', { required: 'Application is required' })}
                error={Boolean(errors.application)}
                helperText={errors.application?.message}
                sx={fieldSx}
              >
                {options.applications.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>

            <div className={styles.tagsSection}>
              <span className={styles.fieldLabel}>Tags</span>
              <Controller
                name="tags"
                control={control}
                rules={{
                  validate: (value) => value.length > 0 || 'At least one tag is required',
                }}
                render={({ field }) => (
                  <TagsInput
                    value={field.value}
                    onChange={field.onChange}
                    suggestions={options.suggestedTags}
                    error={errors.tags}
                  />
                )}
              />
            </div>
          </GlassCard>

          <GlassCard title="Problem Statement" variant="solid">
            <TextField
              label="Problem Statement"
              fullWidth
              required
              multiline
              minRows={4}
              placeholder="Describe the problem this article addresses..."
              {...register('problem', { required: 'Problem statement is required' })}
              error={Boolean(errors.problem)}
              helperText={errors.problem?.message}
              sx={fieldSx}
            />
          </GlassCard>

          <GlassCard title="Symptoms" variant="solid">
            <TextField
              label="Symptoms"
              fullWidth
              required
              multiline
              minRows={4}
              placeholder="Enter one symptom per line..."
              {...register('symptoms', { required: 'Symptoms are required' })}
              error={Boolean(errors.symptoms)}
              helperText={errors.symptoms?.message || 'One symptom per line'}
              sx={fieldSx}
            />
          </GlassCard>

          <GlassCard title="Root Cause" variant="solid">
            <TextField
              label="Root Cause"
              fullWidth
              required
              multiline
              minRows={4}
              placeholder="Explain the underlying root cause..."
              {...register('rootCause', { required: 'Root cause is required' })}
              error={Boolean(errors.rootCause)}
              helperText={errors.rootCause?.message}
              sx={fieldSx}
            />
          </GlassCard>

          <GlassCard title="Resolution Steps" variant="solid">
            <DynamicListField
              title="Steps"
              fields={stepFields}
              append={appendStep}
              remove={removeStep}
              register={register}
              errors={errors}
              fieldName="resolutionSteps"
              stepLabel="Step"
            />
          </GlassCard>

          <GlassCard title="Commands / Code Snippets" variant="solid">
            <CommandsField
              fields={commandFields}
              append={appendCommand}
              remove={removeCommand}
              register={register}
            />
          </GlassCard>

          <GlassCard title="Attachments" variant="solid">
            <AttachmentDropzone files={attachments} onChange={setAttachments} />
          </GlassCard>

          <div className={styles.formActions}>
            <Button
              type="button"
              variant="outlined"
              startIcon={<FiRotateCcw />}
              onClick={handleReset}
              disabled={savingDraft || publishing}
              className={styles.actionBtn}
            >
              Reset Form
            </Button>
            <Button
              type="button"
              variant="outlined"
              startIcon={savingDraft ? <CircularProgress size={16} /> : <FiSave />}
              disabled={savingDraft || publishing}
              onClick={onSaveDraft}
              className={styles.actionBtn}
            >
              Save Draft
            </Button>
            <Button
              type="submit"
              variant="contained"
              startIcon={publishing ? <CircularProgress size={16} color="inherit" /> : <FiSend />}
              disabled={savingDraft || publishing}
              className={styles.actionBtn}
            >
              Publish
            </Button>
          </div>
        </div>

        <aside className={styles.previewColumn}>
          <ArticlePreview
            formValues={formValues}
            attachmentCount={attachments.length}
          />
          <AiSummaryPlaceholder aiSummary={options.aiSummaryPlaceholder} />
        </aside>
      </form>
    </div>
  );
}

export default CreateKnowledgeArticle;
