export type UserItem = {
  id: string;
  userName: string;
  userPhoto: {
    large: string;
    medium: string;
  };
  favorite?: boolean;
};
