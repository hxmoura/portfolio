export default function Modal({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 backdrop-blur-lg flex items-center justify-center z-80">
      <section className="p-6 rounded-lg bg-white dark:bg-brand-700 space-y-3 max-w-3xl w-full py-6 max-h-full overflow-y-scroll">
        {children}
      </section>
    </div>
  );
}
