import path from 'path';
import {
  checkStructure,
  checkW3C,
  checkCSS,
  checkOrderStylesheetLinks,
  checkAlternativeFonts,
  checkSemanticTags,
  checkLang,
  checkLayout,
} from './lib.js';
import initPuppeteer from './puppeteer.js';

const runTests = async (projectPath, lang) => {
  const structureErrors = checkStructure(projectPath);

  if (structureErrors.length) {
    return structureErrors;
  }

  const { browser, page } = await initPuppeteer(path.join(projectPath, 'index.html'));

  const errors = (await Promise.all([
    checkW3C(path.join(projectPath, 'index.html')),
    checkCSS(projectPath),
    checkOrderStylesheetLinks(page),
    checkAlternativeFonts(path.join(projectPath, 'styles', 'style.css'), ['Inter', 'EB Garamond']),
    checkSemanticTags(page),
    checkLang(page, lang),
    checkLayout(page),
  ])).flat();

  await browser.close();

  return errors;
};

export default runTests;
