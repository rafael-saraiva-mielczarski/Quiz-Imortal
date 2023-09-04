import { useQuiz } from "../contexts/QuizContext";
import Option from "./Option";

export default function Questions() {
  const { questions, index } = useQuiz();
  const question = questions.at(index);

  return (
    <div>
      <h4>{question.question}</h4>
      <Option question={question} />
    </div>
  );
}
