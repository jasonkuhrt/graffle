namespace $ {
  export interface Scalars {
    Boolean: boolean
    Int: number
    String: string
    ID: string
    Date: any
    Float: number
  }
}

// ------------------------------------------------------------ //
//                          RootTypes                           //
// ------------------------------------------------------------ //

interface Mutation {
  accelerateCachePurge: ErrorInternal | SideEffectConfirmation
  accelerateDisable: ErrorInternal | SideEffectConfirmation
  accelerateEnable: ErrorInternal | SideEffectConfirmation
  databaseLinkCreate: DatabaseLink | ErrorInternal | ErrorUserBusinessResourceNotFound
  databaseLinkDelete: DatabaseLinkNode | ErrorInternal | ErrorUserBusinessResourceNotFound
  databaseLinkUpdate: DatabaseLink | ErrorInternal | ErrorUserBusinessResourceNotFound
  environmentCreate:
    | Environment
    | ErrorInternal
    | ErrorUserBusinessPlanLimitHit
    | ErrorUserBusinessResourceNotFound
  environmentDelete: Environment | ErrorInternal | ErrorUserBusinessResourceNotFound
  environmentUpdate: Environment | ErrorInternal | ErrorUserBusinessResourceNotFound
  projectCreate: ErrorInternal | ErrorUserBusinessPlanLimitHit | ErrorUserBusinessResourceNotFound | Project
  projectDelete: ErrorInternal | ErrorUserBusinessResourceNotFound | ProjectNode
  projectUpdate: ErrorInternal | ErrorUserBusinessResourceNotFound | Project
  pulseDisable: ErrorInternal | ErrorUserBusinessResourceNotFound | SideEffectConfirmation
  pulseEnable: ErrorInternal | ErrorUser | SideEffectConfirmation
  serviceKeyCreate: ErrorInternal | ErrorUserBusinessResourceNotFound | ServiceKeyWithValue
  serviceKeyDelete: ErrorInternal | ErrorUserBusinessResourceNotFound | ServiceKeyNode
  userUpdate: ErrorInternal | ErrorUserBusinessResourceNotFound | User
  userUpdateDefaultWorkspace: ErrorInternal | ErrorUserBusinessResourceNotFound | User
  workspaceCreate: ErrorInternal | Workspace
  workspaceDelete:
    | ErrorInternal
    | ErrorUserBusinessDeleteWorkspaceOnPaidPlan
    | ErrorUserBusinessResourceNotFound
    | WorkspaceNode
  workspaceMembershipCreate:
    | ErrorInternal
    | ErrorUserBusinessResourceNotFound
    | ErrorUserBusinessUserAlreadyMemberOfOrganization
    | WorkspaceMembership
  workspaceMembershipDelete: ErrorInternal | ErrorUserBusinessResourceNotFound | WorkspaceMembershipNode
  workspacePlanSubscriptionChange: ErrorInternal | ErrorUserBusinessResourceNotFound | PlanSubscription
  workspaceUpdate: ErrorInternal | ErrorUserBusinessResourceNotFound | Workspace
  workspaceUpdateBillingAddress: ErrorInternal | ErrorUserBusinessResourceNotFound | Workspace
  workspaceUpdateBillingEmail: ErrorInternal | ErrorUserBusinessResourceNotFound | Workspace
}

interface Query {
  environment:
    | Environment
    | ErrorInternal
    | ErrorUserBusinessNotAuthorized
    | ErrorUserBusinessResourceNotFound
  me: Me
  plan: ErrorInternal | ErrorUserBusinessResourceNotFound | ErrorUserInput | Plan
  project: ErrorInternal | ErrorUserBusinessNotAuthorized | ErrorUserBusinessResourceNotFound | Project
  serviceKeys: Array<ServiceKey>
  system: System
  user: User
  workspace: ErrorInternal | ErrorUserBusinessNotAuthorized | ErrorUserBusinessResourceNotFound | Workspace
}

