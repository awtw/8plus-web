
import { notFound } from "next/navigation";

export default function ProjectDetail({ params }: { params: { slug: string } }) {
  // 暂时返回 404，因为项目内容管理还未配置
  return notFound();
}
