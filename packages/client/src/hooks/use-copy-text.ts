import { useState } from 'react';

export const useCopyText = () => {
  const [isCopiedText, setIsCopiedText] = useState(false);

  const copyText = async (text: string) => {
    await navigator.clipboard.writeText(text);

    setIsCopiedText(true);

    setTimeout(() => {
      setIsCopiedText(false);
    }, 2000);
  };

  return { isCopiedText, copyText };
};
