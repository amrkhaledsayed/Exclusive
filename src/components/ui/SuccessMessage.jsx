import { CircleCheckBig } from 'lucide-react';
import DialogDemo from './Dialog';
import { Button } from './Button';

export const SuccessMessage = ({ children, setOpen, open }) => {
  return (
    <DialogDemo isOpen={open} setOpen={setOpen}>
      <div className="flex flex-col items-center justify-center gap-3 px-3 py-8 text-green-500">
        {children}
        {/* <Button
          variant="outline"
          className="mt-5"
          onClick={() => setOpen(false)}
        >
          Continue{" "}
        </Button> */}
      </div>
    </DialogDemo>
  );
};
