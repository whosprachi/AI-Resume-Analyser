interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge = ({ score }: ScoreBadgeProps) => {
  let label = "Needs Work";
  let className = "bg-badge-red text-red-600";

  if (score > 69) {
    label = "Strong";
    className = "bg-badge-green text-green-600";
  } else if (score > 49) {
    label = "Good Start";
    className = "bg-badge-yellow text-yellow-600";
  }

  return (
    <div className={`inline-flex items-center rounded-full px-3 py-1 ${className}`}>
      <p className="text-sm font-medium">{label}</p>
    </div>
  );
};

export default ScoreBadge;