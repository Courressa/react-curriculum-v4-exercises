import { useContext, useState } from 'react';
import { SurveyContext } from '../SurveyContext';
import { QUESTION_TYPES } from '../surveyReducer';
import styles from '../StudentWork.module.css';

// Question Item Component - Students will add Edit/Delete functionality here
export function QuestionItem({ question }) {
  //HINT: use these with controlled form
  const [workingText, setWorkingText] = useState(question.question);
  const [workingOptions, setWorkingOptions] = useState(question.options);
  const [newOptionText, setNewOptionText] = useState('');
  const { state, dispatch } = useContext(SurveyContext);
  const isEditing = state.ui.editingQuestionId === question.id;

  // Helper function to convert type to title case
  const formatQuestionType = (type) => {
    return type
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join('-');
  };

  const handleOptionAdd = (optionText) => {
    dispatch({
      type: 'ADD_OPTION_TO_QUESTION',
      payload: { questionId: question.id, optionText },
    });
    setWorkingOptions((prevOptions) => [...prevOptions, optionText]);
  };

  // TODO: Students will add edit functionality here
  const handleEdit = () => {
    console.log('TODO: Implement edit functionality');
    // Hint: Use SET_EDITING_QUESTION action

    dispatch({
      type: 'SET_EDITING_QUESTION',
      payload: { questionId: question.id },
    });
  };

  // TODO: Students will add save functionality here
  const handleSave = () => {
    console.log('TODO: Implement save functionality');
    // Hint: Use UPDATE_QUESTION_TEXT action with workingText
    dispatch({
      type: 'UPDATE_QUESTION_TEXT',
      payload: { id: question.id, newText: workingText },
    });
    dispatch({ type: 'SET_EDITING_QUESTION', payload: { questionId: null } });
  };

  const handleOptionSave = (index) => {
    dispatch({
      type: 'UPDATE_OPTION_TEXT',
      payload: {
        questionId: question.id,
        optionIndex: index,
        newText: workingOptions[index],
      },
    });
  };

  // TODO: Students will add delete functionality here
  const handleDelete = () => {
    console.log('TODO: Implement delete functionality');
    // Hint: Show confirmation dialog, then use DELETE_QUESTION action
    if (window.confirm('Are you sure you want to delete this question?')) {
      dispatch({ type: 'DELETE_QUESTION', payload: { id: question.id } });
    }
  };

  const handleOptionDelete = (index) => {
    dispatch({
      type: 'DELETE_OPTION_FROM_QUESTION',
      payload: { questionId: question.id, optionIndex: index },
    });
    setWorkingOptions((prevOptions) =>
      prevOptions.filter((_, i) => i !== index)
    );
  };

  const handleCancel = () => {
    dispatch({ type: 'SET_EDITING_QUESTION', payload: { questionId: null } });
    setWorkingText(question.question);
    setWorkingOptions(question.options);
  };

  return (
    <div className={styles['question-item']}>
      <div className={styles['question-header']}>
        <span className={styles['question-type']}>
          Question Type: {formatQuestionType(question.type)}
        </span>
        <div className={styles['question-actions']}>
          {/* TODO: Students add Edit and Delete buttons here */}
          <button
            className={styles['edit-btn']}
            onClick={isEditing ? handleCancel : handleEdit}
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
          <button className={styles['delete-btn']} onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>

      {/* TODO: Students will add conditional controlled form to edit question here */}
      {isEditing ? (
        <div className={styles['question-content']}>
          <input
            type="text"
            value={workingText}
            onChange={(e) => setWorkingText(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div className={styles['question-content']}>
          <h3>{question.question}</h3>
        </div>
      )}

      {question.type === QUESTION_TYPES.MULTIPLE_CHOICE &&
        (isEditing ? (
          <div className={styles['options-section']}>
            <h4>Answer Options:</h4>
            <ul>
              {question.options.map((option, index) => (
                <li key={index} className={styles['option-item']}>
                  <input
                    className={styles['option-text']}
                    value={workingOptions[index]}
                    onChange={(e) => {
                      const newOptions = [...workingOptions];
                      newOptions[index] = e.target.value;
                      setWorkingOptions(newOptions);
                    }}
                  />
                  <button
                    onClick={() => handleOptionSave(index)}
                    disabled={
                      !workingOptions[index] ||
                      workingOptions[index] === question.options[index]
                    }
                  >
                    Save
                  </button>
                  <button
                    onClick={() => handleOptionDelete(index)}
                    disabled={workingOptions.length <= 2}
                  >
                    Delete
                  </button>
                </li>
              ))}
              <input
                type="text"
                value={newOptionText}
                onChange={(e) => setNewOptionText(e.target.value)}
              />
              <button
                onClick={() => {
                  handleOptionAdd(newOptionText);
                  setNewOptionText('');
                }}
              >
                + Add Option
              </button>
            </ul>
          </div>
        ) : (
          <div className={styles['options-section']}>
            <h4>Answer Options:</h4>
            <ul>
              {question.options.map((option, index) => (
                <li key={index} className={styles['option-item']}>
                  <span className={styles['option-text']}>{option}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  );
}
