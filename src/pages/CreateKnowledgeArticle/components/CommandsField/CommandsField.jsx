import { Button, IconButton, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import styles from './CommandsField.module.css';

function CommandsField({ fields, append, remove, register }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h4 className={styles.title}>Commands / Code Snippets</h4>
        <Button
          type="button"
          size="small"
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => append({ label: '', command: '', description: '' })}
          className={styles.addBtn}
        >
          Add command
        </Button>
      </div>

      {fields.length === 0 ? (
        <p className={styles.empty}>No commands added. Click &quot;Add command&quot; to include code snippets.</p>
      ) : (
        <ul className={styles.list}>
          {fields.map((field, index) => (
            <li key={field.id} className={styles.item}>
              <div className={styles.itemHeader}>
                <span className={styles.index}>Command {index + 1}</span>
                <IconButton
                  size="small"
                  aria-label={`Remove command ${index + 1}`}
                  onClick={() => remove(index)}
                >
                  <DeleteOutlineIcon fontSize="small" />
                </IconButton>
              </div>
              <TextField
                label="Label"
                fullWidth
                size="small"
                placeholder="e.g. Check gateway pod status"
                {...register(`commands.${index}.label`)}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '4px' } }}
              />
              <TextField
                label="Command"
                fullWidth
                size="small"
                multiline
                minRows={2}
                placeholder="kubectl get pods -n production ..."
                {...register(`commands.${index}.command`)}
                className={styles.commandField}
                sx={{
                  '& .MuiOutlinedInput-root': { borderRadius: '4px', fontFamily: 'monospace' },
                  '& .MuiInputBase-input': { fontFamily: 'ui-monospace, monospace', fontSize: '0.8125rem' },
                }}
              />
              <TextField
                label="Description (optional)"
                fullWidth
                size="small"
                {...register(`commands.${index}.description`)}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '4px' } }}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CommandsField;
