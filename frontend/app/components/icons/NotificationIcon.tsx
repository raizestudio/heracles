interface NotificationIconProps {
  width?: number;
  height?: number;
  fill?: string;
  className?: string;
}

const NotificationIcon: React.FC<NotificationIconProps> = ({
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
      fill={fill || "currentColor"}
      className={className}
      viewBox="0 0 256 256"
    >
      <path d="M216,128v80a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V56A16,16,0,0,1,48,40h80a8,8,0,0,1,0,16H48V208H200V128a8,8,0,0,1,16,0Zm16-68a36,36,0,1,1-36-36A36,36,0,0,1,232,60Zm-16,0a20,20,0,1,0-20,20A20,20,0,0,0,216,60Z"></path>
    </svg>
  );
};

export default NotificationIcon;
