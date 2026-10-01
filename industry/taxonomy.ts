// 这个行业的分类体系：类别、标签词表、上游厂商名录，以及防止张冠李戴的身份词典。
// 模型按这里的词表打标签，主题页（topics.json）按标签归类，筛选栏按类别分组。
// 类别的 key 会出现在网址里（/all?category=…），上线后就不要再改；标签和名录可以随时增减。

/**
 * 网页上的类别（筛选栏、卡片角标、RSS 分类订阅）。key 是网址和接口里的身份，上线后不要改。
 * section 是日报里的分节标题（几个类别可以共用一节，按这里的顺序排）；guide 告诉模型怎么归类。
 * 没归上类的资料在日报里放进第一个 key 为 industry 的类别所在的节（没有就放最后一节）。
 */
export const CATEGORIES = [
  { key: "pricing", label: "价格", section: "价格变动", guide: "中转站或上游的标价、倍率、套餐、促销、免费额度变化。材料写了旧价和新价时归这里" },
  { key: "models", label: "模型", section: "模型上下架", guide: "中转站上架、下架或更换模型；上游新模型开始或停止经中转提供" },
  { key: "incidents", label: "故障", section: "故障与关停", guide: "宕机、超时、服务降级、错误率升高、数据泄露和其它安全事件" },
  { key: "closures", label: "关停", section: "故障与关停", guide: "中转站关停、跑路、余额无法提现、域名更换后失联" },
  { key: "launches", label: "上线", section: "新站与功能", guide: "新的中转站、新的 API 入口或新功能上线" },
  { key: "policy", label: "上游政策", section: "政策与监管", guide: "OpenAI、Anthropic、Google 等上游的政策、条款或接入规则变化，并且会改变中转站的运营" },
  { key: "regulation", label: "监管", section: "政策与监管", guide: "中国人工智能监管、跨境数据规则，以及其它直接约束中转站或 API 代理的规定" },
  { key: "reviews", label: "体验", section: "使用体验", guide: "点名站点、时间和现象的用户报告或性能对照。没有具体站点或数字的空泛抱怨不要归这里" },
] as const;

/**
 * 内容理解一步给每篇资料判的“内容类型”（写在 prompts/content-understanding.md 里，改了类型要同步改那份提示词）。
 * 评分提示词（prompts/selection-score.md）按类型给五个维度不同的权重。
 */
export const ITEM_TYPES = ["model_release", "product_launch", "tool_or_prompt", "research_paper", "industry_event", "opinion_analysis", "tutorial_explainer"] as const;

// ── 标签词表 ────────────────────────────────────────────────────────────────────────────

/** 每篇资料的第一个标签必须是这些“分类标签”之一。 */
export const CATEGORY_TAGS = [
  "价格变动", "模型变动", "故障事件", "关停跑路", "新站上线", "上游政策", "监管规则", "使用体验", "其他",
] as const;

/** 可选的主题标签：按能力，以及按问题。取值与规格里的 feature / issue 标识一致。 */
export const TOPIC_TAGS = [
  "gpt4", "claude", "gemini", "o1", "reasoning", "vision", "code", "voice",
  "outage", "price-hike", "price-drop", "new-model", "shutdown", "scam", "data-leak",
] as const;

/** 可选的实体标签：上游模型厂商。取值与规格里的 provider 标识一致。 */
export const ENTITY_TAGS = ["openai", "anthropic", "google", "deepseek", "qwen", "glm", "mistral", "meta"] as const;

/** 模型常写的近义词，统一成词表里的写法。 */
export const TAG_SYNONYMS: Readonly<Record<string, string>> = {
  价格: "价格变动", 调价: "价格变动", 涨价: "price-hike", 降价: "price-drop", "price-hike": "price-hike", "price-drop": "price-drop",
  模型: "模型变动", 上架: "模型变动", 下架: "模型变动", "new-model": "new-model", 新模型: "new-model",
  故障: "故障事件", 宕机: "故障事件", 中断: "故障事件", outage: "outage",
  关停: "关停跑路", 跑路: "关停跑路", shutdown: "shutdown", 诈骗: "scam", scam: "scam",
  泄露: "data-leak", "data-leak": "data-leak", 数据泄露: "data-leak",
  上线: "新站上线", 发布: "新站上线", 政策: "上游政策", 监管: "监管规则", 法规: "监管规则",
  体验: "使用体验", 评测: "使用体验", 实测: "使用体验",
  OpenAI: "openai", openai: "openai", ChatGPT: "openai", GPT: "gpt4", "GPT-4": "gpt4", gpt4: "gpt4",
  Anthropic: "anthropic", anthropic: "anthropic", Claude: "claude", claude: "claude",
  Google: "google", google: "google", Gemini: "gemini", gemini: "gemini", DeepMind: "google",
  DeepSeek: "deepseek", deepseek: "deepseek", Qwen: "qwen", qwen: "qwen", 千问: "qwen",
  GLM: "glm", glm: "glm", 智谱: "glm", Mistral: "mistral", mistral: "mistral",
  Meta: "meta", meta: "meta", Llama: "meta",
  o1: "o1", 推理: "reasoning", reasoning: "reasoning", 视觉: "vision", vision: "vision",
  多模态: "vision", 编码: "code", code: "code", 语音: "voice", voice: "voice",
};

