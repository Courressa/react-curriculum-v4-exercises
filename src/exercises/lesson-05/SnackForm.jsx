import { useState, useEffect } from 'react';
import styles from './SnackForm.module.css';

export default function SnackForm({
  addSnack,
  editingSnack,
  cancelEdit,
  updateSnack,
  className,
}) {
  const [name, setName] = useState('');
  const [rating, setRating] = useState('');
  const [touched, setTouched] = useState({ name: false, rating: false });
  const isEditing = Boolean(editingSnack);

  const validateName = (name) => (name.trim() ? true : false);
  const validateRating = (rating) => Boolean(rating);
  const getNameError = (name) =>
    !validateName(name) && touched.name ? 'Snack name is required' : '';
  const getRatingError = (rating) =>
    !validateRating(rating) && touched.rating ? 'Please select a rating' : '';

  useEffect(() => {
    if (isEditing) {
      setName(editingSnack.name);
      setRating(editingSnack.rating);
      setTouched({ name: true, rating: true });
    } else {
      setName('');
      setRating('');
      setTouched({ name: false, rating: false });
    }
  }, [editingSnack]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!validateName(name) || !validateRating(rating)) {
      setTouched({ name: true, rating: true });
      return;
    }

    if (isEditing) {
      updateSnack(editingSnack.id, name, rating);
    } else {
      addSnack(name, rating);
      setName('');
      setRating('');
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`${styles.form} ${className || ''}`}
    >
      <h3 className={styles['form-title']}>
        {isEditing ? '✏️ Edit Snack' : '➕ Add Snack'}
      </h3>

      <div className={styles['field-container']}>
        <label className={styles['field-label']}>Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onFocus={() => setTouched((prev) => ({ ...prev, name: true }))}
          required
          className={styles['field-input']}
          placeholder="Enter snack name"
        />
        {getNameError(name) && (
          <div className={styles.error}>{getNameError(name)}</div>
        )}
      </div>

      <div className={styles['field-container']}>
        <label className={styles['field-label']}>Rating:</label>
        <input
          type="number"
          name="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          onFocus={() => setTouched((prev) => ({ ...prev, rating: true }))}
          required
          min="1"
          max="5"
          className={styles['field-input']}
          placeholder="Rate 1-5"
        />
        {getRatingError(rating) && (
          <div className={styles.error}>{getRatingError(rating)}</div>
        )}
      </div>

      <div className={styles['button-container']}>
        <button
          type="submit"
          className={`${styles.button} ${styles['submit-button']}`}
        >
          {isEditing ? 'Save' : 'Add'}
        </button>

        {isEditing && (
          <button
            type="button"
            onClick={cancelEdit}
            className={`${styles.button} ${styles['cancel-button']}`}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
