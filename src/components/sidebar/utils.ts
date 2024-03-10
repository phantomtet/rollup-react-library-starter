import { ReactNode } from 'react';

export interface MenuItem {
  label: ReactNode;
  key: string;
  children?: MenuItem[];
  icon?: ReactNode;
}

export const findParentKeys = (array: MenuItem[], path: string) => {
  const keys: string[] = [];
  const de_quy = (object: MenuItem, parentKey: string | undefined) => {
    if (object.children?.length)
      object.children.forEach((item) => {
        de_quy(item, object.key);
      });
    if (
      parentKey &&
      (object.key === path ||
        (keys.includes(object.key) && !keys.includes(parentKey)))
    )
      keys.push(parentKey);
  };
  array.forEach((item) => de_quy(item, undefined));
  return keys;
};
export const getsAllRoutes = (routes: MenuItem[]) => {
  const allRoutes: string[] = [];
  routes.forEach((route) => {
    allRoutes.push(route.key);
    if (route.children) allRoutes.push(...getsAllRoutes(route.children));
  });
  return allRoutes.filter((route) => route.startsWith('/'));
};
