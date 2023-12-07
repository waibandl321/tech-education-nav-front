/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateTodoInput = {
  id?: string | null,
  name: string,
  description?: string | null,
};

export type ModelTodoConditionInput = {
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelTodoConditionInput | null > | null,
  or?: Array< ModelTodoConditionInput | null > | null,
  not?: ModelTodoConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type Todo = {
  __typename: "Todo",
  id: string,
  name: string,
  description?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateTodoInput = {
  id: string,
  name?: string | null,
  description?: string | null,
};

export type DeleteTodoInput = {
  id: string,
};

export type CreateUserInput = {
  id?: string | null,
  cognitoSub: string,
  displayId: string,
  name?: string | null,
  nameKana?: string | null,
  gender?: string | null,
  birthYear?: number | null,
  birthMonth?: number | null,
  birthDate?: number | null,
  prefecture?: string | null,
  previousJob?: string | null,
  isRegisterUserInfo?: boolean | null,
};

export type ModelUserConditionInput = {
  cognitoSub?: ModelStringInput | null,
  displayId?: ModelStringInput | null,
  name?: ModelStringInput | null,
  nameKana?: ModelStringInput | null,
  gender?: ModelStringInput | null,
  birthYear?: ModelIntInput | null,
  birthMonth?: ModelIntInput | null,
  birthDate?: ModelIntInput | null,
  prefecture?: ModelStringInput | null,
  previousJob?: ModelStringInput | null,
  isRegisterUserInfo?: ModelBooleanInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type User = {
  __typename: "User",
  id: string,
  cognitoSub: string,
  displayId: string,
  name?: string | null,
  nameKana?: string | null,
  gender?: string | null,
  birthYear?: number | null,
  birthMonth?: number | null,
  birthDate?: number | null,
  prefecture?: string | null,
  previousJob?: string | null,
  isRegisterUserInfo?: boolean | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateUserInput = {
  id: string,
  cognitoSub?: string | null,
  displayId?: string | null,
  name?: string | null,
  nameKana?: string | null,
  gender?: string | null,
  birthYear?: number | null,
  birthMonth?: number | null,
  birthDate?: number | null,
  prefecture?: string | null,
  previousJob?: string | null,
  isRegisterUserInfo?: boolean | null,
};

export type DeleteUserInput = {
  id: string,
};

export type ModelTodoFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelTodoFilterInput | null > | null,
  or?: Array< ModelTodoFilterInput | null > | null,
  not?: ModelTodoFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelTodoConnection = {
  __typename: "ModelTodoConnection",
  items:  Array<Todo | null >,
  nextToken?: string | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  cognitoSub?: ModelStringInput | null,
  displayId?: ModelStringInput | null,
  name?: ModelStringInput | null,
  nameKana?: ModelStringInput | null,
  gender?: ModelStringInput | null,
  birthYear?: ModelIntInput | null,
  birthMonth?: ModelIntInput | null,
  birthDate?: ModelIntInput | null,
  prefecture?: ModelStringInput | null,
  previousJob?: ModelStringInput | null,
  isRegisterUserInfo?: ModelBooleanInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionTodoFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionTodoFilterInput | null > | null,
  or?: Array< ModelSubscriptionTodoFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionUserFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  cognitoSub?: ModelSubscriptionStringInput | null,
  displayId?: ModelSubscriptionStringInput | null,
  name?: ModelSubscriptionStringInput | null,
  nameKana?: ModelSubscriptionStringInput | null,
  gender?: ModelSubscriptionStringInput | null,
  birthYear?: ModelSubscriptionIntInput | null,
  birthMonth?: ModelSubscriptionIntInput | null,
  birthDate?: ModelSubscriptionIntInput | null,
  prefecture?: ModelSubscriptionStringInput | null,
  previousJob?: ModelSubscriptionStringInput | null,
  isRegisterUserInfo?: ModelSubscriptionBooleanInput | null,
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type CreateTodoMutationVariables = {
  input: CreateTodoInput,
  condition?: ModelTodoConditionInput | null,
};

export type CreateTodoMutation = {
  createTodo?:  {
    __typename: "Todo",
    id: string,
    name: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateTodoMutationVariables = {
  input: UpdateTodoInput,
  condition?: ModelTodoConditionInput | null,
};

export type UpdateTodoMutation = {
  updateTodo?:  {
    __typename: "Todo",
    id: string,
    name: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteTodoMutationVariables = {
  input: DeleteTodoInput,
  condition?: ModelTodoConditionInput | null,
};

export type DeleteTodoMutation = {
  deleteTodo?:  {
    __typename: "Todo",
    id: string,
    name: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    cognitoSub: string,
    displayId: string,
    name?: string | null,
    nameKana?: string | null,
    gender?: string | null,
    birthYear?: number | null,
    birthMonth?: number | null,
    birthDate?: number | null,
    prefecture?: string | null,
    previousJob?: string | null,
    isRegisterUserInfo?: boolean | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    cognitoSub: string,
    displayId: string,
    name?: string | null,
    nameKana?: string | null,
    gender?: string | null,
    birthYear?: number | null,
    birthMonth?: number | null,
    birthDate?: number | null,
    prefecture?: string | null,
    previousJob?: string | null,
    isRegisterUserInfo?: boolean | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    cognitoSub: string,
    displayId: string,
    name?: string | null,
    nameKana?: string | null,
    gender?: string | null,
    birthYear?: number | null,
    birthMonth?: number | null,
    birthDate?: number | null,
    prefecture?: string | null,
    previousJob?: string | null,
    isRegisterUserInfo?: boolean | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type GetTodoQueryVariables = {
  id: string,
};

export type GetTodoQuery = {
  getTodo?:  {
    __typename: "Todo",
    id: string,
    name: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListTodosQueryVariables = {
  filter?: ModelTodoFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTodosQuery = {
  listTodos?:  {
    __typename: "ModelTodoConnection",
    items:  Array< {
      __typename: "Todo",
      id: string,
      name: string,
      description?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    cognitoSub: string,
    displayId: string,
    name?: string | null,
    nameKana?: string | null,
    gender?: string | null,
    birthYear?: number | null,
    birthMonth?: number | null,
    birthDate?: number | null,
    prefecture?: string | null,
    previousJob?: string | null,
    isRegisterUserInfo?: boolean | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      cognitoSub: string,
      displayId: string,
      name?: string | null,
      nameKana?: string | null,
      gender?: string | null,
      birthYear?: number | null,
      birthMonth?: number | null,
      birthDate?: number | null,
      prefecture?: string | null,
      previousJob?: string | null,
      isRegisterUserInfo?: boolean | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateTodoSubscriptionVariables = {
  filter?: ModelSubscriptionTodoFilterInput | null,
};

export type OnCreateTodoSubscription = {
  onCreateTodo?:  {
    __typename: "Todo",
    id: string,
    name: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateTodoSubscriptionVariables = {
  filter?: ModelSubscriptionTodoFilterInput | null,
};

export type OnUpdateTodoSubscription = {
  onUpdateTodo?:  {
    __typename: "Todo",
    id: string,
    name: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteTodoSubscriptionVariables = {
  filter?: ModelSubscriptionTodoFilterInput | null,
};

export type OnDeleteTodoSubscription = {
  onDeleteTodo?:  {
    __typename: "Todo",
    id: string,
    name: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  owner?: string | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    cognitoSub: string,
    displayId: string,
    name?: string | null,
    nameKana?: string | null,
    gender?: string | null,
    birthYear?: number | null,
    birthMonth?: number | null,
    birthDate?: number | null,
    prefecture?: string | null,
    previousJob?: string | null,
    isRegisterUserInfo?: boolean | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  owner?: string | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    cognitoSub: string,
    displayId: string,
    name?: string | null,
    nameKana?: string | null,
    gender?: string | null,
    birthYear?: number | null,
    birthMonth?: number | null,
    birthDate?: number | null,
    prefecture?: string | null,
    previousJob?: string | null,
    isRegisterUserInfo?: boolean | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  owner?: string | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    cognitoSub: string,
    displayId: string,
    name?: string | null,
    nameKana?: string | null,
    gender?: string | null,
    birthYear?: number | null,
    birthMonth?: number | null,
    birthDate?: number | null,
    prefecture?: string | null,
    previousJob?: string | null,
    isRegisterUserInfo?: boolean | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};
