import { Dialog } from "radix-ui";

const DialogDemo = ({
  children,
  triggerComponent,
  title,
  isOpen,
  setOpen,
  quick,
  className,
}) => (
  <Dialog.Root open={isOpen} onOpenChange={setOpen}>
    <Dialog.Trigger asChild>{triggerComponent}</Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-5 bg-black/50" />
      <Dialog.Content
        className={`data-[state=open]:animate-contentShow fixed top-1/2 left-1/2 z-10 max-h-[85vh] ${
          quick ? "max-w-[700px]" : "max-w-[500px]"
        } w-[90vw] -translate-x-1/2 ${className} -translate-y-1/2 overflow-auto rounded-md bg-white p-[25px] shadow-[var(--shadow-6)] focus:outline-none`}
      >
        <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
          {title}
        </Dialog.Title>

        {children}
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default DialogDemo;
