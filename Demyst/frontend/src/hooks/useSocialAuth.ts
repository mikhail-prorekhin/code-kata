import { useEffect } from "react";
import { ActionType, ActionTypes } from "../redux/appReducer";
import { useCookies } from "react-cookie";

const useSocialAuth = (dispatch: React.Dispatch<ActionType>) => {
  const [cookies, , removeCookie] = useCookies(["user_auth"]);
  useEffect(() => {
    if (cookies.user_auth) {
      dispatch({
        type: ActionTypes.login,
        payload: {
          user: {
            login: cookies.user_auth.user.login,
            gwt: {
              accessToken: cookies.user_auth.accessToken,
              refreshToken: cookies.user_auth.refreshToken,
            },
          },
        },
      });
      removeCookie("user_auth");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useSocialAuth;
