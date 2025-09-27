import DialogDemo from './Dialog';

export const SuccessMessage = ({ children, setOpen, open }) => {
  return (
    <DialogDemo isOpen={open} setOpen={setOpen}>
      <div className="flex flex-col items-center justify-center gap-3 px-3 py-8 text-green-500">
        {children}
      </div>
    </DialogDemo>
  );
};
