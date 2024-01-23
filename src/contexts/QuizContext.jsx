import { createContext, useContext, useEffect, useReducer } from 'react';

const API_URL = 'https://6488799a0e2469c038fdd6e5.mockapi.io/';

const QuizContext = createContext();

const initialState = {
	questions: [],
	status: 'loading',
	index: 0,
	answer: null,
	points: 0,
	highscore: 0,
	secondsRemaining: 420,
};

const reducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case 'dataReceived':
			return { ...state, questions: payload, status: 'ready' };

		case 'dataFailed':
			return { ...state, status: 'error' };

		case 'start':
			return {
				...state,
				status: 'active',
			};

		case 'newAnswer': {
			const question = state.questions.at(state.index);

			return {
				...state,
				answer: payload,
				points:
					question.correctOption === payload
						? state.points + question.points
						: state.points,
			};
		}

		case 'nextQuestion': {
			return {
				...state,
				index: state.index + 1,
				answer: null,
			};
		}

		case 'finish': {
			return {
				...state,
				status: 'finish',
				highscore:
					state.points > state.highscore ? state.points : state.highscore,
			};
		}

		case 'restart': {
			return {
				...state,
				status: 'ready',
				index: 0,
				answer: null,
				points: 0,
				highscore: 0,
				secondsRemaining: 420,
			};
		}

		case 'tick': {
			return {
				...state,
				secondsRemaining: state.secondsRemaining - 1,
				status: state.secondsRemaining === 0 ? 'finish' : state.status,
			};
		}

		default:
			return state;
	}
};

const QuizProvider = ({ children }) => {
	const [
		{ questions, status, index, answer, points, highscore, secondsRemaining },
		dispatch,
	] = useReducer(reducer, initialState);

	const numQuestions = questions.length;
	const maxPossiblePoints = questions.reduce((acc, el) => acc + el.points, 0);

	useEffect(() => {
		fetch(API_URL + 'questions')
			.then(res => res.json())
			.then(data => dispatch({ type: 'dataReceived', payload: data }))
			.catch(() => dispatch({ type: 'dataFailed' }));
	}, []);

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
				numQuestions,
				maxPossiblePoints,
				dispatch,
			}}
		>
			{children}
		</QuizContext.Provider>
	);
};

const useQuiz = () => {
	const context = useContext(QuizContext);
	return context;
};

export { QuizProvider, useQuiz };
