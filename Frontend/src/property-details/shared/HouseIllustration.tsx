import React from "react";

interface HouseIllustrationProps {
  variant?: "hero" | "thumb" | "card";
  darken?: boolean;
  className?: string;
}


const HouseIllustration: React.FC<HouseIllustrationProps> = ({
  variant = "thumb",
  darken = false,
  className,
}) => {
  const gradientId = `sky-${variant}-${darken ? "dark" : "light"}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;

  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMax slice"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={darken ? "#4a5450" : "#8b9a94"} />
          <stop offset="100%" stopColor={darken ? "#2c332f" : "#c9c7b8"} />
        </linearGradient>
      </defs>

  
      <rect x="0" y="0" width="400" height="220" fill={`url(#${gradientId})`} />
   
      <rect x="0" y="220" width="400" height="80" fill={darken ? "#3a3f38" : "#c7c3ae"} />

   
      <rect x="298" y="190" width="7" height="34" fill={darken ? "#232a25" : "#26332b"} />
     
      <ellipse cx="302" cy="176" rx="26" ry="30" fill={darken ? "#243027" : "#2f4438"} />

    
      <rect x="120" y="150" width="150" height="90" fill={darken ? "#4b4b46" : "#e9e6d8"} stroke={darken ? "#2a2a26" : "#c9c6b4"} strokeWidth="1" />

      
      <polygon points="110,150 195,95 280,150" fill={darken ? "#161c19" : "#1f2b24"} />
   
      <polygon points="110,150 195,95 280,150" fill="none" stroke={darken ? "#0d1210" : "#c17f3e"} strokeWidth="1.5" />

      <rect x="140" y="170" width="26" height="16" fill={darken ? "#7a6a4c" : "#e8c99a"} />
      <rect x="178" y="170" width="26" height="16" fill={darken ? "#7a6a4c" : "#e8c99a"} />
      <rect x="140" y="196" width="26" height="16" fill={darken ? "#7a6a4c" : "#e8c99a"} />

     
      <rect x="222" y="188" width="22" height="52" fill={darken ? "#161c19" : "#1f2b24"} />


      {variant === "hero" && (
        <>
          <rect x="60" y="205" width="6" height="28" fill={darken ? "#232a25" : "#26332b"} />
          <ellipse cx="63" cy="192" rx="20" ry="24" fill={darken ? "#243027" : "#2f4438"} />
        </>
      )}
    </svg>
  );
};

export default HouseIllustration;
