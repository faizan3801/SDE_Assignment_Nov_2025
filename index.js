/**
 * Merges discontinuous time ranges within a given threshold.
 * 
 * @param {Array<[number, number]>} ranges 
 * @param {number} threshold 
 * @returns {Array<[number, number]>} 
 */

const mergeTimeRanges = (ranges, threshold) => {
  if (!Array.isArray(ranges) || ranges.length === 0) return [];

  // Step 1: Sort the ranges by start time
  ranges.sort((a, b) => a[0] - b[0]);

  const merged = [];
  let [start, end] = ranges[0];

  // Step 2: Iterate and merge
  for (let i = 1; i < ranges.length; i++) {
    const [currStart, currEnd] = ranges[i];

    // If overlap OR gap <= threshold → merge them
    if (currStart <= end + threshold) {
      end = Math.max(end, currEnd);
    } else {
      merged.push([start, end]);
      [start, end] = [currStart, currEnd];
    }
  }

  // Step 3: Push last range
  merged.push([start, end]);

  return merged;
};

module.exports = {
  mergeTimeRanges
};
