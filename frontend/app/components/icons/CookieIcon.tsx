interface CookieIconProps {
  width?: number;
  height?: number;
  fill?: string;
  className?: string;
}

const CookieIcon: React.FC<CookieIconProps> = ({
  width = 24,
  height = 24,
  fill = "#000",
  className,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || 32}
      height={height || 32}
      fill={fill || "currentColor"}
      className={className}
      viewBox="0 0 256 256"
    >
      <path d="M164.49,163.51a12,12,0,1,1-17,0A12,12,0,0,1,164.49,163.51Zm-81-8a12,12,0,1,0,17,0A12,12,0,0,0,83.51,155.51Zm9-39a12,12,0,1,0-17,0A12,12,0,0,0,92.49,116.49Zm48-1a12,12,0,1,0,0,17A12,12,0,0,0,140.49,115.51ZM232,128A104,104,0,1,1,128,24a8,8,0,0,1,8,8,40,40,0,0,0,40,40,8,8,0,0,1,8,8,40,40,0,0,0,40,40A8,8,0,0,1,232,128Zm-16.31,7.39A56.13,56.13,0,0,1,168.5,87.5a56.13,56.13,0,0,1-47.89-47.19,88,88,0,1,0,95.08,95.08Z"></path>
    </svg>
  );
};

export default CookieIcon;
