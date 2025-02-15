type ContainerProps = {
  children: React.ReactNode;
};

export default function Container({ children }: ContainerProps) {
  return (
    <div className="flex justify-center">
      <div className="max-w-xl w-full pt-20 pb-12 mx-4 min-h-screen flex flex-col">
        {children}
      </div>
    </div>
  );
}
