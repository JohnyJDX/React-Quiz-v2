import { useQuiz } from '../contexts/QuizContext';
import Error from './Error';
import FinishScreen from './FinishScreen';
import Footer from './Footer';
import Header from './Header';
import Loader from './Loader';
import Main from './Main';
import NextButton from './NextButton';
import Progress from './Progress';
import Questions from './Questions';
import StartScreen from './StartScreen';
import Timer from './Timer';

function App() {
	const { status } = useQuiz();
	return (
		<div className="app">
			<Header />
			<Main>
				{status === 'loading' && <Loader />}
				{status === 'error' && <Error />}
				{status === 'ready' && <StartScreen />}
				{status === 'active' && (
					<>
						<Progress />
						<Questions />

						<Footer>
							<Timer />
							<NextButton />
						</Footer>
					</>
				)}
				{status === 'finish' && <FinishScreen />}
			</Main>
		</div>
	);
}

export default App;
