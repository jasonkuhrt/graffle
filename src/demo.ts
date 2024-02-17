namespace $ {
  export interface Scalars {
    'Boolean': boolean
    'Int': number
    'String': string
    'ID': string
    'Date': any
    'Float': number
  }
}

// ------------------------------------------------------------ //
//                             Root                             //
// ------------------------------------------------------------ //

export namespace Root {
  export interface Mutation {
    'accelerateCachePurge':
      | Object.ErrorInternal
      | Object.SideEffectConfirmation
    'accelerateDisable':
      | Object.ErrorInternal
      | Object.SideEffectConfirmation
    'accelerateEnable':
      | Object.ErrorInternal
      | Object.SideEffectConfirmation
    'databaseLinkCreate':
      | Object.DatabaseLink
      | Object.ErrorInternal
      | Object.ErrorUserBusinessResourceNotFound
    'databaseLinkDelete':
      | Object.DatabaseLinkNode
      | Object.ErrorInternal
      | Object.ErrorUserBusinessResourceNotFound
    'databaseLinkUpdate':
      | Object.DatabaseLink
      | Object.ErrorInternal
      | Object.ErrorUserBusinessResourceNotFound
    'environmentCreate':
      | Object.Environment
      | Object.ErrorInternal
      | Object.ErrorUserBusinessPlanLimitHit
      | Object.ErrorUserBusinessResourceNotFound
    'environmentDelete':
      | Object.Environment
      | Object.ErrorInternal
      | Object.ErrorUserBusinessResourceNotFound
    'environmentUpdate':
      | Object.Environment
      | Object.ErrorInternal
      | Object.ErrorUserBusinessResourceNotFound
    'projectCreate':
      | Object.ErrorInternal
      | Object.ErrorUserBusinessPlanLimitHit
      | Object.ErrorUserBusinessResourceNotFound
      | Object.Project
    'projectDelete':
      | Object.ErrorInternal
      | Object.ErrorUserBusinessResourceNotFound
      | Object.ProjectNode
    'projectUpdate':
      | Object.ErrorInternal
      | Object.ErrorUserBusinessResourceNotFound
      | Object.Project
    'pulseDisable':
      | Object.ErrorInternal
      | Object.ErrorUserBusinessResourceNotFound
      | Object.SideEffectConfirmation
    'pulseEnable':
      | Object.ErrorInternal
      | Object.ErrorUser
      | Object.SideEffectConfirmation
    'serviceKeyCreate':
      | Object.ErrorInternal
      | Object.ErrorUserBusinessResourceNotFound
      | Object.ServiceKeyWithValue
    'serviceKeyDelete':
      | Object.ErrorInternal
      | Object.ErrorUserBusinessResourceNotFound
      | Object.ServiceKeyNode
    'userUpdate':
      | Object.ErrorInternal
      | Object.ErrorUserBusinessResourceNotFound
      | Object.User
    'userUpdateDefaultWorkspace':
      | Object.ErrorInternal
      | Object.ErrorUserBusinessResourceNotFound
      | Object.User
    'workspaceCreate':
      | Object.ErrorInternal
      | Object.Workspace
    'workspaceDelete':
      | Object.ErrorInternal
      | Object.ErrorUserBusinessDeleteWorkspaceOnPaidPlan
      | Object.ErrorUserBusinessResourceNotFound
      | Object.WorkspaceNode
    'workspaceMembershipCreate':
      | Object.ErrorInternal
      | Object.ErrorUserBusinessResourceNotFound
      | Object.ErrorUserBusinessUserAlreadyMemberOfOrganization
      | Object.WorkspaceMembership
    'workspaceMembershipDelete':
      | Object.ErrorInternal
      | Object.ErrorUserBusinessResourceNotFound
      | Object.WorkspaceMembershipNode
    'workspacePlanSubscriptionChange':
      | Object.ErrorInternal
      | Object.ErrorUserBusinessResourceNotFound
      | Object.PlanSubscription
    'workspaceUpdate':
      | Object.ErrorInternal
      | Object.ErrorUserBusinessResourceNotFound
      | Object.Workspace
    'workspaceUpdateBillingAddress':
      | Object.ErrorInternal
      | Object.ErrorUserBusinessResourceNotFound
      | Object.Workspace
    'workspaceUpdateBillingEmail':
      | Object.ErrorInternal
      | Object.ErrorUserBusinessResourceNotFound
      | Object.Workspace
  }

  export interface Query {
    'environment':
      | Object.Environment
      | Object.ErrorInternal
      | Object.ErrorUserBusinessNotAuthorized
      | Object.ErrorUserBusinessResourceNotFound
    'me': Object.Me
    'plan':
      | Object.ErrorInternal
      | Object.ErrorUserBusinessResourceNotFound
      | Object.ErrorUserInput
      | Object.Plan
    'project':
      | Object.ErrorInternal
      | Object.ErrorUserBusinessNotAuthorized
      | Object.ErrorUserBusinessResourceNotFound
      | Object.Project
    'serviceKeys': Array<Object.ServiceKey>
    'system': Object.System
    'user': Object.User
    'workspace':
      | Object.ErrorInternal
      | Object.ErrorUserBusinessNotAuthorized
      | Object.ErrorUserBusinessResourceNotFound
      | Object.Workspace
  }
}