// ------------------------------------------------------------ //
//                             Enum                             //
// ------------------------------------------------------------ //

type CountryCode =
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

type EnvironmentAccelerateUsageTimeWindowInput = 'last6h' | 'last7d' | 'last24h' | 'last30d' | 'last30m'

type FeatureHandle =
  | 'accelerateEgress'
  | 'acceleratePurgeCache'
  | 'accelerateQuery'
  | 'access'
  | 'createProject'
  | 'organizationRole'
  | 'platformSupport'

type FeatureResourceAggregationValueResolverType = 'count'

type MetricUnit = 'ms' | 'percent'

type NumberPredicateFnType =
  | 'NumberPredicateFnEQ'
  | 'NumberPredicateFnGT'
  | 'NumberPredicateFnGTE'
  | 'NumberPredicateFnLT'
  | 'NumberPredicateFnLTE'

type Order = 'asc' | 'desc'

type PaymentMethodCardBrand =
  | 'amex'
  | 'diners'
  | 'discover'
  | 'eftpos_au'
  | 'jcb'
  | 'mastercard'
  | 'unionpay'
  | 'unknown'
  | 'visa'

type PreviousDateHandle = 'last6h' | 'last7d' | 'last24h' | 'last30d' | 'last30m' | 'startOfCycle'

type ResourceType = 'Project' | 'Workspace'

type StorageUnit = 'bytes'

type WorkspaceRole = 'accountant' | 'admin' | 'developer' | 'viewer'

// ------------------------------------------------------------ //
//                         InputObject                          //
// ------------------------------------------------------------ //

interface MutationAccelerateCachePurgeInput {
  environmentId: $.Scalars['ID']
}

interface MutationAccelerateDisableInput {
  environmentId: $.Scalars['ID']
}

interface MutationAccelerateEnableInput {
  databaseLinkId: $.Scalars['ID']
}

interface MutationDatabaseLinkCreateInput {
  connectionString: $.Scalars['String']
  displayName: $.Scalars['String'] | null
  environmentId: $.Scalars['ID']
  regionId: $.Scalars['String'] | null
}

interface MutationDatabaseLinkDeleteInput {
  id: $.Scalars['ID']
}

interface MutationDatabaseLinkUpdateInput {
  connectionString: $.Scalars['String']
  id: $.Scalars['ID']
  regionId: $.Scalars['String']
}

interface MutationEnvironmentCreateInput {
  displayName: $.Scalars['String'] | null
  isDefault: $.Scalars['Boolean'] | null
  projectId: $.Scalars['ID']
}

interface MutationEnvironmentDeleteInput {
  id: $.Scalars['ID']
}

interface MutationEnvironmentUpdateInput {
  displayName: $.Scalars['String'] | null
  id: $.Scalars['ID']
  isDefault: $.Scalars['Boolean'] | null
}

interface MutationProjectCreateInput {
  displayName: $.Scalars['String'] | null
  workspaceId: $.Scalars['ID']
}

interface MutationProjectDeleteInput {
  id: $.Scalars['ID']
}

interface MutationProjectUpdateInput {
  displayName: $.Scalars['String'] | null
  id: $.Scalars['ID']
}

interface MutationPulseDisableInput {
  environmentId: $.Scalars['String']
}

interface MutationPulseEnableInput {
  databaseLinkId: $.Scalars['String']
}

interface MutationServiceKeyCreateInput {
  displayName: $.Scalars['String'] | null
  environmentId: $.Scalars['ID']
}

interface MutationServiceKeyDeleteInput {
  id: $.Scalars['String']
}

interface MutationUserUpdateDefaultWorkspaceInput {
  workspaceId: $.Scalars['ID']
}

interface MutationUserUpdateInput {
  displayName: $.Scalars['String'] | null
  id: $.Scalars['ID']
}

