import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function arraysEqual(arr1: Array<any>, arr2: Array<any>) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (Array.isArray(arr1[i]) && Array.isArray(arr2[i])) {
      if (!arraysEqual(arr1[i], arr2[i])) {
        return false;
      }
    } else if (typeof arr1[i] === 'object' && typeof arr2[i] === 'object') {
      if (!objectsEqual(arr1[i], arr2[i])) {
        return false;
      }
    } else if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}

export function objectsEqual(obj1: Record<string, any>, obj2: Record<string, any>) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    const val1 = obj1[key];
    const val2 = obj2[key];

    if (Array.isArray(val1) && Array.isArray(val2)) {
      if (!arraysEqual(val1, val2)) {
        return false;
      }
    } else if (typeof val1 === 'object' && typeof val2 === 'object') {
      if (!objectsEqual(val1, val2)) {
        return false;
      }
    } else if (val1 !== val2) {
      return false;
    }
  }

  return true;
}