import { useQuiz } from "../contexts/QuizContext";

export default function EndScreen() {
  const { points, totalPoints, highscore, dispatch } = useQuiz();

  const percentage = (points / totalPoints) * 100;

  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🥳";
  if (percentage >= 50 && percentage < 80) emoji = "🙃";
  if (percentage >= 0 && percentage < 50) emoji = "😐";
  if (percentage === 0) emoji = "🤦";

  return (
    <>
      <p className="result">
        <span>{emoji}</span>Você fez <strong>{points}</strong> de {totalPoints}
        possiveís ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Melhor pontuação: {highscore} pontos)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Recomeçar o Quiz
      </button>
    </>
  );
}
