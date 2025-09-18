import { ItemCreateBody } from '@/types/items';
import { Currency, ItemUnit } from '@prisma/client';

// just basic form validation - without Zod
export const validateItemCreateBody = (
  input: unknown,
): {
  valid: boolean;
  errors?: Record<string, string>;
  value?: ItemCreateBody;
} => {
  const errors: Record<string, string> = {};
  if (typeof input !== 'object' || input === null) {
    return { valid: false, errors: { body: 'Expected JSON object' } };
  }

  const data = input as Partial<
    ItemCreateBody & { userId?: unknown; id?: unknown }
  >;

  if (typeof data.name !== 'string' || data.name.trim().length === 0) {
    errors.name = 'Name is required';
  } else if (data.name.length > 512) {
    errors.name = 'Name is too long (max 512)';
  }

  if (typeof data.price_netto !== 'number' || Number.isNaN(data.price_netto)) {
    errors.price_netto = 'price_netto must be a number';
  }

  if (
    data.vat_rate !== undefined &&
    (typeof data.vat_rate !== 'number' || Number.isNaN(data.vat_rate))
  ) {
    errors.vat_rate = 'vat_rate must be a number if provided';
  }

  if (
    typeof data.price_brutto !== 'number' ||
    Number.isNaN(data.price_brutto)
  ) {
    errors.price_brutto = 'price_brutto must be a number';
  }

  if (typeof data.currency !== 'string' || !(data.currency in Currency)) {
    errors.currency = `currency must be one of: ${Object.keys(Currency).join(', ')}`;
  }

  if (data.unit === undefined) {
    errors.unit = 'unit is required';
  } else if (typeof data.unit !== 'string' || !(data.unit in ItemUnit)) {
    errors.unit = `unit must be one of: ${Object.keys(ItemUnit).join(', ')}`;
  }

  if (data.custom_unit !== undefined && data.custom_unit !== null) {
    if (typeof data.custom_unit !== 'string') {
      errors.custom_unit = 'custom_unit must be a string';
    } else if (data.custom_unit.length > 64) {
      errors.custom_unit = 'custom_unit is too long (max 64)';
    }
  }

  // When unit is 'other', custom_unit must be a non-empty string
  if (
    data.unit === 'other' &&
    !(
      typeof data.custom_unit === 'string' && data.custom_unit.trim().length > 0
    )
  ) {
    errors.custom_unit = 'custom_unit is required when unit is other';
  }

  if (typeof data.quantity !== 'number' || Number.isNaN(data.quantity)) {
    errors.quantity = 'quantity must be a number';
  }

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors };
  }

  const unit = data.unit as ItemUnit;

  const value: ItemCreateBody = {
    name: data.name as string,
    price_netto: data.price_netto as number,
    vat_rate: (data.vat_rate as number | undefined) ?? null,
    price_brutto: data.price_brutto as number,
    currency: data.currency as Currency,
    quantity: data.quantity as number,
    unit: unit,
    custom_unit:
      unit === 'other'
        ? ((typeof data.custom_unit === 'string'
            ? data.custom_unit.trim()
            : '') as string)
        : null,
  };

  return { valid: true, value };
};
