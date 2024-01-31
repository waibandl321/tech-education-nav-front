/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateDevelopmentTool = /* GraphQL */ `subscription OnCreateDevelopmentTool(
  $filter: ModelSubscriptionDevelopmentToolFilterInput
) {
  onCreateDevelopmentTool(filter: $filter) {
    id
    name
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateDevelopmentToolSubscriptionVariables,
  APITypes.OnCreateDevelopmentToolSubscription
>;
export const onUpdateDevelopmentTool = /* GraphQL */ `subscription OnUpdateDevelopmentTool(
  $filter: ModelSubscriptionDevelopmentToolFilterInput
) {
  onUpdateDevelopmentTool(filter: $filter) {
    id
    name
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateDevelopmentToolSubscriptionVariables,
  APITypes.OnUpdateDevelopmentToolSubscription
>;
export const onDeleteDevelopmentTool = /* GraphQL */ `subscription OnDeleteDevelopmentTool(
  $filter: ModelSubscriptionDevelopmentToolFilterInput
) {
  onDeleteDevelopmentTool(filter: $filter) {
    id
    name
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteDevelopmentToolSubscriptionVariables,
  APITypes.OnDeleteDevelopmentToolSubscription
>;
export const onCreateProgrammingLanguage = /* GraphQL */ `subscription OnCreateProgrammingLanguage(
  $filter: ModelSubscriptionProgrammingLanguageFilterInput
) {
  onCreateProgrammingLanguage(filter: $filter) {
    id
    name
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateProgrammingLanguageSubscriptionVariables,
  APITypes.OnCreateProgrammingLanguageSubscription
>;
export const onUpdateProgrammingLanguage = /* GraphQL */ `subscription OnUpdateProgrammingLanguage(
  $filter: ModelSubscriptionProgrammingLanguageFilterInput
) {
  onUpdateProgrammingLanguage(filter: $filter) {
    id
    name
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateProgrammingLanguageSubscriptionVariables,
  APITypes.OnUpdateProgrammingLanguageSubscription
>;
export const onDeleteProgrammingLanguage = /* GraphQL */ `subscription OnDeleteProgrammingLanguage(
  $filter: ModelSubscriptionProgrammingLanguageFilterInput
) {
  onDeleteProgrammingLanguage(filter: $filter) {
    id
    name
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteProgrammingLanguageSubscriptionVariables,
  APITypes.OnDeleteProgrammingLanguageSubscription
>;
export const onCreatePaymentMethod = /* GraphQL */ `subscription OnCreatePaymentMethod(
  $filter: ModelSubscriptionPaymentMethodFilterInput
) {
  onCreatePaymentMethod(filter: $filter) {
    id
    name
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreatePaymentMethodSubscriptionVariables,
  APITypes.OnCreatePaymentMethodSubscription
>;
export const onUpdatePaymentMethod = /* GraphQL */ `subscription OnUpdatePaymentMethod(
  $filter: ModelSubscriptionPaymentMethodFilterInput
) {
  onUpdatePaymentMethod(filter: $filter) {
    id
    name
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdatePaymentMethodSubscriptionVariables,
  APITypes.OnUpdatePaymentMethodSubscription
>;
export const onDeletePaymentMethod = /* GraphQL */ `subscription OnDeletePaymentMethod(
  $filter: ModelSubscriptionPaymentMethodFilterInput
) {
  onDeletePaymentMethod(filter: $filter) {
    id
    name
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeletePaymentMethodSubscriptionVariables,
  APITypes.OnDeletePaymentMethodSubscription
>;
export const onCreateCreditCard = /* GraphQL */ `subscription OnCreateCreditCard(
  $filter: ModelSubscriptionCreditCardFilterInput
) {
  onCreateCreditCard(filter: $filter) {
    id
    name
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateCreditCardSubscriptionVariables,
  APITypes.OnCreateCreditCardSubscription
>;
export const onUpdateCreditCard = /* GraphQL */ `subscription OnUpdateCreditCard(
  $filter: ModelSubscriptionCreditCardFilterInput
) {
  onUpdateCreditCard(filter: $filter) {
    id
    name
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateCreditCardSubscriptionVariables,
  APITypes.OnUpdateCreditCardSubscription
>;
export const onDeleteCreditCard = /* GraphQL */ `subscription OnDeleteCreditCard(
  $filter: ModelSubscriptionCreditCardFilterInput
) {
  onDeleteCreditCard(filter: $filter) {
    id
    name
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteCreditCardSubscriptionVariables,
  APITypes.OnDeleteCreditCardSubscription
>;
export const onCreateFramework = /* GraphQL */ `subscription OnCreateFramework($filter: ModelSubscriptionFrameworkFilterInput) {
  onCreateFramework(filter: $filter) {
    id
    programmingLanguageId
    name
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateFrameworkSubscriptionVariables,
  APITypes.OnCreateFrameworkSubscription
>;
export const onUpdateFramework = /* GraphQL */ `subscription OnUpdateFramework($filter: ModelSubscriptionFrameworkFilterInput) {
  onUpdateFramework(filter: $filter) {
    id
    programmingLanguageId
    name
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateFrameworkSubscriptionVariables,
  APITypes.OnUpdateFrameworkSubscription
>;
export const onDeleteFramework = /* GraphQL */ `subscription OnDeleteFramework($filter: ModelSubscriptionFrameworkFilterInput) {
  onDeleteFramework(filter: $filter) {
    id
    programmingLanguageId
    name
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteFrameworkSubscriptionVariables,
  APITypes.OnDeleteFrameworkSubscription
>;
export const onCreateJobType = /* GraphQL */ `subscription OnCreateJobType($filter: ModelSubscriptionJobTypeFilterInput) {
  onCreateJobType(filter: $filter) {
    id
    name
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateJobTypeSubscriptionVariables,
  APITypes.OnCreateJobTypeSubscription
>;
export const onUpdateJobType = /* GraphQL */ `subscription OnUpdateJobType($filter: ModelSubscriptionJobTypeFilterInput) {
  onUpdateJobType(filter: $filter) {
    id
    name
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateJobTypeSubscriptionVariables,
  APITypes.OnUpdateJobTypeSubscription
>;
export const onDeleteJobType = /* GraphQL */ `subscription OnDeleteJobType($filter: ModelSubscriptionJobTypeFilterInput) {
  onDeleteJobType(filter: $filter) {
    id
    name
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteJobTypeSubscriptionVariables,
  APITypes.OnDeleteJobTypeSubscription
>;
export const onCreateLearningCenter = /* GraphQL */ `subscription OnCreateLearningCenter(
  $filter: ModelSubscriptionLearningCenterFilterInput
) {
  onCreateLearningCenter(filter: $filter) {
    id
    name
    memo
    operatingCompany
    headquartersLocation
    websiteURL
    logoImageURL
    establishmentYear
    representative
    cancelPolicy
    paymentOptions
    creditCards
    isDeleted
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateLearningCenterSubscriptionVariables,
  APITypes.OnCreateLearningCenterSubscription
>;
export const onUpdateLearningCenter = /* GraphQL */ `subscription OnUpdateLearningCenter(
  $filter: ModelSubscriptionLearningCenterFilterInput
) {
  onUpdateLearningCenter(filter: $filter) {
    id
    name
    memo
    operatingCompany
    headquartersLocation
    websiteURL
    logoImageURL
    establishmentYear
    representative
    cancelPolicy
    paymentOptions
    creditCards
    isDeleted
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateLearningCenterSubscriptionVariables,
  APITypes.OnUpdateLearningCenterSubscription
>;
export const onDeleteLearningCenter = /* GraphQL */ `subscription OnDeleteLearningCenter(
  $filter: ModelSubscriptionLearningCenterFilterInput
) {
  onDeleteLearningCenter(filter: $filter) {
    id
    name
    memo
    operatingCompany
    headquartersLocation
    websiteURL
    logoImageURL
    establishmentYear
    representative
    cancelPolicy
    paymentOptions
    creditCards
    isDeleted
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteLearningCenterSubscriptionVariables,
  APITypes.OnDeleteLearningCenterSubscription
>;
export const onCreateLearningCenterCourse = /* GraphQL */ `subscription OnCreateLearningCenterCourse(
  $filter: ModelSubscriptionLearningCenterCourseFilterInput
) {
  onCreateLearningCenterCourse(filter: $filter) {
    id
    learningCenterId
    courseName
    courseURL
    couseDetail
    plans {
      id
      planName
      planMemo
      duration
      price
      splitPrice
      __typename
    }
    isAvailableMoneyBack
    moneyBackDetail
    isAvailableSubsidy
    subsidyMemo
    onSale
    saleMemo
    isMadeToOrder
    madeToOrderDetail
    isJobIntroductionAvailable
    jobIntroductionDetail
    isJobHuntingSupport
    jobHuntingSupportDetail
    purposes
    jobTypes
    programmingLanguages
    frameworks
    developmentTools
    attendanceType
    locationPref
    locationCity
    especiallyAudiences
    isDeleted
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateLearningCenterCourseSubscriptionVariables,
  APITypes.OnCreateLearningCenterCourseSubscription
>;
export const onUpdateLearningCenterCourse = /* GraphQL */ `subscription OnUpdateLearningCenterCourse(
  $filter: ModelSubscriptionLearningCenterCourseFilterInput
) {
  onUpdateLearningCenterCourse(filter: $filter) {
    id
    learningCenterId
    courseName
    courseURL
    couseDetail
    plans {
      id
      planName
      planMemo
      duration
      price
      splitPrice
      __typename
    }
    isAvailableMoneyBack
    moneyBackDetail
    isAvailableSubsidy
    subsidyMemo
    onSale
    saleMemo
    isMadeToOrder
    madeToOrderDetail
    isJobIntroductionAvailable
    jobIntroductionDetail
    isJobHuntingSupport
    jobHuntingSupportDetail
    purposes
    jobTypes
    programmingLanguages
    frameworks
    developmentTools
    attendanceType
    locationPref
    locationCity
    especiallyAudiences
    isDeleted
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateLearningCenterCourseSubscriptionVariables,
  APITypes.OnUpdateLearningCenterCourseSubscription
>;
export const onDeleteLearningCenterCourse = /* GraphQL */ `subscription OnDeleteLearningCenterCourse(
  $filter: ModelSubscriptionLearningCenterCourseFilterInput
) {
  onDeleteLearningCenterCourse(filter: $filter) {
    id
    learningCenterId
    courseName
    courseURL
    couseDetail
    plans {
      id
      planName
      planMemo
      duration
      price
      splitPrice
      __typename
    }
    isAvailableMoneyBack
    moneyBackDetail
    isAvailableSubsidy
    subsidyMemo
    onSale
    saleMemo
    isMadeToOrder
    madeToOrderDetail
    isJobIntroductionAvailable
    jobIntroductionDetail
    isJobHuntingSupport
    jobHuntingSupportDetail
    purposes
    jobTypes
    programmingLanguages
    frameworks
    developmentTools
    attendanceType
    locationPref
    locationCity
    especiallyAudiences
    isDeleted
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteLearningCenterCourseSubscriptionVariables,
  APITypes.OnDeleteLearningCenterCourseSubscription
>;
export const onCreateCourseReview = /* GraphQL */ `subscription OnCreateCourseReview(
  $filter: ModelSubscriptionCourseReviewFilterInput
) {
  onCreateCourseReview(filter: $filter) {
    id
    userDisplayId
    userGender
    userAge
    userPrefecture
    studyLengthMonths
    learningCenterId
    learningCenterCourseId
    reviewTitle
    reviewDetail
    rating
    isPublished
    isDeleted
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateCourseReviewSubscriptionVariables,
  APITypes.OnCreateCourseReviewSubscription
>;
export const onUpdateCourseReview = /* GraphQL */ `subscription OnUpdateCourseReview(
  $filter: ModelSubscriptionCourseReviewFilterInput
) {
  onUpdateCourseReview(filter: $filter) {
    id
    userDisplayId
    userGender
    userAge
    userPrefecture
    studyLengthMonths
    learningCenterId
    learningCenterCourseId
    reviewTitle
    reviewDetail
    rating
    isPublished
    isDeleted
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateCourseReviewSubscriptionVariables,
  APITypes.OnUpdateCourseReviewSubscription
>;
export const onDeleteCourseReview = /* GraphQL */ `subscription OnDeleteCourseReview(
  $filter: ModelSubscriptionCourseReviewFilterInput
) {
  onDeleteCourseReview(filter: $filter) {
    id
    userDisplayId
    userGender
    userAge
    userPrefecture
    studyLengthMonths
    learningCenterId
    learningCenterCourseId
    reviewTitle
    reviewDetail
    rating
    isPublished
    isDeleted
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteCourseReviewSubscriptionVariables,
  APITypes.OnDeleteCourseReviewSubscription
>;
export const onCreateContact = /* GraphQL */ `subscription OnCreateContact($filter: ModelSubscriptionContactFilterInput) {
  onCreateContact(filter: $filter) {
    id
    userEmail
    userName
    messageInfo
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateContactSubscriptionVariables,
  APITypes.OnCreateContactSubscription
>;
export const onUpdateContact = /* GraphQL */ `subscription OnUpdateContact($filter: ModelSubscriptionContactFilterInput) {
  onUpdateContact(filter: $filter) {
    id
    userEmail
    userName
    messageInfo
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateContactSubscriptionVariables,
  APITypes.OnUpdateContactSubscription
>;
export const onDeleteContact = /* GraphQL */ `subscription OnDeleteContact($filter: ModelSubscriptionContactFilterInput) {
  onDeleteContact(filter: $filter) {
    id
    userEmail
    userName
    messageInfo
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteContactSubscriptionVariables,
  APITypes.OnDeleteContactSubscription
>;
