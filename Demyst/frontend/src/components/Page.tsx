import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import Loading from './Loading';
import { isFinalStep, isLoadingState, isReviewStep } from '../redux/appReducer';
import ApplicationForm from './ApplicationForm';
import ReviewForm from './ReviewForm';
import Confirm from './Confirm';

function Page() {
  const { state } = useContext(AppContext);
  if (isLoadingState(state)) {
    return <Loading />
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