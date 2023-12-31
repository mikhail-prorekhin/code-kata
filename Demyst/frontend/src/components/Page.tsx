import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import Loading from './Loading';
import { isFinalStep, isLoadingState, isReviewStep, isUserAuthentificated } from '../redux/appReducer';
import ApplicationForm from './ApplicationForm';
import ReviewForm from './ReviewForm';
import Confirm from './Confirm';
import Authentification from './Authentification';
import useSocialAuth from '../hooks/useSocialAuth';

function Page() {
  const { state, dispatch } = useContext(AppContext);

  useSocialAuth(dispatch)
  if (isLoadingState(state)) {
    return <Loading />
  }
  if (!isUserAuthentificated(state)) {
    return <Authentification />
  }
  if (isFinalStep(state)) {
    return <Confirm />
  }
  if (isReviewStep(state)) {
    return <ReviewForm />
  }

  return <ApplicationForm />

}

export default Page;