export interface Enum<
  $Name extends string = string,
  $Members extends [string, ...string[]] = [string, ...string[]],
> {
  kind: 'Enum'
  name: $Name
  members: $Members
}

export const Enum = <$Name extends string, $Members extends [string, ...string[]]>(
  name: $Name,
  members: $Members,
): Enum<$Name, $Members> => ({
  kind: `Enum`,
  name,
  members,
})