// ------------------------------------------------------------ //
//                             Enum                             //
// ------------------------------------------------------------ //

export namespace Enum {
  export type CountryCode =
    | 'AD'
    | 'AE'
    | 'AF'
    | 'AG'
    | 'AI'
    | 'AL'
    | 'AM'
    | 'AO'
    | 'AQ'
    | 'AR'
    | 'AS'
    | 'AT'
    | 'AU'
    | 'AW'
    | 'AX'
    | 'AZ'
    | 'BA'
    | 'BB'
    | 'BD'
    | 'BE'
    | 'BF'
    | 'BG'
    | 'BH'
    | 'BI'
    | 'BJ'
    | 'BL'
    | 'BM'
    | 'BN'
    | 'BO'
    | 'BQ'
    | 'BR'
    | 'BS'
    | 'BT'
    | 'BV'
    | 'BW'
    | 'BY'
    | 'BZ'
    | 'CA'
    | 'CC'
    | 'CD'
    | 'CF'
    | 'CG'
    | 'CH'
    | 'CI'
    | 'CK'
    | 'CL'
    | 'CM'
    | 'CN'
    | 'CO'
    | 'CR'
    | 'CU'
    | 'CV'
    | 'CW'
    | 'CX'
    | 'CY'
    | 'CZ'
    | 'DE'
    | 'DJ'
    | 'DK'
    | 'DM'
    | 'DO'
    | 'DZ'
    | 'EC'
    | 'EE'
    | 'EG'
    | 'EH'
    | 'ER'
    | 'ES'
    | 'ET'
    | 'FI'
    | 'FJ'
    | 'FK'
    | 'FM'
    | 'FO'
    | 'FR'
    | 'GA'
    | 'GB'
    | 'GD'
    | 'GE'
    | 'GF'
    | 'GG'
    | 'GH'
    | 'GI'
    | 'GL'
    | 'GM'
    | 'GN'
    | 'GP'
    | 'GQ'
    | 'GR'
    | 'GS'
    | 'GT'
    | 'GU'
    | 'GW'
    | 'GY'
    | 'HK'
    | 'HM'
    | 'HN'
    | 'HR'
    | 'HT'
    | 'HU'
    | 'ID'
    | 'IE'
    | 'IL'
    | 'IM'
    | 'IN'
    | 'IO'
    | 'IQ'
    | 'IR'
    | 'IS'
    | 'IT'
    | 'JE'
    | 'JM'
    | 'JO'
    | 'JP'
    | 'KE'
    | 'KG'
    | 'KH'
    | 'KI'
    | 'KM'
    | 'KN'
    | 'KP'
    | 'KR'
    | 'KW'
    | 'KY'
    | 'KZ'
    | 'LA'
    | 'LB'
    | 'LC'
    | 'LI'
    | 'LK'
    | 'LR'
    | 'LS'
    | 'LT'
    | 'LU'
    | 'LV'
    | 'LY'
    | 'MA'
    | 'MC'
    | 'MD'
    | 'ME'
    | 'MF'
    | 'MG'
    | 'MH'
    | 'MK'
    | 'ML'
    | 'MM'
    | 'MN'
    | 'MO'
    | 'MP'
    | 'MQ'
    | 'MR'
    | 'MS'
    | 'MT'
    | 'MU'
    | 'MV'
    | 'MW'
    | 'MX'
    | 'MY'
    | 'MZ'
    | 'NA'
    | 'NC'
    | 'NE'
    | 'NF'
    | 'NG'
    | 'NI'
    | 'NL'
    | 'NO'
    | 'NP'
    | 'NR'
    | 'NU'
    | 'NZ'
    | 'OM'
    | 'PA'
    | 'PE'
    | 'PF'
    | 'PG'
    | 'PH'
    | 'PK'
    | 'PL'
    | 'PM'
    | 'PN'
    | 'PR'
    | 'PS'
    | 'PT'
    | 'PW'
    | 'PY'
    | 'QA'
    | 'RE'
    | 'RO'
    | 'RS'
    | 'RU'
    | 'RW'
    | 'SA'
    | 'SB'
    | 'SC'
    | 'SD'
    | 'SE'
    | 'SG'
    | 'SH'
    | 'SI'
    | 'SJ'
    | 'SK'
    | 'SL'
    | 'SM'
    | 'SN'
    | 'SO'
    | 'SR'
    | 'SS'
    | 'ST'
    | 'SV'
    | 'SX'
    | 'SY'
    | 'SZ'
    | 'TC'
    | 'TD'
    | 'TF'
    | 'TG'
    | 'TH'
    | 'TJ'
    | 'TK'
    | 'TL'
    | 'TM'
    | 'TN'
    | 'TO'
    | 'TR'
    | 'TT'
    | 'TV'
    | 'TW'
    | 'TZ'
    | 'UA'
    | 'UG'
    | 'UM'
    | 'US'
    | 'UY'
    | 'UZ'
    | 'VA'
    | 'VC'
    | 'VE'
    | 'VG'
    | 'VI'
    | 'VN'
    | 'VU'
    | 'WF'
    | 'WS'
    | 'YE'
    | 'YT'
    | 'ZA'
    | 'ZM'
    | 'ZW'

  export type EnvironmentAccelerateUsageTimeWindowInput =
    | 'last6h'
    | 'last7d'
    | 'last24h'
    | 'last30d'
    | 'last30m'