/** 模型漏了分类标签时，按内容类型补一个。 */
export const CATEGORY_BY_ITEM_TYPE: Readonly<Record<string, string>> = {
  model_release: "模型变动", product_launch: "新站上线", tool_or_prompt: "使用体验", research_paper: "其他",
  industry_event: "其他", opinion_analysis: "使用体验", tutorial_explainer: "使用体验",
};

// ── 上游厂商 ────────────────────────────────────────────────────────────────────────────

/** 上游厂商：id → 显示名、卡片上显示的标签（必须在 ENTITY_TAGS 里）、别名。中转站本身不进这张表，名字以原文为准。 */
export const ENTITIES: Record<string, { name: string; displayTag: string | null; aliases: string[] }> = {
  openai: { name: "OpenAI", displayTag: "openai", aliases: ["OpenAI", "ChatGPT", "GPT"] },
  anthropic: { name: "Anthropic", displayTag: "anthropic", aliases: ["Anthropic", "Claude"] },
  google: { name: "Google", displayTag: "google", aliases: ["Google", "DeepMind", "Gemini", "谷歌"] },
  deepseek: { name: "DeepSeek", displayTag: "deepseek", aliases: ["DeepSeek", "深度求索"] },
  qwen: { name: "千问 Qwen", displayTag: "qwen", aliases: ["Qwen", "通义", "千问"] },
  glm: { name: "智谱 GLM", displayTag: "glm", aliases: ["智谱", "GLM", "Z.ai"] },
  mistral: { name: "Mistral", displayTag: "mistral", aliases: ["Mistral"] },
  meta: { name: "Meta", displayTag: "meta", aliases: ["Meta", "Llama"] },
};

/**
 * 身份词典：摘要和标题里出现的上游厂商，必须在原文里也出现过，否则退回原标题、丢掉摘要。
 * 中转站名字不在这张表里，只要原文写了就可以出现在标题里。
 */
export const IDENTITY_LEXICON: ReadonlyArray<{ id: string; name: string; patterns: RegExp[] }> = [
  { id: "openai", name: "OpenAI", patterns: [/openai|chatgpt|\bgpt-?[o\d]/i] },
  { id: "anthropic", name: "Anthropic", patterns: [/anthropic|\bclaude\b/i] },
  { id: "google", name: "Google / Gemini", patterns: [/google|deepmind|\bgemini\b/i] },
  { id: "deepseek", name: "DeepSeek", patterns: [/deepseek|深度求索/i] },
  { id: "qwen", name: "千问 Qwen", patterns: [/\bqwen|通义|千问/i] },
  { id: "glm", name: "智谱 GLM", patterns: [/智谱|\bglm-?[4-9]/i] },
  { id: "mistral", name: "Mistral", patterns: [/mistral/i] },
  { id: "meta", name: "Meta / Llama", patterns: [/\bMeta\b/, /\bllama\b/i] },
];

/** 这些域名上的文章，发布方就是对应的上游厂商。中转站域名不在这里，避免把中转公告算成上游自己发的。 */
export const PUBLISHER_DOMAINS: ReadonlyArray<{ entityId: string; domains: readonly string[] }> = [
  { entityId: "openai", domains: ["openai.com"] },
  { entityId: "anthropic", domains: ["anthropic.com", "claude.com"] },
  { entityId: "google", domains: ["deepmind.google", "ai.google.dev", "blog.google"] },
  { entityId: "deepseek", domains: ["deepseek.com"] },
  { entityId: "qwen", domains: ["qwen.ai"] },
  { entityId: "mistral", domains: ["mistral.ai"] },
  { entityId: "meta", domains: ["ai.meta.com"] },
];

/** 原文里的这些写法也算提到了对应厂商。 */
export const IDENTITY_CONTEXT_ALIASES: ReadonlyArray<{ entityId: string; pattern: RegExp }> = [
  { entityId: "meta", pattern: /@AIatMeta\b/i },
];