interface MutationWorkspaceCreateInput {
  displayName: $.Scalars['String'] | null
}

interface MutationWorkspaceDeleteInput {
  id: $.Scalars['ID']
}

interface MutationWorkspaceMembershipCreateInput {
  email: $.Scalars['String']
  role: WorkspaceRole
  workspaceId: $.Scalars['ID']
}

interface MutationWorkspaceMembershipDeleteInput {
  id: $.Scalars['ID']
}

interface MutationWorkspacePlanSubscriptionChangeInput {
  targetPlanId: $.Scalars['ID']
  workspaceId: $.Scalars['ID']
}

interface MutationWorkspaceUpdateBillingAddressInput {
  address: PhysicalAddressInput
  id: $.Scalars['ID']
}

interface MutationWorkspaceUpdateBillingEmailInput {
  email: $.Scalars['String']
  id: $.Scalars['ID']
}

interface MutationWorkspaceUpdateInput {
  displayName: $.Scalars['String'] | null
  id: $.Scalars['ID']
}

interface PhysicalAddressInput {
  addressLine1: $.Scalars['String'] | null
  addressLine2: $.Scalars['String'] | null
  city: $.Scalars['String'] | null
  country: CountryCode | null
  postalCodeOrZIP: $.Scalars['String'] | null
  region: $.Scalars['String'] | null
}

interface TimeIntervalInput {
  fromDate: $.Scalars['Date'] | null
  fromDateHandle: PreviousDateHandle | null
  toDate: $.Scalars['Date'] | null
}

interface WorkspaceOrderBy {
  displayName: Order | null
}

// ------------------------------------------------------------ //
//                          Interface                           //
// ------------------------------------------------------------ //

interface Error {
  message: $.Scalars['String']
}

interface Feature {
  displayName: $.Scalars['String'] | null
  handle: FeatureHandle
  id: $.Scalars['ID']
  stripeProductId: $.Scalars['String']
}

interface Node {
  id: $.Scalars['String']
}

interface Offer {
  context: Plan | PlanSubscription
  id: $.Scalars['ID']
  price: PriceConstant | PriceTiered | null
}

interface PriceI {
  id: $.Scalars['String']
  stripePriceId: $.Scalars['ID']
}

interface ProductStatus {
  enabled: $.Scalars['Boolean']
}

// ------------------------------------------------------------ //
//                            Object                            //
// ------------------------------------------------------------ //

interface AccelerateStatusDisabled {
  enabled: $.Scalars['Boolean']
}

interface AccelerateStatusEnabled {
  enabled: $.Scalars['Boolean']
}

interface Count {
  number: $.Scalars['Int']
}

interface DatabaseLink {
  connectionStringHint: $.Scalars['String']
  id: $.Scalars['ID']
  protocol: $.Scalars['String']
  region: $.Scalars['String'] | null
}

interface DatabaseLinkNode {
  connectionStringHint: $.Scalars['ID']
  displayName: $.Scalars['String']
  id: $.Scalars['String']
}

interface Environment {
  accelerate: EnvironmentAccelerate
  createdAt: $.Scalars['Date']
  displayName: $.Scalars['String']
  id: $.Scalars['ID']
  isDefault: $.Scalars['Boolean']
  project: Project
  pulse: EnvironmentPulse
  serviceKeys: Array<ServiceKey>
  tenantId: $.Scalars['ID']
}

interface EnvironmentAccelerate {
  databaseLink: DatabaseLink | null
  holds: Array<ProductHold>
  status: AccelerateStatusDisabled | AccelerateStatusEnabled
  usage: EnvironmentAccelerateUsage
}

interface EnvironmentAccelerateTimeSeriesPoints {
  queries: EnvironmentAccelerateUsageTimeSeriesPointsQueries
  timestamps: Array<$.Scalars['Date']>
}