  export type FeatureHandle =
    | 'accelerateEgress'
    | 'acceleratePurgeCache'
    | 'accelerateQuery'
    | 'access'
    | 'createProject'
    | 'organizationRole'
    | 'platformSupport'

  export type FeatureResourceAggregationValueResolverType = 'count'

  export type MetricUnit =
    | 'ms'
    | 'percent'

  export type NumberPredicateFnType =
    | 'NumberPredicateFnEQ'
    | 'NumberPredicateFnGT'
    | 'NumberPredicateFnGTE'
    | 'NumberPredicateFnLT'
    | 'NumberPredicateFnLTE'

  export type Order =
    | 'asc'
    | 'desc'

  export type PaymentMethodCardBrand =
    | 'amex'
    | 'diners'
    | 'discover'
    | 'eftpos_au'
    | 'jcb'
    | 'mastercard'
    | 'unionpay'
    | 'unknown'
    | 'visa'

  export type PreviousDateHandle =
    | 'last6h'
    | 'last7d'
    | 'last24h'
    | 'last30d'
    | 'last30m'
    | 'startOfCycle'

  export type ResourceType =
    | 'Project'
    | 'Workspace'

  export type StorageUnit = 'bytes'

  export type WorkspaceRole =
    | 'accountant'
    | 'admin'
    | 'developer'
    | 'viewer'
}

// ------------------------------------------------------------ //
//                         InputObject                          //
// ------------------------------------------------------------ //

export namespace InputObject {
  export interface MutationAccelerateCachePurgeInput {
    'environmentId': $.Scalars['ID']
  }

  export interface MutationAccelerateDisableInput {
    'environmentId': $.Scalars['ID']
  }

  export interface MutationAccelerateEnableInput {
    'databaseLinkId': $.Scalars['ID']
  }

  export interface MutationDatabaseLinkCreateInput {
    'connectionString': $.Scalars['String']
    'displayName': $.Scalars['String'] | null
    'environmentId': $.Scalars['ID']
    'regionId': $.Scalars['String'] | null
  }

  export interface MutationDatabaseLinkDeleteInput {
    'id': $.Scalars['ID']
  }

  export interface MutationDatabaseLinkUpdateInput {
    'connectionString': $.Scalars['String']
    'id': $.Scalars['ID']
    'regionId': $.Scalars['String']
  }

  export interface MutationEnvironmentCreateInput {
    'displayName': $.Scalars['String'] | null
    'isDefault': $.Scalars['Boolean'] | null
    'projectId': $.Scalars['ID']
  }

  export interface MutationEnvironmentDeleteInput {
    'id': $.Scalars['ID']
  }

  export interface MutationEnvironmentUpdateInput {
    'displayName': $.Scalars['String'] | null
    'id': $.Scalars['ID']
    'isDefault': $.Scalars['Boolean'] | null
  }

  export interface MutationProjectCreateInput {
    'displayName': $.Scalars['String'] | null
    'workspaceId': $.Scalars['ID']
  }

  export interface MutationProjectDeleteInput {
    'id': $.Scalars['ID']
  }

  export interface MutationProjectUpdateInput {
    'displayName': $.Scalars['String'] | null
    'id': $.Scalars['ID']
  }

  export interface MutationPulseDisableInput {
    'environmentId': $.Scalars['String']
  }

  export interface MutationPulseEnableInput {
    'databaseLinkId': $.Scalars['String']
  }

  export interface MutationServiceKeyCreateInput {
    'displayName': $.Scalars['String'] | null
    'environmentId': $.Scalars['ID']
  }

  export interface MutationServiceKeyDeleteInput {
    'id': $.Scalars['String']
  }

  export interface MutationUserUpdateDefaultWorkspaceInput {
    'workspaceId': $.Scalars['ID']
  }

  export interface MutationUserUpdateInput {
    'displayName': $.Scalars['String'] | null
    'id': $.Scalars['ID']
  }

  export interface MutationWorkspaceCreateInput {
    'displayName': $.Scalars['String'] | null
  }

  export interface MutationWorkspaceDeleteInput {
    'id': $.Scalars['ID']
  }

  export interface MutationWorkspaceMembershipCreateInput {
    'email': $.Scalars['String']
    'role': Enum.WorkspaceRole
    'workspaceId': $.Scalars['ID']
  }

  export interface MutationWorkspaceMembershipDeleteInput {
    'id': $.Scalars['ID']
  }

  export interface MutationWorkspacePlanSubscriptionChangeInput {
    'targetPlanId': $.Scalars['ID']
    'workspaceId': $.Scalars['ID']
  }

  export interface MutationWorkspaceUpdateBillingAddressInput {
    'address': InputObject.PhysicalAddressInput
    'id': $.Scalars['ID']
  }

  export interface MutationWorkspaceUpdateBillingEmailInput {
    'email': $.Scalars['String']
    'id': $.Scalars['ID']
  }

  export interface MutationWorkspaceUpdateInput {
    'displayName': $.Scalars['String'] | null
    'id': $.Scalars['ID']
  }

  export interface PhysicalAddressInput {
    'addressLine1': $.Scalars['String'] | null
    'addressLine2': $.Scalars['String'] | null
    'city': $.Scalars['String'] | null
    'country': Enum.CountryCode | null
    'postalCodeOrZIP': $.Scalars['String'] | null
    'region': $.Scalars['String'] | null
  }

