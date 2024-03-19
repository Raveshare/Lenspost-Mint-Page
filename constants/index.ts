export const LENSPOST_ETH_ADDRESS = "0x77fAD8D0FcfD481dAf98D0D156970A281e66761b";

export const ZORA_REWARD_FEE = "0.000777";

export const ZORA_REWARD_FEE_FLOAT = parseFloat(ZORA_REWARD_FEE);
export const ZORA_REWARD_FEE_BIGINT = BigInt(Math.round(ZORA_REWARD_FEE_FLOAT * 1e18)); // Convert to BigInt, rounding to nearest whole number
