interface DotsThreeIconProps {
  width?: number;
  height?: number;
  fill?: string;
  className?: string;
}

const DotsThreeIcon: React.FC<DotsThreeIconProps> = ({
  width = 24,
  height = 24,
  fill = "currentColor",
  className = "",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || 24}
      height={height || 24}
      fill={fill || "currentColor"}
      className={className}
      viewBox="0 0 256 256"
    >
      <path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128Zm56-12a12,12,0,1,0,12,12A12,12,0,0,0,196,116ZM60,116a12,12,0,1,0,12,12A12,12,0,0,0,60,116Z"></path>
    </svg>
  );
};

export default DotsThreeIcon;
