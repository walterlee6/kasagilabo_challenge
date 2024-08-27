import { readFile, writeFile } from 'fs';
import _ from 'lodash'; // Import lodash

let contentArr = [];
let evaluatedArr = [];

// evaluator object to chain the methods
const evaluator = {
  evaluatee: null,
  result: null,
  type: null,

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
    this.result = `${evaluatee}- ${typeof evaluatee}`;
    return this;
  },

  isInteger: function(str) {
    let evaluatee = this.evaluatee = (!str) ? this.evaluatee.trim() : str.trim();
    let parsedValue = parseInt(evaluatee, 10);

    if (!isNaN(parsedValue) && parsedValue.toString() === evaluatee) {
      this.type = 'integer';
      this.result = `${evaluatee}- ${typeof parsedValue}`;
      return this;
    } else {
      return this;
    }
  },

  isRealNumber: function(str) {
    let evaluatee = this.evaluatee = (!str) ? this.evaluatee.trim() : str.trim();
    let parsedValue = parseFloat(evaluatee);

    if (!isNaN(parsedValue) && isFinite(parsedValue) && parsedValue.toString() === evaluatee) {
      this.type = 'real number';
      this.result = `${evaluatee}- ${typeof parsedValue}`;
      return this;
    } else {
      return this;
    }
  },

  isAlphabeticString: function(str) {
    let evaluatee = this.evaluatee = (!str) ? this.evaluatee.trim() : str.trim();
    let alphabetical = /^[a-zA-Z]+$/.test(evaluatee);
    if (alphabetical) {
      this.type = 'alphabetical string';
      this.result = `${evaluatee}- ${typeof evaluatee}`;
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
