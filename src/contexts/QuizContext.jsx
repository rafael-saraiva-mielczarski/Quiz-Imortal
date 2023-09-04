import { createContext, useContext, useEffect, useReducer } from "react";
import { getDatabase, child, ref, get } from "firebase/database";
import { app } from "../services/firebase";

const QuizContext = createContext();

const initialState = {
  questions: [],
  //loading, error, ready, active, finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

const SECS_PER_QUESTION = 30;

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      // com um dispatch recebemos os dados e informamos o status da aplicação
      return { ...state, questions: action.payload, status: "ready" };

    case "dataFailed":
      return { ...state, status: "error" };

    case "startGame":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };

    case "newAnswer":
      //ideal é botar a lógica mais complexa dentro do reducer, aqui seleciona a questão, algo que não tem acesso aqui e manipula a soma de pontos através dessa questão
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };

    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };

    case "endGame":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };

    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
      };

    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };

    default:
      throw new Error("Error");
  }
}

function QuizProvider({ children }) {
  const dbRef = ref(getDatabase(app));

  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const totalPoints = questions.reduce((prev, cur) => prev + cur.points, 0);

  const numQuestions = questions.length;

  useEffect(() => {
    get(child(dbRef, "questions"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          dispatch({ type: "dataReceived", payload: snapshot.val() });
        }
      })
      .catch((error) => {
        dispatch({ type: "dataFailed" });
      });
  }, [dbRef]);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
        totalPoints,
        numQuestions,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("Quiz Context was used outside provider");
  return context;
}

export { QuizProvider, useQuiz };
