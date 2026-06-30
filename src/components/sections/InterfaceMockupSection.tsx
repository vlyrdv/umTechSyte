import { useEffect, useMemo, useState } from "react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

const employeeQuestion =
  "Подбери коммерческие объекты для аренды под открытие бутика в локациях с высоким пешеходным трафиком.";

const botAnswer =
  "Сейчас проверю доступные объекты, сравню локации по трафику и выделю варианты с наибольшим потенциалом для бутика.";

const analysisResults = [
  { value: "14", label: "объектов найдено" },
  { value: "5", label: "локаций с высоким трафиком" },
  { value: "3", label: "объекта подходят под формат бутика" },
  { value: "→", label: "Готовлю рекомендацию" }
];

type BotPhase = "employeeTyping" | "sent" | "botTyping" | "botAnswering" | "results";

export function UMBotWorkspace() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [phase, setPhase] = useState<BotPhase>("employeeTyping");
  const [displayedQuestion, setDisplayedQuestion] = useState("");
  const [displayedAnswer, setDisplayedAnswer] = useState("");
  const [visibleResults, setVisibleResults] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [cycle, setCycle] = useState(0);

  const questionPauses = useMemo(
    () =>
      new Map([
        [employeeQuestion.indexOf("аренды") + "аренды".length, 420],
        [employeeQuestion.indexOf("бутика") + "бутика".length, 500]
      ]),
    []
  );

  const answerPauses = useMemo(
    () =>
      new Map([
        [botAnswer.indexOf("объекты") + "объекты".length, 360],
        [botAnswer.indexOf("трафику") + "трафику".length, 420]
      ]),
    []
  );

  useEffect(() => {
    if (prefersReducedMotion) {
      setPhase("results");
      setDisplayedQuestion(employeeQuestion);
      setDisplayedAnswer(botAnswer);
      setVisibleResults(analysisResults.length);
      setIsFading(false);
      return;
    }

    let isCancelled = false;
    const timers: number[] = [];

    const wait = (delay: number) =>
      new Promise<void>((resolve) => {
        const timer = window.setTimeout(resolve, delay);
        timers.push(timer);
      });

    const typeText = async (
      text: string,
      setText: (value: string) => void,
      speed: number,
      pauses: Map<number, number>
    ) => {
      for (let index = 1; index <= text.length; index += 1) {
        if (isCancelled) {
          return;
        }

        setText(text.slice(0, index));
        const pause = pauses.get(index) ?? 0;
        const naturalDelay = index % 11 === 0 ? 110 : 0;
        await wait(speed + pause + naturalDelay);
      }
    };

    const runScenario = async () => {
      setIsFading(false);
      setDisplayedQuestion("");
      setDisplayedAnswer("");
      setVisibleResults(0);
      setPhase("employeeTyping");

      await wait(420);
      await typeText(employeeQuestion, setDisplayedQuestion, 42, questionPauses);

      if (isCancelled) {
        return;
      }

      setPhase("sent");
      await wait(520);
      setPhase("botTyping");
      await wait(980);
      setPhase("botAnswering");
      await typeText(botAnswer, setDisplayedAnswer, 30, answerPauses);

      if (isCancelled) {
        return;
      }

      setPhase("results");

      for (let index = 1; index <= analysisResults.length; index += 1) {
        await wait(360);
        if (isCancelled) {
          return;
        }
        setVisibleResults(index);
      }

      await wait(2000);

      if (isCancelled) {
        return;
      }

      setIsFading(true);
      await wait(520);

      if (!isCancelled) {
        setCycle((value) => value + 1);
      }
    };

    void runScenario();

    return () => {
      isCancelled = true;
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [answerPauses, cycle, prefersReducedMotion, questionPauses]);

  const showSentQuestion = phase !== "employeeTyping";
  const showResultsPanel = phase === "results" || prefersReducedMotion;

  return (
    <div className={`um-bot-workspace ${isFading ? "is-fading" : ""}`}>
      <div className="um-bot-workspace__header">
        <div>
          <strong>UM Bot</strong>
          <span>commercial real estate analysis</span>
        </div>
        <span className="interface-mockup__status">analysis live</span>
      </div>

      <div className="um-bot-workspace__grid">
        <div className="um-dialog-panel">
          {phase === "employeeTyping" ? (
            <div className="um-composer">
              <span>Сотрудник вводит запрос</span>
              <p>
                {displayedQuestion}
                <i aria-hidden="true" />
              </p>
            </div>
          ) : null}

          {showSentQuestion ? (
            <div className="um-dialog-message um-dialog-message--employee">
              <span>Сотрудник</span>
              <p>{employeeQuestion}</p>
            </div>
          ) : null}

          {phase === "botTyping" ? (
            <div className="um-dialog-message um-dialog-message--bot">
              <span>UM Bot</span>
              <div className="um-typing" aria-label="UM Bot анализирует запрос">
                <i />
                <i />
                <i />
              </div>
            </div>
          ) : null}

          {phase === "botAnswering" || phase === "results" ? (
            <div className="um-dialog-message um-dialog-message--bot">
              <span>UM Bot</span>
              <p>{phase === "results" ? botAnswer : displayedAnswer}</p>
            </div>
          ) : null}
        </div>

        <div className={`um-analysis-panel ${showResultsPanel ? "is-visible" : ""}`}>
          <div className="um-analysis-panel__top">
            <span>UM Tech / data check</span>
            <strong>Анализ объектов</strong>
          </div>
          <div className="um-result-grid">
            {analysisResults.map((item, index) => (
              <article
                className={index < visibleResults ? "is-visible" : ""}
                key={item.label}
              >
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </article>
            ))}
          </div>
          <div className="um-analysis-panel__footer">
            <span />
            <p>Система сопоставляет площадь, трафик, окружение и формат помещения.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
