export function ControlsBase({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute inset-x-0 top-0 z-10 p-6 max-sm:p-2 flex justify-center pointer-events-none">
      <div className="max-sm:flex-col-reverse flex max-sm:gap-2 gap-4 w-full max-w-screen-md">
        {children}
      </div>
    </div>
  );
}
