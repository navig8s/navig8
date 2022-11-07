export default {
  testRegex: '/src/.*\\.spec\\.ts$',
  moduleFileExtensions: ['js', 'json', 'vue', 'ts'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}
