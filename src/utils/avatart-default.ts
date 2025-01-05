export function generateAvatar({
  name,
  email,
}: {
  name?: string;
  email?: string;
}): string {
  const seed = encodeURIComponent((name || email || 'default').trim());
  return `https://api.dicebear.com/9.x/initials/svg?seed=${seed}`;
}
