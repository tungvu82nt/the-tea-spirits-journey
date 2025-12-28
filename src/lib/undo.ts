import { toast } from 'sonner';

interface UndoAction {
  id: string;
  message: string;
  undo: () => void;
}

const undoActions: Map<string, UndoAction> = new Map();

export const addUndoAction = (action: UndoAction): void => {
  undoActions.set(action.id, action);

  toast.success(action.message, {
    action: {
      label: 'Hoàn tác',
      onClick: () => {
        action.undo();
        undoActions.delete(action.id);
      },
    },
  });

  setTimeout(() => {
    undoActions.delete(action.id);
  }, 5000);
};

export const showUndoToast = (message: string, undo: () => void): void => {
  const id = Date.now().toString();
  addUndoAction({ id, message, undo });
};
