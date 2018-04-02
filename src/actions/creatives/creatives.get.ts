import axios from "axios";

import { OpenSnackBar } from "../snackbar";

export const GET_CREATIVES_START = "GETCREATIVESSTART";
export const GetCreativesStart = (payload: any) => ({
  payload,
  type: GET_CREATIVES_START,
});

export const GET_CREATIVES_SUCCESSFUL = "GETCREATIVESSUCCESSFUL";
export const GetCreativesSuccessful = (payload: any) => ({
  payload,
  type: GET_CREATIVES_SUCCESSFUL,
});

export const GET_CREATIVES_FAILED = "GETCREATIVEFAILED";
export const GetCreativesFailed = (payload: any) => ({
  payload,
  type: GET_CREATIVES_FAILED,
});

export const GetCreatives = (user: any) => {
  return async (dispatch: any) => {
    try {
      dispatch(GetCreativesStart(user));
      const response = await axios.get(`http://localhost:4000/creative`, {
        headers: {
          "Authorization": `Bearer ${user.accessToken}`,
          "Content-Type": "application/json",
        },
      });
      dispatch(GetCreativesSuccessful(response.data));
      dispatch(OpenSnackBar("Creative get Successfully"));
    } catch (error) {
      dispatch(GetCreativesFailed(error));
      if (error.response) {
        dispatch(OpenSnackBar(`Get Creatives Faild: ${error.response.data.message}`));
      } else if (error.request) {
        dispatch(OpenSnackBar(`Get Creatives Faild: Network Error`));
      } else {
        dispatch(OpenSnackBar(`Get Creatives Faild: ${error.message}`));
      }
    }
  };
};
