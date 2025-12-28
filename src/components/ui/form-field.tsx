import { useState, useEffect, ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => string | undefined;
}

interface FormFieldProps {
  name: string;
  label: string;
  type?: 'text' | 'email' | 'password' | 'tel' | 'textarea';
  placeholder?: string;
  validation?: ValidationRule;
  disabled?: boolean;
  autoComplete?: string;
  className?: string;
  helperText?: string;
}

interface ValidationError {
  message: string;
  type: string;
}

export const FormField = ({
  name,
  label,
  type = 'text',
  placeholder,
  validation,
  disabled = false,
  autoComplete,
  className,
  helperText,
}: FormFieldProps): JSX.Element => {
  const { register, formState: { errors, touchedFields } } = useFormContext();
  const [localError, setLocalError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const error = (errors[name] as ValidationError)?.message || localError;
  const isTouched = touchedFields[name];

  const validateField = (value: string): string | undefined => {
    if (!validation) return undefined;

    if (validation.required && !value.trim()) {
      return `${label}是必填项`;
    }

    if (validation.minLength && value.length < validation.minLength) {
      return `${label}至少需要${validation.minLength}个字符`;
    }

    if (validation.maxLength && value.length > validation.maxLength) {
      return `${label}不能超过${validation.maxLength}个字符`;
    }

    if (validation.pattern && !validation.pattern.test(value)) {
      return `${label}格式不正确`;
    }

    if (validation.custom) {
      return validation.custom(value);
    }

    return undefined;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    const validationError = validateField(value);
    
    setLocalError(validationError || null);
    setIsValid(!validationError && value.length > 0);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    const validationError = validateField(value);
    setLocalError(validationError || null);
  };

  const getInputProps = () => {
    const baseProps = {
      ...register(name, {
        validate: validation ? (value: string) => validateField(value) : undefined,
      }),
      placeholder,
      disabled,
      autoComplete,
      onChange: handleChange,
      onBlur: handleBlur,
      className: cn(
        error && 'border-destructive focus-visible:ring-destructive',
        isValid && !error && 'border-green-500 focus-visible:ring-green-500',
        className
      ),
    };

    if (type === 'textarea') {
      return {
        ...baseProps,
        as: Textarea,
      };
    }

    return baseProps;
  };

  const InputComponent = type === 'textarea' ? Textarea : Input;

  return (
    <div className="space-y-2">
      <Label htmlFor={name} className={error ? 'text-destructive' : ''}>
        {label}
        {validation?.required && <span className="text-destructive ml-1">*</span>}
      </Label>
      
      <InputComponent
        id={name}
        {...getInputProps()}
        type={type !== 'textarea' ? type : undefined}
      />
      
      {helperText && !error && (
        <p className="text-xs text-muted-foreground">{helperText}</p>
      )}
      
      {error && (
        <p className="text-xs text-destructive flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-destructive" />
          {error}
        </p>
      )}
      
      {isValid && !error && (
        <p className="text-xs text-green-600 flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-green-600" />
          格式正确
        </p>
      )}
    </div>
  );
};

interface FormFieldGroupProps {
  children: ReactNode;
  className?: string;
}

export const FormFieldGroup = ({ children, className }: FormFieldGroupProps): JSX.Element => {
  return (
    <div className={cn('space-y-4', className)}>
      {children}
    </div>
  );
};

interface FormProgressProps {
  fields: string[];
  completedFields: Set<string>;
}

export const FormProgress = ({ fields, completedFields }: FormProgressProps): JSX.Element => {
  const completedCount = fields.filter(field => completedFields.has(field)).length;
  const progress = (completedCount / fields.length) * 100;

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium">表单完成度</span>
        <span className="text-sm text-muted-foreground">
          {completedCount}/{fields.length}
        </span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-wine to-gold transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