interface EnvironmentAccelerateUsage {
  latency: EnvironmentAccelerateUsageLatency
  overview: EnvironmentAccelerateUsageOverview
  timeInterval: TimeInterval
  timeSeries: EnvironmentAccelerateUsageTimeSeries
}

interface EnvironmentAccelerateUsageLatency {
  queries: EnvironmentAccelerateUsageLatencyQueries
}

interface EnvironmentAccelerateUsageLatencyQueries {
  cached: EnvironmentAccelerateUsageLatencyQuery
  origin: EnvironmentAccelerateUsageLatencyQuery
}

interface EnvironmentAccelerateUsageLatencyQuery {
  count: Count
  durationAverage: MetricValue
  durationPercentiles: Array<Percentile>
}

interface EnvironmentAccelerateUsageOverview {
  egress: EnvironmentAccelerateUsageOverviewEgress
  queries: EnvironmentAccelerateUsageOverviewQueries
}

interface EnvironmentAccelerateUsageOverviewCacheHit {
  ratioToMiss: MetricValue
}

interface EnvironmentAccelerateUsageOverviewEgress {
  averageResponseSize: StorageValue
  requestsServedFromOrigin: Count
  total: StorageValue
}

interface EnvironmentAccelerateUsageOverviewQueries {
  cacheHit: EnvironmentAccelerateUsageOverviewCacheHit
  cacheableCount: Count
  totalCount: Count
}

interface EnvironmentAccelerateUsageTimeSeries {
  points: EnvironmentAccelerateTimeSeriesPoints
}

interface EnvironmentAccelerateUsageTimeSeriesPointsQueries {
  miss: Array<EnvironmentAccelerateUsageTimeSeriesPointsQuery> | null
  none: Array<EnvironmentAccelerateUsageTimeSeriesPointsQuery> | null
  swr: Array<EnvironmentAccelerateUsageTimeSeriesPointsQuery> | null
  ttl: Array<EnvironmentAccelerateUsageTimeSeriesPointsQuery> | null
}

interface EnvironmentAccelerateUsageTimeSeriesPointsQuery {
  count: Count
  timestamp: $.Scalars['Date']
}

interface EnvironmentPulse {
  databaseLink: DatabaseLink | null
  status: PulseStatusDisabled | PulseStatusEnabled
}

interface ErrorInternal {
  message: $.Scalars['String']
}

interface ErrorUser {
  message: $.Scalars['String']
}

interface ErrorUserBusinessDeleteWorkspaceOnPaidPlan {
  context: ErrorUserBusinessDeleteWorkspaceOnPaidPlanContext
  message: $.Scalars['String']
}

interface ErrorUserBusinessDeleteWorkspaceOnPaidPlanContext {
  plan: Plan
}

interface ErrorUserBusinessNotAuthorized {
  message: $.Scalars['String']
}

interface ErrorUserBusinessPlanLimitHit {
  context: ErrorUserBusinessPlanLimitHitContext
  message: $.Scalars['String']
}

interface ErrorUserBusinessPlanLimitHitContext {
  featureHandle: $.Scalars['String'] | null
}

interface ErrorUserBusinessResourceNotFound {
  context: ErrorUserBusinessResourceNotFoundContext
  message: $.Scalars['String']
}

interface ErrorUserBusinessResourceNotFoundContext {
  id: $.Scalars['ID'] | null
  typeName: ResourceType
}

interface ErrorUserBusinessUserAlreadyMemberOfOrganization {
  context: ErrorUserBusinessUserAlreadyMemberOfOrganizationContext
  message: $.Scalars['String']
}

interface ErrorUserBusinessUserAlreadyMemberOfOrganizationContext {
  user: User
  workspace: Workspace
}

interface ErrorUserInput {
  message: $.Scalars['String']
}

interface FeatureAbstract {
  displayName: $.Scalars['String'] | null
  handle: FeatureHandle
  id: $.Scalars['ID']
  stripeProductId: $.Scalars['String']
}

