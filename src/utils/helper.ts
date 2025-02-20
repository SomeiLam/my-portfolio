export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export const getDaysAgo = (timestamp: Date): string => {
  const date = new Date(timestamp);
  const now = new Date();

  // Convert to local time by removing the time component
  const dateOnly = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );
  const nowOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // Difference in time (milliseconds) converted to days
  const diffInTime = nowOnly.getTime() - dateOnly.getTime();
  const diffInDays = Math.floor(diffInTime / (1000 * 60 * 60 * 24));

  if (diffInDays < 0) return 'Today'; // If the timestamp is in the future, assume today
  if (diffInDays === 0) return 'Today';
  if (diffInDays === 1) return 'Yesterday';
  return `${diffInDays} days ago`;
};
