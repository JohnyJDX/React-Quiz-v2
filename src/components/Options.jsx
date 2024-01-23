import { useQuiz } from '../contexts/QuizContext';

const Options = () => {
	const { questions, dispatch, answer, index } = useQuiz();

	const hasAnswer = answer !== null;

	const question = questions.at(index);

	const click = i => {
		dispatch({ type: 'newAnswer', payload: i });
	};

	return (
		<div className="options">
			<>
				{question.options.map((option, i) => (
					<button
						onClick={() => click(i)}
						className={`btn btn-option ${i === answer ? 'answer' : ''} ${
							hasAnswer
								? question.correctOption === i
									? 'correct'
									: 'wrong'
								: ''
						}`}
						key={option}
						disabled={hasAnswer}
					>
						{option}
					</button>
				))}
			</>
		</div>
	);
};

export default Options;
