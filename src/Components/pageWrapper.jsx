function PageWrapper({ children, className }) {
  return (
    <div
      className={` flex flex-col items-center justify-start xl:px-10 p-5 relative ${className}`}
    >
      {children}
    </div>
  );
}

export default PageWrapper;
