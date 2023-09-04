import { useQuiz } from "./contexts/QuizContext";

import Header from "./components/Header";
import Loader from "./components/Loader";
import Main from "./components/Main";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Questions from "./components/Questions";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import EndScreen from "./components/EndScreen";
import Footer from "./components/Footer";
import Timer from "./components/Timer";

export default function App() {
  const { status } = useQuiz();

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />
            <Questions />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}
        {status === "finished" && <EndScreen />}
      </Main>
    </div>
  );
}
