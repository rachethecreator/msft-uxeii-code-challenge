import { useId, InputHTMLAttributes } from 'react';
import { StyledInput } from './styled/input';

type InputProps = {
  label: string;
  showLabel?: boolean;
  helperText?: string;
  errorText?: string;
  hasError?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = ({
  label,
  showLabel = true,
  type = 'text',
  helperText,
  errorText,
  hasError,
  ...props
}: InputProps) => {
  const id = useId();
  const helperId = useId();
  const errorId = useId();
  const error = Boolean(hasError && errorText);

  type A11yProps = {
    'aria-label'?: string;
    'aria-invalid'?: boolean;
    'aria-describedby'?: string;
  };
  const a11yAttrs: A11yProps = {};
  if (!showLabel) {
    a11yAttrs['aria-label'] = label;
  }
  if (error && !helperText) {
    a11yAttrs['aria-invalid'] = true;
    a11yAttrs['aria-describedby'] = errorId;
  }
  if (helperText && !error) {
    a11yAttrs['aria-describedby'] = helperId;
  }
  if (helperText && error) {
    a11yAttrs['aria-describedby'] = `${helperId} ${errorId}`;
  }

  return (
    <StyledInput $error={error}>
      {showLabel && <label htmlFor={id}>{label}</label>}
      <input id={id} {...props} type={type} {...a11yAttrs} />
      {helperText && <div id={helperId}>{helperText}</div>}
      {error && (
        <div role="alert" id={errorId} style={{ color: '#d5351f' }}>
          {errorText}
        </div>
      )}
    </StyledInput>
  );
};
