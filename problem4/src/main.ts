function sum_to_n_a(n: number): number {
  // your code here
  let result: number = 0;
  for (let i: number = 1; i <= n; i++) {
    result += i;
  }
  return result;
}

function sum_to_n_b(n: number): number {
  // your code here
  return (n * (n + 1)) / 2;
}

function sum_to_n_c(n: number): number {
  if (n === 1) {
    return n;
  } else {
    return sum_to_n_c(n - 1) + n;
  }
}

let number: number = 10;

console.log('A', sum_to_n_a(number));
console.log('B', sum_to_n_b(number));
console.log('C', sum_to_n_c(number));