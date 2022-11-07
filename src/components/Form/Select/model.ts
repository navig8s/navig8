export type IOption = {
  label: string
  value: string | number | symbol
}
export const Option = (label: string, value: string | number | symbol) => ({ label, value })
