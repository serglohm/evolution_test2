export const SEATS_COUNT = 12;

export function* generateSeats(count) {
  for (let i = 1; i <= count; i++) yield i;
}
