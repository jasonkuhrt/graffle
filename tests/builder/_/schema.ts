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
      FooBarUnion:
        | 'Foo'
        | 'Bar'
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
      type: {
        kind: 'literal'
        value: 'Query'
      }
      args: null
    }
    id: {
      type: {
        kind: 'nullable'
        type: {
          kind: 'reference'
          reference: $.Scalars['ID']
        }
      }
      args: null
    }
    idNonNull: {
      type: {
        kind: 'reference'
        reference: $.Scalars['ID']
      }
      args: null
    }
    string: {
      type: {
        kind: 'nullable'
        type: {
          kind: 'reference'
          reference: $.Scalars['String']
        }
      }
      args: null
    }
    stringWithRequiredArg: {
      type: {
        kind: 'nullable'
        type: {
          kind: 'reference'
          reference: $.Scalars['String']
        }
      }
      args: {
        type: {
          string: $.Scalars['String']
        }
        allOptional: false
      }
    }
    stringWithArgs: {
      type: {
        kind: 'nullable'
        type: {
          kind: 'reference'
          reference: $.Scalars['String']
        }
      }
      args: {
        type: {
          string?: $.Scalars['String'] | null
          int?: $.Scalars['Int'] | null
          float?: $.Scalars['Float'] | null
          boolean?: $.Scalars['Boolean'] | null
          id?: $.Scalars['ID'] | null
        }
        allOptional: true
      }
    }
    object: {
      type: {
        kind: 'nullable'
        type: {
          kind: 'reference'
          reference: Object.Object
        }
      }
      args: null
    }
    listListInt: {
      type: {
        kind: 'list'
        type: {
          kind: 'list'
          type: {
            kind: 'reference'
            reference: $.Scalars['Int']
          }
        }
      }
      args: null
    }
    listInt: {
      type: {
        kind: 'nullable'
        type: {
          kind: 'list'
          type: {
            kind: 'nullable'
            type: {
              kind: 'reference'
              reference: $.Scalars['Int']
            }
          }
        }
      }
      args: null
    }
    listIntNonNull: {
      type: {
        kind: 'list'
        type: {
          kind: 'reference'
          reference: $.Scalars['Int']
        }
      }
      args: null
    }
    objectNested: {
      type: {
        kind: 'nullable'
        type: {
          kind: 'reference'
          reference: Object.ObjectNested
        }
      }
      args: null
    }
    objectNonNull: {
      type: {
        kind: 'reference'
        reference: Object.Object
      }
      args: null
    }
    objectWithArgs: {
      type: {
        kind: 'nullable'
        type: {
          kind: 'reference'
          reference: Object.Object
        }
      }
      args: {
        type: {
          string?: $.Scalars['String'] | null
          int?: $.Scalars['Int'] | null
          float?: $.Scalars['Float'] | null
          boolean?: $.Scalars['Boolean'] | null
          id?: $.Scalars['ID'] | null
        }
        allOptional: true
      }
    }
    fooBarUnion: {
      type: {
        kind: 'nullable'
        type: {
          kind: 'reference'
          reference: Union.FooBarUnion
        }
      }
      args: null
    }
    /**
     * Query enum field documentation.
     */
    abcEnum: {
      type: {
        kind: 'nullable'
        type: {
          kind: 'reference'
          reference: Enum.ABCEnum
        }
      }
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
    | 'A'
    | 'B'
    | 'C'
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
      type: {
        kind: 'literal'
        value: 'Foo'
      }
      args: null
    }
    /**
     * Field documentation.
     *
     * @deprecated Field a is deprecated.
     */
    id: {
      type: {
        kind: 'nullable'
        type: {
          kind: 'reference'
          reference: $.Scalars['ID']
        }
      }
      args: null
    }
  }

  export interface Bar {
    __typename: {
      type: {
        kind: 'literal'
        value: 'Bar'
      }
      args: null
    }
    int: {
      type: {
        kind: 'nullable'
        type: {
          kind: 'reference'
          reference: $.Scalars['Int']
        }
      }
      args: null
    }
  }

  export interface ObjectNested {
    __typename: {
      type: {
        kind: 'literal'
        value: 'ObjectNested'
      }
      args: null
    }
    id: {
      type: {
        kind: 'nullable'
        type: {
          kind: 'reference'
          reference: $.Scalars['ID']
        }
      }
      args: null
    }
    object: {
      type: {
        kind: 'nullable'
        type: {
          kind: 'reference'
          reference: Object.Object
        }
      }
      args: null
    }
  }

  export interface Object {
    __typename: {
      type: {
        kind: 'literal'
        value: 'Object'
      }
      args: null
    }
    string: {
      type: {
        kind: 'nullable'
        type: {
          kind: 'reference'
          reference: $.Scalars['String']
        }
      }
      args: null
    }
    int: {
      type: {
        kind: 'nullable'
        type: {
          kind: 'reference'
          reference: $.Scalars['Int']
        }
      }
      args: null
    }
    float: {
      type: {
        kind: 'nullable'
        type: {
          kind: 'reference'
          reference: $.Scalars['Float']
        }
      }
      args: null
    }
    boolean: {
      type: {
        kind: 'nullable'
        type: {
          kind: 'reference'
          reference: $.Scalars['Boolean']
        }
      }
      args: null
    }
    id: {
      type: {
        kind: 'nullable'
        type: {
          kind: 'reference'
          reference: $.Scalars['ID']
        }
      }
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
    __unionname: 'FooBarUnion'
    type:
      | Object.Foo
      | Object.Bar
  }
}
