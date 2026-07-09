import React from "react";

export const LocationPinIcon: React.FC<{ className?: string }> = ({
  className,
}) => (
  <svg
    className={className}
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 2C7.86 2 4.5 5.36 4.5 9.5c0 5.62 6.24 11.6 6.5 11.85a1.4 1.4 0 0 0 2 0c.26-.25 6.5-6.23 6.5-11.85C19.5 5.36 16.14 2 12 2zm0 10.25a2.75 2.75 0 1 1 0-5.5 2.75 2.75 0 0 1 0 5.5z" />
  </svg>
);

export const HomeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M3 11.5 12 4l9 7.5" />
    <path d="M5.5 10v9.5a1 1 0 0 0 1 1H9a1 1 0 0 0 1-1V15a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4.5a1 1 0 0 0 1 1h2.5a1 1 0 0 0 1-1V10" />
  </svg>
);
