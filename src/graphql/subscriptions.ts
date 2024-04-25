/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateTodo = /* GraphQL */ `subscription OnCreateTodo(
  $filter: ModelSubscriptionTodoFilterInput
  $owner: String
) {
  onCreateTodo(filter: $filter, owner: $owner) {
    id
    name
    description
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateTodoSubscriptionVariables,
  APITypes.OnCreateTodoSubscription
>;
export const onUpdateTodo = /* GraphQL */ `subscription OnUpdateTodo(
  $filter: ModelSubscriptionTodoFilterInput
  $owner: String
) {
  onUpdateTodo(filter: $filter, owner: $owner) {
    id
    name
    description
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateTodoSubscriptionVariables,
  APITypes.OnUpdateTodoSubscription
>;
export const onDeleteTodo = /* GraphQL */ `subscription OnDeleteTodo(
  $filter: ModelSubscriptionTodoFilterInput
  $owner: String
) {
  onDeleteTodo(filter: $filter, owner: $owner) {
    id
    name
    description
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteTodoSubscriptionVariables,
  APITypes.OnDeleteTodoSubscription
>;
export const onCreateDream = /* GraphQL */ `subscription OnCreateDream(
  $filter: ModelSubscriptionDreamFilterInput
  $owner: String
) {
  onCreateDream(filter: $filter, owner: $owner) {
    id
    name
    description
    dueDate
    done
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateDreamSubscriptionVariables,
  APITypes.OnCreateDreamSubscription
>;
export const onUpdateDream = /* GraphQL */ `subscription OnUpdateDream(
  $filter: ModelSubscriptionDreamFilterInput
  $owner: String
) {
  onUpdateDream(filter: $filter, owner: $owner) {
    id
    name
    description
    dueDate
    done
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateDreamSubscriptionVariables,
  APITypes.OnUpdateDreamSubscription
>;
export const onDeleteDream = /* GraphQL */ `subscription OnDeleteDream(
  $filter: ModelSubscriptionDreamFilterInput
  $owner: String
) {
  onDeleteDream(filter: $filter, owner: $owner) {
    id
    name
    description
    dueDate
    done
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteDreamSubscriptionVariables,
  APITypes.OnDeleteDreamSubscription
>;
