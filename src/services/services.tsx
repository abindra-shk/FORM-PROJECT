import baseAxios from './axios';

export const GetRequest = async (url: string) => {
  return await baseAxios.get(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
};

export const PostRequest = (url: string, data: any) => {
  return baseAxios.post(url, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
};

export const PatchRequest = (url: string, data: any) => {
  return baseAxios.patch(url, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
};

export const DeleteRequest = (url: string) => {
  return baseAxios.delete(url,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
};