interface FeatureResourceAggregation {
  displayName: $.Scalars['String'] | null
  handle: FeatureHandle
  id: $.Scalars['ID']
  resource: $.Scalars['String']
  scope: $.Scalars['String']
  stripeProductId: $.Scalars['String']
  valueResolver: FeatureResourceAggregationValueResolver
}

interface FeatureResourceAggregationValueResolver {
  type: FeatureResourceAggregationValueResolverType
}

interface FeatureResourceProperty {
  displayName: $.Scalars['String'] | null
  handle: FeatureHandle
  id: $.Scalars['ID']
  resource: $.Scalars['String']
  scope: $.Scalars['String']
  stripeProductId: $.Scalars['String']
  valueResolver: FeatureResourcePropertyValueResolver
}

interface FeatureResourcePropertyValueResolver {
  field: $.Scalars['String']
  type: FeatureValueTypeBoolean | FeatureValueTypeEnum | FeatureValueTypeNumber | FeatureValueTypeString
}

interface FeatureValue {
  displayName: $.Scalars['String'] | null
  handle: FeatureHandle
  id: $.Scalars['ID']
  stripeProductId: $.Scalars['String']
  valueType: FeatureValueTypeBoolean | FeatureValueTypeEnum | FeatureValueTypeNumber | FeatureValueTypeString
}

interface FeatureValueTypeBoolean {
  displayName: $.Scalars['String']
}

interface FeatureValueTypeEnum {
  displayName: $.Scalars['String']
  members: Array<FeatureValueTypeEnumMember>
}

interface FeatureValueTypeEnumMember {
  description: $.Scalars['String'] | null
  value: $.Scalars['String']
}

interface FeatureValueTypeNumber {
  displayName: $.Scalars['String']
}

interface FeatureValueTypeString {
  displayName: $.Scalars['String']
}

interface LimitEnum {
  allowed: Array<$.Scalars['String']>
}

interface LimitNumber {
  amount: $.Scalars['Int']
  type: NumberPredicateFnType
}

interface Me {
  user: User
  workspaces: Array<Workspace>
}

interface MetricValue {
  number: $.Scalars['Float']
  unit: MetricUnit | null
}

interface OfferAbstract {
  context: Plan | PlanSubscription
  feature: FeatureAbstract
  id: $.Scalars['ID']
  price: PriceConstant | PriceTiered | null
}

interface OfferResourceAggregation {
  context: Plan | PlanSubscription
  feature: FeatureResourceAggregation
  id: $.Scalars['ID']
  limit: LimitEnum | LimitNumber | null
  price: PriceConstant | PriceTiered | null
  timeInterval: OfferTimeIntervalCycle | OfferTimeIntervalPrevious | null
}

interface OfferResourceProperty {
  context: Plan | PlanSubscription
  feature: FeatureResourceProperty
  id: $.Scalars['ID']
  limit: LimitEnum | LimitNumber | null
  price: PriceConstant | PriceTiered | null
  timeInterval: OfferTimeIntervalCycle | OfferTimeIntervalPrevious | null
}

interface OfferTimeIntervalCycle {
  ok: $.Scalars['Boolean']
}

interface OfferTimeIntervalPrevious {
  milliseconds: $.Scalars['Int']
}

interface OfferValue {
  context: Plan | PlanSubscription
  feature: FeatureValue
  id: $.Scalars['ID']
  limit: LimitEnum | LimitNumber | null
  price: PriceConstant | PriceTiered | null
  value: $.Scalars['String']
}

interface PaymentMethod {
  card: PaymentMethodCard
  id: $.Scalars['ID']
  isDefault: $.Scalars['Boolean']
}

interface PaymentMethodCard {
  brand: PaymentMethodCardBrand
  expiryMonth: $.Scalars['Int']
  expiryYear: $.Scalars['Int']
  id: $.Scalars['ID']
  last4: $.Scalars['String']
}

