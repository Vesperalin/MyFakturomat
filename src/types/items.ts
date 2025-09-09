import { Prisma, Item } from '@prisma/client';

type ItemCreateInput = Prisma.ItemCreateInput;

type ItemUpdateInput = Prisma.ItemUpdateInput;

export type { Item, ItemCreateInput, ItemUpdateInput };
