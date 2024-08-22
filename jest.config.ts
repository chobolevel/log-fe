import type {Config} from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig: Config = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  preset: "ts-jest",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

const config: () => Promise<Config> = async () => {
  const jestConfig = await createJestConfig(customJestConfig)();
  return {
    ...jestConfig,
    moduleNameMapper: {
      ...jestConfig.moduleNameMapper,
      "swiper/css": "identity-obj-proxy",
    },
    transformIgnorePatterns: ["node_modules/(?!(swiper|ssr-window|dom7)/)"],
    transform: {
      "^.+\\.(ts|tsx|js|jsx|mjs)$": [
        "ts-jest",
        {
          tsconfig: "<rootDir>/tsconfig.test.json",
        },
      ],
    },
  };
};

export default config;
