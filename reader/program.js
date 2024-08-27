import { readFile, writeFile } from 'fs';
import _ from 'lodash'; // Import lodash

let contentArr = [];
let evaluatedArr = [];

// evaluator object to chain the methods
const evaluator = {
  type: null,
  evaluatee: null,
  result: null,

  isAlphaNumeric: function(str) {
    let evaluatee = this.evaluatee = (!str) ? this.evaluatee.trim() : str.trim();
    let code, i, len;

    evaluatee = evaluatee.trim(); // Trim spaces around the evaluatee

    for (i = 0, len = evaluatee.length; i < len; i++) {
      code = evaluatee.charCodeAt(i);
      if (!(code > 47 && code < 58) && // numeric (0-9)
        !(code > 64 && code < 91) && // upper alpha (A-Z)
        !(code > 96 && code < 123)) { // lower alpha (a-z)
        return this;
      }
    }
    this.type = 'alphanumeric';
    this.result = `${evaluatee}- ${this.type}`; // No extra spaces around evaluatee
    return this;
  },

  isInteger: function(str) {
    let evaluatee = this.evaluatee = (!str) ? this.evaluatee : str;
    let isInt = evaluatee % 1 === 0;

    if (isInt) {
      this.type = 'integer';
      this.result = `${evaluatee}- ${this.type}`;
      return this;
    } else {
      return this;
    }
  },

  isRealNumber: function(str) {
    let evaluatee = this.evaluatee = (!str) ? this.evaluatee : str;
    if (!isNaN(parseFloat(evaluatee)) && isFinite(evaluatee)) {
      this.type = 'real numbers';
      this.result = `${evaluatee}- ${this.type}`;
      return this;
    } else {
      return this;
    }
  },

  isAlphabeticString: function(str) {
    let evaluatee = this.evaluatee = (!str) ? this.evaluatee : str;
    let alphabetical = /^[a-zA-Z()]+$/.test(evaluatee);
    if (alphabetical) {
      this.type = 'alphabetical strings';
      this.result = `${evaluatee}- ${this.type}`;
      return this;
    } else {
      return this;
    }
  }
};

readFile('./records/output.txt', 'utf8', function(err, content) {
  if (err) throw console.error('Error reading output', err);

  contentArr = content.split(',');

  // Process each item and push results to evaluatedArr
  _.forEach(contentArr, function(item) {
    let result = evaluator.isAlphaNumeric(item).isAlphabeticString().isRealNumber().isInteger();
    evaluatedArr.push(result.result);
    console.log(result.result);
  });

  // Join the results with commas to preserve the original format
  writeFile('./records/result.txt', evaluatedArr.join(','), function(err) {
    if (err) throw console.error('Error writing evaluation', err);
    console.log('It\'s evaluated in /records/result.txt!');
  });
});
