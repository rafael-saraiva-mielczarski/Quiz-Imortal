export default function StartScreen({ numQuestions, dispatch }) {
  return (
    <div className="start">
      <h2>Bem vindo ao Quiz do Grêmio</h2>
      <h3>{numQuestions} questões para testar seu conhecimento.</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "startGame" })}
      >
        Vamos lá!
      </button>
    </div>
  );
}
