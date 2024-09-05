---
aside: false
---

# DynamicHeaders.output Encoder

```ts twoslash
export const encode = (snapshot: string) => {
  return snapshot.replace(
    /x-sent-at-time: '\d+'/,
    `x-sent-at-time: 'DYNAMIC_VALUE'`,
  )
}
```

#### Output

```txt
```