  export interface TimeIntervalInput {
    'fromDate': $.Scalars['Date'] | null
    'fromDateHandle': Enum.PreviousDateHandle | null
    'toDate': $.Scalars['Date'] | null
  }

  export interface WorkspaceOrderBy {
    'displayName': Enum.Order | null
  }
}

// ------------------------------------------------------------ //
//                          Interface                           //
// ------------------------------------------------------------ //

export namespace Interface {
  export interface Error {
    'message': $.Scalars['String']
  }

  export interface Feature {
    'displayName': $.Scalars['String'] | null
    'handle': Enum.FeatureHandle
    'id': $.Scalars['ID']
    'stripeProductId': $.Scalars['String']
  }

  export interface Node {
    'id': $.Scalars['String']
  }

  export interface Offer {
    'context':
      | Object.Plan
      | Object.PlanSubscription
    'id': $.Scalars['ID']
    'price':
      | Object.PriceConstant
      | Object.PriceTiered
      | null
  }

  export interface PriceI {
    'id': $.Scalars['String']
    'stripePriceId': $.Scalars['ID']
  }

  export interface ProductStatus {
    'enabled': $.Scalars['Boolean']
  }
}

// ------------------------------------------------------------ //
//                            Object                            //
// ------------------------------------------------------------ //

export namespace Object {
  export interface AccelerateStatusDisabled {
    'enabled': $.Scalars['Boolean']
  }

  export interface AccelerateStatusEnabled {
    'enabled': $.Scalars['Boolean']
  }

  export interface Count {
    'number': $.Scalars['Int']
  }

  export interface DatabaseLink {
    'connectionStringHint': $.Scalars['String']
    'id': $.Scalars['ID']
    'protocol': $.Scalars['String']
    'region': $.Scalars['String'] | null
  }

  export interface DatabaseLinkNode {
    'connectionStringHint': $.Scalars['ID']
    'displayName': $.Scalars['String']
    'id': $.Scalars['String']
  }

  export interface Environment {
    'accelerate': Object.EnvironmentAccelerate
    'createdAt': $.Scalars['Date']
    'displayName': $.Scalars['String']
    'id': $.Scalars['ID']
    'isDefault': $.Scalars['Boolean']
    'project': Object.Project
    'pulse': Object.EnvironmentPulse
    'serviceKeys': Array<Object.ServiceKey>
    'tenantId': $.Scalars['ID']
  }

  export interface EnvironmentAccelerate {
    'databaseLink': Object.DatabaseLink | null
    'holds': Array<Object.ProductHold>
    'status':
      | Object.AccelerateStatusDisabled
      | Object.AccelerateStatusEnabled
    'usage': Object.EnvironmentAccelerateUsage
  }

  export interface EnvironmentAccelerateTimeSeriesPoints {
    'queries': Object.EnvironmentAccelerateUsageTimeSeriesPointsQueries
    'timestamps': Array<$.Scalars['Date']>
  }

  export interface EnvironmentAccelerateUsage {
    'latency': Object.EnvironmentAccelerateUsageLatency
    'overview': Object.EnvironmentAccelerateUsageOverview
    'timeInterval': Object.TimeInterval
    'timeSeries': Object.EnvironmentAccelerateUsageTimeSeries
  }

  export interface EnvironmentAccelerateUsageLatency {
    'queries': Object.EnvironmentAccelerateUsageLatencyQueries
  }

  export interface EnvironmentAccelerateUsageLatencyQueries {
    'cached': Object.EnvironmentAccelerateUsageLatencyQuery
    'origin': Object.EnvironmentAccelerateUsageLatencyQuery
  }

  export interface EnvironmentAccelerateUsageLatencyQuery {
    'count': Object.Count
    'durationAverage': Object.MetricValue
    'durationPercentiles': Array<Object.Percentile>
  }

  export interface EnvironmentAccelerateUsageOverview {
    'egress': Object.EnvironmentAccelerateUsageOverviewEgress
    'queries': Object.EnvironmentAccelerateUsageOverviewQueries
  }

  export interface EnvironmentAccelerateUsageOverviewCacheHit {
    'ratioToMiss': Object.MetricValue
  }

  export interface EnvironmentAccelerateUsageOverviewEgress {
    'averageResponseSize': Object.StorageValue
    'requestsServedFromOrigin': Object.Count
    'total': Object.StorageValue
  }

  export interface EnvironmentAccelerateUsageOverviewQueries {
    'cacheHit': Object.EnvironmentAccelerateUsageOverviewCacheHit
    'cacheableCount': Object.Count
    'totalCount': Object.Count
  }

  export interface EnvironmentAccelerateUsageTimeSeries {
    'points': Object.EnvironmentAccelerateTimeSeriesPoints
  }

  export interface EnvironmentAccelerateUsageTimeSeriesPointsQueries {
    'miss': Array<Object.EnvironmentAccelerateUsageTimeSeriesPointsQuery> | null
    'none': Array<Object.EnvironmentAccelerateUsageTimeSeriesPointsQuery> | null
    'swr': Array<Object.EnvironmentAccelerateUsageTimeSeriesPointsQuery> | null
    'ttl': Array<Object.EnvironmentAccelerateUsageTimeSeriesPointsQuery> | null
  }

