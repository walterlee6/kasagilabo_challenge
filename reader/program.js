import { readFile, writeFile } from 'fs';
import _ from 'lodash';

let contentArr = [];
let evaluatedArr = [];

// evaluator object to chain the methods
const evaluator = {
  evaluatee: null,
  result: null,
  type: null,

  isAlphaNumeric: function (str) {
    let evaluatee = this.evaluatee = (!str) ? this.evaluatee.trim() : str.trim();
    let code, i, len;

    for (i = 0, len = evaluatee.length; i < len; i++) {
      code = evaluatee.charCodeAt(i);
      if (!(code > 47 && code < 58) && // numeric (0-9)
        !(code > 64 && code < 91) && // upper alpha (A-Z)
        !(code > 96 && code < 123)) { // lower alpha (a-z)
        return this; // Return early if not alphanumeric
      }
    }
    this.type = 'alphanumeric';
    this.result = `${evaluatee}- ${this.type}`;
    return this;
  },

  isInteger: function (str) {
    let evaluatee = this.evaluatee = (!str) ? this.evaluatee.trim() : str.trim();
    let parsedValue = parseInt(evaluatee, 10);

    if (!isNaN(parsedValue) && parsedValue.toString() === evaluatee) {
      this.type = 'integer';
      this.result = `${evaluatee}- ${this.type}`;
      return this;
    } else {
      return this;
    }
  },

  isRealNumber: function (str) {
    let evaluatee = this.evaluatee = (!str) ? this.evaluatee.trim() : str.trim();
    let parsedValue = parseFloat(evaluatee);

    if (!isNaN(parsedValue) && isFinite(parsedValue) && parsedValue.toString() === evaluatee) {
      this.type = 'real number';
      this.result = `${evaluatee}`;
      return this;
    } else {
      return this;
    }
  },

  isAlphabeticString: function (str) {
    let evaluatee = this.evaluatee = (!str) ? this.evaluatee.trim() : str.trim();
    let alphabetical = /^[a-zA-Z]+$/.test(evaluatee);
    if (alphabetical) {
      this.type = 'alphabetical string';
      this.result = `${evaluatee}- ${this.type}`;
      return this;
    } else {
      return this;
    }
  },

  evaluate: function (str) {
    this.isAlphaNumeric(str);
    if (!this.type) this.isInteger(str);
    if (!this.type) this.isRealNumber(str);
    if (!this.type) this.isAlphabeticString(str);
    return this;
  }
};

readFile('./records/output.txt', 'utf8', (err, content) => {
  if (err) {
    console.error('Error reading output', err);
  }

  contentArr = content.split(',');

  // Process each item and push results to evaluatedArr
  evaluatedArr = [];
  _.forEach(contentArr, (item) => {
    let result = evaluator.evaluate(item);
    evaluatedArr.push(result.result);
    console.log(result.result);
  });

  // Write results to 'result.txt'
  writeFile('./records/result.txt', evaluatedArr.join(','), (err) => {
    if (err) {
      console.error('Error writing evaluation', err);
    }
    console.log('It\'s evaluated in /records/result.txt!');
  });
});