interface Percentile {
  percentile: $.Scalars['Int']
  value: MetricValue
}

interface PhysicalAddress {
  addressLine1: $.Scalars['String'] | null
  addressLine2: $.Scalars['String'] | null
  city: $.Scalars['String'] | null
  country: $.Scalars['String'] | null
  postalCodeOrZIP: $.Scalars['String'] | null
  region: $.Scalars['String'] | null
}

interface Plan {
  displayName: $.Scalars['String']
  handle: $.Scalars['String']
  id: $.Scalars['ID']
  isDefault: $.Scalars['Boolean']
  isFree: $.Scalars['Boolean']
  offers: PlanOffers
  power: $.Scalars['Int']
  selectable: $.Scalars['Boolean']
  version: $.Scalars['Int']
  versionIsLatest: $.Scalars['Boolean']
  versions: PlanVersions
}

interface PlanOffers {
  accelerate: PlanOffersAccelerate
  conductor: PlanOffersConductor
  platform: PlanOffersPlatform
}

interface PlanOffersAccelerate {
  egress: OfferResourceProperty
  purgeCache: OfferResourceAggregation
  query: OfferResourceAggregation
}

interface PlanOffersConductor {
  createProject: OfferResourceAggregation
  organizationRole: OfferResourceProperty
}

interface PlanOffersPlatform {
  access: OfferAbstract
  support: OfferValue
}

interface PlanSubscription {
  createdAt: $.Scalars['Date']
  id: $.Scalars['ID']
  plan: Plan
  stripeSubscriptionId: $.Scalars['String'] | null
  stripeSubscriptionLineItems: Array<StripeSubscriptionLineItem>
  workspace: Workspace
}

interface PlanVersions {
  isLatest: $.Scalars['Boolean']
  next: Array<Plan>
  previous: Array<Plan>
}

interface PriceConstant {
  cents: $.Scalars['Int']
  id: $.Scalars['String']
  stripePriceId: $.Scalars['ID']
}

interface PriceTiered {
  id: $.Scalars['String']
  stripePriceId: $.Scalars['ID']
  tiers: Array<PriceTieredTier>
}

interface PriceTieredTier {
  cents: $.Scalars['Float']
  from: $.Scalars['Int']
  to: $.Scalars['Int'] | null
}

interface ProductHold {
  createdAt: $.Scalars['Int']
  expiresAt: $.Scalars['Int']
  reason: $.Scalars['String']
}

interface Project {
  accelerate: EnvironmentAccelerate
  createdAt: $.Scalars['Date']
  displayName: $.Scalars['String']
  environments: Array<Environment>
  id: $.Scalars['ID']
  pulse: EnvironmentPulse
  workspace: Workspace
}

interface ProjectNode {
  createdAt: $.Scalars['Date']
  displayName: $.Scalars['String']
  id: $.Scalars['String']
  workspaceId: $.Scalars['ID']
}

interface PulseStatusDisabled {
  enabled: $.Scalars['Boolean']
}

interface PulseStatusEnabled {
  enabled: $.Scalars['Boolean']
  error: $.Scalars['String'] | null
}

interface ServiceKey {
  createdAt: $.Scalars['Date']
  displayName: $.Scalars['String']
  id: $.Scalars['ID']
  valueHint: $.Scalars['String']
}

interface ServiceKeyNode {
  displayName: $.Scalars['String']
  id: $.Scalars['String']
  valueHint: $.Scalars['String']
}

interface ServiceKeyWithValue {
  serviceKey: ServiceKey
  value: $.Scalars['ID']
}

interface SideEffectConfirmation {
  ok: $.Scalars['Boolean']
}

interface StorageValue {
  number: $.Scalars['Float']
  unit: StorageUnit | null
}

interface StripeSubscriptionLineItem {
  feature: FeatureHandle
  id: $.Scalars['ID']
}

