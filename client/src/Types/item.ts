export type item = {
  _id: string
  owner?: string
  name: string
  path: string
  dataCreate: Date
  description?: string
  tags?: string[]
  size?: number
  icon?: string
  countOfPlays?: number
}
