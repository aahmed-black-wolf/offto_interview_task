const normalizeUser = (response: TLoginResponse): LoginResponse => {
    return response.data as LoginResponse;
  };
  
  export const getUser = async () => {
    const token = (await cookies()).get('token')?.value;
    if (token == 'undefined' || !token) return { email: null } as any;
    try {
      const response = await serverFetch.get('my_profile');
      const json = (await response?.json()) as TLoginResponse;
      return normalizeUser(json);
    } catch (error: any) {
      throw new Error(error);
    }
  };
  