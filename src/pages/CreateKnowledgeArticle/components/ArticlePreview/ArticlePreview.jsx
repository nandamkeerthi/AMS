import { Chip } from '@mui/material';
import { GlassCard } from '@/components/common';
import styles from './ArticlePreview.module.css';

function parseLines(text = '') {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

function ArticlePreview({ formValues, attachmentCount = 0 }) {
  const {
    title,
    category,
    application,
    tags = [],
    problem,
    symptoms,
    rootCause,
    resolutionSteps = [],
    commands = [],
  } = formValues;

  const symptomLines = parseLines(symptoms);
  const filledSteps = resolutionSteps.filter((step) => step.title?.trim());
  const filledCommands = commands.filter((cmd) => cmd.command?.trim() || cmd.label?.trim());

  return (
    <GlassCard title="Article Preview" subtitle="Live preview of your article" variant="solid" className={styles.preview}>
      <div className={styles.previewInner}>
        <header className={styles.header}>
          <span className={styles.draftBadge}>Draft preview</span>
          <h2 className={styles.title}>{title || 'Untitled article'}</h2>
          <div className={styles.meta}>
            {category && <Chip label={category} size="small" variant="outlined" />}
            {application && <span className={styles.app}>{application}</span>}
          </div>
          {tags.length > 0 && (
            <div className={styles.tags}>
              {tags.map((tag) => (
                <Chip key={tag} label={tag} size="small" className={styles.tag} />
              ))}
            </div>
          )}
        </header>

        {problem && (
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Problem</h3>
            <p className={styles.text}>{problem}</p>
          </section>
        )}

        {symptomLines.length > 0 && (
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Symptoms</h3>
            <ul className={styles.list}>
              {symptomLines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </section>
        )}

        {rootCause && (
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Root Cause</h3>
            <p className={styles.text}>{rootCause}</p>
          </section>
        )}

        {filledSteps.length > 0 && (
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Resolution Steps</h3>
            <ol className={styles.steps}>
              {filledSteps.map((step) => (
                <li key={step.title}>
                  <strong>{step.title}</strong>
                  {step.description && <span> — {step.description}</span>}
                </li>
              ))}
            </ol>
          </section>
        )}

        {filledCommands.length > 0 && (
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Commands</h3>
            {filledCommands.map((cmd) => (
              <div key={cmd.label || cmd.command} className={styles.commandBlock}>
                {cmd.label && <span className={styles.commandLabel}>{cmd.label}</span>}
                {cmd.command && (
                  <pre className={styles.code}><code>{cmd.command}</code></pre>
                )}
              </div>
            ))}
          </section>
        )}

        {attachmentCount > 0 && (
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Attachments</h3>
            <p className={styles.textMuted}>{attachmentCount} file{attachmentCount === 1 ? '' : 's'} attached</p>
          </section>
        )}

        {!title && !problem && !symptoms && !rootCause && (
          <p className={styles.placeholder}>Start filling in the form to see a live preview.</p>
        )}
      </div>
    </GlassCard>
  );
}

export default ArticlePreview;
