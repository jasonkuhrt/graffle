export namespace $ {
export interface Index {
Root: {
Query: Root.Query
Mutation: null
Subscription: null
}
objects: {
Foo: Object.Foo
Bar: Object.Bar
ObjectNested: Object.ObjectNested
Object: Object.Object
}
unionMemberNames: {
FooBarUnion: "Foo"
| "Bar"
}
unions: {
Union: Union.FooBarUnion
}
scalars: Scalars
}
export interface Scalars {
ID: string
String: string
Int: number
Float: number
Boolean: boolean
}
}

// ------------------------------------------------------------ //
//                             Root                             //
// ------------------------------------------------------------ //

export namespace Root {
export interface Query {
__typename: {
type: "Query"
nullable: false
args: null
}
id: {
type: $.Scalars["ID"]
typeName: "ID"
nullable: true
args: null
}
idNonNull: {
type: $.Scalars["ID"]
typeName: "ID"
nullable: false
args: null
}
string: {
type: $.Scalars["String"]
typeName: "String"
nullable: true
args: null
}
stringWithRequiredArg: {
type: $.Scalars["String"]
typeName: "String"
nullable: true
args: {
type: {
string: $.Scalars["String"]
}
allOptional: false
}
}
stringWithArgs: {
type: $.Scalars["String"]
typeName: "String"
nullable: true
args: {
type: {
string?: $.Scalars["String"] | null
int?: $.Scalars["Int"] | null
float?: $.Scalars["Float"] | null
boolean?: $.Scalars["Boolean"] | null
id?: $.Scalars["ID"] | null
}
allOptional: true
}
}
object: {
type: Object.Object
typeName: "Object"
nullable: true
args: null
}
listListInt: {
type: Array<Array<$.Scalars["Int"]>>
typeName: null
nullable: false
args: null
}
listInt: {
type: Array<$.Scalars["Int"]>
typeName: null
nullable: false
args: null
}
listIntNonNull: {
type: Array<$.Scalars["Int"]>
typeName: null
nullable: false
args: null
}
objectNested: {
type: Object.ObjectNested
typeName: "ObjectNested"
nullable: true
args: null
}
objectNonNull: {
type: Object.Object
typeName: "Object"
nullable: false
args: null
}
objectWithArgs: {
type: Object.Object
typeName: "Object"
nullable: true
args: {
type: {
string?: $.Scalars["String"] | null
int?: $.Scalars["Int"] | null
float?: $.Scalars["Float"] | null
boolean?: $.Scalars["Boolean"] | null
id?: $.Scalars["ID"] | null
}
allOptional: true
}
}
fooBarUnion: {
type: Union.FooBarUnion
typeName: "FooBarUnion"
nullable: true
args: null
}
/**
* Query enum field documentation.
*/
abcEnum: {
type: Enum.ABCEnum
typeName: "ABCEnum"
nullable: true
args: null
}
}
}

// ------------------------------------------------------------ //
//                             Enum                             //
// ------------------------------------------------------------ //

export namespace Enum {
/**
* Enum documentation.
* 
* Members
* "A" - (DEPRECATED: Enum value A is deprecated.)
* "B" - Enum B member documentation.
* "C" - Enum C member documentation. (DEPRECATED: Enum value C is deprecated.)
*/
export type ABCEnum =
| "A"
| "B"
| "C"
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
/**
* Object documentation.
*/
export interface Foo {
__typename: {
type: "Foo"
nullable: false
args: null
}
/**
* Field documentation.
* 
* @deprecated Field a is deprecated.
*/
id: {
type: $.Scalars["ID"]
typeName: "ID"
nullable: true
args: null
}
}

export interface Bar {
__typename: {
type: "Bar"
nullable: false
args: null
}
int: {
type: $.Scalars["Int"]
typeName: "Int"
nullable: true
args: null
}
}

export interface ObjectNested {
__typename: {
type: "ObjectNested"
nullable: false
args: null
}
id: {
type: $.Scalars["ID"]
typeName: "ID"
nullable: true
args: null
}
object: {
type: Object.Object
typeName: "Object"
nullable: true
args: null
}
}

export interface Object {
__typename: {
type: "Object"
nullable: false
args: null
}
string: {
type: $.Scalars["String"]
typeName: "String"
nullable: true
args: null
}
int: {
type: $.Scalars["Int"]
typeName: "Int"
nullable: true
args: null
}
float: {
type: $.Scalars["Float"]
typeName: "Float"
nullable: true
args: null
}
boolean: {
type: $.Scalars["Boolean"]
typeName: "Boolean"
nullable: true
args: null
}
id: {
type: $.Scalars["ID"]
typeName: "ID"
nullable: true
args: null
}
}
}

// ------------------------------------------------------------ //
//                            Union                             //
// ------------------------------------------------------------ //

export namespace Union {
/**
* Union documentation.
*/
export interface FooBarUnion {
__unionname: "FooBarUnion"
type: Object.Foo
| Object.Bar
}
}