  export interface EnvironmentAccelerateUsageTimeSeriesPointsQuery {
    'count': Object.Count
    'timestamp': $.Scalars['Date']
  }

  export interface EnvironmentPulse {
    'databaseLink': Object.DatabaseLink | null
    'status':
      | Object.PulseStatusDisabled
      | Object.PulseStatusEnabled
  }

  export interface ErrorInternal {
    'message': $.Scalars['String']
  }

  export interface ErrorUser {
    'message': $.Scalars['String']
  }

  export interface ErrorUserBusinessDeleteWorkspaceOnPaidPlan {
    'context': Object.ErrorUserBusinessDeleteWorkspaceOnPaidPlanContext
    'message': $.Scalars['String']
  }

  export interface ErrorUserBusinessDeleteWorkspaceOnPaidPlanContext {
    'plan': Object.Plan
  }

  export interface ErrorUserBusinessNotAuthorized {
    'message': $.Scalars['String']
  }

  export interface ErrorUserBusinessPlanLimitHit {
    'context': Object.ErrorUserBusinessPlanLimitHitContext
    'message': $.Scalars['String']
  }

  export interface ErrorUserBusinessPlanLimitHitContext {
    'featureHandle': $.Scalars['String'] | null
  }

  export interface ErrorUserBusinessResourceNotFound {
    'context': Object.ErrorUserBusinessResourceNotFoundContext
    'message': $.Scalars['String']
  }

  export interface ErrorUserBusinessResourceNotFoundContext {
    'id': $.Scalars['ID'] | null
    'typeName': Enum.ResourceType
  }

  export interface ErrorUserBusinessUserAlreadyMemberOfOrganization {
    'context': Object.ErrorUserBusinessUserAlreadyMemberOfOrganizationContext
    'message': $.Scalars['String']
  }

  export interface ErrorUserBusinessUserAlreadyMemberOfOrganizationContext {
    'user': Object.User
    'workspace': Object.Workspace
  }

  export interface ErrorUserInput {
    'message': $.Scalars['String']
  }

  export interface FeatureAbstract {
    'displayName': $.Scalars['String'] | null
    'handle': Enum.FeatureHandle
    'id': $.Scalars['ID']
    'stripeProductId': $.Scalars['String']
  }

  export interface FeatureResourceAggregation {
    'displayName': $.Scalars['String'] | null
    'handle': Enum.FeatureHandle
    'id': $.Scalars['ID']
    'resource': $.Scalars['String']
    'scope': $.Scalars['String']
    'stripeProductId': $.Scalars['String']
    'valueResolver': Object.FeatureResourceAggregationValueResolver
  }

  export interface FeatureResourceAggregationValueResolver {
    'type': Enum.FeatureResourceAggregationValueResolverType
  }

  export interface FeatureResourceProperty {
    'displayName': $.Scalars['String'] | null
    'handle': Enum.FeatureHandle
    'id': $.Scalars['ID']
    'resource': $.Scalars['String']
    'scope': $.Scalars['String']
    'stripeProductId': $.Scalars['String']
    'valueResolver': Object.FeatureResourcePropertyValueResolver
  }

  export interface FeatureResourcePropertyValueResolver {
    'field': $.Scalars['String']
    'type':
      | Object.FeatureValueTypeBoolean
      | Object.FeatureValueTypeEnum
      | Object.FeatureValueTypeNumber
      | Object.FeatureValueTypeString
  }

  export interface FeatureValue {
    'displayName': $.Scalars['String'] | null
    'handle': Enum.FeatureHandle
    'id': $.Scalars['ID']
    'stripeProductId': $.Scalars['String']
    'valueType':
      | Object.FeatureValueTypeBoolean
      | Object.FeatureValueTypeEnum
      | Object.FeatureValueTypeNumber
      | Object.FeatureValueTypeString
  }

  export interface FeatureValueTypeBoolean {
    'displayName': $.Scalars['String']
  }

  export interface FeatureValueTypeEnum {
    'displayName': $.Scalars['String']
    'members': Array<Object.FeatureValueTypeEnumMember>
  }

  export interface FeatureValueTypeEnumMember {
    'description': $.Scalars['String'] | null
    'value': $.Scalars['String']
  }

  export interface FeatureValueTypeNumber {
    'displayName': $.Scalars['String']
  }

  export interface FeatureValueTypeString {
    'displayName': $.Scalars['String']
  }

  export interface LimitEnum {
    'allowed': Array<$.Scalars['String']>
  }

  export interface LimitNumber {
    'amount': $.Scalars['Int']
    'type': Enum.NumberPredicateFnType
  }

  export interface Me {
    'user': Object.User
    'workspaces': Array<Object.Workspace>
  }

  export interface MetricValue {
    'number': $.Scalars['Float']
    'unit': Enum.MetricUnit | null
  }

  export interface OfferAbstract {
    'context':
      | Object.Plan
      | Object.PlanSubscription
    'feature': Object.FeatureAbstract
    'id': $.Scalars['ID']
    'price':
      | Object.PriceConstant
      | Object.PriceTiered
      | null
  }

