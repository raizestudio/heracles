interface ComputerTowerIconProps {
  width?: number;
  height?: number;
  fill?: string;
  className?: string;
}

const ComputerTowerIcon: React.FC<ComputerTowerIconProps> = ({
  width = 24,
  height = 24,
  fill = "currentColor",
  className,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || 24}
      height={height || 24}
      fill={fill}
      className={className}
      viewBox="0 0 256 256"
    >
      <path d="M88,72a8,8,0,0,1,8-8h64a8,8,0,0,1,0,16H96A8,8,0,0,1,88,72Zm8,40h64a8,8,0,0,0,0-16H96a8,8,0,0,0,0,16ZM208,40V216a16,16,0,0,1-16,16H64a16,16,0,0,1-16-16V40A16,16,0,0,1,64,24H192A16,16,0,0,1,208,40Zm-16,0H64V216H192ZM128,168a12,12,0,1,0,12,12A12,12,0,0,0,128,168Z"></path>
    </svg>
  );
};

export default ComputerTowerIcon;
