import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { startNextQuestion, submitAnswer } from "../../socketio.service";
import { RootState } from "../../store";
import {decode} from 'html-entities'
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

  if (room.currentQuestion.number === 0) {
    if (user.vip) {
      return <button onClick={() => startNextQuestion(room.id)}>hey</button>
    } else {
      return <h1>Wait...</h1>
    }
  }

  if (room.currentQuestion.timeExpired) {
    if (user.vip) {
      return <button onClick={() => startNextQuestion(room.id)}>Next Question</button>
    }
    return <h1>Wait for next question</h1>
  }

  if (answerSubmitted) {
    return <h1>Waiting for other players</h1>
  }

  return (
    <div className="answer-container">
      {room.currentQuestion.question.answers.map(answer => {
        return <div className="answer" onClick={() => handleSubmitAnswer(answer.option)}>
          <span className="answer__text">{answer.option}</span>
        </div>
      })}
    </div>
  );
};

export default Play;
