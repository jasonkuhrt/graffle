install_and_test()
{
  yarn add graphql@"$((GRAPHQL_VERSION))" --dev
  yarn test
}

export GRAPHQL_VERSION=14
install_and_test

export GRAPHQL_VERSION=15
install_and_test

export GRAPHQL_VERSION=16
install_and_test
