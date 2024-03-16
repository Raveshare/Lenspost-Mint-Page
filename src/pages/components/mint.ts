// create edition configs
const {
  config,
  error: prepareError,
  isError: isPrepareError,
} = useSimulateContract({
  abi: zoraNftCreatorV1Config.abi,
  address: zoraNftCreatorV1Config.address[chainId],
  functionName: "createEditionWithReferral",
  args: handleMintSettings().args,
});

const { write, data, error, isLoading, isError } = useContractWrite(config);
const {
  data: receipt,
  isLoading: isPending,
  isSuccess,
} = useWaitForTransaction({ hash: data?.hash });