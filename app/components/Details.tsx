import React from 'react'

import { cn } from "~/lib/utils";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionContent,
} from "./Accordion";

interface Tip {
  type: "good" | "improve";
  tip: string;
  explanation: string;
}

interface Category {
  score: number;
  tips: Tip[];
}

interface DetailsProps {
  feedback: Feedback;
}

/* -------------------------------------------------------------------------- */
/*                               Helper Components                            */
/* -------------------------------------------------------------------------- */

interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge = ({ score }: ScoreBadgeProps) => {
  const isGood = score > 69;
  const isAverage = score > 39;

  const styles = isGood
    ? {
        bg: "bg-green-100",
        text: "text-green-700",
        icon: "/icons/check.svg",
      }
    : isAverage
    ? {
        bg: "bg-yellow-100",
        text: "text-yellow-700",
        icon: "/icons/warning.svg",
      }
    : {
        bg: "bg-red-100",
        text: "text-red-700",
        icon: "/icons/warning.svg",
      };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1",
        styles.bg
      )}
    >
      <img src={styles.icon} alt="" className="h-4 w-4" />
      <span className={cn("text-sm font-semibold", styles.text)}>
        {score}/100
      </span>
    </div>
  );
};

interface CategoryHeaderProps {
  title: string;
  categoryScore: number;
}

const CategoryHeader = ({
  title,
  categoryScore,
}: CategoryHeaderProps) => (
  <div className="flex items-center justify-between gap-4">
    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
    <ScoreBadge score={categoryScore} />
  </div>
);

interface CategoryContentProps {
  tips: Tip[];
}

const CategoryContent = ({ tips }: CategoryContentProps) => {
  return (
    <div className="space-y-6">
      {/* Tips */}
      <div className="grid gap-4 md:grid-cols-2">
        {tips.map((tip, index) => (
          <div
            key={`tip-${index}`}
            className="flex items-start gap-3 rounded-lg border border-gray-200 p-4"
          >
            <img
              src={
                tip.type === "good"
                  ? "/icons/check.svg"
                  : "/icons/warning.svg"
              }
              alt=""
              className="mt-0.5 h-5 w-5"
            />

            <p className="text-sm font-medium text-gray-800">{tip.tip}</p>
          </div>
        ))}
      </div>

      {/* Explanations */}
      <div className="space-y-3">
        {tips.map((tip, index) => (
          <div
            key={`exp-${index}`}
            className={cn(
              "rounded-lg border-l-4 p-4 text-sm",
              tip.type === "good"
                ? "border-green-500 bg-green-50 text-green-800"
                : "border-yellow-500 bg-yellow-50 text-yellow-800"
            )}
          >
            {tip.explanation}
          </div>
        ))}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                                Main Component                              */
/* -------------------------------------------------------------------------- */

const Details = ({ feedback }: DetailsProps) => {
  const sections = [
    {
      value: "tone-style",
      title: "Tone & Style",
      data: feedback.toneStyle,
    },
    {
      value: "content",
      title: "Content",
      data: feedback.content,
    },
    {
      value: "structure",
      title: "Structure",
      data: feedback.structure,
    },
    {
      value: "skills",
      title: "Skills",
      data: feedback.skills,
    },
  ];

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full space-y-4"
    >
      {sections.map((section) => (
        <AccordionItem
          key={section.value}
          value={section.value}
          className="rounded-xl border border-gray-200"
        >
          <AccordionHeader className="px-5 py-4">
            <CategoryHeader
              title={section.title}
              categoryScore={section.data.score}
            />
          </AccordionHeader>

          <AccordionContent className="px-5 pb-5">
            <CategoryContent tips={section.data.tips} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default Details;