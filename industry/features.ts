// 可选模块。模型榜和 Codex 重置监控只对示例 AI 站有意义。
// 中转站事实站两项都关：导航里不再出现入口，对应的定时任务不再运行，页面与接口返回 404。

export const FEATURES = {
  /** 模型榜：汇总公开评测，按公开方法 v15 计算共识排名（/leaderboard）。 */
  leaderboard: false,
  /** Codex 重置监控：盯 OpenAI Codex 负责人在 X 上的额度重置公告（/codex-reset）。 */
  codexResetMonitor: false,
} as const;
