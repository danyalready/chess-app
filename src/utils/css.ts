export function mergeModifiers(base: string, modifiers: Array<string>): string {
    let result = base;

    modifiers?.filter(Boolean).forEach((modifier) => {
        result += ` ${base}--${modifier}`;
    });

    return result;
}
