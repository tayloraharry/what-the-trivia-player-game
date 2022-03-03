import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IRoomObject, IRoomUserObject } from "what-the-trivia-types";
import { startNextQuestion, submitAnswer } from "../../socketio.service";
import { RootState } from "../../store";
import "./index.css";

const Play = () => {
  const { room, user } = useSelector<RootState, RootState["roomReducer"]>(
    (state) => state.roomReducer
  );
  const [answerSubmitted, setAnswerSubmitted] = useState<boolean>(false);

  const handleSubmitAnswer = (answer: string) => {
    submitAnswer(room.id, user.id, answer)
    setAnswerSubmitted(true);
  };

  useEffect(() => {
    if (room.currentQuestion.number > 0) {
      setAnswerSubmitted(false);
    }
  }, [room.currentQuestion.number]);

  if (answerSubmitted) {
    return <div className="answer-container">Waiting for other players</div>;
  }

  if (room.currentQuestion.number === 0) {
    if (user.vip) {
      return <button onClick={() => startNextQuestion(room.id)}>hey</button>
    } else {
      return <h1>Wait...</h1>
    }
  }

  return (
    <div className="answer-container">
      {["A", "B", "C", "D"].map((answer, index) => {
        return (
          <div
            className="answer"
            style={{
              backgroundColor: ["#375E97", "#FB6542", "#FFBB00", "#3F681C"][
                index
              ],
            }}
            onClick={() => handleSubmitAnswer(answer)}
          >
            <h1>{answer}</h1>
          </div>
        );
      })}
    </div>
  );
};

export default Play;
