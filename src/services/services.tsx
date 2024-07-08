import baseAxios from './axios';

export const GetRequest = async (url: string) => {
  return await baseAxios.get(url, {
    headers: {
      accessToken: localStorage.getItem('accessToken'),
    },
  });
};

export const PostRequest = (url: string, data: any, config = {}) => {
  return baseAxios.post(url, data, config);
};

export const PatchRequest = (url: string, data: any, config = {}) => {
  return baseAxios.patch(url, data, config);
};

export const DeleteRequest = (url: string, config = {}) => {
  return baseAxios.delete(url, config);
};
