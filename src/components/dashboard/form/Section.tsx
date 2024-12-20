interface Props {
  className?: string;
  children: React.ReactNode;
  title?: string;
}

export const Section = ({ children, className, title }: Props) => {
  return (
    <>
      <div
        className={`bg-white border border-gray-300 shadow-sm rounded-r-md flex flex-col gap-4 p-7 h-fit ${className}`}
      >
        {title && (
          <h2 className={`font-bold tracking-tight text-xl `}>{title}</h2>
        )}
        {children}
      </div>
    </>
  );
};