interface System {
  accelerate: SystemAccelerate
  plans: Array<Plan>
  pulse: SystemPulse
}

interface SystemAccelerate {
  defaultRegion: SystemAccelerateRegion
  regions: Array<SystemAccelerateRegion>
}

interface SystemAccelerateRegion {
  displayName: $.Scalars['String']
  id: $.Scalars['ID']
}

interface SystemPulse {
  defaultRegion: SystemAccelerateRegion
  regions: Array<SystemAccelerateRegion>
}

interface TimeInterval {
  from: $.Scalars['Date']
  to: $.Scalars['Date']
}

interface UsageProductAccelerate {
  egress: UsageProductAccelerateFeatureEgress
  request: UsageProductAccelerateFeatureRequest
}

interface UsageProductAccelerateFeatureEgress {
  averageResponseSize: $.Scalars['Float']
  total: $.Scalars['Float']
}

interface UsageProductAccelerateFeatureRequest {
  all: UsageProductAccelerateFeatureRequestFilterAll
  cacheHit: UsageProductAccelerateFeatureRequestFilterCacheHit
}

interface UsageProductAccelerateFeatureRequestFilterAll {
  count: $.Scalars['Int']
}

interface UsageProductAccelerateFeatureRequestFilterCacheHit {
  ratioToMiss: $.Scalars['Int']
}

interface User {
  displayName: $.Scalars['String'] | null
  email: $.Scalars['String']
  featureFlags: UserFeatureFlags
  handle: $.Scalars['String'] | null
  id: $.Scalars['ID']
  image: $.Scalars['String'] | null
  preferences: UserPreferences
}

interface UserFeatureFlags {
  adminDashboard: $.Scalars['Boolean']
  mars: $.Scalars['Boolean']
  mercury: $.Scalars['Boolean']
  venus: $.Scalars['Boolean']
}

interface UserPreferences {
  defaultWorkspace: Workspace | null
}

interface Workspace {
  billingAddress: PhysicalAddress | null
  billingEmail: $.Scalars['String']
  createdAt: $.Scalars['Date']
  displayName: $.Scalars['String']
  id: $.Scalars['ID']
  isUsersLastMembership: $.Scalars['Boolean']
  memberships: Array<WorkspaceMembership>
  paymentMethods: Array<PaymentMethod>
  planSubscription: PlanSubscription
  projects: Array<Project>
  stripeCustomerId: $.Scalars['String']
  usage: WorkspaceUsage
}

interface WorkspaceMembership {
  id: $.Scalars['ID']
  role: WorkspaceRole
  user: User
}

interface WorkspaceMembershipNode {
  id: $.Scalars['String']
  workspaceId: $.Scalars['ID']
}

interface WorkspaceNode {
  billingEmail: $.Scalars['String']
  displayName: $.Scalars['String']
  id: $.Scalars['String']
}

interface WorkspaceUsage {
  accelerate: UsageProductAccelerate
  timeInterval: TimeInterval
}

// ------------------------------------------------------------ //
//                            Union                             //
// ------------------------------------------------------------ //

type AccelerateStatus = AccelerateStatusDisabled | AccelerateStatusEnabled

type FeatureValueType =
  | FeatureValueTypeBoolean
  | FeatureValueTypeEnum
  | FeatureValueTypeNumber
  | FeatureValueTypeString

type Limit = LimitEnum | LimitNumber

type MutationAccelerateCachePurgeResult = ErrorInternal | SideEffectConfirmation

type MutationAccelerateDisableResult = ErrorInternal | SideEffectConfirmation

type MutationAccelerateEnableResult = ErrorInternal | SideEffectConfirmation

type MutationDatabaseLinkCreateResult = DatabaseLink | ErrorInternal | ErrorUserBusinessResourceNotFound

type MutationDatabaseLinkDeleteResult = DatabaseLinkNode | ErrorInternal | ErrorUserBusinessResourceNotFound

