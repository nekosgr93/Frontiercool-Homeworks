export type User = {
  gender: 'female' | 'male';
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: string;
    coordinates: {
      latitude: string;
      longitude: string;
    };
    timezone: {
      offset: string;
      description: string;
    };
  };
  login: {
    uuid: string;
  };
  email: string;
  dob: {
    date: Date;
    age: number;
  };
  registered: {
    date: Date;
    age: number;
  };
  phone: string;
  cell: string;
  id: {
    name: string;
    value: string;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
};

export type UserApiResult = {
  results: User[];
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
};
