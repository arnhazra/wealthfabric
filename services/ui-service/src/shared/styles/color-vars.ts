const cssVar = (variable: string, fallback: string): string => {
  if (typeof document !== "undefined") {
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue(variable)
      .trim()
    if (value) return value
  }
  return fallback
}

const fallbackColor = "#000000"

export const colorVars = {
  get main() {
    return cssVar("--color-main", fallbackColor)
  },
  get background() {
    return cssVar("--color-background", fallbackColor)
  },
  get border() {
    return cssVar("--color-border", fallbackColor)
  },
  get primary() {
    return cssVar("--color-primary", fallbackColor)
  },
  get secondary() {
    return cssVar("--color-secondary", fallbackColor)
  },
}
