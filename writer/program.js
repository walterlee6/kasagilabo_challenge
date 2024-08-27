import { writeFile, mkdir } from 'fs/promises';
import { generate } from 'randomstring';
import Random from 'random-js';
import bytes from 'bytes';

const OUTPUT_SIZE = 10485760; // 10MB

// Initialize Random object
const random = new Random();

// Random alphabetic generator
const genAlphabeticString = (limit) => generate({ length: limit, charset: 'alphabetic' });

// Random real number generator
const genRealNumber = (limit) => {
  const realNumber = random.real(-limit, limit);
  const fixedDecimal = random.integer(0, 18);
  return realNumber.toFixed(fixedDecimal).toString();
};

// Random integer generator
const genInteger = (limit) => random.integer(1, limit).toString();

// Random alphanumeric generator with spaces
const genAlphanumeric = (limit) => {
  const repeatSpaces = (count) => ' '.repeat(count);
  
  // Ensure total spaces (before + after) do not exceed 10
  const totalSpaces = random.integer(0, 10);
  const randSpaceBefore = repeatSpaces(random.integer(0, totalSpaces));
  const randSpaceAfter = repeatSpaces(totalSpaces - randSpaceBefore.length);
  
  const alphanumeric = generate({
    length: limit - (randSpaceBefore.length + randSpaceAfter.length),
    charset: 'alphanumeric'
  });
  
  return randSpaceBefore + alphanumeric + randSpaceAfter;
};

// Generate main output
const genMainFile = async (genAlphabeticString, genRealNumber, genInteger, genAlphanumeric) => {
  const randomizers = [genAlphabeticString, genRealNumber, genInteger, genAlphanumeric];
  const finalOutput = [];
  let totalSize = 0;

  try {
    await mkdir('./output', { recursive: true });
  } catch (err) {
    console.error('Error creating output directory:', err);
    return;
  }

  console.log('Generating output file of size ' + bytes(OUTPUT_SIZE) + ', please be patient..');

  while (totalSize < OUTPUT_SIZE) {
    const limit = random.integer(1, 100);
    const randomizerIndex = random.integer(0, 3);
    const item = randomizers[randomizerIndex](limit);
    const itemSize = Buffer.byteLength(item);

    if (totalSize + itemSize <= OUTPUT_SIZE) {
      finalOutput.push(item);
      totalSize += itemSize;
    } else {
      console.log('Output size exceeded. Ending generation.');
      break;
    }

    // Optional: Log progress
    if (finalOutput.length % 100 === 0) {
      console.log(`Generated ${finalOutput.length} items, Current size: ${bytes(totalSize)}, Most recent item: ${item}`);
    }
  }

  const finalString = finalOutput.join(',');
  console.log('Final output size is:', bytes(totalSize));

  try {
    await writeFile('./records/output.txt', finalString);
    console.log('It\'s saved in /records/output.txt!');
  } catch (err) {
    console.error('Error writing output:', err);
  }
};

genMainFile(genAlphabeticString, genRealNumber, genInteger, genAlphanumeric);
