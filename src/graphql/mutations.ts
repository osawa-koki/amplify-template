/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createTodo = /* GraphQL */ `mutation CreateTodo(
  $input: CreateTodoInput!
  $condition: ModelTodoConditionInput
) {
  createTodo(input: $input, condition: $condition) {
    id
    name
    description
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateTodoMutationVariables,
  APITypes.CreateTodoMutation
>;
export const updateTodo = /* GraphQL */ `mutation UpdateTodo(
  $input: UpdateTodoInput!
  $condition: ModelTodoConditionInput
) {
  updateTodo(input: $input, condition: $condition) {
    id
    name
    description
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateTodoMutationVariables,
  APITypes.UpdateTodoMutation
>;
export const deleteTodo = /* GraphQL */ `mutation DeleteTodo(
  $input: DeleteTodoInput!
  $condition: ModelTodoConditionInput
) {
  deleteTodo(input: $input, condition: $condition) {
    id
    name
    description
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteTodoMutationVariables,
  APITypes.DeleteTodoMutation
>;
export const createDream = /* GraphQL */ `mutation CreateDream(
  $input: CreateDreamInput!
  $condition: ModelDreamConditionInput
) {
  createDream(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateDreamMutationVariables,
  APITypes.CreateDreamMutation
>;
export const updateDream = /* GraphQL */ `mutation UpdateDream(
  $input: UpdateDreamInput!
  $condition: ModelDreamConditionInput
) {
  updateDream(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateDreamMutationVariables,
  APITypes.UpdateDreamMutation
>;
export const deleteDream = /* GraphQL */ `mutation DeleteDream(
  $input: DeleteDreamInput!
  $condition: ModelDreamConditionInput
) {
  deleteDream(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteDreamMutationVariables,
  APITypes.DeleteDreamMutation
>;
export const createChatRoom = /* GraphQL */ `mutation CreateChatRoom(
  $input: CreateChatRoomInput!
  $condition: ModelChatRoomConditionInput
) {
  createChatRoom(input: $input, condition: $condition) {
    id
    name
    messages {
      items {
        id
        content
        createdAt
        updatedAt
        chatRoomMessagesId
        owner
        __typename
      }
      nextToken
      __typename
    }
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateChatRoomMutationVariables,
  APITypes.CreateChatRoomMutation
>;
export const updateChatRoom = /* GraphQL */ `mutation UpdateChatRoom(
  $input: UpdateChatRoomInput!
  $condition: ModelChatRoomConditionInput
) {
  updateChatRoom(input: $input, condition: $condition) {
    id
    name
    messages {
      items {
        id
        content
        createdAt
        updatedAt
        chatRoomMessagesId
        owner
        __typename
      }
      nextToken
      __typename
    }
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateChatRoomMutationVariables,
  APITypes.UpdateChatRoomMutation
>;
export const deleteChatRoom = /* GraphQL */ `mutation DeleteChatRoom(
  $input: DeleteChatRoomInput!
  $condition: ModelChatRoomConditionInput
) {
  deleteChatRoom(input: $input, condition: $condition) {
    id
    name
    messages {
      items {
        id
        content
        createdAt
        updatedAt
        chatRoomMessagesId
        owner
        __typename
      }
      nextToken
      __typename
    }
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteChatRoomMutationVariables,
  APITypes.DeleteChatRoomMutation
>;
export const createMessage = /* GraphQL */ `mutation CreateMessage(
  $input: CreateMessageInput!
  $condition: ModelMessageConditionInput
) {
  createMessage(input: $input, condition: $condition) {
    id
    content
    createdAt
    updatedAt
    chatRoomMessagesId
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateMessageMutationVariables,
  APITypes.CreateMessageMutation
>;
export const updateMessage = /* GraphQL */ `mutation UpdateMessage(
  $input: UpdateMessageInput!
  $condition: ModelMessageConditionInput
) {
  updateMessage(input: $input, condition: $condition) {
    id
    content
    createdAt
    updatedAt
    chatRoomMessagesId
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateMessageMutationVariables,
  APITypes.UpdateMessageMutation
>;
export const deleteMessage = /* GraphQL */ `mutation DeleteMessage(
  $input: DeleteMessageInput!
  $condition: ModelMessageConditionInput
) {
  deleteMessage(input: $input, condition: $condition) {
    id
    content
    createdAt
    updatedAt
    chatRoomMessagesId
    owner
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteMessageMutationVariables,
  APITypes.DeleteMessageMutation
>;
