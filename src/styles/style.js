import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import { colors, radius, spacing, shadow } from './theme';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const globalStyles = StyleSheet.create({
  pinterestLayout_container: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.background,
  },
  pinterestLayout: {
    flex: 1,
    margin: 0,
    padding: 0,
  },
  masonryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },
  masonryColumn: {
    flexDirection: 'column',
  },
  pin: {
    width: '100%',
    borderRadius: radius.card,
  },
  alt_description: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '500',
    paddingTop: spacing.sm,
    paddingHorizontal: 2,
  },
  pin_container: {
    position: 'relative',
    marginBottom: spacing.md,
    backgroundColor: colors.surface,
    overflow: 'hidden',
    ...shadow.card,
  },
  like: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    zIndex: 2,
    backgroundColor: colors.white,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.circle,
    ...shadow.card,
  },
  filter_container: {
    margin: 0,
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    marginTop: spacing.md,
    marginBottom: spacing.sm,
    position: 'relative',
  },
  filter: {
    backgroundColor: colors.backgroundMuted,
    color: colors.text,
    width: windowWidth * 0.9,
    borderRadius: radius.pill,
    height: 46,
    paddingLeft: 44,
    paddingRight: spacing.lg,
    fontSize: 15,
  },
  search: {
    position: 'absolute',
    zIndex: 1,
    top: 12,
    left: windowWidth * 0.05 + 16,
  },
  usersDownloadedImg_container: {
    width: windowWidth,
    padding: '8%',
    paddingTop: 10,
  },
  usersDownloadedImg_btn: {
    backgroundColor: colors.red,
    paddingLeft: 30,
    paddingBottom: 27,
    width: 100,
    height: 100,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    borderRadius: radius.circle,
    right: -30,
    top: -30,
    position: 'absolute',
    zIndex: 40,
    ...shadow.card,
  },

  modal_container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  modalImg_wrapper: {
    position: 'relative',
  },
  modalImg: {
    width: windowWidth,
    height: windowHeight * 0.6,
    backgroundColor: colors.backgroundMuted,
    borderBottomLeftRadius: radius.card,
    borderBottomRightRadius: radius.card,
  },
  closecircleo: {
    position: 'absolute',
    zIndex: 3,
    top: spacing.xl,
    left: spacing.lg,
    backgroundColor: colors.white,
    borderRadius: radius.circle,
    ...shadow.card,
  },
  title: {
    padding: spacing.xl,
  },
  title_text: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  authorAvatar: {
    width: 36,
    height: 36,
    borderRadius: radius.circle,
    backgroundColor: colors.red,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  authorAvatar_text: {
    color: colors.white,
    fontWeight: '700',
  },
  authorName: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  title_description: {
    borderTopColor: colors.border,
    borderTopWidth: StyleSheet.hairlineWidth,
    marginTop: spacing.lg,
    paddingTop: spacing.lg,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  statBadge: {
    backgroundColor: colors.backgroundMuted,
    borderRadius: radius.pill,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    marginRight: spacing.sm,
  },
  statBadge_text: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '500',
  },
  usersDownloadedImg: {
    width: windowWidth * 0.4,
    height: windowHeight * 0.3,
    borderRadius: radius.card,
    marginBottom: '4%',
  },
  savedImg_container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
