import {
  CHANGE_CATEGORY,
  CHANGE_DIFFICULTY,
  CHANGE_NUMBER,
  CHANGE_TYPE,
  CHANGE_SCORE,
} from "./actionsTypes";

export const changeCategoryAC = (payload) => ({
  type: CHANGE_CATEGORY,
  payload,
});

export const changeDifficultyAC = (payload) => ({
  type: CHANGE_DIFFICULTY,
  payload,
});

export const changeTypeAC = (payload) => ({
  type: CHANGE_TYPE,
  payload,
});

export const changeNumberAC = (payload) => ({
  type: CHANGE_NUMBER,
  payload,
});

export const changeScoreAC = (payload) => ({
  type: CHANGE_SCORE,
  payload,
});