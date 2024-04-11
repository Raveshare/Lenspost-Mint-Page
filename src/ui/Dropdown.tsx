'use client';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ArrowDown } from '@/assets';

const Dropdown = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <div
          className="my-2 flex max-w-96 items-center justify-between rounded-lg border-2 border-[#9291A3] p-2 text-xs font-semibold text-[#5E5C8D]"
          aria-label="Customise options"
        >
          <p>Select Network</p>
          <div className="flex items-center gap-2">
            <p>Base</p>
            <ArrowDown color="#5E5C8D" height={16} width={16} />
          </div>
        </div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade min-w-96 rounded-md bg-white p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform]"
          sideOffset={5}
        >
          <DropdownMenu.Item className="text-violet11 data-[disabled]:text-mauve8 data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 flex cursor-pointer select-none items-center rounded-[3px] p-2 leading-none outline-none hover:bg-gray-100 data-[disabled]:pointer-events-none">
            Base
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default Dropdown;
