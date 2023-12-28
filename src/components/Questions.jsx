import { useQuiz } from '../contexts/QuizContext';
import Options from './Options';

const Questions = () => {
	const { questions, index } = useQuiz();
	const question = questions.at(index);

	return (
		<div>
			<h2>{question.question}</h2>
			<Options />
		</div>
	);
};

export default Questions;
