import { Button, Input } from '@chrome-extend/shared-ui';
import { PiNotebookThin } from 'react-icons/pi';

export function Filter() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <Input placeholder="search..." className="w-48" prefixIcon="🔍" />
        <Button>
          <PiNotebookThin className="w-4 h-4 mr-2" />
          创建
        </Button>
      </div>
    </div>
  );
}
