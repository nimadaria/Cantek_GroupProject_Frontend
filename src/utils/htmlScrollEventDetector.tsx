export const isScrollReachBottom = (e: React.UIEvent<HTMLElement>) => {
  const target = e.target as HTMLElement;
  return (
    Math.floor(target.scrollHeight - target.scrollTop) - target.clientHeight <=
    0
  );
};
