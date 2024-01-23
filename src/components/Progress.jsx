import { useQuiz } from '../contexts/QuizContext';

const Progress = () => {
	const { index, numQuestions, points, maxPossiblePoints } = useQuiz();
	return (
		<header className="progress">
			<progress max={numQuestions} value={index} />
			<p>
				Question <strong>{index + 1}</strong> / {numQuestions}
			</p>
			<p>
				Question <strong>{points}</strong> / {maxPossiblePoints} points
			</p>
		</header>
	);
};

export default Progress;
