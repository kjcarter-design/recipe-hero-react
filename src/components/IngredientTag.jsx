import React from 'react';
import { Chip } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';

export default function IngredientTag({ ingredient, onRemove }) {
  return (
    <Chip 
      label={ingredient}
      onDelete={onRemove}
      deleteIcon={<FontAwesomeIcon icon={faMinusCircle} />}
    />
  )
}