  export interface OfferResourceAggregation {
    'context':
      | Object.Plan
      | Object.PlanSubscription
    'feature': Object.FeatureResourceAggregation
    'id': $.Scalars['ID']
    'limit':
      | Object.LimitEnum
      | Object.LimitNumber
      | null
    'price':
      | Object.PriceConstant
      | Object.PriceTiered
      | null
    'timeInterval':
      | Object.OfferTimeIntervalCycle
      | Object.OfferTimeIntervalPrevious
      | null
  }

  export interface OfferResourceProperty {
    'context':
      | Object.Plan
      | Object.PlanSubscription
    'feature': Object.FeatureResourceProperty
    'id': $.Scalars['ID']
    'limit':
      | Object.LimitEnum
      | Object.LimitNumber
      | null
    'price':
      | Object.PriceConstant
      | Object.PriceTiered
      | null
    'timeInterval':
      | Object.OfferTimeIntervalCycle
      | Object.OfferTimeIntervalPrevious
      | null
  }

  export interface OfferTimeIntervalCycle {
    'ok': $.Scalars['Boolean']
  }

  export interface OfferTimeIntervalPrevious {
    'milliseconds': $.Scalars['Int']
  }

  export interface OfferValue {
    'context':
      | Object.Plan
      | Object.PlanSubscription
    'feature': Object.FeatureValue
    'id': $.Scalars['ID']
    'limit':
      | Object.LimitEnum
      | Object.LimitNumber
      | null
    'price':
      | Object.PriceConstant
      | Object.PriceTiered
      | null
    'value': $.Scalars['String']
  }

  export interface PaymentMethod {
    'card': Object.PaymentMethodCard
    'id': $.Scalars['ID']
    'isDefault': $.Scalars['Boolean']
  }

  export interface PaymentMethodCard {
    'brand': Enum.PaymentMethodCardBrand
    'expiryMonth': $.Scalars['Int']
    'expiryYear': $.Scalars['Int']
    'id': $.Scalars['ID']
    'last4': $.Scalars['String']
  }

  export interface Percentile {
    'percentile': $.Scalars['Int']
    'value': Object.MetricValue
  }

  export interface PhysicalAddress {
    'addressLine1': $.Scalars['String'] | null
    'addressLine2': $.Scalars['String'] | null
    'city': $.Scalars['String'] | null
    'country': $.Scalars['String'] | null
    'postalCodeOrZIP': $.Scalars['String'] | null
    'region': $.Scalars['String'] | null
  }

  export interface Plan {
    'displayName': $.Scalars['String']
    'handle': $.Scalars['String']
    'id': $.Scalars['ID']
    'isDefault': $.Scalars['Boolean']
    'isFree': $.Scalars['Boolean']
    'offers': Object.PlanOffers
    'power': $.Scalars['Int']
    'selectable': $.Scalars['Boolean']
    'version': $.Scalars['Int']
    'versionIsLatest': $.Scalars['Boolean']
    'versions': Object.PlanVersions
  }

  export interface PlanOffers {
    'accelerate': Object.PlanOffersAccelerate
    'conductor': Object.PlanOffersConductor
    'platform': Object.PlanOffersPlatform
  }

  export interface PlanOffersAccelerate {
    'egress': Object.OfferResourceProperty
    'purgeCache': Object.OfferResourceAggregation
    'query': Object.OfferResourceAggregation
  }

  export interface PlanOffersConductor {
    'createProject': Object.OfferResourceAggregation
    'organizationRole': Object.OfferResourceProperty
  }

  export interface PlanOffersPlatform {
    'access': Object.OfferAbstract
    'support': Object.OfferValue
  }

  export interface PlanSubscription {
    'createdAt': $.Scalars['Date']
    'id': $.Scalars['ID']
    'plan': Object.Plan
    'stripeSubscriptionId': $.Scalars['String'] | null
    'stripeSubscriptionLineItems': Array<Object.StripeSubscriptionLineItem>
    'workspace': Object.Workspace
  }

  export interface PlanVersions {
    'isLatest': $.Scalars['Boolean']
    'next': Array<Object.Plan>
    'previous': Array<Object.Plan>
  }

  export interface PriceConstant {
    'cents': $.Scalars['Int']
    'id': $.Scalars['String']
    'stripePriceId': $.Scalars['ID']
  }

  export interface PriceTiered {
    'id': $.Scalars['String']
    'stripePriceId': $.Scalars['ID']
    'tiers': Array<Object.PriceTieredTier>
  }

  export interface PriceTieredTier {
    'cents': $.Scalars['Float']
    'from': $.Scalars['Int']
    'to': $.Scalars['Int'] | null
  }

  export interface ProductHold {
    'createdAt': $.Scalars['Int']
    'expiresAt': $.Scalars['Int']
    'reason': $.Scalars['String']
  }

  export interface Project {
    'accelerate': Object.EnvironmentAccelerate
    'createdAt': $.Scalars['Date']
    'displayName': $.Scalars['String']
    'environments': Array<Object.Environment>
    'id': $.Scalars['ID']
    'pulse': Object.EnvironmentPulse
    'workspace': Object.Workspace
  }

  export interface ProjectNode {
    'createdAt': $.Scalars['Date']
    'displayName': $.Scalars['String']
    'id': $.Scalars['String']
    'workspaceId': $.Scalars['ID']
  }

  export interface PulseStatusDisabled {
    'enabled': $.Scalars['Boolean']
  }

