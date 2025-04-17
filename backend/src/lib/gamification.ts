export function calculateLevel(points: number): number {
  // Implement level calculation logic here
  // This is a simple example, you can adjust the logic as needed
  if (points < 100) {
    return 1;
  } else if (points < 200) {
    return 2;
  } else if (points < 300) {
    return 3;
  } else {
    return 4;
  }
}
