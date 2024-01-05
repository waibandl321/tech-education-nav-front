/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

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
  isDeleted?: boolean | null,
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
  isDeleted?: ModelBooleanInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
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
  isDeleted?: boolean | null,
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
  isDeleted?: boolean | null,
};

export type DeleteUserInput = {
  id: string,
};

export type CreateLearningCenterInput = {
  id?: string | null,
  name?: string | null,
  memo?: string | null,
  operatingCompany?: string | null,
  headquartersLocation?: string | null,
  websiteURL?: string | null,
  logoImageURL?: string | null,
  establishmentYear?: number | null,
  representative?: string | null,
  isDeleted?: boolean | null,
};

export type ModelLearningCenterConditionInput = {
  name?: ModelStringInput | null,
  memo?: ModelStringInput | null,
  operatingCompany?: ModelStringInput | null,
  headquartersLocation?: ModelStringInput | null,
  websiteURL?: ModelStringInput | null,
  logoImageURL?: ModelStringInput | null,
  establishmentYear?: ModelIntInput | null,
  representative?: ModelStringInput | null,
  isDeleted?: ModelBooleanInput | null,
  and?: Array< ModelLearningCenterConditionInput | null > | null,
  or?: Array< ModelLearningCenterConditionInput | null > | null,
  not?: ModelLearningCenterConditionInput | null,
};

