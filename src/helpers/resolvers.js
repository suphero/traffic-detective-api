const { DetailTypeEnum } = require('.');
const userController = require('../controllers/user');
const reportController = require('../controllers/report');

module.exports = _db => ({
  ReportDetailEnum: {
    HORN: DetailTypeEnum.HORN,
    FAST: DetailTypeEnum.FAST,
    TRAFFIC_LIGHTS: DetailTypeEnum.TRAFFIC_LIGHTS,
    CROSSWALK: DetailTypeEnum.CROSSWALK,
    PARK: DetailTypeEnum.PARK,
    WRONG_WAY: DetailTypeEnum.WRONG_WAY,
    ACCIDENT: DetailTypeEnum.ACCIDENT,
    NEGLECTED: DetailTypeEnum.NEGLECTED,
    MULTIPLE_LANES: DetailTypeEnum.MULTIPLE_LANES,
    HOGGING_LEFT_LANE: DetailTypeEnum.HOGGING_LEFT_LANE,
    HIGH_BEAM: DetailTypeEnum.HIGH_BEAM,
    FOLLOWING_DISTANCE: DetailTypeEnum.FOLLOWING_DISTANCE,
    LANE_CHANGE: DetailTypeEnum.LANE_CHANGE,
  },
  Query: {
    user_profile: (_obj, _args, {user}) => userController.profile(user._id),
    report_user: (_obj, _args, {user}) => reportController.getUserReports(user._id),
    report_search: (_obj, args) => reportController.search(args.countryCode, args.plate),
    report_detail_types: (_obj, args) => reportController.getDetailTypes(args.language)
  },
  Mutation: {
    user_login: (_obj, args) => userController.login(args.email, args.password),
    user_signup: (_obj, args) => userController.signup(args.email, args.password),
    user_verify_token: (_obj, args) => userController.verifyToken(args.token),
    report_create: (_obj, args, {user}) => reportController.createReport(args.entity, user._id),
    report_delete: (_obj, args, {user}) => reportController.deleteReport(args._id, user._id),
  }
});