import { z } from "zod";

const PASSWORD_REGEX =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

const NICKNAME_REGEX = /^[a-zA-Z가-힣]+$/;

export const passwordField = z
  .string()
  .regex(PASSWORD_REGEX, "영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.");

export const nicknameField = z
  .string()
  .min(2, "닉네임은 2자 이상이어야 합니다.")
  .max(20, "닉네임은 20자 이하여야 합니다.")
  .regex(NICKNAME_REGEX, "닉네임은 영문 또는 한글만 입력 가능합니다.");
