import { FormEventHandler, useState } from "react";

type FormAction<State> = (payload: FormData) => Promise<State>;

export type SubmitHandlerEvent = (
  event: React.SyntheticEvent<EventTarget>
) => undefined;

function useFormState<State>(
  submitHook: FormAction<State>
): [State, FormEventHandler<HTMLFormElement>] {
  const [state, setState] = useState({} as State);
  const handler = async (event: React.SyntheticEvent<EventTarget>) => {
    event.stopPropagation();
    const data = new FormData(event.target as HTMLFormElement);
    setState(await submitHook(data));
  };

  return [state, handler];
}

export default useFormState;
