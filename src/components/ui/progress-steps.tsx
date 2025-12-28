import { Check, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step {
  id: string;
  label: string;
  description?: string;
}

interface ProgressStepsProps {
  steps: Step[];
  currentStep: number;
  completedSteps: Set<string>;
  onStepClick?: (stepId: string) => void;
  orientation?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg';
}

export const ProgressSteps = ({
  steps,
  currentStep,
  completedSteps,
  onStepClick,
  orientation = 'horizontal',
  size = 'md',
}: ProgressStepsProps): JSX.Element => {
  const currentIndex = steps.findIndex(step => step.id === steps[currentStep].id);
  
  const getStepStatus = (index: number): 'completed' | 'current' | 'upcoming' => {
    if (index < currentIndex) return 'completed';
    if (index === currentIndex) return 'current';
    return 'upcoming';
  };

  const sizeClasses = {
    sm: {
      circle: 'w-6 h-6 text-xs',
      label: 'text-sm',
      description: 'text-xs',
    },
    md: {
      circle: 'w-8 h-8 text-sm',
      label: 'text-base',
      description: 'text-sm',
    },
    lg: {
      circle: 'w-10 h-10 text-base',
      label: 'text-lg',
      description: 'text-base',
    },
  };

  const StepComponent = ({ step, index }: { step: Step; index: number }): JSX.Element => {
    const status = getStepStatus(index);
    const isClickable = onStepClick && (status === 'completed' || status === 'upcoming');
    const isCompleted = completedSteps.has(step.id);

    return (
      <button
        type="button"
        onClick={() => isClickable && onStepClick(step.id)}
        disabled={!isClickable}
        className={cn(
          'flex items-start gap-3 text-left transition-all duration-300',
          isClickable && 'hover:opacity-80',
          !isClickable && 'cursor-not-allowed opacity-60'
        )}
      >
        <div className="relative flex flex-col items-center">
          <div
            className={cn(
              'rounded-full flex items-center justify-center font-medium transition-all duration-300',
              sizeClasses[size].circle,
              status === 'completed' && 'bg-wine text-primary-foreground',
              status === 'current' && 'bg-wine text-primary-foreground ring-4 ring-wine/20',
              status === 'upcoming' && 'bg-muted text-muted-foreground'
            )}
          >
            {status === 'completed' || isCompleted ? (
              <Check className="w-3/4 h-3/4" />
            ) : (
              <span>{index + 1}</span>
            )}
          </div>
          
          {orientation === 'vertical' && index < steps.length - 1 && (
            <div
              className={cn(
                'w-0.5 flex-1 mt-2 transition-all duration-300',
                status === 'completed' || isCompleted ? 'bg-wine' : 'bg-muted'
              )}
            />
          )}
        </div>
        
        <div className="flex-1 pt-1">
          <p
            className={cn(
              'font-medium transition-colors',
              sizeClasses[size].label,
              status === 'current' && 'text-wine',
              status === 'upcoming' && 'text-muted-foreground'
            )}
          >
            {step.label}
          </p>
          
          {step.description && (
            <p
              className={cn(
                'mt-0.5 transition-colors',
                sizeClasses[size].description,
                status === 'current' ? 'text-foreground' : 'text-muted-foreground'
              )}
            >
              {step.description}
            </p>
          )}
        </div>
      </button>
    );
  };

  if (orientation === 'vertical') {
    return (
      <div className="space-y-6">
        {steps.map((step, index) => (
          <StepComponent key={step.id} step={step} index={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <button
                type="button"
                onClick={() => onStepClick && onStepClick(step.id)}
                disabled={!onStepClick || (index > currentIndex)}
                className={cn(
                  'rounded-full flex items-center justify-center font-medium transition-all duration-300',
                  sizeClasses[size].circle,
                  getStepStatus(index) === 'completed' && 'bg-wine text-primary-foreground cursor-pointer',
                  getStepStatus(index) === 'current' && 'bg-wine text-primary-foreground ring-4 ring-wine/20',
                  getStepStatus(index) === 'upcoming' && 'bg-muted text-muted-foreground cursor-not-allowed'
                )}
              >
                {getStepStatus(index) === 'completed' || completedSteps.has(step.id) ? (
                  <Check className="w-3/4 h-3/4" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </button>
              
              <p
                className={cn(
                  'mt-2 font-medium text-center transition-colors',
                  sizeClasses[size].label,
                  getStepStatus(index) === 'current' && 'text-wine',
                  getStepStatus(index) === 'upcoming' && 'text-muted-foreground'
                )}
              >
                {step.label}
              </p>
            </div>
            
            {index < steps.length - 1 && (
              <div className="flex-1 flex items-center justify-center px-2">
                <ChevronRight
                  className={cn(
                    'transition-colors',
                    getStepStatus(index) === 'completed' ? 'text-wine' : 'text-muted'
                  )}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  showLabel?: boolean;
  showPercentage?: boolean;
}

export const ProgressBar = ({
  currentStep,
  totalSteps,
  showLabel = true,
  showPercentage = true,
}: ProgressBarProps): JSX.Element => {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="space-y-2">
      {showLabel && (
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">步骤 {currentStep + 1} / {totalSteps}</span>
          {showPercentage && (
            <span className="text-muted-foreground">{Math.round(progress)}%</span>
          )}
        </div>
      )}
      
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-wine to-gold transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
