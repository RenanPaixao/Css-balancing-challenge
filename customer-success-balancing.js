/**********************************************************************************************************************/
/* See the README */
/**********************************************************************************************************************/

/**
 * @description Defines a type to represent an object with the id and score.
 * @typedef {Object} Entity
 * @property {number} id
 * @property {number} score
 */

/**
 * Returns the id of the CustomerSuccess with the most customers.
 * @param {Entity[]} customerSuccess
 * @param {Entity[]} customers
 * @param {number[]} customerSuccessAway
 */
function customerSuccessBalancing(
  customerSuccess,
  customers,
  customerSuccessAway
) {
  const isCssAwayValid = customerSuccessAway.length <= Math.floor(customerSuccess.length / 2)
  if(!isCssAwayValid){
    throw new Error('The number of customers success away is invalid. It cannot be greater than half of the total css available')
  }
  
  const onlyAvailableCss = customerSuccess.filter(({id}) => !customerSuccessAway.includes(id))
  
  const sortedCss = mergeSort(onlyAvailableCss)
  const sortedCustomers = mergeSort(customers)
  
  const cssWithCustomers = []
  
  let firstIndexInSlice = 0
  for(let index = 0; index < sortedCss.length; index++){
    const currentCs = sortedCss[index]
    
    // The last item index with a score lower than the current CS. It works since the array is sorted.
    const lastSliceIndex =  sortedCustomers.findIndex(({score}) => score > sortedCss[index].score) - 1
    
    // If the last item index is -1, it means that the current CS has no customers.
    if(lastSliceIndex === -1){
      cssWithCustomers.push({
        id: currentCs.id,
        customersQuantity: 0
      })
      
      continue
    }
    
    cssWithCustomers.push({
      id: currentCs.id,
      customersQuantity: sortedCustomers.slice(firstIndexInSlice, lastSliceIndex).length
    })
    
    firstIndexInSlice = lastSliceIndex + 1
  }
  
  // Get the client id of the CS with the most customers.
  const maxCustomers = cssWithCustomers.reduce((acc, {customersQuantity}) => Math.max(acc, customersQuantity), 0)
  const csWithMaxCustomers = cssWithCustomers.filter(({customersQuantity}) => customersQuantity === maxCustomers)
  
  // If there is more than one CS with the same amount of max customers, means a tie. Return 0 in this case.
  return csWithMaxCustomers.length === 1 ? csWithMaxCustomers[0].id : 0
}

/**
 * Sort the arrays (CSs or Customers) using an algorithm with O(nlogn).
 * @param {Entity[]} arr
 * @return {Entity[]}
 */
function mergeSort(arr) {
  if (arr.length < 2) {
    return arr;
  }

  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);

  return merge(mergeSort(left), mergeSort(right));
}

/**
 * Merge the arrays.
 * @param {Entity[]} left
 * @param {Entity[]} right
 */
function merge(left, right) {
  const result = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex].score < right[rightIndex].score) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

test("Scenario 1", () => {
  const css = [
    { id: 1, score: 60 },
    { id: 2, score: 20 },
    { id: 3, score: 95 },
    { id: 4, score: 75 },
  ];
  const customers = [
    { id: 1, score: 90 },
    { id: 2, score: 20 },
    { id: 3, score: 70 },
    { id: 4, score: 40 },
    { id: 5, score: 60 },
    { id: 6, score: 10 },
  ];
  const csAway = [2, 4];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(1);
});

/**
 * Build an array with of entities with the same score.
 * @param size
 * @param score
 * @return {Entity[]}
 */
function buildSizeEntities(size, score) {
  const result = [];
  for (let i = 0; i < size; i += 1) {
    result.push({ id: i + 1, score });
  }
  return result;
}

/**
 * Map the array to the Entity type.
 * @param {number[]} arr
 * @return {Entity[]}
 */
function mapEntities(arr) {
  return arr.map((item, index) => ({
    id: index + 1,
    score: item,
  }));
}

/**
 * Create an array with a sequence of numbers.
 * @param {number} count
 * @param {number} startAt
 * @return {number[]}
 */
function arraySeq(count, startAt){
  return Array.apply(0, Array(count)).map((it, index) => index + startAt);
}

test("Scenario 2", () => {
  const css = mapEntities([11, 21, 31, 3, 4, 5]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(0);
});

test("Scenario 3", () => {
  const testTimeoutInMs = 100;
  const testStartTime = new Date().getTime();

  const css = mapEntities(arraySeq(999, 1));
  const customers = buildSizeEntities(10000, 998);
  const csAway = [999];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(998);

  if (new Date().getTime() - testStartTime > testTimeoutInMs) {
    throw new Error(`Test took longer than ${testTimeoutInMs}ms!`);
  }
});

test("Scenario 4", () => {
  const css = mapEntities([1, 2, 3, 4, 5, 6]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(0);
});

test("Scenario 5", () => {
  const css = mapEntities([100, 2, 3, 6, 4, 5]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(1);
});

test("Scenario 6", () => {
  const css = mapEntities([100, 99, 88, 3, 4, 5]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [1, 3, 2];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(0);
});

test("Scenario 7", () => {
  const css = mapEntities([100, 99, 88, 3, 4, 5]);
  const customers = mapEntities([10, 10, 10, 20, 20, 30, 30, 30, 20, 60]);
  const csAway = [4, 5, 6];

  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(3);
});

test("Scenario 8", () => {
  const css = mapEntities([60, 40, 95, 75]);
  const customers = mapEntities([90, 70, 20, 40, 60, 10]);
  const csAway = [2, 4];
  expect(customerSuccessBalancing(css, customers, csAway)).toEqual(1);
});

test("Scenario 9 - no customers served", ()=>{
  const css = mapEntities([10, 20, 30])
  const customers = mapEntities([40, 50, 60])
  const cssAway = []
  
  // We have a tie cause all css will serve 0 customers.
  expect(customerSuccessBalancing(css,customers, cssAway)).toEqual(0)
})

test("Scenario 10 - Css away greater than limit", ()=>{
  const css = mapEntities([10, 15, 20])
  const customers = mapEntities([10, 12, 10])
  const cssAway = [1,2]
  
  //
  expect(()=> {
    customerSuccessBalancing(css,customers, cssAway)
  }).toThrow()
})
