'use client';

import { Share } from '@/assets';
import { toast } from 'sonner';
import { FC } from 'react';

interface ShareButtonProps {
  successMessage?: string;
  url?: string | any;
}
const ShareButton: FC<ShareButtonProps> = ({ successMessage, url }) => {
  return (
    <div
      onClick={() => {
        navigator.clipboard.writeText(window.location.href || url);
        toast.success(successMessage);
      }}
      className="cursor-pointer rounded-full border-2 border-[#E7D9E9] p-1"
    >
      <Share height={16} width={16} />
    </div>
  );
};

export default ShareButton;
