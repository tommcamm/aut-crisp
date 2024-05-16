// File used for common functions to be used in component
export function classNames(...classes: Array<string>) :string {
    return classes.filter(Boolean).join(' ')
}