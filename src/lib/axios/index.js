import client from "./client";
import { setupRequestInterceptor } from "./requestInterceptor";
import { setupResponseInterceptor } from "./responseInterceptor";

setupRequestInterceptor(client);
setupResponseInterceptor(client);

export default client;