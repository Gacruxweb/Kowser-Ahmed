export const getGoogleDriveDirectUrl = (input: string): string => {
  if (!input) return '';
  
  // If it's already a direct lh3 link, return as is
  if (input.includes('lh3.googleusercontent.com/d/')) {
    return input;
  }

  // Extract ID from any Google Drive link format (share, open, uc)
  const idMatch = input.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || 
                  input.match(/id=([a-zA-Z0-9_-]+)/);
  
  if (idMatch && idMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${idMatch[1]}`;
  }

  // If input is just an ID (alphanumeric, underscores, hyphens)
  if (/^[a-zA-Z0-9_-]{25,}$/.test(input)) {
    return `https://lh3.googleusercontent.com/d/${input}`;
  }

  return input;
};