  export interface PulseStatusEnabled {
    'enabled': $.Scalars['Boolean']
    'error': $.Scalars['String'] | null
  }

  export interface ServiceKey {
    'createdAt': $.Scalars['Date']
    'displayName': $.Scalars['String']
    'id': $.Scalars['ID']
    'valueHint': $.Scalars['String']
  }

  export interface ServiceKeyNode {
    'displayName': $.Scalars['String']
    'id': $.Scalars['String']
    'valueHint': $.Scalars['String']
  }

  export interface ServiceKeyWithValue {
    'serviceKey': Object.ServiceKey
    'value': $.Scalars['ID']
  }

  export interface SideEffectConfirmation {
    'ok': $.Scalars['Boolean']
  }

  export interface StorageValue {
    'number': $.Scalars['Float']
    'unit': Enum.StorageUnit | null
  }

  export interface StripeSubscriptionLineItem {
    'feature': Enum.FeatureHandle
    'id': $.Scalars['ID']
  }

  export interface System {
    'accelerate': Object.SystemAccelerate
    'plans': Array<Object.Plan>
    'pulse': Object.SystemPulse
  }

  export interface SystemAccelerate {
    'defaultRegion': Object.SystemAccelerateRegion
    'regions': Array<Object.SystemAccelerateRegion>
  }

  export interface SystemAccelerateRegion {
    'displayName': $.Scalars['String']
    'id': $.Scalars['ID']
  }

  export interface SystemPulse {
    'defaultRegion': Object.SystemAccelerateRegion
    'regions': Array<Object.SystemAccelerateRegion>
  }

  export interface TimeInterval {
    'from': $.Scalars['Date']
    'to': $.Scalars['Date']
  }

  export interface UsageProductAccelerate {
    'egress': Object.UsageProductAccelerateFeatureEgress
    'request': Object.UsageProductAccelerateFeatureRequest
  }

  export interface UsageProductAccelerateFeatureEgress {
    'averageResponseSize': $.Scalars['Float']
    'total': $.Scalars['Float']
  }

  export interface UsageProductAccelerateFeatureRequest {
    'all': Object.UsageProductAccelerateFeatureRequestFilterAll
    'cacheHit': Object.UsageProductAccelerateFeatureRequestFilterCacheHit
  }

  export interface UsageProductAccelerateFeatureRequestFilterAll {
    'count': $.Scalars['Int']
  }

  export interface UsageProductAccelerateFeatureRequestFilterCacheHit {
    'ratioToMiss': $.Scalars['Int']
  }

  export interface User {
    'displayName': $.Scalars['String'] | null
    'email': $.Scalars['String']
    'featureFlags': Object.UserFeatureFlags
    'handle': $.Scalars['String'] | null
    'id': $.Scalars['ID']
    'image': $.Scalars['String'] | null
    'preferences': Object.UserPreferences
  }

  export interface UserFeatureFlags {
    'adminDashboard': $.Scalars['Boolean']
    'mars': $.Scalars['Boolean']
    'mercury': $.Scalars['Boolean']
    'venus': $.Scalars['Boolean']
  }

  export interface UserPreferences {
    'defaultWorkspace': Object.Workspace | null
  }

  export interface Workspace {
    'billingAddress': Object.PhysicalAddress | null
    'billingEmail': $.Scalars['String']
    'createdAt': $.Scalars['Date']
    'displayName': $.Scalars['String']
    'id': $.Scalars['ID']
    'isUsersLastMembership': $.Scalars['Boolean']
    'memberships': Array<Object.WorkspaceMembership>
    'paymentMethods': Array<Object.PaymentMethod>
    'planSubscription': Object.PlanSubscription
    'projects': Array<Object.Project>
    'stripeCustomerId': $.Scalars['String']
    'usage': Object.WorkspaceUsage
  }

  export interface WorkspaceMembership {
    'id': $.Scalars['ID']
    'role': Enum.WorkspaceRole
    'user': Object.User
  }

  export interface WorkspaceMembershipNode {
    'id': $.Scalars['String']
    'workspaceId': $.Scalars['ID']
  }

  export interface WorkspaceNode {
    'billingEmail': $.Scalars['String']
    'displayName': $.Scalars['String']
    'id': $.Scalars['String']
  }

  export interface WorkspaceUsage {
    'accelerate': Object.UsageProductAccelerate
    'timeInterval': Object.TimeInterval
  }
}

// ------------------------------------------------------------ //
//                            Union                             //
// ------------------------------------------------------------ //

export namespace Union {
  export type AccelerateStatus =
    | Object.AccelerateStatusDisabled
    | Object.AccelerateStatusEnabled

  export type FeatureValueType =
    | Object.FeatureValueTypeBoolean
    | Object.FeatureValueTypeEnum
    | Object.FeatureValueTypeNumber
    | Object.FeatureValueTypeString

  export type Limit =
    | Object.LimitEnum
    | Object.LimitNumber

  export type MutationAccelerateCachePurgeResult =
    | Object.ErrorInternal
    | Object.SideEffectConfirmation

  export type MutationAccelerateDisableResult =
    | Object.ErrorInternal
    | Object.SideEffectConfirmation

  export type MutationAccelerateEnableResult =
    | Object.ErrorInternal
    | Object.SideEffectConfirmation

