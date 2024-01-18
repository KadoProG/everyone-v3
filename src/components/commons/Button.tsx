import React from 'react';
import styles from '@/components/commons/Button.module.scss';

interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Button contents
   */
  label: React.ReactNode;
  /**
   * Optional click handler
   */
  onClick?: () => void;
  disabled?: boolean;
  checked?: boolean;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  ...props
}: ButtonProps) => {
  const mode = primary
    ? styles.storybook_button__primary
    : styles.storybook_button__secondary;
  return (
    <button
      type="button"
      className={[
        styles.storybook_button,
        `${styles.storybook_button__}${size}`,
        mode,
        props.checked && styles.checked,
      ].join(' ')}
      {...props}
    >
      {label}
      <style jsx>{`
        button {
          background-color: ${backgroundColor};
        }
      `}</style>
    </button>
  );
};
