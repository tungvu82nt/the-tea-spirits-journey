import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
}

export const EmptyState = ({
  icon: Icon,
  title,
  description,
  action,
  secondaryAction,
}: EmptyStateProps): JSX.Element => {
  return (
    <Card className="p-12 text-center">
      <div className="flex flex-col items-center max-w-md mx-auto">
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
          <Icon className="w-10 h-10 text-muted-foreground" />
        </div>
        
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-6">{description}</p>
        
        <div className="flex gap-3 flex-wrap justify-center">
          {action && (
            <Button onClick={action.onClick}>
              {action.label}
            </Button>
          )}
          {secondaryAction && (
            <Button variant="outline" onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

interface EmptyStateCompactProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const EmptyStateCompact = ({
  icon: Icon,
  title,
  description,
  action,
}: EmptyStateCompactProps): JSX.Element => {
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
        <Icon className="w-8 h-8 text-muted-foreground" />
      </div>
      
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      
      {description && (
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
      )}
      
      {action && (
        <Button variant="outline" size="sm" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
};

interface EmptyStateInlineProps {
  icon: LucideIcon;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const EmptyStateInline = ({
  icon: Icon,
  message,
  action,
}: EmptyStateInlineProps): JSX.Element => {
  return (
    <div className="flex items-center gap-4 p-6 bg-muted/50 rounded-lg">
      <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-muted-foreground" />
      </div>
      
      <div className="flex-1">
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
      
      {action && (
        <Button variant="outline" size="sm" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
};