type MutationDatabaseLinkUpdateResult = DatabaseLink | ErrorInternal | ErrorUserBusinessResourceNotFound

type MutationEnvironmentCreateResult =
  | Environment
  | ErrorInternal
  | ErrorUserBusinessPlanLimitHit
  | ErrorUserBusinessResourceNotFound

type MutationEnvironmentDeleteResult = Environment | ErrorInternal | ErrorUserBusinessResourceNotFound

type MutationEnvironmentUpdateResult = Environment | ErrorInternal | ErrorUserBusinessResourceNotFound

type MutationProjectCreateResult =
  | ErrorInternal
  | ErrorUserBusinessPlanLimitHit
  | ErrorUserBusinessResourceNotFound
  | Project

type MutationProjectDeleteResult = ErrorInternal | ErrorUserBusinessResourceNotFound | ProjectNode

type MutationProjectUpdateResult = ErrorInternal | ErrorUserBusinessResourceNotFound | Project

type MutationPulseDisableResult = ErrorInternal | ErrorUserBusinessResourceNotFound | SideEffectConfirmation

type MutationPulseEnableResult = ErrorInternal | ErrorUser | SideEffectConfirmation

type MutationServiceKeyCreateResult = ErrorInternal | ErrorUserBusinessResourceNotFound | ServiceKeyWithValue

type MutationServiceKeyDeleteResult = ErrorInternal | ErrorUserBusinessResourceNotFound | ServiceKeyNode

type MutationUserUpdateDefaultWorkspaceResult = ErrorInternal | ErrorUserBusinessResourceNotFound | User

type MutationUserUpdateResult = ErrorInternal | ErrorUserBusinessResourceNotFound | User

type MutationWorkspaceCreateResult = ErrorInternal | Workspace

type MutationWorkspaceDeleteResult =
  | ErrorInternal
  | ErrorUserBusinessDeleteWorkspaceOnPaidPlan
  | ErrorUserBusinessResourceNotFound
  | WorkspaceNode

type MutationWorkspaceMembershipCreateResult =
  | ErrorInternal
  | ErrorUserBusinessResourceNotFound
  | ErrorUserBusinessUserAlreadyMemberOfOrganization
  | WorkspaceMembership

type MutationWorkspaceMembershipDeleteResult =
  | ErrorInternal
  | ErrorUserBusinessResourceNotFound
  | WorkspaceMembershipNode

type MutationWorkspacePlanSubscriptionChangeResult =
  | ErrorInternal
  | ErrorUserBusinessResourceNotFound
  | PlanSubscription

type MutationWorkspaceUpdateBillingAddressResult =
  | ErrorInternal
  | ErrorUserBusinessResourceNotFound
  | Workspace

type MutationWorkspaceUpdateBillingEmailResult = ErrorInternal | ErrorUserBusinessResourceNotFound | Workspace

type MutationWorkspaceUpdateResult = ErrorInternal | ErrorUserBusinessResourceNotFound | Workspace

type OfferContext = Plan | PlanSubscription

type OfferTimeInterval = OfferTimeIntervalCycle | OfferTimeIntervalPrevious

type Price = PriceConstant | PriceTiered

type PulseStatus = PulseStatusDisabled | PulseStatusEnabled

type QueryEnvironmentResult =
  | Environment
  | ErrorInternal
  | ErrorUserBusinessNotAuthorized
  | ErrorUserBusinessResourceNotFound

type QueryPlanResult = ErrorInternal | ErrorUserBusinessResourceNotFound | ErrorUserInput | Plan

type QueryProjectResult =
  | ErrorInternal
  | ErrorUserBusinessNotAuthorized
  | ErrorUserBusinessResourceNotFound
  | Project

type QueryWorkspaceResult =
  | ErrorInternal
  | ErrorUserBusinessNotAuthorized
  | ErrorUserBusinessResourceNotFound
  | Workspace
