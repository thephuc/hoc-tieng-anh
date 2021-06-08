import { DIFFICULTY_LEVELS, QUESTION_TYPES } from '../constants';

export const MOCK_EXERCISE_MAP = {
  [DIFFICULTY_LEVELS.EASY]: [
    {
      id: 'easy1',
      name: 'Easy 1',
      difficultyLevel: DIFFICULTY_LEVELS.EASY,
      data: [
        {
          id: 'easy1q1',
          type: QUESTION_TYPES.MCQ,
          instruction: 'Select the correct form of the word in the brackets',
          text: 'I <wake> up at 6AM every day',
          answerOptions: [
            'wakes',
            'am waking',
            'woke',
            'wake',
          ],
          answer: 'wake',
          point: 1
        },
        {
          id: 'easy1q2',
          type: QUESTION_TYPES.MCQ,
          instruction: 'Select the correct word to fill in the space',
          text: 'I do not have to work ___ Sunday',
          answerOptions: [
            'in',
            'on',
            'at',
            'by',
          ],
          answer: 'on',
          point: 1
        },
        {
          id: 'easy1q3',
          type: QUESTION_TYPES.FILL_IN_GAPS,
          instruction: 'Fill the space with the correct word',
          text: 'Mr Bui ___ his motorbike to work every day',
          answerOptions: [],
          answer: 'rides',
          point: 1
        },
        {
          id: 'easy1q4',
          type: QUESTION_TYPES.MCQ,
          instruction: 'Select the correct word to fill in the space',
          text: 'He always gives ___ a kiss before leaving',
          answerOptions: [
            'her',
            'hers',
            'I',
            'she',
          ],
          answer: 'her',
          point: 2
        },
        {
          id: 'easy1q5',
          type: QUESTION_TYPES.FILL_IN_GAPS,
          instruction: 'Type the correct form of the word in brackets into the space',
          text: 'There were 10 <table> ___ in the room',
          answerOptions: [],
          answer: 'tables',
          point: 1
        },
        {
          id: 'easy1q6',
          type: QUESTION_TYPES.TRANSLATE,
          instruction: 'Translate the following sentence to English',
          text: 'Duy có 8 quả táo',
          answerOptions: [],
          answer: 'Duy has 8 apples',
          point: 1
        },
      ],
    },

    {
      id: 'easy2',
      difficultyLevel: DIFFICULTY_LEVELS.EASY,
      name: 'Easy 2',
      data: [
      ],
    },
    {
      id: 'easy3',
      difficultyLevel: DIFFICULTY_LEVELS.EASY,
      name: 'Easy 3',
      data: [
      ],
    },
  ],
  [DIFFICULTY_LEVELS.MEDIUM]: [
    {
      id: 'medium1',
      difficultyLevel: DIFFICULTY_LEVELS.MEDIUM,
      name: 'Medium 1',
      data: [
      ],
    },
    {
      id: 'medium2',
      difficultyLevel: DIFFICULTY_LEVELS.MEDIUM,
      name: 'Medium 2',
      data: [
      ],
    },
    {
      id: 'medium3',
      difficultyLevel: DIFFICULTY_LEVELS.MEDIUM,
      name: 'Medium 3',
      data: [
      ],
    },
    {
      id: 'medium4',
      difficultyLevel: DIFFICULTY_LEVELS.MEDIUM,
      name: 'Medium 4',
      data: [
      ],
    },
  ],
  [DIFFICULTY_LEVELS.HARD]: [
    {
      id: 'hard1',
      difficultyLevel: DIFFICULTY_LEVELS.HARD,
      name: 'Hard 1',
      data: [
      ],
    },
    {
      id: 'hard2',
      difficultyLevel: DIFFICULTY_LEVELS.HARD,
      name: 'Hard 2',
      data: [
      ],
    },
    {
      id: 'hard3',
      difficultyLevel: DIFFICULTY_LEVELS.HARD,
      name: 'Hard 3',
      data: [
      ],
    },
    {
      id: 'hard4',
      difficultyLevel: DIFFICULTY_LEVELS.HARD,
      name: 'Hard 4',
      data: [
      ],
    },
    {
      id: 'hard5',
      difficultyLevel: DIFFICULTY_LEVELS.HARD,
      name: 'Hard 5',
      data: [
      ],
    },
  ],
};
