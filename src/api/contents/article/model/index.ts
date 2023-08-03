import { PageParam } from "@/api";

export interface Article {
  id?: number;

  // 文章标题
  title?: string;

  // 摘要
  summary?: string;

  // 文章内容
  content?: string;

  // 点赞数
  likes?: number;

  // 查看数量
  seeNumber?: number;

  // 文章图片
  cover?: string;

  // 是否启用
  enabled?: number;

  // 文章类型
  helpType?: number;

  // 视频播放")
  isVideo?: number;

  // 视频封面")
  videoCover?: string;

  // 视频地址")
  videoUrl?: string;

  // 租户id
  tenantId?: number;

  // 创建时间
  createTime?: string;

  // 更新时间
  updateTime?: string;
}

/**
 * 文章搜索条件
 */
export interface ArticleParam extends PageParam {
  title?: string;
}
