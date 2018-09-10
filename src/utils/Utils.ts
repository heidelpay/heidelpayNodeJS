export const replaceUrl = (url: string, args: any) => {
  const regex = /{([a-zA-Z]+)}/gm

  const urlReplaced = url.replace(regex, (matches, item) => {
    return args[item] || ''
  })

  return urlReplaced
}
