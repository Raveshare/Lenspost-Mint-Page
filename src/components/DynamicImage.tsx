import { getPlaiceholder } from 'plaiceholder';
import Image from 'next/image';
import { FC } from 'react';

const DynamicImage: FC<{ title: undefined | string; src: string }> = async ({
  title,
  src
}) => {
  const buffer = await fetch(src).then(async (res) => {
    return Buffer.from(await res.arrayBuffer());
  });

  const { base64 } = await getPlaiceholder(buffer);

  return (
    <Image
      className="w-full rounded-3xl shadow-xl sm:w-1/2"
      alt={title as unknown as string}
      blurDataURL={base64}
      placeholder="blur"
      priority={true}
      height={1080}
      width={1920}
      src={src}
    />
  );
};

export default DynamicImage;
