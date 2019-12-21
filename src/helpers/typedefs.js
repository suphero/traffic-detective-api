const { gql } = require("apollo-server-lambda");

module.exports = gql`
  type Result {
    success: Boolean!
    message: String
  }
  type LoginResult {
    token: String
    success: Boolean
  }
  type Report {
    _id: ID!
    plate: String
    userId: String
    details: [ReportDetailEnum]
  }
  type ReportDetailType {
    _id: ReportDetailEnum
    name: String
    icon: String
  }
  type SearchResult {
    numberOfReporters: Int,
    success: Boolean!
  }
  input ReportInput {
    plate: String!
    details: [ReportDetailEnum]!
  }
  enum CountryCodeEnum {
    TR
  }
  enum LanguageEnum {
    TR
    EN
  }
  enum ReportDetailEnum {
    HORN,
    FAST,
    TRAFFIC_LIGHTS,
    CROSSWALK,
    PARK,
    WRONG_WAY,
    ACCIDENT,
    NEGLECTED,
    MULTIPLE_LANES,
    HOGGING_LEFT_LANE,
    HIGH_BEAM,
    FOLLOWING_DISTANCE,
    LANE_CHANGE
  }
  type Query {
    user_profile: Result
    report_user: [Report]
    report_search(countryCode: CountryCodeEnum!, plate: String!): SearchResult
    report_detail_types(language: LanguageEnum!): [ReportDetailType]
  }
  type Mutation {
    user_login(email: String!, password: String!): LoginResult
    user_signup(email: String!, password: String!): LoginResult
    user_verify_token(token: String): Result
    report_create(entity: ReportInput!): Result
    report_delete(_id: ID!): Result
  }
  schema {
    query: Query
    mutation: Mutation
  }
`;