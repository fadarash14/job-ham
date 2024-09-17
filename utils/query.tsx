import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { PropsWithChildren } from "react";
const queryClient = new QueryClient();

const QueryProviderNiazmandiha: React.FC<PropsWithChildren> = (props) => {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      {props.children}
      {/*<ReactQueryDevtools initialIsOpen={false} />*/}
    </QueryClientProvider>
  );
};
export default QueryProviderNiazmandiha;