  export type MutationDatabaseLinkCreateResult =
    | Object.DatabaseLink
    | Object.ErrorInternal
    | Object.ErrorUserBusinessResourceNotFound

  export type MutationDatabaseLinkDeleteResult =
    | Object.DatabaseLinkNode
    | Object.ErrorInternal
    | Object.ErrorUserBusinessResourceNotFound

  export type MutationDatabaseLinkUpdateResult =
    | Object.DatabaseLink
    | Object.ErrorInternal
    | Object.ErrorUserBusinessResourceNotFound

  export type MutationEnvironmentCreateResult =
    | Object.Environment
    | Object.ErrorInternal
    | Object.ErrorUserBusinessPlanLimitHit
    | Object.ErrorUserBusinessResourceNotFound

  export type MutationEnvironmentDeleteResult =
    | Object.Environment
    | Object.ErrorInternal
    | Object.ErrorUserBusinessResourceNotFound

  export type MutationEnvironmentUpdateResult =
    | Object.Environment
    | Object.ErrorInternal
    | Object.ErrorUserBusinessResourceNotFound

  export type MutationProjectCreateResult =
    | Object.ErrorInternal
    | Object.ErrorUserBusinessPlanLimitHit
    | Object.ErrorUserBusinessResourceNotFound
    | Object.Project

  export type MutationProjectDeleteResult =
    | Object.ErrorInternal
    | Object.ErrorUserBusinessResourceNotFound
    | Object.ProjectNode

  export type MutationProjectUpdateResult =
    | Object.ErrorInternal
    | Object.ErrorUserBusinessResourceNotFound
    | Object.Project

  export type MutationPulseDisableResult =
    | Object.ErrorInternal
    | Object.ErrorUserBusinessResourceNotFound
    | Object.SideEffectConfirmation

  export type MutationPulseEnableResult =
    | Object.ErrorInternal
    | Object.ErrorUser
    | Object.SideEffectConfirmation

  export type MutationServiceKeyCreateResult =
    | Object.ErrorInternal
    | Object.ErrorUserBusinessResourceNotFound
    | Object.ServiceKeyWithValue

  export type MutationServiceKeyDeleteResult =
    | Object.ErrorInternal
    | Object.ErrorUserBusinessResourceNotFound
    | Object.ServiceKeyNode

  export type MutationUserUpdateDefaultWorkspaceResult =
    | Object.ErrorInternal
    | Object.ErrorUserBusinessResourceNotFound
    | Object.User

  export type MutationUserUpdateResult =
    | Object.ErrorInternal
    | Object.ErrorUserBusinessResourceNotFound
    | Object.User

  export type MutationWorkspaceCreateResult =
    | Object.ErrorInternal
    | Object.Workspace

  export type MutationWorkspaceDeleteResult =
    | Object.ErrorInternal
    | Object.ErrorUserBusinessDeleteWorkspaceOnPaidPlan
    | Object.ErrorUserBusinessResourceNotFound
    | Object.WorkspaceNode

  export type MutationWorkspaceMembershipCreateResult =
    | Object.ErrorInternal
    | Object.ErrorUserBusinessResourceNotFound
    | Object.ErrorUserBusinessUserAlreadyMemberOfOrganization
    | Object.WorkspaceMembership

  export type MutationWorkspaceMembershipDeleteResult =
    | Object.ErrorInternal
    | Object.ErrorUserBusinessResourceNotFound
    | Object.WorkspaceMembershipNode

  export type MutationWorkspacePlanSubscriptionChangeResult =
    | Object.ErrorInternal
    | Object.ErrorUserBusinessResourceNotFound
    | Object.PlanSubscription

  export type MutationWorkspaceUpdateBillingAddressResult =
    | Object.ErrorInternal
    | Object.ErrorUserBusinessResourceNotFound
    | Object.Workspace

  export type MutationWorkspaceUpdateBillingEmailResult =
    | Object.ErrorInternal
    | Object.ErrorUserBusinessResourceNotFound
    | Object.Workspace

  export type MutationWorkspaceUpdateResult =
    | Object.ErrorInternal
    | Object.ErrorUserBusinessResourceNotFound
    | Object.Workspace

  export type OfferContext =
    | Object.Plan
    | Object.PlanSubscription

  export type OfferTimeInterval =
    | Object.OfferTimeIntervalCycle
    | Object.OfferTimeIntervalPrevious

  export type Price =
    | Object.PriceConstant
    | Object.PriceTiered

  export type PulseStatus =
    | Object.PulseStatusDisabled
    | Object.PulseStatusEnabled

  export type QueryEnvironmentResult =
    | Object.Environment
    | Object.ErrorInternal
    | Object.ErrorUserBusinessNotAuthorized
    | Object.ErrorUserBusinessResourceNotFound

  export type QueryPlanResult =
    | Object.ErrorInternal
    | Object.ErrorUserBusinessResourceNotFound
    | Object.ErrorUserInput
    | Object.Plan

  export type QueryProjectResult =
    | Object.ErrorInternal
    | Object.ErrorUserBusinessNotAuthorized
    | Object.ErrorUserBusinessResourceNotFound
    | Object.Project

  export type QueryWorkspaceResult =
    | Object.ErrorInternal
    | Object.ErrorUserBusinessNotAuthorized
    | Object.ErrorUserBusinessResourceNotFound
    | Object.Workspace
}
