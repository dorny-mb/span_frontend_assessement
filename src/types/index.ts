export type Image = {
  thumb: string;
  regular: string;
  raw: string;
  full: string;
  small?: string;
};

export type User = {
  profile_image: Image;
  username: string;
  name: string;
};

export type Photo = {
  likes: number;
  user: User;
} & Image;

export type Topic = {
  id: number;
  title: string;
  slug: string;
  cover_photo: {
    urls: Image;
  };
};
