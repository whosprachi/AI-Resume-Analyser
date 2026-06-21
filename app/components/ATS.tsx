import React from 'react'

interface Suggestion {
  type: "good" | "improve";
  tip: string;
}

interface ATSProps {
  score: number;
  suggestions: Suggestion[];
}

const ATS = ({ score, suggestions }: ATSProps) => {
  const isStrong = score > 69;
  const isAverage = score > 49;

  const gradientClass = isStrong
    ? "from-green-100"
    : isAverage
    ? "from-yellow-100"
    : "from-red-100";

  const atsIcon = isStrong
    ? "/icons/ats-good.svg"
    : isAverage
    ? "/icons/ats-warning.svg"
    : "/icons/ats-bad.svg";

  return (
    <div
      className={`rounded-2xl bg-gradient-to-br ${gradientClass} to-white p-6 shadow-md`}
    >
      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        <img
          src={atsIcon}
          alt="ATS Score"
          className="h-12 w-12"
        />

        <div>
          <h2 className="text-xl font-semibold">
            ATS Score - {score}/100
          </h2>
          <p className="text-sm text-gray-500">
            Resume compatibility with Applicant Tracking Systems.
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">
            Suggestions to Improve
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            These recommendations can help improve your resume's
            readability and increase its chances of passing ATS
            screening.
          </p>
        </div>

        {/* Suggestions */}
        <ul className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <li key={index} className="flex items-start gap-3">
              <img
                src={
                  suggestion.type === "good"
                    ? "/icons/check.svg"
                    : "/icons/warning.svg"
                }
                alt={suggestion.type}
                className="mt-0.5 h-5 w-5"
              />

              <p className="text-sm text-gray-700">
                {suggestion.tip}
              </p>
            </li>
          ))}
        </ul>

        {/* Closing */}
        <p className="pt-2 text-sm font-medium text-gray-700">
          Keep refining your resume to maximize your ATS score and improve
          your chances of getting noticed by recruiters.
        </p>
      </div>
    </div>
  );
};

export default ATS;

