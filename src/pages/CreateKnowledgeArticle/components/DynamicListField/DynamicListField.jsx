import { Button, IconButton, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import styles from './DynamicListField.module.css';

function DynamicListField({
  title,
  fields,
  append,
  remove,
  register,
  errors,
  fieldName,
  stepLabel = 'Step',
  showDescription = true,
}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h4 className={styles.title}>{title}</h4>
        <Button
          type="button"
          size="small"
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => append({ title: '', description: '' })}
          className={styles.addBtn}
        >
          Add {stepLabel.toLowerCase()}
        </Button>
      </div>

      <ul className={styles.list}>
        {fields.map((field, index) => (
          <li key={field.id} className={styles.item}>
            <div className={styles.itemHeader}>
              <span className={styles.index}>{stepLabel} {index + 1}</span>
              {fields.length > 1 && (
                <IconButton
                  size="small"
                  aria-label={`Remove ${stepLabel.toLowerCase()} ${index + 1}`}
                  onClick={() => remove(index)}
                >
                  <DeleteOutlineIcon fontSize="small" />
                </IconButton>
              )}
            </div>
            <TextField
              label={`${stepLabel} title`}
              fullWidth
              size="small"
              {...register(`${fieldName}.${index}.title`, {
                required: index === 0 ? `${stepLabel} title is required` : false,
              })}
              error={Boolean(errors?.[fieldName]?.[index]?.title)}
              helperText={errors?.[fieldName]?.[index]?.title?.message}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '4px' } }}
            />
            {showDescription && (
              <TextField
                label={`${stepLabel} description`}
                fullWidth
                size="small"
                multiline
                minRows={2}
                {...register(`${fieldName}.${index}.description`)}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '4px' } }}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DynamicListField;
