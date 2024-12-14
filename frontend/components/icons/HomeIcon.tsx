interface HomeIconProps {
  width?: number;
  height?: number;
  fill?: string;
}

const HomeIcon: React.FC<HomeIconProps> = ({ width = 24, height = 24, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || 32}
      height={height || 32}
      fill={fill || "currentColor"}
      viewBox="0 0 256 256"
    >
      <path d="M219.31,108.68l-80-80a16,16,0,0,0-22.62,0l-80,80A15.87,15.87,0,0,0,32,120v96a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V160h32v56a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V120A15.87,15.87,0,0,0,219.31,108.68ZM208,208H160V152a8,8,0,0,0-8-8H104a8,8,0,0,0-8,8v56H48V120l80-80,80,80Z"></path>
    </svg>
  );
};

export default HomeIcon;
