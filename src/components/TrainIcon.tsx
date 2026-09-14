/** Simple side-on locomotive, used on the rail map and in the nav. */
export default function TrainIcon({
  size = 20,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="4" y="4" width="16" height="12" rx="3" />
      <path d="M8 8h8" />
      <path d="M4 12h16" />
      <circle cx="8.5" cy="19" r="1.4" />
      <circle cx="15.5" cy="19" r="1.4" />
      <path d="M6 16.4 4.5 19M18 16.4 19.5 19" />
    </svg>
  );
}
