"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/components/ui/questionnaire";
import { theme } from "@/components/ui/theme";

const questions = [
  {
    name: "framework",
    required: true,
    prompt: "Which framework are you using?",
    description: "We'll tailor the setup steps.",
    choices: [
      { value: "next", label: "Next.js", description: "App Router" },
      { value: "remix", label: "React Router" },
      { value: "vite", label: "Vite" },
    ],
  },
  {
    name: "features",
    multiple: true,
    prompt: "What do you need?",
    description: "Pick any.",
    choices: [
      { value: "forms", label: "Forms" },
      { value: "charts", label: "Charts" },
      { value: "tables", label: "Data tables" },
    ],
  },
  {
    name: "team",
    prompt: "How big is your team?",
    choices: [
      { value: "solo", label: "Just me" },
      { value: "small", label: "2–10" },
    ],
    input: { label: "Other team size", placeholder: "Something else…" },
  },
] as const;

export default function QuestionnaireDemo() {
  const [result, setResult] = useState<string | null>(null);
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 440,
        padding: 20,
        border: `1px solid ${theme.color.border}`,
        borderRadius: theme.radius.lg,
      }}
    >
      {result ? (
        <div style={{ display: "grid", gap: 12, fontSize: 14 }}>
          <pre style={{ margin: 0, whiteSpace: "pre-wrap", fontFamily: theme.font.mono, fontSize: 12 }}>
            {result}
          </pre>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setResult(null)}
            style={{ justifySelf: "start" }}
          >
            Start again
          </Button>
        </div>
      ) : (
        <Questionnaire
          items={questions.map((q) => ({
            name: q.name,
            required: "required" in q ? q.required : false,
            choices: q.choices,
          }))}
          shortcuts="letters"
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            const out: Record<string, unknown> = {};
            for (const q of questions) out[q.name] = data.getAll(q.name);
            setResult(JSON.stringify(out, null, 2));
          }}
        >
          <QuestionnaireProgress />
          {questions.map((q) => (
            <QuestionnaireItem
              key={q.name}
              name={q.name}
              required={"required" in q ? q.required : false}
              multiple={"multiple" in q ? q.multiple : false}
            >
              <QuestionnaireTitle>{q.prompt}</QuestionnaireTitle>
              {"description" in q && <QuestionnaireDescription>{q.description}</QuestionnaireDescription>}
              <QuestionnaireChoices>
                {q.choices.map((c) => (
                  <QuestionnaireChoice key={c.value} value={c.value}>
                    <span>{c.label}</span>
                    {"description" in c && <span>{c.description}</span>}
                  </QuestionnaireChoice>
                ))}
                {"input" in q && (
                  <QuestionnaireInput aria-label={q.input.label} placeholder={q.input.placeholder} />
                )}
              </QuestionnaireChoices>
              <QuestionnaireError />
            </QuestionnaireItem>
          ))}
          <QuestionnaireActions>
            <QuestionnairePrevious />
            <QuestionnaireSkip />
            <QuestionnaireNext />
            <QuestionnaireSubmit />
          </QuestionnaireActions>
        </Questionnaire>
      )}
    </div>
  );
}