export type LearningCenter = {
  __typename: "LearningCenter",
  id: string,
  name?: string | null,
  memo?: string | null,
  operatingCompany?: string | null,
  headquartersLocation?: string | null,
  websiteURL?: string | null,
  logoImageURL?: string | null,
  establishmentYear?: number | null,
  representative?: string | null,
  isDeleted?: boolean | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateLearningCenterInput = {
  id: string,
  name?: string | null,
  memo?: string | null,
  operatingCompany?: string | null,
  headquartersLocation?: string | null,
  websiteURL?: string | null,
  logoImageURL?: string | null,
  establishmentYear?: number | null,
  representative?: string | null,
  isDeleted?: boolean | null,
};

export type DeleteLearningCenterInput = {
  id: string,
};

export type CreateLearningCenterCourseInput = {
  id?: string | null,
  learningCenterId: string,
  courseName?: string | null,
  courseURL?: string | null,
  couseDetail?: string | null,
  isDeleted?: boolean | null,
};

export type ModelLearningCenterCourseConditionInput = {
  learningCenterId?: ModelIDInput | null,
  courseName?: ModelStringInput | null,
  courseURL?: ModelStringInput | null,
  couseDetail?: ModelStringInput | null,
  isDeleted?: ModelBooleanInput | null,
  and?: Array< ModelLearningCenterCourseConditionInput | null > | null,
  or?: Array< ModelLearningCenterCourseConditionInput | null > | null,
  not?: ModelLearningCenterCourseConditionInput | null,
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

export type LearningCenterCourse = {
  __typename: "LearningCenterCourse",
  id: string,
  learningCenterId: string,
  courseName?: string | null,
  courseURL?: string | null,
  couseDetail?: string | null,
  isDeleted?: boolean | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateLearningCenterCourseInput = {
  id: string,
  learningCenterId?: string | null,
  courseName?: string | null,
  courseURL?: string | null,
  couseDetail?: string | null,
  isDeleted?: boolean | null,
};

export type DeleteLearningCenterCourseInput = {
  id: string,
};

export type CreateCourseReviewInput = {
  id?: string | null,
  userId: string,
  userDisplayName?: string | null,
  userGender?: string | null,
  userAge?: string | null,
  userPreviousJob?: string | null,
  learningCenterId: string,
  learningCenterCourseId: string,
  reviewTitle: string,
  reviewDetail: string,
  rating: number,
  isPublished: boolean,
  isDeleted?: boolean | null,
};

export type ModelCourseReviewConditionInput = {
  userId?: ModelIDInput | null,
  userDisplayName?: ModelStringInput | null,
  userGender?: ModelStringInput | null,
  userAge?: ModelStringInput | null,
  userPreviousJob?: ModelStringInput | null,
  learningCenterId?: ModelIDInput | null,
  learningCenterCourseId?: ModelIDInput | null,
  reviewTitle?: ModelStringInput | null,
  reviewDetail?: ModelStringInput | null,
  rating?: ModelIntInput | null,
  isPublished?: ModelBooleanInput | null,
  isDeleted?: ModelBooleanInput | null,
  and?: Array< ModelCourseReviewConditionInput | null > | null,
  or?: Array< ModelCourseReviewConditionInput | null > | null,
  not?: ModelCourseReviewConditionInput | null,
};

export type CourseReview = {
  __typename: "CourseReview",
  id: string,
  userId: string,
  userDisplayName?: string | null,
  userGender?: string | null,
  userAge?: string | null,
  userPreviousJob?: string | null,
  learningCenterId: string,
  learningCenterCourseId: string,
  reviewTitle: string,
  reviewDetail: string,
  rating: number,
  isPublished: boolean,
  isDeleted?: boolean | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateCourseReviewInput = {
  id: string,
  userId?: string | null,
  userDisplayName?: string | null,
  userGender?: string | null,
  userAge?: string | null,
  userPreviousJob?: string | null,
  learningCenterId?: string | null,
  learningCenterCourseId?: string | null,
  reviewTitle?: string | null,
  reviewDetail?: string | null,
  rating?: number | null,
  isPublished?: boolean | null,
  isDeleted?: boolean | null,
};

export type DeleteCourseReviewInput = {
  id: string,
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
  isDeleted?: ModelBooleanInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export type ModelLearningCenterFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  memo?: ModelStringInput | null,
  operatingCompany?: ModelStringInput | null,
  headquartersLocation?: ModelStringInput | null,
  websiteURL?: ModelStringInput | null,
  logoImageURL?: ModelStringInput | null,
  establishmentYear?: ModelIntInput | null,
  representative?: ModelStringInput | null,
  isDeleted?: ModelBooleanInput | null,
  and?: Array< ModelLearningCenterFilterInput | null > | null,
  or?: Array< ModelLearningCenterFilterInput | null > | null,
  not?: ModelLearningCenterFilterInput | null,
};

export type ModelLearningCenterConnection = {
  __typename: "ModelLearningCenterConnection",
  items:  Array<LearningCenter | null >,
  nextToken?: string | null,
};

export type ModelLearningCenterCourseFilterInput = {
  id?: ModelIDInput | null,
  learningCenterId?: ModelIDInput | null,
  courseName?: ModelStringInput | null,
  courseURL?: ModelStringInput | null,
  couseDetail?: ModelStringInput | null,
  isDeleted?: ModelBooleanInput | null,
  and?: Array< ModelLearningCenterCourseFilterInput | null > | null,
  or?: Array< ModelLearningCenterCourseFilterInput | null > | null,
  not?: ModelLearningCenterCourseFilterInput | null,
};

export type ModelLearningCenterCourseConnection = {
  __typename: "ModelLearningCenterCourseConnection",
  items:  Array<LearningCenterCourse | null >,
  nextToken?: string | null,
};

export type ModelCourseReviewFilterInput = {
  id?: ModelIDInput | null,
  userId?: ModelIDInput | null,
  userDisplayName?: ModelStringInput | null,
  userGender?: ModelStringInput | null,
  userAge?: ModelStringInput | null,
  userPreviousJob?: ModelStringInput | null,
  learningCenterId?: ModelIDInput | null,
  learningCenterCourseId?: ModelIDInput | null,
  reviewTitle?: ModelStringInput | null,
  reviewDetail?: ModelStringInput | null,
  rating?: ModelIntInput | null,
  isPublished?: ModelBooleanInput | null,
  isDeleted?: ModelBooleanInput | null,
  and?: Array< ModelCourseReviewFilterInput | null > | null,
  or?: Array< ModelCourseReviewFilterInput | null > | null,
  not?: ModelCourseReviewFilterInput | null,
};

export type ModelCourseReviewConnection = {
  __typename: "ModelCourseReviewConnection",
  items:  Array<CourseReview | null >,
  nextToken?: string | null,
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
  isDeleted?: ModelSubscriptionBooleanInput | null,
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
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

export type ModelSubscriptionLearningCenterFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  memo?: ModelSubscriptionStringInput | null,
  operatingCompany?: ModelSubscriptionStringInput | null,
  headquartersLocation?: ModelSubscriptionStringInput | null,
  websiteURL?: ModelSubscriptionStringInput | null,
  logoImageURL?: ModelSubscriptionStringInput | null,
  establishmentYear?: ModelSubscriptionIntInput | null,
  representative?: ModelSubscriptionStringInput | null,
  isDeleted?: ModelSubscriptionBooleanInput | null,
  and?: Array< ModelSubscriptionLearningCenterFilterInput | null > | null,
  or?: Array< ModelSubscriptionLearningCenterFilterInput | null > | null,
};

export type ModelSubscriptionLearningCenterCourseFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  learningCenterId?: ModelSubscriptionIDInput | null,
  courseName?: ModelSubscriptionStringInput | null,
  courseURL?: ModelSubscriptionStringInput | null,
  couseDetail?: ModelSubscriptionStringInput | null,
  isDeleted?: ModelSubscriptionBooleanInput | null,
  and?: Array< ModelSubscriptionLearningCenterCourseFilterInput | null > | null,
  or?: Array< ModelSubscriptionLearningCenterCourseFilterInput | null > | null,
};

export type ModelSubscriptionCourseReviewFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  userId?: ModelSubscriptionIDInput | null,
  userDisplayName?: ModelSubscriptionStringInput | null,
  userGender?: ModelSubscriptionStringInput | null,
  userAge?: ModelSubscriptionStringInput | null,
  userPreviousJob?: ModelSubscriptionStringInput | null,
  learningCenterId?: ModelSubscriptionIDInput | null,
  learningCenterCourseId?: ModelSubscriptionIDInput | null,
  reviewTitle?: ModelSubscriptionStringInput | null,
  reviewDetail?: ModelSubscriptionStringInput | null,
  rating?: ModelSubscriptionIntInput | null,
  isPublished?: ModelSubscriptionBooleanInput | null,
  isDeleted?: ModelSubscriptionBooleanInput | null,
  and?: Array< ModelSubscriptionCourseReviewFilterInput | null > | null,
  or?: Array< ModelSubscriptionCourseReviewFilterInput | null > | null,
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
    isDeleted?: boolean | null,
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
    isDeleted?: boolean | null,
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
    isDeleted?: boolean | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateLearningCenterMutationVariables = {
  input: CreateLearningCenterInput,
  condition?: ModelLearningCenterConditionInput | null,
};

export type CreateLearningCenterMutation = {
  createLearningCenter?:  {
    __typename: "LearningCenter",
    id: string,
    name?: string | null,
    memo?: string | null,
    operatingCompany?: string | null,
    headquartersLocation?: string | null,
    websiteURL?: string | null,
    logoImageURL?: string | null,
    establishmentYear?: number | null,
    representative?: string | null,
    isDeleted?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateLearningCenterMutationVariables = {
  input: UpdateLearningCenterInput,
  condition?: ModelLearningCenterConditionInput | null,
};

export type UpdateLearningCenterMutation = {
  updateLearningCenter?:  {
    __typename: "LearningCenter",
    id: string,
    name?: string | null,
    memo?: string | null,
    operatingCompany?: string | null,
    headquartersLocation?: string | null,
    websiteURL?: string | null,
    logoImageURL?: string | null,
    establishmentYear?: number | null,
    representative?: string | null,
    isDeleted?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteLearningCenterMutationVariables = {
  input: DeleteLearningCenterInput,
  condition?: ModelLearningCenterConditionInput | null,
};

export type DeleteLearningCenterMutation = {
  deleteLearningCenter?:  {
    __typename: "LearningCenter",
    id: string,
    name?: string | null,
    memo?: string | null,
    operatingCompany?: string | null,
    headquartersLocation?: string | null,
    websiteURL?: string | null,
    logoImageURL?: string | null,
    establishmentYear?: number | null,
    representative?: string | null,
    isDeleted?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateLearningCenterCourseMutationVariables = {
  input: CreateLearningCenterCourseInput,
  condition?: ModelLearningCenterCourseConditionInput | null,
};

export type CreateLearningCenterCourseMutation = {
  createLearningCenterCourse?:  {
    __typename: "LearningCenterCourse",
    id: string,
    learningCenterId: string,
    courseName?: string | null,
    courseURL?: string | null,
    couseDetail?: string | null,
    isDeleted?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateLearningCenterCourseMutationVariables = {
  input: UpdateLearningCenterCourseInput,
  condition?: ModelLearningCenterCourseConditionInput | null,
};

export type UpdateLearningCenterCourseMutation = {
  updateLearningCenterCourse?:  {
    __typename: "LearningCenterCourse",
    id: string,
    learningCenterId: string,
    courseName?: string | null,
    courseURL?: string | null,
    couseDetail?: string | null,
    isDeleted?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteLearningCenterCourseMutationVariables = {
  input: DeleteLearningCenterCourseInput,
  condition?: ModelLearningCenterCourseConditionInput | null,
};

export type DeleteLearningCenterCourseMutation = {
  deleteLearningCenterCourse?:  {
    __typename: "LearningCenterCourse",
    id: string,
    learningCenterId: string,
    courseName?: string | null,
    courseURL?: string | null,
    couseDetail?: string | null,
    isDeleted?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateCourseReviewMutationVariables = {
  input: CreateCourseReviewInput,
  condition?: ModelCourseReviewConditionInput | null,
};

export type CreateCourseReviewMutation = {
  createCourseReview?:  {
    __typename: "CourseReview",
    id: string,
    userId: string,
    userDisplayName?: string | null,
    userGender?: string | null,
    userAge?: string | null,
    userPreviousJob?: string | null,
    learningCenterId: string,
    learningCenterCourseId: string,
    reviewTitle: string,
    reviewDetail: string,
    rating: number,
    isPublished: boolean,
    isDeleted?: boolean | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateCourseReviewMutationVariables = {
  input: UpdateCourseReviewInput,
  condition?: ModelCourseReviewConditionInput | null,
};

export type UpdateCourseReviewMutation = {
  updateCourseReview?:  {
    __typename: "CourseReview",
    id: string,
    userId: string,
    userDisplayName?: string | null,
    userGender?: string | null,
    userAge?: string | null,
    userPreviousJob?: string | null,
    learningCenterId: string,
    learningCenterCourseId: string,
    reviewTitle: string,
    reviewDetail: string,
    rating: number,
    isPublished: boolean,
    isDeleted?: boolean | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteCourseReviewMutationVariables = {
  input: DeleteCourseReviewInput,
  condition?: ModelCourseReviewConditionInput | null,
};

export type DeleteCourseReviewMutation = {
  deleteCourseReview?:  {
    __typename: "CourseReview",
    id: string,
    userId: string,
    userDisplayName?: string | null,
    userGender?: string | null,
    userAge?: string | null,
    userPreviousJob?: string | null,
    learningCenterId: string,
    learningCenterCourseId: string,
    reviewTitle: string,
    reviewDetail: string,
    rating: number,
    isPublished: boolean,
    isDeleted?: boolean | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
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
    isDeleted?: boolean | null,
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
      isDeleted?: boolean | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetLearningCenterQueryVariables = {
  id: string,
};

export type GetLearningCenterQuery = {
  getLearningCenter?:  {
    __typename: "LearningCenter",
    id: string,
    name?: string | null,
    memo?: string | null,
    operatingCompany?: string | null,
    headquartersLocation?: string | null,
    websiteURL?: string | null,
    logoImageURL?: string | null,
    establishmentYear?: number | null,
    representative?: string | null,
    isDeleted?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListLearningCentersQueryVariables = {
  filter?: ModelLearningCenterFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListLearningCentersQuery = {
  listLearningCenters?:  {
    __typename: "ModelLearningCenterConnection",
    items:  Array< {
      __typename: "LearningCenter",
      id: string,
      name?: string | null,
      memo?: string | null,
      operatingCompany?: string | null,
      headquartersLocation?: string | null,
      websiteURL?: string | null,
      logoImageURL?: string | null,
      establishmentYear?: number | null,
      representative?: string | null,
      isDeleted?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetLearningCenterCourseQueryVariables = {
  id: string,
};

export type GetLearningCenterCourseQuery = {
  getLearningCenterCourse?:  {
    __typename: "LearningCenterCourse",
    id: string,
    learningCenterId: string,
    courseName?: string | null,
    courseURL?: string | null,
    couseDetail?: string | null,
    isDeleted?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListLearningCenterCoursesQueryVariables = {
  filter?: ModelLearningCenterCourseFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListLearningCenterCoursesQuery = {
  listLearningCenterCourses?:  {
    __typename: "ModelLearningCenterCourseConnection",
    items:  Array< {
      __typename: "LearningCenterCourse",
      id: string,
      learningCenterId: string,
      courseName?: string | null,
      courseURL?: string | null,
      couseDetail?: string | null,
      isDeleted?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetCourseReviewQueryVariables = {
  id: string,
};

export type GetCourseReviewQuery = {
  getCourseReview?:  {
    __typename: "CourseReview",
    id: string,
    userId: string,
    userDisplayName?: string | null,
    userGender?: string | null,
    userAge?: string | null,
    userPreviousJob?: string | null,
    learningCenterId: string,
    learningCenterCourseId: string,
    reviewTitle: string,
    reviewDetail: string,
    rating: number,
    isPublished: boolean,
    isDeleted?: boolean | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListCourseReviewsQueryVariables = {
  filter?: ModelCourseReviewFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCourseReviewsQuery = {
  listCourseReviews?:  {
    __typename: "ModelCourseReviewConnection",
    items:  Array< {
      __typename: "CourseReview",
      id: string,
      userId: string,
      userDisplayName?: string | null,
      userGender?: string | null,
      userAge?: string | null,
      userPreviousJob?: string | null,
      learningCenterId: string,
      learningCenterCourseId: string,
      reviewTitle: string,
      reviewDetail: string,
      rating: number,
      isPublished: boolean,
      isDeleted?: boolean | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
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
    isDeleted?: boolean | null,
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
    isDeleted?: boolean | null,
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
    isDeleted?: boolean | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateLearningCenterSubscriptionVariables = {
  filter?: ModelSubscriptionLearningCenterFilterInput | null,
};

export type OnCreateLearningCenterSubscription = {
  onCreateLearningCenter?:  {
    __typename: "LearningCenter",
    id: string,
    name?: string | null,
    memo?: string | null,
    operatingCompany?: string | null,
    headquartersLocation?: string | null,
    websiteURL?: string | null,
    logoImageURL?: string | null,
    establishmentYear?: number | null,
    representative?: string | null,
    isDeleted?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateLearningCenterSubscriptionVariables = {
  filter?: ModelSubscriptionLearningCenterFilterInput | null,
};

export type OnUpdateLearningCenterSubscription = {
  onUpdateLearningCenter?:  {
    __typename: "LearningCenter",
    id: string,
    name?: string | null,
    memo?: string | null,
    operatingCompany?: string | null,
    headquartersLocation?: string | null,
    websiteURL?: string | null,
    logoImageURL?: string | null,
    establishmentYear?: number | null,
    representative?: string | null,
    isDeleted?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteLearningCenterSubscriptionVariables = {
  filter?: ModelSubscriptionLearningCenterFilterInput | null,
};

export type OnDeleteLearningCenterSubscription = {
  onDeleteLearningCenter?:  {
    __typename: "LearningCenter",
    id: string,
    name?: string | null,
    memo?: string | null,
    operatingCompany?: string | null,
    headquartersLocation?: string | null,
    websiteURL?: string | null,
    logoImageURL?: string | null,
    establishmentYear?: number | null,
    representative?: string | null,
    isDeleted?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateLearningCenterCourseSubscriptionVariables = {
  filter?: ModelSubscriptionLearningCenterCourseFilterInput | null,
};

export type OnCreateLearningCenterCourseSubscription = {
  onCreateLearningCenterCourse?:  {
    __typename: "LearningCenterCourse",
    id: string,
    learningCenterId: string,
    courseName?: string | null,
    courseURL?: string | null,
    couseDetail?: string | null,
    isDeleted?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateLearningCenterCourseSubscriptionVariables = {
  filter?: ModelSubscriptionLearningCenterCourseFilterInput | null,
};

export type OnUpdateLearningCenterCourseSubscription = {
  onUpdateLearningCenterCourse?:  {
    __typename: "LearningCenterCourse",
    id: string,
    learningCenterId: string,
    courseName?: string | null,
    courseURL?: string | null,
    couseDetail?: string | null,
    isDeleted?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteLearningCenterCourseSubscriptionVariables = {
  filter?: ModelSubscriptionLearningCenterCourseFilterInput | null,
};

export type OnDeleteLearningCenterCourseSubscription = {
  onDeleteLearningCenterCourse?:  {
    __typename: "LearningCenterCourse",
    id: string,
    learningCenterId: string,
    courseName?: string | null,
    courseURL?: string | null,
    couseDetail?: string | null,
    isDeleted?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateCourseReviewSubscriptionVariables = {
  filter?: ModelSubscriptionCourseReviewFilterInput | null,
  owner?: string | null,
};

export type OnCreateCourseReviewSubscription = {
  onCreateCourseReview?:  {
    __typename: "CourseReview",
    id: string,
    userId: string,
    userDisplayName?: string | null,
    userGender?: string | null,
    userAge?: string | null,
    userPreviousJob?: string | null,
    learningCenterId: string,
    learningCenterCourseId: string,
    reviewTitle: string,
    reviewDetail: string,
    rating: number,
    isPublished: boolean,
    isDeleted?: boolean | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateCourseReviewSubscriptionVariables = {
  filter?: ModelSubscriptionCourseReviewFilterInput | null,
  owner?: string | null,
};

export type OnUpdateCourseReviewSubscription = {
  onUpdateCourseReview?:  {
    __typename: "CourseReview",
    id: string,
    userId: string,
    userDisplayName?: string | null,
    userGender?: string | null,
    userAge?: string | null,
    userPreviousJob?: string | null,
    learningCenterId: string,
    learningCenterCourseId: string,
    reviewTitle: string,
    reviewDetail: string,
    rating: number,
    isPublished: boolean,
    isDeleted?: boolean | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteCourseReviewSubscriptionVariables = {
  filter?: ModelSubscriptionCourseReviewFilterInput | null,
  owner?: string | null,
};

export type OnDeleteCourseReviewSubscription = {
  onDeleteCourseReview?:  {
    __typename: "CourseReview",
    id: string,
    userId: string,
    userDisplayName?: string | null,
    userGender?: string | null,
    userAge?: string | null,
    userPreviousJob?: string | null,
    learningCenterId: string,
    learningCenterCourseId: string,
    reviewTitle: string,
    reviewDetail: string,
    rating: number,
    isPublished: boolean,
    isDeleted?: boolean | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};
