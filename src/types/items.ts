import { Item } from '@prisma/client';

type ItemCreateBody = Omit<Item, 'id' | 'userId'>;

export type { ItemCreateBody };
