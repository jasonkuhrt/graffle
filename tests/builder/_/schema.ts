export namespace $ {
export interface Index {
Root: {
Query: Root.Query
Mutation: null
Subscription: null
}
unions: {
Union: Union.FooBarUnion
}
scalars: Scalars
}
export interface Scalars {

    String: string
Int: number
Float: number
Boolean: boolean
ID: string
  
}
}

// ------------------------------------------------------------ //
//                             Root                             //
// ------------------------------------------------------------ //

export namespace Root {
export interface Query {
__typename: "Query"
string: $.Scalars["String"] | null
scalars: Object.Scalars | null
fooBarUnion: Union.FooBarUnion | null
}
}

// ------------------------------------------------------------ //
//                             Enum                             //
// ------------------------------------------------------------ //

export namespace Enum {
// -- no types --

}

// ------------------------------------------------------------ //
//                         InputObject                          //
// ------------------------------------------------------------ //

export namespace InputObject {
// -- no types --

}

// ------------------------------------------------------------ //
//                          Interface                           //
// ------------------------------------------------------------ //

export namespace Interface {
// -- no types --

}

// ------------------------------------------------------------ //
//                            Object                            //
// ------------------------------------------------------------ //

export namespace Object {
export interface Foo {
__typename: "Foo"
a: $.Scalars["String"] | null
}

export interface Bar {
__typename: "Bar"
b: $.Scalars["Int"] | null
}

export interface Scalars {
__typename: "Scalars"
a: $.Scalars["String"] | null
b: $.Scalars["Int"] | null
c: $.Scalars["Float"] | null
d: $.Scalars["Boolean"] | null
e: $.Scalars["ID"] | null
}
}

// ------------------------------------------------------------ //
//                            Union                             //
// ------------------------------------------------------------ //

export namespace Union {
export type FooBarUnion =
| Object.Foo& { $$union:true}
| Object.Bar& { $$union:true}
}