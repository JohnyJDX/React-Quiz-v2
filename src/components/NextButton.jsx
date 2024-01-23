import { useQuiz } from '../contexts/QuizContext';

const NextButton = ({}) => {
	const { answer, dispatch, index, numQuestions } = useQuiz();

	if (answer === null) return;

	if (index < numQuestions - 1) {
		return (
			<button
				className="btn btn-ui"
				onClick={() => dispatch({ type: 'nextQuestion' })}
			>
				Next
			</button>
		);
	}

	if (numQuestions - 1 === index) {
		return (
			<button
				className="btn btn-ui"
				onClick={() => dispatch({ type: 'finish' })}
			>
				Finish
			</button>
		);
	}
};

export default NextButton;
