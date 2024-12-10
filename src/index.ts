import { Person } from "./types/person";

export function multiplyTwoNumbers(a: number, b: number) {
    return a * b;
}

export function greeting(person: Person)  {
    return `Hello ${person.firstName} ${person.lastName}`
}

export function logApiUrlFromRefineEnv() {
    // @ts-ignore
    console.log(import.meta.env.VITE_API_URL)
}