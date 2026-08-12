import type { Property } from '@/types/property';
import { demoProperties } from '@/data/demo-properties';

// Persistent in-memory global store across Astro SSR requests
declare global {
  var __ADMIN_PROPERTIES_STORE__: Property[] | undefined;
}

function getStore(): Property[] {
  if (!globalThis.__ADMIN_PROPERTIES_STORE__) {
    globalThis.__ADMIN_PROPERTIES_STORE__ = [...demoProperties];
  }
  return globalThis.__ADMIN_PROPERTIES_STORE__;
}

export function getAllStoreProperties(): Property[] {
  return getStore();
}

export function getStorePropertyById(id: string): Property | undefined {
  return getStore().find((p) => p.id === id);
}

export function getStorePropertyBySlug(slug: string): Property | undefined {
  return getStore().find((p) => p.slug === slug);
}

export function addStoreProperty(newProperty: Property): Property {
  const store = getStore();
  // Ensure unique ID & slug
  let uniqueSlug = newProperty.slug;
  let counter = 1;
  while (store.some((p) => p.slug === uniqueSlug)) {
    uniqueSlug = `${newProperty.slug}-${counter++}`;
  }

  const propertyWithSlug = {
    ...newProperty,
    slug: uniqueSlug,
  };

  store.unshift(propertyWithSlug);
  return propertyWithSlug;
}

export function updateStoreProperty(id: string, updatedFields: Partial<Property>): Property | null {
  const store = getStore();
  const index = store.findIndex((p) => p.id === id);
  if (index === -1) return null;

  const existing = store[index];
  const updatedProperty = {
    ...existing,
    ...updatedFields,
    updatedAt: new Date().toISOString(),
  } as Property;

  store[index] = updatedProperty;
  return updatedProperty;
}

export function deleteStoreProperty(id: string): boolean {
  const store = getStore();
  const index = store.findIndex((p) => p.id === id);
  if (index === -1) return false;

  store.splice(index, 1);
  return true;
}

export function getAdminDashboardStats() {
  const store = getStore();
  return {
    totalProperties: store.length,
    featuredCount: store.filter((p) => p.featured).length,
    availableCount: store.filter((p) => p.status === 'Available').length,
    soldCount: store.filter((p) => p.status === 'Sold').length,
    rentedCount: store.filter((p) => p.status === 'Rented').length,
  };
}
