
let users = {
    bulbasaur: {
      id: 'bulbasaur',
      name: 'Bulbasaur',
      avatarURL: '/images/bulbasaur.png',
      answers: {
        '8xf0y6ziyjabvozdd253nd': 'optionOne',
        '6ni6ok3ym7mf1p33lnez': 'optionTwo',
        am8ehyc8byjqgar0jgpub9: 'optionTwo',
        loxhs1bqm25b708cmbf3g: 'optionTwo'
      },
      questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
    },
    charmendar: {
      id: 'charmendar',
      name: 'Charmendar',
      avatarURL: '/images/charmendar.png',
      answers: {
        vthrdm985a262al8qx3do: 'optionOne',
        xj352vofupe1dqz9emx13r: 'optionTwo'
      },
      questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do']
    },
    chikorita: {
      id: 'chikorita',
      name: 'Chikorita',
      avatarURL: '/images/chikorita.png',
      answers: {
        xj352vofupe1dqz9emx13r: 'optionOne',
        vthrdm985a262al8qx3do: 'optionTwo',
        '6ni6ok3ym7mf1p33lnez': 'optionTwo'
      },
      questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r']
    },
    chimchar: {
      id: 'chimchar',
      name: 'Chimchar',
      avatarURL: '/images/chimchar.png',
      answers: {},
      questions: []
    },
    cyndaquil: {
      id: 'cyndaquil',
      name: 'Cyndaquil',
      avatarURL: '/images/cyndaquil.png',
      answers: {},
      questions: []
    },
    pikachu: {
      id: 'pikachu',
      name: 'Pikachu',
      avatarURL: '/images/pikachu.png',
      answers: {},
      questions: []
    },
    piplup: {
      id: 'piplup',
      name: 'Piplup',
      avatarURL: '/images/piplup.png',
      answers: {},
      questions: []
    },
    squirtle: {
      id: 'squirtle',
      name: 'Squirtle',
      avatarURL: '/images/squirtle.png',
      answers: {},
      questions: []
    }
  };
  
  let questions = {
    '8xf0y6ziyjabvozdd253nd': {
      id: '8xf0y6ziyjabvozdd253nd',
      author: 'bulbasaur',
      timestamp: 1467166872634,
      optionOne: {
        votes: ['bulbasaur'],
        text: 'have pikachu as your first pokemon'
      },
      optionTwo: {
        votes: [],
        text: 'have raichu as your first pokemon'
      }
    },
    '6ni6ok3ym7mf1p33lnez': {
      id: '6ni6ok3ym7mf1p33lnez',
      author: 'chikorita',
      timestamp: 1468479767190,
      optionOne: {
        votes: [],
        text: 'become a pokemon saver'
      },
      optionTwo: {
        votes: ['chikorita', 'bulbasaur'],
        text: 'become a pokemon killer'
      }
    },
    am8ehyc8byjqgar0jgpub9: {
      id: 'am8ehyc8byjqgar0jgpub9',
      author: 'bulbasaur',
      timestamp: 1488579767190,
      optionOne: {
        votes: [],
        text: 'want to be in Ash\'s team'  
      },
      optionTwo: {
        votes: ['bulbasaur'],
        text: 'want to be in Team Rocket\'s team'
      }
    },
    loxhs1bqm25b708cmbf3g: {
      id: 'loxhs1bqm25b708cmbf3g',
      author: 'charmendar',
      timestamp: 1482579767190,
      optionOne: {
        votes: [],
        text: 'want to be Ash'
      },
      optionTwo: {
        votes: ['bulbasaur'],
        text: 'want to be Brock'
      }
    },
    vthrdm985a262al8qx3do: {
      id: 'vthrdm985a262al8qx3do',
      author: 'charmendar',
      timestamp: 1489579767190,
      optionOne: {
        votes: ['charmendar'],
        text: 'want pokemon from prof. Oak'
      },
      optionTwo: {
        votes: ['chikorita'],
        text: 'want to catch pokemon'
      }
    },
    xj352vofupe1dqz9emx13r: {
      id: 'xj352vofupe1dqz9emx13r',
      author: 'chikorita',
      timestamp: 1493579767190,
      optionOne: {
        votes: ['chikorita'],
        text: 'want to catch all pokemon'
      },
      optionTwo: {
        votes: ['charmendar'],
        text: 'want to catch only stronger pokemon'
      }
    }
  };
  
  function generateUID() {
    return (
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15)
    );
  }
  
  export function _getUsers() {
    return new Promise((res, rej) => {
      setTimeout(() => res({ ...users }), 1000);
    });
  }
  
  export function _getQuestions() {
    return new Promise((res, rej) => {
      setTimeout(() => res({ ...questions }), 1000);
    });
  }
  
  function formatQuestion({ optionOneText, optionTwoText, author }) {
    return {
      id: generateUID(),
      timestamp: Date.now(),
      author,
      optionOne: {
        votes: [],
        text: optionOneText
      },
      optionTwo: {
        votes: [],
        text: optionTwoText
      }
    };
  }
  
  export function _saveQuestion(question) {
    return new Promise((res, rej) => {
      const authUser = question.author;
      const formattedQuestion = formatQuestion(question);
  
      setTimeout(() => {
        questions = {
          ...questions,
          [formattedQuestion.id]: formattedQuestion
        };
  
        users = {
          ...users,
          [authUser]: {
            ...users[authUser],
            questions: users[authUser].questions.concat([formattedQuestion.id])
          }
        };
  
        res(formattedQuestion);
      }, 1000);
    });
  }
  
  export function _saveQuestionAnswer({ authUser, qid, answer }) {
    return new Promise((res, rej) => {
      setTimeout(() => {
        users = {
          ...users,
          [authUser]: {
            ...users[authUser],
            answers: {
              ...users[authUser].answers,
              [qid]: answer
            }
          }
        };
  
        questions = {
          ...questions,
          [qid]: {
            ...questions[qid],
            [answer]: {
              ...questions[qid][answer],
              votes: questions[qid][answer].votes.concat([authUser])
            }
          }
        };
  
        res();
      }, 500);
    });
  }
  