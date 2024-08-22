import {ApiError, ApiResponse, ServerErrorCodes} from "@/apis";
import {modalStore} from "@/stores";
import {createStandaloneToast} from "@chakra-ui/react";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {isAxiosError} from "axios";

const {toast} = createStandaloneToast();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (!isAxiosError<ApiError>(error) || query.meta?.ignoreError) return;
      // modalStore.getState().openAlert({
      //   title: "에러가 발생했습니다.",
      //   content: error.response?.data.message || error.message,
      // });
    },
  }),
  mutationCache: new MutationCache({
    onSuccess: (data, variables, context, mutation) => {
      if (!data) return;
      const typedData = data as ApiResponse<any>;
      if (mutation.meta?.ignoreSuccess) return;
      // modalStore.getState().openAlert({
      //   content: typedData?.message || "요청이 성공적으로 처리되었습니다.",
      // });
    },
    onError: (error, variables, context, mutation) => {
      if (!isAxiosError<ApiError>(error) || mutation.meta?.ignoreError) return;
      if (
        error.response?.data.errors.errorCode === ServerErrorCodes.ACCESS_DENIED
      ) {
        modalStore.getState().closeAllModal();
        // modalStore.getState().openModal(UnauthorizedModal, {});
      } else {
        toast({
          description:
            error.response?.data.errors.errorMessage || error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    },
  }),
});

interface ReactQueryProviderProps {
  children: React.ReactNode;
}

const ReactQueryProvider = ({children}: ReactQueryProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools/>
      {children}
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
