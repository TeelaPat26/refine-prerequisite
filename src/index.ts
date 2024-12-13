import { Person } from "./types/person";

// Sample functions
export function multiplyTwoNumbers(a: number, b: number) {
    return a * b;
}

export function greeting(person: Person)  {
    return `Hello ${person.firstName} ${person.lastName}`
}

// Refine Prerequisites
export * from './auth/authProvider'
export * from './storage'
export * from './types'

