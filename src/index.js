import i18next from 'i18next';
import ru from './locales/ru.js';
import runTests from './tests.js';
import render from './render.js';

const [,, PROJECT_PATH, LANG = 'ru'] = process.argv;

const app = async (projectPath, lang) => {
  await i18next.init({
    lng: lang,
    resources: {
      ru,
    },
  });

  try {
    const errors = await runTests(projectPath, lang);
    if (errors.length) {
      render(errors);
      process.exit(1);
    }
  } catch (error) {
    console.log(error);
  }
};

app(PROJECT_PATH, LANG);
